import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import PublicLayout from './Layouts/PublicLayout';
import NotFound from './pages/NotFound';
import ProtectedLayout from './Layouts/ProtectedLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Rotinas from './pages/Rotinas';
import Rotinas1 from './pages/Rotinas1';
import Rotinas2 from './pages/Rotinas2';
import SocketContextComponent from './contexts/SocketContextComponent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            element={
              <SocketContextComponent>
                <ProtectedLayout />
              </SocketContextComponent>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/rotinas" element={<Rotinas />} />
            <Route path="/rotinas/recebimento" element={<Rotinas1 />} />
            <Route path="/rotinas/faturamento" element={<Rotinas2 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
