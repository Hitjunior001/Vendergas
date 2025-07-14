import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

function RegisterPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(Boolean);

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setError("");

        try {
            setLoading(true)
            const response = await api.post("/users", { name, email, password });
            if(response)
            {
                const logging = await api.post("/auth", { email, password });
                const { token, user } = logging.data;
                if (token && user) {
                    login(user, token)
                    await navigate("/");
            }
            }
        setLoading(false)
        } catch (err) {
            setError(
                "Erro ao realizar cadastro. Verifique suas credenciais."
            );
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-secondary mb-6">
                    Cadastro
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Crie sua conta
                </p>

                {error && (
                    <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nome
                        </label>
                        <input
                            type="name"
                            id="name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>
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

                    <button
                        type="submit"
                        disabled = {loading}
                        className="w-full bg-primary hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        {loading ? 'Criando...' : 'Criar conta'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Já tem uma conta?
                    <Link to="/login" className="text-secondary font-medium hover:underline">
                        Entrar
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default RegisterPage;
