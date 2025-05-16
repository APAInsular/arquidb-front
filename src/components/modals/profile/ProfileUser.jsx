import { Link } from "react-router-dom";
import Default from "../Default";
import { useAuth } from "../../../hooks/Auth";
import { useState } from "react";

const ProfileUser = ({ user }) => {

    const { logout } = useAuth()

    const [modal, setModal] = useState(false);

    const handleTheme = (value) => {

        let theme = document.querySelector('.layout')

        switch (value) {
            case 1:
                theme.classList.add('themeOne')
                theme.classList.remove('themeTwo')
                break;
            case 2:
                theme.classList.add('themeTwo')
                theme.classList.remove('themeOne')
                break;
        }
    }

    return (
        <>

            <Default className="w-50">
                <div className="text-center text-md overflow-hidden text-ellipsis w-full text-white">
                    {user?.email}
                </div>
                <div className="flex items-center my-2 px-2">
                    <div className="flex-1 border-t border-gray-300/30"></div>
                    <div className="flex-1 border-t border-gray-300/30"></div>
                </div>
                <ul className="">
                    <li className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all"><Link to={"/profile"}><p>Perfil</p></Link></li>
                    <li className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">Configuración</li>
                    <li
                        onMouseEnter={() => setModal(true)}
                        className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">
                        Temas
                    </li>
                    {modal &&
                        <>
                            <div onMouseLeave={() => setModal(false)} className={`w-50 absolute z-20 modal-appear bg-red-950 border-2 border-red-900 text-white/80 left-[-180px] py-3 rounded-md mt-2 `}>
                                <ul>
                                    <li onClick={() => handleTheme(1)} className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">Sion</li>
                                    <li onClick={() => handleTheme(2)} className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">neon</li>
                                </ul>
                            </div>
                        </>
                    }
                    <div className="flex items-center my-2 px-2">
                        <div className="flex-1 border-t border-gray-300/30"></div>
                        <div className="flex-1 border-t border-gray-300/30"></div>
                    </div>
                    <li onClick={logout} className="ps-3 py-1.5 hover:bg-amber-200/20 hover:underline hover:text-white cursor-pointer transition-all">Cerrar sesión</li>
                </ul>

            </Default>
        </>
    )
}

export default ProfileUser;