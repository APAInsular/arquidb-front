
const Delete = ({ userId, onClose, type }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 bg-opacity-50">
                <div className="bg-white p-5 rounded-lg shadow-2xl mx-2 w-full max-w-md border border-gray-300">
                    <div className="flex justify-end">
                        <button onClick={() => onClose(true)} className="text-gray-400 cursor-pointer hover:text-gray-900">
                            ✕
                        </button>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center items-center">
                            <div className="bg-red-700  w-min rounded-xl p-3">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-xl font-medium text-gray-700 mt-5 mb-4">
                            ¿Estás seguro de que deseas eliminar este {type}?
                        </h3>

                        {/* {error && <p className="text-red-500">{error}</p>} */}

                        <div className="flex justify-between">
                            <button
                                className="flex-1 text-red-100 bg-red-700 text-center flex justify-center items-center p-2 rounded-xl hover:bg-red-300 hover:text-red-800 cursor-pointer transition">
                                Sí, borrar
                            </button>

                            <button onClick={() => onClose(null)}
                                className="flex-1 ml-2 cursor-pointer bg-gray-200 text-gray-900 p-2 rounded-xl hover:bg-gray-500 transition hover:text-white">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Delete;