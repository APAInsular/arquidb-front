import { Link } from "react-router-dom";

const Expediente = () => {
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
                            <tr>
                                <td>Apartamento 83</td>
                                <td>71-09382</td>
                                <td>Leon y Castillo</td>
                                <td>35600</td>
                                <td>300,50</td>
                                <td>
                                    <Link to="/expedientes/1" className="bg-red-700 text-white py-1 px-6 rounded-lg">Ver</Link>
                                </td>
                                <td>
                                    <button type="button" className="bg-red-700 text-white py-1 px-6 rounded-lg">Editar</button>
                                </td>
                                <td>
                                    <button type="button" className="bg-red-700 text-white py-1 px-6 rounded-lg">Borrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/expedientes/crear" className="bg-red-700 text-white rounded-full text-5xl">+</Link>
                </div>
            </div>
        </>
    )
}

export default Expediente;