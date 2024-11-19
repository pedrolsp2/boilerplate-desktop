import { Token } from '@/types/Authentication';
import { setItem } from '@/utils/storage';
import { QueryClient } from '@tanstack/react-query';
import { ImmerStateCreator } from '.';

type AuthStore = Token & {
  isAuthenticating: boolean;
};

type AuthActions = {
  login: (user: Token) => void;
  logout: (queryClient: QueryClient) => void;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  resetAuthState: () => void;
};

export type AuthSlice = AuthStore & AuthActions;

const initialState: AuthStore = {
  token: null,
  user: null,
  cod_usuario: null,
  matricula: null,
  isAuthenticating: false,
};

export const useAuthSlice: ImmerStateCreator<AuthSlice> = (set) => ({
  ...initialState,
  login: (user) => {
    set((state) => ({ ...state, ...user }));
    setItem(localStorage, 'token', user.token!);
  },
  logout: (queryClient) => {
    set((state) => ({ ...state, token: null, user: null }));
    localStorage.clear();
    queryClient.clear();
  },
  setIsAuthenticating: (isAuthenticating) =>
    set((state) => ({ ...state, isAuthenticating })),
  resetAuthState: () => set(initialState),
});
