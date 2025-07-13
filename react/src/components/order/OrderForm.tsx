import { useState, type FormEvent, useEffect } from "react";

interface Order {
  numberOrder: string;
  enterpriseId: string;
  clientId: string;
}

interface Enterprise {
  _id: string;
  tradeName: string;
}

interface Client {
  _id: string;
  clientName: string;
  enterpriseId: string;
}

interface Props {
  onSubmit: (data: Omit<Order, "_id">) => Promise<void>;
  enterprises: Enterprise[];
  clients: Client[];
}

export default function OrderForm({ onSubmit, enterprises, clients }: Props) {
  const [numberOrder, setNumberOrder] = useState("");
  const [enterpriseId, setEnterpriseId] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setClientId("");
  }, [enterpriseId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await onSubmit({ numberOrder, enterpriseId, clientId });
      setNumberOrder("");
      setEnterpriseId("");
      setClientId("");
    } catch (error) {
      console.error("Erro ao salvar pedido", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border-l-4 border-primary max-w-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-secondary mb-2">Novo Pedido</h2>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Número do Pedido</label>
        <input
          type="text"
          value={numberOrder}
          onChange={(e) => setNumberOrder(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Empresa</label>
        <select
          value={enterpriseId}
          onChange={(e) => setEnterpriseId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecione uma empresa</option>
          {enterprises.map((ent) => (
            <option key={ent._id} value={ent._id}>
              {ent.tradeName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Cliente</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          disabled={!enterpriseId} 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        >
          <option value="">Selecione um cliente</option>
          {clients.filter(c => c.enterpriseId === enterpriseId).map(c => 
              <option key={c._id} value={c._id}>
                {c.clientName}
              </option>
          )}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Pedido"}
      </button>
    </form>
  );
}
