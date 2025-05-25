import { useState } from "react";
import { useDocument } from "../../../store/contexts/DocumentContext";
import { useNavigate } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import axios from "../../../lib/axios";
import { AlertOctagonIcon } from "lucide-react";
import { UseLoader } from "../../../store/contexts/LoaderContext";

const Delete = ({ DatoId, onClose, type, url }) => {
    const name = type.toLowerCase() + "s";
    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { deletes } = CrudManager({ url: `${url}`, showLoader, hideLoader, showError, hideError });
      const { documents } = useDocument();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const idsToDelete = Array.isArray(DatoId) ? DatoId : [DatoId];
    const isMultiple = idsToDelete.length > 1;

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await Promise.all(
                idsToDelete.map(id => {
                    if (url == "document") {
                        const path = documents.find(document => document.id == id).name
                        axios.post('api/erase', { path });
                    }
                    deletes({ setErrors: setError, setStatus: setLoading, ElementId: id });
                }
                )
            );
        } catch (err) {
            console.error("Error al eliminar:", err);
        } finally {
            setTimeout(() => {
                onClose();
                navigate(0);
            }, 500);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 bg-opacity-50">
            <div className=" modal-appear border-8 border-gray-200/40 w-max rounded-3xl">
                <div className="bg-white p-5 rounded-xl shadow-2xl mx-0 w-full max-w-md border border-gray-300">
                    <div className="flex justify-end">
                        <button onClick={() => onClose(true)} className="text-gray-400 cursor-pointer hover:text-gray-900">✕</button>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center items-center">
                            <div className="bg-red-700 text-white w-min rounded-md p-3">
                                <AlertOctagonIcon className="w-10 h-10" />
                            </div>
                        </div>

                        <h3 className="text-lg font-medium text-gray-700 mt-5 mb-4">
                            ¿Estás seguro de que deseas eliminar {isMultiple ? `estos ${idsToDelete.length} ${name}` : `este ${type}`}?
                        </h3>

                        {error && <p className="text-red-500 mb-2">{error}</p>}

                        <div className="flex justify-between">
                            <button onClick={handleDelete} disabled={loading}
                                className="flex-1 text-red-100 bg-red-700 text-center flex justify-center items-center p-2 rounded-md hover:bg-red-300 hover:text-red-800 cursor-pointer transition">
                                {loading ? (
                                    <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : isMultiple ? `Sí, borrar ${idsToDelete.length}` : "Sí, borrar"}
                            </button>

                            <button onClick={() => onClose(null)}
                                className="flex-1 ml-2 cursor-pointer bg-gray-200 text-gray-900 p-2 rounded-md hover:bg-gray-300 transition hover:text-white">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delete;
