import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useSocket } from '../hooks/useSocket';
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
} from './SocketContext';
import { ExternalToast } from 'sonner';
import { isTablet } from 'react-device-detect';
import { Store, useStoreBase } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { getItem, setItem } from '@/utils/storage';
import useSocketAlert from '@/components/SocketAlert';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const stateSelector = (state: Store) => ({
  matricula: state.matricula,
  cod_usuario: state.cod_usuario,
});

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;
  const { matricula, cod_usuario } = useStoreBase(stateSelector);
  const queryClient = useQueryClient();

  const propsToast = (): ExternalToast => {
    return isTablet
      ? {
          position: 'top-left',
          style: {
            color: '#707070',
            background: '#fafafa',
            width: '530px',
            fontSize: 16,
          },
          duration: 10000,
        }
      : {
          position: 'top-center',
          style: {
            color: '#707070',
            background: '#fafafa',
          },
          duration: 10000,
        };
  };

  const styleToast = propsToast();
  const valoresPadros = {
    cod_usuario,
    matricula,
    styleToast,
  };

  const socket = useSocket(import.meta.env.VITE_BUSINESS_SOCKET_BASE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
    auth: { token: getItem(localStorage, 'token') },
  });
  useSocketAlert({ socket, queryClient, valoresPadros });

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUid = getItem(localStorage, 'socketUid');
    const savedUsers = getItem(localStorage, 'socketUsers');

    socket.connect();
    SocketDispatch({ type: 'update_socket', payload: socket });

    if (savedUid && savedUsers) {
      // Recupera o estado anterior da conexão para evitar desconexão
      SocketDispatch({ type: 'update_users', payload: JSON.parse(savedUsers) });
      SocketDispatch({ type: 'update_uid', payload: savedUid });
      setLoading(false);
    } else {
      // Se não houver dados salvos, inicia a conexão
      StartListeners();
      SendHandshake();
    }

    // eslint-disable-next-line
  }, []);

  const StartListeners = () => {
    /** Messages */
    socket.on('gman-loggin', (users: string[]) => {
      SocketDispatch({ type: 'update_users', payload: users });
      setItem(localStorage, 'socketUsers', JSON.stringify(users)); // Salva os usuários conectados
    });

    /** Messages */
    socket.on('user_disconnected', (uid: string) => {
      SocketDispatch({ type: 'remove_user', payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', () => {
      SendHandshake();
    });
  };

  const SendHandshake = async () => {
    socket.emit('handshake', async (uid: string, users: string[]) => {
      SocketDispatch({ type: 'update_users', payload: users });
      SocketDispatch({ type: 'update_uid', payload: uid });

      // Salva o UID e os usuários conectados para futuras recargas
      setItem(localStorage, 'socketUid', uid);
      setItem(localStorage, 'socketUsers', JSON.stringify(users));
    });

    setLoading(false);
  };

  if (loading) return <p>... loading Socket IO ....</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
