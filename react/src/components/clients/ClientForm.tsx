import { useState, type FormEvent } from "react";
import type { ClientCreate } from "../../types/types";

interface Props {
  onSubmit: (data: ClientCreate) => Promise<void>;
  initialData?: ClientCreate;
}

export default function ClientForm({ onSubmit, initialData }: Props) {
  const [clientName, setClientName] = useState(initialData?.clientName || "");
  const [clientEmail, setClientEmail] = useState(initialData?.clientEmail || "");
  const [clientPhone, setClientPhone] = useState(initialData?.clientPhone || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ clientName, clientEmail, clientPhone });
    setLoading(false);
    
    setClientName("");
    setClientEmail("");
    setClientPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border-l-4 border-primary max-w-md"
    >
      <h2 className="text-xl font-semibold text-secondary mb-4">Novo Cliente</h2>
      
      <label className="block mb-2 font-medium text-gray-700">Nome</label>
      <input
        type="text"
        value={clientName}
        onChange={e => setClientName(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">Email</label>
      <input
        type="email"
        value={clientEmail}
        onChange={e => setClientEmail(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">Telefone</label>
      <input
        type="tel"
        value={clientPhone}
        onChange={e => setClientPhone(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Cliente"}
      </button>
    </form>
  );
}
