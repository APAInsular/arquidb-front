import { useState } from "react";
import axios from "../../../lib/axios";

const UpdateFile = ({ onClose, phase, phaseDocuments, setPhaseDocuments }) => {
    const [activeButton, setActiveButton] = useState(1); // Establecer un valor inicial

    const buttons = [
        { id: 1, label: 'Archivos recientes' },
        { id: 2, label: 'Subir un archivo' },
        { id: 3, label: 'Google Drive' },
    ];

    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) => {
        console.log(Array.from(e.target.files));
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files || files.length === 0) {
            setError('Por favor selecciona un archivo');
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);
        try {
            const newDocuments = files.map(file => {
                const formData = new FormData();
                formData.append('file', file);

                const newDocument = {
                    file: formData,
                    name: file.name,
                    phase: phase
                };

                if (!phaseDocuments.some(document => document.name == newDocument.name)) {
                    return newDocument;
                }
            });

            setPhaseDocuments([...phaseDocuments, ...newDocuments]);
            setSuccess(true);
            // setFileUrl(response.data.url);
        } catch (err) {
            //setError(err.response?.data?.message || 'Error al subir el archivo');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 bg-opacity-50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-red-700 text-white p-6 rounded-lg shadow-2xl w-full max-w-5xl border border-gray-300">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sección izquierda */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold">Selector de archivos</h3>
                            <button
                                onClick={() => onClose(true)}
                                className="text-white hover:text-gray-200 text-xl"
                                aria-label="Cerrar modal"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {buttons.map((button) => (
                                <button
                                    key={button.id}
                                    type="button"
                                    onClick={() => setActiveButton(button.id)}
                                    className={`px-4 py-3 rounded-lg transition-colors duration-200
                                        ${activeButton === button.id
                                            ? 'bg-white text-red-700 font-bold'
                                            : 'text-white hover:bg-red-600'
                                        }`}
                                    aria-current={activeButton === button.id ? "true" : "false"}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sección derecha */}
                    <form onSubmit={handleSubmit} className="flex-1 m-0 p-0">
                        <div className="bg-white p-4 rounded-lg text-red-700">
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    disabled={uploading}
                                    multiple
                                    className="bg-red-700 text-white px-4 py-3 rounded-lg hover:bg-red-800 transition-colors"
                                />

                                <div className="border-2 border-dashed border-red-700 rounded-lg p-4 text-center">
                                    <p>Arrastrar y soltar archivos aquí</p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={uploading || !files || success}
                                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 flex-1"
                                    >
                                        {uploading ? 'Subiendo...' : 'Subir Archivo'}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 flex-1"
                                        onClick={() => onClose(true)}
                                    >
                                        Cancelar
                                    </button>
                                </div>


                                {error && <div className="error-message">{error}</div>}
                                {success && (
                                    <div className="success-message">
                                        <p>¡Archivo subido exitosamente!</p>
                                        {/* {fileUrl && (
                                            <p>
                                                URL del archivo:
                                                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                    {fileUrl}
                                                </a>
                                            </p>
                                        )} */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateFile;