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
import { getItem, setItem } from '@/utils/storage';
import { Store, useStoreBase } from '@/store';

const stateSelector = (state: Store) => ({
  nome: state.nome,
  matricula: state.matricula,
  email: state.email,
  cod_usuario: state.cod_usuario,
  cod_filial: state.cod_filial,
});

type ISocketContextComponentProps = PropsWithChildren;

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const user = useStoreBase(stateSelector);
  const { children } = props;
  const token = getItem(localStorage, 'token');

  const socket = useSocket(import.meta.env.VITE_BUSINESS_SOCKET_BASE_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
    auth: { token, user: { ...user, token } },
  });

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
