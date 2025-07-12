import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-secondary text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Vendergas</h1>

      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link to="/dashboard" className="hover:underline">
            Início
          </Link>
        </li>
        <li>
          <Link to="/empresas" className="hover:underline">
            Empresas
          </Link>
        </li>
        <li>
          <Link to="/pedidos" className="hover:underline">
            Pedidos
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          <span className="text-sm font-medium">{user?.name || "Usuário"}</span>
        </div>

        <button
          onClick={logout}
          title="Sair"
          className="flex items-center gap-1 hover:text-red-400 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </nav>
  );
}
