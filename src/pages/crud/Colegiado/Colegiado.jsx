import { Link } from "react-router-dom";

const Colegiado = () => {
    return (
        <>
            <div>
                <Link to="/personas" className="text-5xl">←</Link>
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
                                <th colSpan={2}>Identificación</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Titulación</th>
                                <th>Colegio</th>
                                <th colSpan={3}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DNI</td>
                                <td>12345678A</td>
                                <td>Pedro</td>
                                <td>Pablo Santo</td>
                                <td>Arquitecto Técnico</td>
                                <td>COAF</td>
                                <td>
                                    <Link to="/colegiados/1" className="bg-red-700 text-white py-1 px-6 rounded-lg">Ver</Link>
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
                    <Link to="/colegiados/crear" className="text-center flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 bg-red-700 text-white rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Colegiado;