import { useEffect, useState } from "react";
import CrudManager from "../hooks/CrudManager";
import TitleCard from "../components/ui/TitleCard";

const Records = () => {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { views } = CrudManager({
        url: `record`
    });

    useEffect(() => {
        views({ setData: setRecords, setLoading, setError });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
        </div>
    );
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="flex flex-col h-full">
                <TitleCard name="Historial" link="/" />
                <div className="flex-1 overflow-y-scroll rounded-lg">
                    {records.length >= 1 ? (
                        <div className="text-center pb-2">
                            <table className=" space-y-2 w-full mb-5">
                                <thead className=" shadow-2xl sticky top-0 bg-[#a3273e] text-gray-100 text-sm ">
                                    <tr>
                                        <th className="border-e-1 p-2 border-gray-300">#</th>
                                        <th className="border-e-1 p-2 border-gray-300">Usuario</th>
                                        <th className="border-e-1 p-2 border-gray-300">Acción</th>
                                        <th className="border-e-1 p-2 border-gray-300">Tabla</th>
                                        <th className="border-e-1 p-2 border-gray-300">Nº Tabla</th>
                                        <th className="border-e-1 p-2 border-gray-300">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map(datos => {
                                        return (
                                            <tr key={datos.id} className="hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8  mt-2 cursor-pointer transition-all shrink-0 overflow-x-scroll">
                                                <td className="py-1.5 px-4">{datos.id}</td>
                                                <td className="py-1.5 px-4">{datos.name}</td>
                                                <td className="py-1.5 px-4">{datos.action}</td>
                                                <td className="py-1.5 px-4">{datos.affected_table}</td>
                                                <td className="py-1.5 px-4">{datos.affected_record_id}</td>
                                                <td className="py-1.5 px-4">{datos.created_at.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <p className="text-2xl p-2">
                                No existe registros...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default Records;