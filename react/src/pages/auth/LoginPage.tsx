import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth", { email, password });
      const { token, user } = response.data;
      if (token && user) {

        login(user, token)

        await navigate("/");
      }


    } catch (err) {
      setError(
        "Erro ao realizar login. Verifique suas credenciais."
      );
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-6">
          Login
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Entre com seu e-mail e senha
        </p>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-sm text-secondary hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Não tem uma conta?
          <Link to="/cadastrar" className="text-secondary font-medium hover:underline">
            Cadastrar
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
