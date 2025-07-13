import { useEffect, useState, type FormEvent } from "react";
import type { Enterprise } from "../../types/types";


interface Props {
  selected: Enterprise | null;
  onCreate: (data: Omit<Enterprise, "_id">) => Promise<void>;
  onUpdate: (id: string, data: Omit<Enterprise, "_id">) => Promise<void>;
}

export default function EnterpriseForm({ selected, onCreate, onUpdate }: Props) {
  const [tradeName, setTradeName] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setTradeName(selected.tradeName);
      setCorporateName(selected.corporateName);
      setCnpj(selected.cnpj);
    } else {
      setTradeName("");
      setCorporateName("");
      setCnpj("");
    }
  }, [selected]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { tradeName, corporateName, cnpj };

    try {
      if (selected && selected._id) {
        await onUpdate(selected._id, data);
      } else {
        await onCreate(data);
      }

      setTradeName("");
      setCorporateName("");
      setCnpj("");
    } catch (error) {
      console.error("Erro ao salvar empresa", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border-l-4 border-primary max-w-md"
    >
      <h2 className="text-xl font-semibold text-secondary mb-4">
        {selected ? "Editar Empresa" : "Nova Empresa"}
      </h2>

      <label className="block mb-2 font-medium text-gray-700">Nome Fantasia</label>
      <input
        type="text"
        value={tradeName}
        onChange={(e) => setTradeName(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">Razão Social</label>
      <input
        type="text"
        value={corporateName}
        onChange={(e) => setCorporateName(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">CNPJ</label>
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? "Salvando..." : selected ? "Atualizar Empresa" : "Cadastrar Empresa"}
      </button>
    </form>
  );
}
