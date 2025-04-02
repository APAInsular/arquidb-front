import Default from "../Default";

const PhaseSelector = ({ phases, setModalPhase }) => {
    let types = [
        { id: 1, phase: "000" }, { id: 2, phase: "100" }, { id: 3, phase: "200" },
        { id: 4, phase: "300" }, { id: 5, phase: "310" }, { id: 6, phase: "400" },
        { id: 7, phase: "450" }, { id: 8, phase: "500" }, { id: 9, phase: "550" },
        { id: 10, phase: "600" }, { id: 11, phase: "620" }, { id: 12, phase: "640" },
        { id: 13, phase: "700" }, { id: 14, phase: "780" }, { id: 15, phase: "800" },
        { id: 16, phase: "850" }, { id: 17, phase: "900" }, { id: 18, phase: "911" },
        { id: 19, phase: "920" }, { id: 20, phase: "930" }, { id: 21, phase: "940" },
        { id: 22, phase: "950" }, { id: 23, phase: "960" }, { id: 24, phase: "970" },
        { id: 25, phase: "980" }
    ];

    return (
        <Default className="text-center">
            <div className="bg-white text-red-500">
                <div className="mb-10 text-black">
                    <h3 className="text-3xl border-b">Fases</h3>
                    <div className="flex justify-center">
                        <div className="w-2/3 overflow-y-auto">
                            {/* {phases.reduce((uniquePhases, phase) => {
                                // Filtra fases únicas
                                if (!uniquePhases.some(item => item.phase === phase.phase)) {
                                    return [...uniquePhases, phase];
                                }
                                return uniquePhases;
                            }, []).sort((a, b) => a.phase - b.phase).map(phaseType => {
                                return (
                                    <div className="flex justify-between items-end border-b pt-3 px-4" key={phaseType.id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <p className="text-lg">{phaseType.phase}</p>
                                    </div>
                                );
                            })} */}
                            {types.map(phaseType => {
                                return (
                                    <div className="flex justify-between items-end border-b pt-3 px-4" key={phaseType.id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <p className="text-lg">{phaseType.phase}</p>
                                    </div>
                                );
                            })}
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