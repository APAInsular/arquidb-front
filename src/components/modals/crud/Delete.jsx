import Default from "../Default";

const Delete = () => {
    return (
        <>
            <div className="absolute z-20 bg-red-950 text-white/70 py-3 rounded-md right-0 mt-2 shadow-2xl">
                <div className="absolute bg-red-950 p-2 right-4 top-[-3px] rotate-45"></div>
                <div className="bg-white text-red-500 p-14">
                    <h4 className="text-2xl">¿Está seguro/a de su elección?</h4>
                    <div className="flex justify-center space-x-10 mt-10">
                        <button type="button" className="bg-red-700 text-white py-2 px-4 rounded-lg">Eliminar</button>
                        <button type="button" className="bg-gray-200 py-2 px-4 rounded-lg">Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Delete;