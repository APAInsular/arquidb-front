
const UpdateFile = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 bg-opacity-50">
            <div className="bg-red-700 text-white p-5 rounded-lg shadow-2xl mx-2 w-full max-w-xl border border-gray-300">
                <div className="flex justify-between">
                    <h3 className="text-3xl">Selector de archivos</h3>
                    <button onClick={() => onClose(true)} className="cursor-pointer hover:text-gray-900">
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateFile;