import { useState, useEffect } from "react";
import Default from "../Default";
import UpdateFile from "./UpdateFile";

const DocumentSelector = ({ phase, setModalDocument, expedientDocuments, setExpedientDocuments }) => {
    const [file, setFile] = useState(false);
    const [phaseDocuments, setPhaseDocuments] = useState([]);

    // useEffect(() => {
    //     // Falta filtrar en EditarExpediente
    //     const documentFilter = expedientDocuments.filter(document => document.phase === phase);
    //     if (documentFilter.length > 0) setPhaseDocuments([...phaseDocuments, ...documentFilter]);
    // }, [expedientDocuments]);

    const handleClick = () => {
        setExpedientDocuments([...expedientDocuments, ...phaseDocuments]);
        setModalDocument(false);
    }

    console.log(phaseDocuments);

    return (
        <>
            {file && <UpdateFile onClose={() => setFile(false)} phase={phase} phaseDocuments={phaseDocuments} setPhaseDocuments={setPhaseDocuments} />}
            <Default className="text-center w-1/3">
                <div className="bg-white text-blue-500 p-2">
                    <div className="mb-10 text-black p-2">
                        <div className="flex justify-between border-b space-x-4">
                            <button type="button" onClick={() => setModalDocument(false)}>X</button>
                            <h3 className="text-3xl">{phase}</h3>
                        </div>
                    </div>
                    <button type="button" onClick={() => setFile(true)} className="w-full bg-gray-300 rounded-lg mb-10 text-8xl">+</button>
                    {phaseDocuments.map((document, index) => {
                        return (
                            <div key={index} className="bg-blue-400 text-white rounded-full p-2 my-5">
                                <p>{document.name}</p>
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => handleClick()} className="bg-blue-600 text-white rounded-full py-2 px-6 w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">Enviar</button>
                </div>
            </Default>
        </>
    );
}

export default DocumentSelector;