import { useState, useEffect } from "react";
import Default from "../Default";
import UpdateFile from "./UpdateFile";
import { usePhase } from "../../../store/contexts/PhaseContext";

const DocumentSelector = ({ phase, setModalDocument, expedientDocuments, setExpedientDocuments }) => {
    const [showUpdateFile, setShowUpdateFile] = useState(false);
    const [phaseDocuments, setPhaseDocuments] = useState([]);
    const { phases } = usePhase();

    useEffect(() => {
        // Falta filtrar en EditarExpediente
        const documentFilter = expedientDocuments.filter(document => {
            if (document.phase_id) {
                const phaseCode = phases.find(phase => phase.id === document.phase_id).phase;
                return phaseCode === phase;
            } else return document.phase === phase;
        });
        if (documentFilter.length > 0) setPhaseDocuments([...documentFilter]);
    }, [expedientDocuments]);

    const handleClick = () => {
        const newDocuments = phaseDocuments.filter(document => !expedientDocuments.includes(document));
        setExpedientDocuments([...expedientDocuments, ...newDocuments]);
        setModalDocument(false);
    }

    return (
        <>
            {showUpdateFile && (
                <UpdateFile
                    onClose={() => setShowUpdateFile(false)}
                    phase={phase}
                    phaseDocuments={phaseDocuments}
                    setPhaseDocuments={setPhaseDocuments}
                />
            )}
            <Default className="text-center w-1/3">
                <div className="bg-white text-blue-500 p-2 flex flex-col h-full">
                    <div className="mb-4 text-black p-2">
                        <div className="flex justify-between border-b space-x-4">
                            <button type="button" onClick={() => setModalDocument(false)}>X</button>
                            <h3 className="text-3xl">{phase}</h3>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowUpdateFile(true)}
                        className="w-full bg-gray-300 rounded-lg mb-4 text-8xl"
                    >
                        +
                    </button>

                    {/* Contenedor con scroll */}
                    <div className="flex-1 overflow-y-auto mb-4 px-2">
                        {phaseDocuments.map((document, index) => (
                            <div
                                key={document.id || index}
                                className="bg-blue-400 text-white rounded-full p-2 my-2"
                            >
                                <p>{document.name}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => handleClick()}
                        className="bg-blue-600 text-white rounded-full py-2 px-6 w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                    >
                        Enviar
                    </button>
                </div>
            </Default>
        </>
    );
}

export default DocumentSelector;