import { useState } from "react";
import Default from "../Default";
import UpdateFile from "./UpdateFile";

const DocumentSelector = ({ phase, setModalDocument }) => {
    const [file, setFile] = useState(false);

    return (
        <>
            {file && <UpdateFile onClose={() => setFile(false)} />}
            <Default className="text-center w-1/3">
                <div className="bg-white text-blue-500 p-2">
                    <div className="mb-10 text-black p-2">
                        <div className="flex justify-between border-b space-x-4">
                            <button type="button" onClick={() => setModalDocument(false)}>X</button>
                            <h3 className="text-3xl">{phase}</h3>
                        </div>
                    </div>
                    <button type="button" onClick={() => setFile(true)} className="w-full bg-gray-300 rounded-lg mb-10 text-8xl">+</button>
                    <button type="button" className="bg-blue-600 text-white rounded-full py-2 px-6 w-full">Enviar</button>
                </div>
            </Default>
        </>
    );
}

export default DocumentSelector;