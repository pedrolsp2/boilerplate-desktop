import { Outlet, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validateUserToken } from '@/api/auth/user';
import { getItem } from '@/utils/storage';
import { useEffect, useLayoutEffect } from 'react';
import { Store, useStoreBase } from '@/store';
import { Toast } from '@/components/Toast';
import LoadingScreen from '@/pages/LoadingScreen';
import { AxiosError } from 'axios';
import { isAxiosError } from '@/api/business';

const stateSelector = (state: Store) => ({
  login: state.login,
  logout: state.logout,
});

const AppLayout = () => {
  const { login, logout } = useStoreBase(stateSelector);
  const token = getItem(localStorage, 'token');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: validateUserToken,
    onSuccess: (data) => {
      const token = getItem(localStorage, 'token');

      if (token) {
        login({
          token: token,
          ...data.token.usuario,
        });
      }
    },

    onError: (err: AxiosError) => {
      Toast({ variant: 'warning', content: 'Sua sessão terminou' });
      if (isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 402) {
          logout(queryClient, navigate);
        }
      }
    },
  });

  const isLoading = status === 'pending';

  useLayoutEffect(() => {
    if (token) {
      mutate();
    }
  }, [token]);

  useEffect(() => {
    const theme = getItem(localStorage, 'theme') || 'light';
    document.querySelector('html')?.setAttribute('data-mode', theme);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return <Outlet />;
};

export default AppLayout;
