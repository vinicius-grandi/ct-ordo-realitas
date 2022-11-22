import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';

export default function LogoutPage() {
  const { setIsUserAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    async function goHome() {
      await router.push('/');
    }
    setIsUserAuthenticated(false);
    void goHome();
  }, [router, setIsUserAuthenticated]);
  return <h1>Logging out...</h1>;
}

const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Set-Cookie', 'session=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  return {
    props: {},
  };
};

export { getServerSideProps };
