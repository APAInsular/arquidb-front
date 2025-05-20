import { useEffect, useState } from "react";
import Default from "../Default";

const Search = ({ onClose }) => {

    const [formData, setFormData] = useState({
        number: "",
        title: "",
        phase: "",
        client: "",
        collegiate: "",
        dateFrom: "",
        dateTo: "",
        page: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey], [childKey]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev, [name]: value,
            }));
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 bg-opacity-50">
                <div className="modal-appear border-10 border-gray-200/40 w-max rounded-3xl">
                    <div className="bg-white py-4 rounded-2xl shadow-2xl text-black shadow-black/40 mx-0 w-full max-w-md border-1 border-gray-200">
                        <div className="text-gray-600 w-full flex flex-row items-center justify-between pb-4 border-gray-200 border-b-2">
                            <div className="px-4 text-xl flex flex-row items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                                <p>
                                    Expedientes
                                </p>
                            </div>
                            <div className="px-4">
                                <div onClick={onClose} className="p-2 shadow shadow-gray-800/30 inset-shadow-2xs inset-shadow-gray-300/80 bg-gray-100 hover:bg-gray-100 transition-all rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 mt-4">
                            <ul className="px-2 space-y-3 mt-1">
                                <div className="text-sm font-medium text-gray-500">Expedientes</div>
                                <li className="grid grid-cols-4 justify-between items-center gap-2">
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none col-span-4 px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Titulo Expediente..."
                                        type="text"
                                    />
                                    <input
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none col-span-2 px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Numero Expediente..."
                                        type="text"
                                    />

                                    <input
                                        name="phase"
                                        value={formData.phase}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Fases..."
                                        type="text" />
                                    <input
                                        name="page"
                                        value={formData.page}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Cantidad..."
                                        type="number" />
                                </li>
                                <div className="text-sm font-medium text-gray-500">Personas</div>
                                <li className="grid grid-cols-2 justify-between items-center gap-2">
                                    <input
                                        name="client"
                                        value={formData.client}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Cliente..."
                                        type="text" />
                                    <input
                                        name="collegiate"
                                        value={formData.collegiate}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Colegiado..."
                                        type="text" />
                                </li>
                                <div className="text-sm font-medium text-gray-500">Fecha Creación</div>
                                <li className="grid grid-cols-2 justify-between items-center gap-2">
                                    <input
                                        name="dateFrom"
                                        value={formData.dateFrom}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Desde..."
                                        type="date" />
                                    <input
                                        name="dateTo"
                                        value={formData.dateTo}
                                        onChange={handleChange}
                                        className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                        placeholder="Hasta..."
                                        type="date" />
                                </li>
                                <div className="text-sm font-medium text-gray-500">Fecha de Visado</div>
                                <li className="grid grid-cols-2 justify-between items-center gap-2">
                                    <input
                                        className="bg-gray-50 border-b-2 border-gray-300 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:border-gray-400"
                                        placeholder="Desde..."
                                        type="date" />
                                    <input
                                        className="bg-gray-50 border-b-2 border-gray-300 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:border-gray-400"
                                        placeholder="Hasta..."
                                        type="date" />
                                </li>
                            </ul>
                            <div className="px-2 mt-5">
                                <button type="submit" className="text-[#ffe6ea] border-b-3 border-[#f33a5c] bg-[#a1263c] hover:bg-[#ec3859] hover:border-red-300 hover:text-red-100 cursor-pointer transition-all p-2 w-full rounded-md font-medium shadow shadow-black/40">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;