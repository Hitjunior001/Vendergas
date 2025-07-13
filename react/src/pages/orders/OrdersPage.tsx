import { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  deleteOrder,
} from "../../services/orderService";
import { getClients } from "../../services/clientService";
import { getEnterprises } from "../../services/enterpriseService";

import OrderForm from "../../components/order/OrderForm";

interface Order {
  _id: string;
  numberOrder: string;
  enterpriseId: string;
  clientId: string;
  createdAt: string;
}

interface Client {
  _id: string;
  clientName: string;
  enterpriseId: string;
}

interface Enterprise {
  _id: string;
  tradeName: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const enterprisesRes = await getEnterprises();
        const enterpriseList = enterprisesRes.data;
        setEnterprises(enterpriseList);

        const clientsRes = await Promise.all(
          enterpriseList.map((e: { _id: string; }) => getClients(e._id))
        );
        const allClients = clientsRes.flatMap((res) => res.data);
        setClients(allClients);

        const orderResults = await Promise.allSettled(
          enterpriseList.map((e: { _id: string; }) => getOrders(e._id))
        );

        const allOrders = orderResults
          .filter((res) => res.status === "fulfilled")
          .flatMap((res) => (res as PromiseFulfilledResult<any>).value.data);

        setOrders(allOrders);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchAll();
  }, []);

  const handleAddOrder = async (
    data: Omit<Order, "_id" | "createdAt">
  ) => {
    try {
      await createOrder(data);
      const updatedOrders = await getOrders(data.enterpriseId);
      setOrders((prev) => [
        ...prev.filter((o) => o.enterpriseId !== data.enterpriseId),
        ...updatedOrders.data,
      ]);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDeleteOrder = async (
    id: string,
    enterpriseId: string,
    clientId: string
  ) => {
    try {
      await deleteOrder(id, enterpriseId, clientId);
      const updatedOrders = await getOrders(enterpriseId);
      setOrders((prev) => [
        ...prev.filter((o) => o.enterpriseId !== enterpriseId),
        ...updatedOrders.data,
      ]);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-6">
        Gerenciar Pedidos
      </h1>

      <OrderForm
        onSubmit={handleAddOrder}
        clients={clients}
        enterprises={enterprises}
      />

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
                  enterprises.find((e) => e._id === order.enterpriseId)
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
            <button
              onClick={() =>
                handleDeleteOrder(order._id, order.enterpriseId, order.clientId)
              }
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
