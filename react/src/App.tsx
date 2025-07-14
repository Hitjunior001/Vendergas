import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from "./components/requireAuth";
import Dashboard from "./pages/dashboard/DashboardPage";
import Navbar from "./components/navbar";
import EnterprisePage from "./pages/enterprises/EnterprisesPage";
import EnterpriseManagerPage from "./pages/enterprises/EnterpriseManagerPage";
import OrderPage from "./pages/orders/OrdersPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/cadastrar";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/empresas" element={
          <RequireAuth>
            <EnterprisePage />
          </RequireAuth>
        } />
        <Route path="/pedidos" element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        } />
        <Route path="/empresas/:enterpriseId" element={
          <RequireAuth>
            <EnterpriseManagerPage />
          </RequireAuth>
        } />
      </Routes>
    </>
  );
}
