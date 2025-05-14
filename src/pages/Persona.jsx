import { Link } from "react-router-dom";

const Persona = () => {
    return (
        <>
            <div className=" flex flex-row space-x-4 pb-3 text-center text-white h-full">
                <Link to="/colegiados" className="w-[50%] brightness-75 hover:w-[70%] hover:brightness-100 transition-all bg-red-100 rounded-lg flex justify-center items-center">
                    <h4 className="text-5xl">Colegiados</h4>
                </Link>
                <Link to="/clientes" className="w-[50%] brightness-75 hover:w-[70%] hover:brightness-100 transition-all bg-gray-300 rounded-lg flex justify-center items-center">
                    <h4 className="text-5xl">Clientes</h4>
                </Link>
            </div>
        </>
    );
}

export default Persona;