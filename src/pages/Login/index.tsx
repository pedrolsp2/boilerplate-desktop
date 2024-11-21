import { FormEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import icon from '@/assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from '@/api/business';
import { authenticateUser } from '@/api/auth/user';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import ResetPassword from './components/RestPassword';
import { Button } from '@/components/ui/button';
import Container from './components/Container';
import Loader from '@/components/Loader';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = useStore.use.login();

  const { mutate, status } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      login({ ...data });
      navigate('/');
    },
    onError: (err: AxiosError) => {
      if (isAxiosError<{ erro: string }>(err)) {
        toast.warning('Usuário ou senha incorretos', {
          style: { color: '#fff', background: '#AE0303' },
        });
      }
    },
  });

  const userRef = useRef<HTMLInputElement>(null);
  const isError: boolean = status === 'error';
  const isLoading: boolean = status === 'pending';
  const disabled: boolean = !user || !password || isLoading;

  useEffect(() => {
    userRef.current?.focus();
  }, [isError]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!disabled) {
      mutate({ user, password });
    }
  };

  return (
    <div className="grid items-center justify-center w-full h-screen">
      <form
        className="flex w-full flex-col gap-4 p-6 rounded border-primary-50/50 sm:w-[452px] border"
        onSubmit={onFormSubmit}
      >
        <div className="flex items-center mx-auto">
          <img src={icon} className="h-14 w-14" alt="GMAN icon" />
        </div>
        <Container
          variant="user"
          placeholder="Digite seu usuário"
          onChange={(e) => setUser(e.target.value)}
        />
        <Container
          variant="password"
          placeholder="Digite seu usuário"
          onChange={(e) => setPassword(e.target.value)}
        />
        <ResetPassword />
        <Button className="mt-3 rounded-md md:py-3" disabled={disabled}>
          <Loader condition={isLoading} title="Entrar" />
        </Button>
        <span className="text-[12px] text-center">
          {import.meta.env.VITE_VERSION}
        </span>
      </form>
    </div>
  );
};

export default Login;
