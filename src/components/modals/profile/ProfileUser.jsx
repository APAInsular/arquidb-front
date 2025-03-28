import { Link } from "react-router-dom";
import Default from "../Default";

const ProfileUser = () => {
    return (
        <>

            <Default className="w-45">
                <div className="text-center text-md text-white">
                    hector@gmail.com
                </div>
                <div className="flex items-center my-2 px-2">
                    <div className="flex-1 border-t border-gray-300/30"></div>
                    <div className="flex-1 border-t border-gray-300/30"></div>
                </div>
                <ul className="">
                    <li className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all"><Link className="">Perfil</Link></li>
                    <li className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">Configuración</li>
                    <div className="flex items-center my-2 px-2">
                        <div className="flex-1 border-t border-gray-300/30"></div>
                        <div className="flex-1 border-t border-gray-300/30"></div>
                    </div>
                    <li className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">Cerrar sesión</li>
                </ul>
            </Default>
        </>
    )
}

export default ProfileUser;