interface Order {
  _id: string;
  numberOrder: string;
  enterpriseId: string;
  clientId: string;
  createdAt: string;
}

interface Props {
  orders: Order[];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function OrderList({ orders, onDelete, onView }: Props) {
  return (
    <div className="space-y-4">
      {orders.length === 0 && (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-secondary text-lg">
              Pedido #{order.numberOrder}
            </h3>
            <p className="text-gray-600">Cliente: {order.clientId}</p>
            <p className="text-gray-600">Empresa: {order.enterpriseId}</p>
            <p className="text-gray-600">Data: {order.createdAt}</p>

          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => onView(order._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Visualizar
            </button>
            <button
              onClick={() => onDelete(order._id)}
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
