import React, { useContext, useEffect } from 'react';
import SocketContext from '@/contexts/SocketContext';

const Rotinas1: React.FC = () => {
  const { socket } = useContext(SocketContext).SocketState;

  useEffect(() => {
    if (!socket) return;
    socket.on('handshake', (data) => {
      console.log('handshake', data);
    });
    socket.on('on', (data) => {
      console.log('on', data);
    });

    return () => {
      socket.off('handshake', (data) => {
        console.log('off-handshake', data);
      });
      socket.off('connect', () => {
        console.log('off-connect');
      });
    };
  }, [socket]);

  return <div></div>;
};

export default Rotinas1;
