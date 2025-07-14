interface Client {
  _id: string;
  clientName: string;
  enterpriseId: string;
}

interface Enterprise {
  _id: string;
  tradeName: string;
}

interface Order {
  _id: string;
  numberOrder: string;
  enterpriseId: string;
  clientId: string;
  createdAt: string;
}

interface Props {
  orders: Order[];
  onDelete: (enterpriseId: string, clientId: string, id: string) => void;
  onManager: (id: string) => void;
  clients: Client[];
  enterprise: Enterprise[];
}

export default function OrderList({ orders, onDelete, onManager, enterprise, clients }: Props) {
  return (
      <div className="mt-10 space-y-4">
        {orders.length === 0 && (
          <p className="text-gray-500">Nenhum pedido cadastrado.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-secondary text-lg">
                Pedido #{order.numberOrder}
              </h3>
              <p className="text-gray-600">
                Empresa:
                {
                  enterprise.find((e) => e._id === order.enterpriseId)
                    ?.tradeName ?? "N/A"
                }
              </p>
              <p className="text-gray-600">
                Cliente:
                {
                  clients.find((c) => c._id === order.clientId)
                    ?.clientName ?? "N/A"
                }
              </p>
              <p className="text-gray-500 text-sm">
                Criado em:
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
            <button
              onClick={() =>
                onDelete(order.enterpriseId, order.clientId, order._id)
              }
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Deletar
            </button>
              <button
                onClick={() => onManager(order._id)}
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary text-sm"
              >
                Gerenciar
              </button>
            </div>
          </div>
        ))}
      </div>
  );
}
