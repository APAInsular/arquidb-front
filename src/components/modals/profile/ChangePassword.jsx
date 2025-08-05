import { useState } from "react";
import { useAuth } from "../../../hooks/Auth";
import { AlertTriangle } from "lucide-react";

const ChangePassword = ({ onClose }) => {

    const { changePassword } = useAuth({ middleware: "auth" });

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const [formData, setFormData] = useState({
        passwordBefore: '',
        password: '',
        password_confirmation: '',
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


    const submitForm = event => {
        event.preventDefault()
        changePassword({ setErrors, setStatus, data: formData })
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 bg-opacity-50">
                <div className=" modal-appear border-10 border-gray-200/20 w-max rounded-3xl">
                    <div className="bg-white p-4 rounded-xl shadow-2xl mx-0 w-full max-w-md border border-gray-300">
                        <div className="flex justify-end">
                            <button onClick={() => onClose(true)} className="text-gray-400 cursor-pointer hover:text-gray-900">✕</button>
                        </div>

                        <div className="flex flex-row space-x-1.5">
                            <div className="flex justify-center items-center">
                                <div className="bg-red-700 w-min rounded-full p-2">
                                    <AlertTriangle className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <h3 className="text-md font-medium text-gray-700 mt-5 mb-4 border-s-2 border-gray-400 ps-2 rounded-md">
                                Para cambiar la contraseña, ingresa la contraseña actual y la nueva contraseña.
                            </h3>
                        </div>
                        <form onSubmit={submitForm}>

                            <input
                                id="contraB"
                                name="passwordBefore"
                                value={formData.passwordBefore}
                                onChange={handleChange}
                                type="password"
                                placeholder="Contraseña anterior..."
                                className={`${errors?.[1]?.passwordBefore ? "border-red-500 outline-red-200 bg-red-100" : "border-gray-600 bg-gray-100"} p-2 w-full my-2 border-s-4 focus:bg-white  rounded-md shadow shadow-gray-400 focus:border-red-500 focus:outline-red-200`} />

                            {errors?.[1]?.passwordBefore && <p className="text-red-500 mb-2">{errors?.[1].passwordBefore}</p>}

                            <input
                                id="contra"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Contraseña nueva..."
                                className={`${errors?.[1]?.password ? "border-red-500 outline-red-200 bg-red-100" : "border-gray-600 bg-gray-100"} p-2 w-full my-2 border-s-4 focus:bg-white  rounded-md shadow shadow-gray-400 focus:border-red-500 focus:outline-red-200`} />

                            {errors?.[1]?.password && <p className="text-red-500 mb-2">{errors?.[1].password}</p>}

                            <input
                                id="contraC"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                type="password"
                                placeholder="Contraseña nueva (confirmar)..."
                                className={`${errors?.[1]?.password_confirmation ? "border-red-500 outline-red-200 bg-red-100" : "border-gray-600 bg-gray-100"} p-2 w-full my-2 border-s-4 focus:bg-white  rounded-md shadow shadow-gray-400 focus:border-red-500 focus:outline-red-200`} />

                            {errors?.[1]?.password_confirmation && <p className="text-red-500 mb-2">{errors?.[1].password_confirmation}</p>}

                            <div className="flex justify-end items-center">
                                <button
                                    type="submit"
                                    className="px-10 mt-2 font-medium text-red-100 bg-red-700 text-center flex justify-center items-center p-2 rounded-md hover:bg-red-300 hover:text-red-800 cursor-pointer transition">
                                    {status ?
                                        <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        : "Enviar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;