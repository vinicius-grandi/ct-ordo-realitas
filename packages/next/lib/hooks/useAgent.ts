import { ChangeEvent, useState } from 'react';

type Agent = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function useAgent(): [Agent, (ev: ChangeEvent<HTMLInputElement>) => void] {
  const [agent, setAgent] = useState<Agent>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleInput = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
    } else {
      throw new Error(`${id} is not a key of agent object`);
    }
  };
  return [agent, handleInput];
}
