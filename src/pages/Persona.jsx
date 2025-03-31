import { Link } from "react-router-dom";

const Persona = () => {
    return (
        <>
            <div className="grid grid-cols-12 gap-4 p-4 text-center h-full">
                <Link to="/colegiados" className="col-span-6 bg-gray-300 rounded-lg flex justify-center items-center">
                    <h4 className="text-5xl">Colegiados</h4>
                </Link>
                <Link to="/clientes" className="col-span-6 bg-gray-300 rounded-lg flex justify-center items-center">
                    <h4 className="text-5xl">Clientes</h4>
                </Link>
            </div>
        </>
    );
}

export default Persona;