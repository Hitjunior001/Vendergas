import { useEffect, useState } from "react";
import {
    getEnterprises,
    createEnterprise,
    updateEnterprise,
    deleteEnterprise,
} from "../../services/enterpriseService";
import EnterpriseList from "../../components/enterprise/EnterpriseList";
import EnterpriseForm from "../../components/enterprise/EnterpriseForm";
import { useNavigate } from "react-router-dom";
import type { Enterprise } from "../../types/types";

export default function EnterprisePage() {
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
    const [selected, setSelected] = useState<Enterprise | null>(null);
    const navigate = useNavigate();

    const fetchEnterprises = async () => {
        const res = await getEnterprises();
        setEnterprises(res.data);
    };

    useEffect(() => {
        fetchEnterprises();
    }, []);

    const handleCreate = async (data: Omit<Enterprise, "_id">) => {
        await createEnterprise(data);
        fetchEnterprises();
    };

    const handleUpdate = async (id: string, data: Omit<Enterprise, "_id">) => {
        await updateEnterprise(id, data);
        setSelected(null);
        fetchEnterprises();
    };

    const handleDelete = async (id: string) => {
        await deleteEnterprise(id);
        fetchEnterprises();
    };
    const managerEnterprise = async (id: string) => {
        await navigate(`/empresas/${id}`)
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-secondary mb-4">Empresas</h1>

            <EnterpriseForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                selected={selected}
            />
            <div className= "mt-10"/>
            <EnterpriseList
                enterprises={enterprises}
                onEdit={setSelected}
                onDelete={handleDelete}
                onManager={managerEnterprise}
            />
        </div>
    );
}
