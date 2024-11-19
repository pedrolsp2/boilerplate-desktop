import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { getItem } from '@/utils/storage';
import SidebarContent from '@/components/Sidebar';

const ProtectedLayout = () => {
  const user = useStore((state) => state.user);

  const token = getItem(localStorage, 'token');
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return (
    <SidebarContent>
      <Outlet />
    </SidebarContent>
  );
};

export default ProtectedLayout;
