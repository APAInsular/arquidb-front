
import { useEffect, useState } from "react";
import Default from "../Default";

const GeneralSearch = ({ title, icons, children, url, onClose, setFormData }) => {

    const inputs = Array.from({ length: children }, (_, i) => i + 1);

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
                                {icons}
                                <p>
                                    {title}
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
                            <form onChange={handleChange} action={url}>
                                <ul className="flex flex-col px-2 space-y-3 space-x-1 mt-1">
                                    <div className="text-sm font-medium text-gray-500 ">{title}</div>
                                    {inputs.map(input => (
                                        <>
                                            <input
                                                key={input}
                                                name="name"
                                                // value={formData.name}
                                                className="bg-gray-100/70 border-b-2 border-gray-400/60 rounded-md rounded-b-none px-2 py-1.5 outline-none transition-all focus:bg-rose-100/60 "
                                                onChange={handleChange}
                                                placeholder="Nombre..."
                                                type="text"
                                            />
                                        </>
                                    ))}
                                </ul>
                                <div className="px-2 mt-5">
                                    <button type="submit" className="text-[#ffe6ea] border-b-3 border-[#f33a5c] bg-[#a1263c] hover:bg-[#ec3859] hover:border-red-300 hover:text-red-100 cursor-pointer transition-all p-2 w-full rounded-md font-medium shadow shadow-black/40">Buscar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralSearch;