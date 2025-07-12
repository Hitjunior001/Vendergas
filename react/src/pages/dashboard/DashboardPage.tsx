import { useEffect, useState } from "react";
import { getEnterprises } from "../../services/enterpriseService";


export default function DashboardPage() {
  const [totalEnterprises, setTotalEnterprises] = useState(0);


  useEffect(() => {
    async function fetchData() {
      try {
        const enterprises = await getEnterprises();
        setTotalEnterprises(enterprises.data.length)

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
