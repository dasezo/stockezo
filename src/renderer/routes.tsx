import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import { useContext } from 'react';
import { AuthContext } from './context/Auth';
import AuthProvider from './providers/Auth';
import Products from './views/Products';

export default function appRoutes() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </MemoryRouter>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let { authed } = useContext(AuthContext);

  if (authed) return children;

  return <Navigate to="/login" replace />;
}
