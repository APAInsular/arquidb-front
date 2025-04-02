import Default from "../Default";

const PhaseSelector = ({ setModalPhase }) => {
    return (
        <Default className="text-center">
            <div className="bg-white text-red-500">
                <div className="mb-10 text-black">
                    <h3 className="text-3xl border-b">Fases</h3>
                    <div className="flex justify-center"> {/* Contenedor principal centrado */}
                        <div className="w-2/3 overflow-y-auto"> {/* Ancho controlado pero responsive */}
                            <div className="flex justify-between items-end border-b pt-3 px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                                <p className="text-lg">100</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <h4 className="text-2xl">¿Está seguro/a de su elección?</h4>
                    <div className="flex justify-center space-x-10 mt-5 p-2">
                        <button type="button" className="bg-red-700 text-white py-2 px-4 rounded-lg">Crear</button>
                        <button type="button" className="bg-gray-200 py-2 px-4 rounded-lg" onClick={() => setModalPhase(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </Default>
    );
}

export default PhaseSelector;