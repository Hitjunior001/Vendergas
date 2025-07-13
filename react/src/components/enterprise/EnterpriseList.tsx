import type { Enterprise } from "../../types/types";

interface Props {
  enterprises: Enterprise[];
  onEdit: (enterprise: Enterprise) => void;
  onDelete: (id: string) => void;
  onManager: (id: string) => void;
}

export default function EnterpriseList({ enterprises, onEdit, onDelete, onManager }: Props) {
  return (
    <div className="space-y-4">
      {enterprises.length === 0 && (
        <p className="text-gray-500">Nenhuma empresa cadastrada.</p>
      )}

      {enterprises.map((enterprise) => (
        <div
          key={enterprise._id}
          className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-secondary text-lg">
              {enterprise.tradeName}
            </h3>
            <p className="text-gray-600">Razão Social: {enterprise.corporateName}</p>
            <p className="text-gray-600">CNPJ: {enterprise.cnpj}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => onEdit(enterprise)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => onManager(enterprise._id)}
              className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary text-sm"
            >
              Gerenciar
            </button>
            <button
              onClick={() => onDelete(enterprise._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
