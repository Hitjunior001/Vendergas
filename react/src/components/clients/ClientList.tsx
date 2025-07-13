import type { Client } from "../../types/types";

interface Props {
  clients: Client[];
  onDelete: (index: string) => Promise<void>;
}

export default function ClientList({ clients, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {clients.length === 0 && <p className="text-gray-500">Nenhum cliente cadastrado.</p>}

      {clients.map((client, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold text-secondary text-lg">{client.clientName}</h3>
            <p className="text-gray-600">Email: {client.clientEmail}</p>
            <p className="text-gray-600">Telefone: {client.clientPhone}</p>
          </div>
          <button
            onClick={() => onDelete(client._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
