import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import React, { useContext } from 'react';
import { Store, useStoreBase } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import SocketContext from '@/contexts/SocketContext';
import { useNavigate } from 'react-router-dom';

const stateSelector = (state: Store) => ({
  logout: state.logout,
});

const Logout: React.FC = () => {
  const { socket } = useContext(SocketContext).SocketState;
  const { logout } = useStoreBase(stateSelector);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(queryClient, navigate);
    socket?.on('user_disconnected', (uid: string) => {
      console.log(uid);
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Sair
    </DropdownMenuItem>
  );
};

export default Logout;
