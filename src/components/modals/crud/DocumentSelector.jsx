import Default from "../Default";

const DocumentSelector = ({ phase, setModalDocument }) => {
    return (
        <Default className="text-center">
            <div className="bg-white text-blue-500">
                <div className="mb-10 text-black p-2">
                    <div className="flex justify-between border-b space-x-4">
                        <button type="button" onClick={() => setModalDocument(false)}>X</button>
                        <h3 className="text-3xl">300</h3>
                    </div>
                </div>
                <div className="w-52">
                    <button type="button">+</button>
                </div>
            </div>
        </Default>
    );
}

export default DocumentSelector;