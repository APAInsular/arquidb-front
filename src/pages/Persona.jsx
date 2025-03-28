import { Link } from "react-router-dom";

const Persona = () => {
    return (
        <>
            <div className="text-center">
                <Link to="/colegiados" className="bg-gray-300 py-1 px-6 rounded-lg">Colegiados</Link>
                <Link to="/clientes" className="bg-gray-300 py-1 px-6 rounded-lg">Clientes</Link>
            </div>
        </>
    );
}

export default Persona;