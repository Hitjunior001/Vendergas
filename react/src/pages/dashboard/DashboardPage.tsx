import { useEffect, useState } from "react";
import { getEnterprises } from "../../services/enterpriseService";
import { getClients } from "../../services/clientService";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";

interface Client {
  enterpriseId: string;
}

interface Product {
  enterpriseId: string;
}

interface Order {
  enterpriseId: string;
}


export default function DashboardPage() {
  const [totalEnterprises, setTotalEnterprises] = useState(0);
  const [totalClients, setTotalClients] = useState<Client[]>([]);
  const [totalProducts, setTotalProducts] = useState<Product[]>([]);
  const [totalOrders, setTotalOrders] = useState<Order[]>([]);



  useEffect(() => {
    async function fetchData() {
      try {
        const enterprisesRes = await getEnterprises();
        const enterprises = enterprisesRes.data;
        setTotalEnterprises(enterprises.length);

        const clientsRes = await Promise.all(
          enterprises.map((e: { _id: string; }) => getClients(e._id))
        );
        const allClients = clientsRes.flatMap(res => res.data);
        setTotalClients(allClients);

        const productsRes = await Promise.all(
          enterprises.map((e: { _id: string; }) => getProducts(e._id))
        );
        const allProducts = productsRes.flatMap(res => res.data);
        setTotalProducts(allProducts);

        const ordersRes = await Promise.all(
          enterprises.map((e: { _id: string; }) => getOrders(e._id))
        );
        const allOrders = ordersRes.flatMap(res => res.data);
        setTotalOrders(allOrders);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Empresas" value={totalEnterprises} />
        <Card title="Clientes" value={totalClients.length} />
        <Card title="Pedidos" value={totalOrders.length} />
        <Card title="Produtos" value={totalProducts.length} />
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-primary">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-secondary mt-2">{value}</p>
    </div>
  );
}
