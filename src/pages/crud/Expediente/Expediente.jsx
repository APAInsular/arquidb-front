import { Link, useNavigate } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { useState, useEffect } from "react";
import Delete from "../../../components/modals/crud/Delete";
import TitleCard from "../../../components/ui/TitleCard";

const Expediente = () => {
    const [expedientes, setExpedientes] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { expedients } = useExpedient();
    const navigate = useNavigate();

    useEffect(() => {
        if (expedients) {
            setExpedientes(expedients);
        }
    }, [expedients]);

    const deleteActivate = (id) => {
        setModalDelete(true);
        setDeleteId(id);
    }

    return (
        <>
            {modalDelete && <Delete DatoId={deleteId} onClose={() => setModalDelete(false)} type="Expediente" url={"expedient"} />}
            <div className="flex flex-col h-full">
                <TitleCard name="Expedientes" link="/" />
                <div className="w-full flex justify-end">
                    <button className="flex flex-row px-10 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-800 font-medium bg-red-100 w-min mt-2 p-1 rounded-2xl"
                        onClick={() => navigate('/expedientes/crear')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir</p>
                    </button>
                </div>
                <div className="flex-1 overflow-y-scroll rounded-lg mt-5">
                    <div className="text-center pb-2">
                        <table className="border-1 border-[#a3273e] space-y-2 w-full mb-5">
                            <thead className=" shadow-2xl sticky top-0 bg-[#a3273e] text-gray-100 text-sm ">
                                <tr>
                                    <th className="border-e-1 p-2 border-gray-300">Título</th>
                                    <th className="border-e-1 p-2 border-gray-300">Número</th>
                                    <th className="border-e-1 p-2 border-gray-300">Emplazamiento</th>
                                    <th className="border-e-1 p-2 border-gray-300">Código postal</th>
                                    <th className="border-e-1 p-2 border-gray-300">Presupuesto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expedientes.map(expedient => {
                                    return (
                                        <tr key={expedient.id} className="hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8  mt-2 cursor-pointer transition-all shrink-0 overflow-x-scroll">
                                            <td className="py-1.5 px-4">{expedient.title}</td>
                                            <td className="py-1.5 px-4">{expedient.number}</td>
                                            <td className="py-1.5 px-4">{expedient.site}</td>
                                            <td className="py-1.5 px-4">{expedient.postal_code}</td>
                                            <td className="py-1.5 px-4">{expedient.budget}</td>
                                            <td className="py-1.5 px-4">
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Link to={`/expedientes/${expedient.id}/show`} className="flex justify-center items-center bg-sky-300 text-sky-600 hover:bg-sky-600 hover:text-orange-300 cursor-pointer font-medium py-1 text-sm rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                        </svg>
                                                    </Link>

                                                    <Link to={`/expedientes/${expedient.id}/editar`} className="flex justify-center items-center bg-orange-300 text-orange-600 hover:bg-orange-600 hover:text-orange-300 cursor-pointer font-medium py-1 text-sm rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                        </svg>
                                                    </Link>

                                                    <button type="button" onClick={() => deleteActivate(expedient.id)} className="flex justify-center items-center bg-red-300 text-red-600 hover:bg-red-600 hover:text-red-300 cursor-pointer font-medium py-1 text-sm rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expediente;