import { Link } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContenxt";
import { useState, useEffect } from "react";

const Expediente = () => {
    const [expedientes, setExpedientes] = useState([]);
    const { expedients } = useExpedient();
    console.log(expedientes);
    useEffect(() => {
        if (expedients) {
            setExpedientes(expedients);
        }
    }, [expedients]);

    return (
        <>
            <div>
                <Link to="/" className="text-5xl">←</Link>
                <div className="flex justify-center gap-x-10 mt-10 mb-5">
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Persona</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Fecha</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Fase</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Otros</button>
                </div>
                <div className="text-center">
                    <table className="table-fixed w-full mb-5">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>Título</th>
                                <th>Número</th>
                                <th>Emplazamiento</th>
                                <th>Código postal</th>
                                <th>Presupuesto</th>
                                <th colSpan={3}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expedientes.map(expediente => {
                                return (
                                    <tr key={expediente.id}>
                                        <td>{expediente.title}</td>
                                        <td>{expediente.number}</td>
                                        <td>{expediente.site}</td>
                                        <td>{expediente.postal_code}</td>
                                        <td>{expediente.budget}</td>
                                        <td>
                                            <Link to={`/expedientes/${expediente.id}`} className="bg-red-700 text-white py-1 px-6 rounded-lg">Ver</Link>
                                        </td>
                                        <td>
                                            <button type="button" className="bg-red-700 text-white py-1 px-6 rounded-lg">Editar</button>
                                        </td>
                                        <td>
                                            <button type="button" className="bg-red-700 text-white py-1 px-6 rounded-lg">Borrar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Link to="/expedientes/crear" className="text-center flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 bg-red-700 text-white rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Expediente;