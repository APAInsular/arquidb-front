import { useEffect, useState } from "react";
import CrudManager from "../hooks/CrudManager";
import TitleCard from "../components/ui/TitleCard";
import PulseLoader from "../routes/loaders/PulseLoader";
import WebError from "../routes/errors/WebError";

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

    if (loading) { return <PulseLoader /> };
    if (error) { return <WebError /> };

    return (
        <>
            <TitleCard name="Historial" enlace="/" />
            <div className="flex flex-col h-full mt-2">
                <div className="flex-1 overflow-y-scroll rounded-none">
                    {records.length >= 1 ? (
                        <div className="text-center pb-2">
                            <table className=" space-y-2 w-full mb-5">
                                <thead >
                                    <tr className="shadow-2xl sticky top-0 bg-[#a3273e] text-gray-100 text-sm font-mono uppercase text-nowrap">
                                        <th className="p-2">#</th>
                                        <th className="p-2">Usuario</th>
                                        <th className="p-2">Acción</th>
                                        <th className="p-2">Tabla</th>
                                        <th className="p-2">Nº Registro</th>
                                        <th className="p-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map(datos => {
                                        const accionesTraducidas = {
                                            'sign': 'Firmar',
                                            'update': 'Actualizar',
                                            'delete': 'Eliminar',
                                            'create': 'Crear'
                                        };
                                        const tablasTraducidas = {
                                            'Client': 'Cliente',
                                            'collegiates': 'Colegiado',
                                            'users': 'Usuario',
                                            'expedient': 'Expediente'
                                        };
                                        return (
                                            <tr key={datos.id} className="hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8  mt-2 cursor-pointer transition-all shrink-0 overflow-x-scroll text-start text-nowrap">
                                                <td className="py-1.5 px-4 text-center">{datos.id}</td>
                                                <td className="py-1.5 px-4">{datos.name}</td>
                                                <td className="py-1.5 px-4">{accionesTraducidas[datos.action] || datos.action}</td>
                                                <td className="py-1.5 px-4">{tablasTraducidas[datos.affected_table] || datos.affected_table}</td>
                                                <td className="py-1.5 px-4 text-center">{datos.affected_record_id}</td>
                                                <td className="py-1.5 px-4 text-center">{datos.created_at.slice(0, 10)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <p className="text-2xl p-2">
                                No hay registros...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default Records;