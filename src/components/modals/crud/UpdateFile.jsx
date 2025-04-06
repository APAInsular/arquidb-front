import { useState } from "react";

const UpdateFile = ({ onClose }) => {
    const [activeButton, setActiveButton] = useState(1); // Establecer un valor inicial

    const buttons = [
        { id: 1, label: 'Archivos recientes' },
        { id: 2, label: 'Subir un archivo' },
        { id: 3, label: 'Google Drive' },
    ];

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
                    <div className="flex-1 bg-white p-4 rounded-lg text-red-700">
                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                className="bg-red-700 text-white px-4 py-3 rounded-lg hover:bg-red-800 transition-colors"
                            >
                                Seleccionar archivo
                            </button>

                            <div className="border-2 border-dashed border-red-700 rounded-lg p-4 text-center">
                                <p>Arrastrar y soltar archivos aquí</p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    type="button"
                                    className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 flex-1"
                                >
                                    Subir archivo
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 flex-1"
                                    onClick={() => onClose(true)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateFile;