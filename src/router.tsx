import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import PublicLayout from './Layouts/PublicLayout';
import NotFound from './pages/NotFound';
import ProtectedLayout from './Layouts/ProtectedLayout';
import Login from './pages/Login';
import Home from './pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
