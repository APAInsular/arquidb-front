import { useState } from "react";
import { useAuth } from "../../../hooks/Auth";

const DeleteUser = ({ onClose }) => {

    const { deleteUser: del } = useAuth({ middleware: 'auth' });
    const [status, setStatu] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('')

    const submitForm = event => {
        event.preventDefault()
        del({
            password,
            setErrors: setError,
            setStatus: setStatu,
        })
    }
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 bg-opacity-50">
            <div className="bg-white modal-appear p-4 rounded-lg shadow-2xl mx-2 w-full max-w-md border border-gray-300">
                <div className="flex justify-end">
                    <button onClick={() => onClose(true)} className="text-gray-400 cursor-pointer hover:text-gray-900">✕</button>
                </div>

                <div className="">
                    <div className="flex flex-row space-x-1.5">
                        <div className="flex justify-center items-center">
                            <div className="bg-red-700 w-min rounded-full p-2">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-md font-medium text-gray-700 mt-5 mb-4 border-s-2 border-gray-400 ps-2 rounded-md">
                            Para eliminar un usuario, debes introducir la contraseña.
                        </h3>
                    </div>

                    <form onSubmit={submitForm}>

                        <input
                            id="contra"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Contraseña..."
                            className="p-2 w-full my-2 border-s-4 bg-gray-100 focus:bg-white border-gray-600 rounded-md shadow shadow-gray-400 focus:border-red-500 focus:outline-red-200" />

                        {error && <p className="text-red-500 mb-2">{error}</p>}

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
    );
};

export default DeleteUser;