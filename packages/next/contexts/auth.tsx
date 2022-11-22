import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';

type Auth = {
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<Auth>({
  isUserAuthenticated: false,
  setIsUserAuthenticated: () => {},
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth');
        const { auth } = await response.json();
        setIsUserAuthenticated(auth);
      } catch (err) {
        setIsUserAuthenticated(false);
      }
    }
    void checkAuth();
  }, []);

  const value = useMemo(() => ({
    isUserAuthenticated,
    setIsUserAuthenticated,
  }), [isUserAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
