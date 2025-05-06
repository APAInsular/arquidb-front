import { useEffect, useState } from "react";
import Default from "../Default";

const Search = () => {

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
            <Default className="w-150 top-10 right-[-4px]">
                <div>
                    <ul className="px-2 space-y-3 mt-1">
                        <div className=" text-xs">Expedientes</div>
                        <li className="grid grid-cols-4 justify-between items-center gap-2">
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg col-span-4 px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Titulo Expediente..."
                                type="text"
                            />
                            <input
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg col-span-2 px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Numero Expediente..."
                                type="text"
                            />

                            <input
                                name="phase"
                                value={formData.phase}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Fases..."
                                type="text" />
                            <input
                                name="page"
                                value={formData.page}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Cantidad..."
                                type="number" />
                        </li>
                        <div className=" text-xs">Personas</div>
                        <li className="grid grid-cols-2 justify-between items-center gap-2">
                            <input
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Cliente..."
                                type="text" />
                            <input
                                name="collegiate"
                                value={formData.collegiate}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Colegiado..."
                                type="text" />
                        </li>
                        <div className=" text-xs">Fecha Creación</div>
                        <li className="grid grid-cols-2 justify-between items-center gap-2">
                            <input
                                name="dateFrom"
                                value={formData.dateFrom}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600"
                                placeholder="Desde..."
                                type="date" />
                            <input
                                name="dateTo"
                                value={formData.dateTo}
                                onChange={handleChange}
                                className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600" placeholder="Desde..."
                                type="date" />
                        </li>
                        <div className="text-xs">Fecha de Visado</div>
                        <li className="grid grid-cols-2 justify-between items-center gap-2">
                            <input className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600" placeholder="Desde..." type="date" />
                            <input className="bg-white/20 border-b-1 rounded-t-lg px-2 py-1.5 outline-none transition-all focus:border-red-600" placeholder="Desde..." type="date" />
                        </li>
                    </ul>
                    <div className="px-2 mt-5">
                        <button type="submit" className="bg-red-900 text-red-300 cursor-pointer hover:bg-red-800 p-2 w-full rounded-full font-medium">Buscar</button>
                    </div>
                </div>
            </Default >
        </>
    )
}

export default Search;