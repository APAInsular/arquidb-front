import { useExpedient } from "../store/contexts/ExpedientContenxt";

const Dashboard = () => {

    // const { expedients } = useExpedient();

    return (
        <>
            <div>
                {/* {expedients.map(datos => (
                    <div key={datos.id}>
                        <h2>{datos.title}</h2>
                    </div>
                ))} */}

                <div className="flex justify-center gap-x-10 mt-10 mb-5">
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Persona</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Fecha</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Fase</button>
                    <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-full">Otros</button>
                </div>
                <div className="flex justify-center">
                    <form className="my-2 w-1/2 p-2 border border-gray-500 rounded-full flex flex-row justify-center sm:justify-between items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="search" className="hidden sm:flex outline-0 p-2 w-full text-md" placeholder="Buscar en Arquidb" />
                        <div className="hidden md:flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                        </div>
                    </form>
                </div>
                <div className="text-center">
                    <table className="table-fixed w-full mb-5">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>Expediente</th>
                                <th>Clientes</th>
                                <th>Colegiados</th>
                                <th>Título Proyecto</th>
                                <th>Emplazamiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>71-09382</td>
                                <td>Pedro Pablo Santo</td>
                                <td>Sasin Boulour</td>
                                <td>Vivienda Familiar</td>
                                <td>Leon y Castillo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard;