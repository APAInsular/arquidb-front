import Avatar from "../ui/Avatar";
import BotonIcons from "../ui/BotonIcons";
import Logo from '../../assets/images/logo.png'
import { useState } from "react";
import ProfileUser from "../modals/profile/ProfileUser";
import Notification from "../modals/profile/Notification";

const Header = () => {

    const [profile, setProfile] = useState(false);
    const [modalNotis, setNodalNotis] = useState(false);

    const handleClick = (cases) => {

        switch (cases) {
            case 1:
                if (profile) {
                    setProfile(false);
                }
                else {
                    setProfile(true);
                    setNodalNotis(false)
                }
                break;
            case 2:
                if (modalNotis) {
                    setNodalNotis(false);
                }
                else {
                    setNodalNotis(true);
                    setProfile(false);
                }
                break;
        }


    }

    return (
        <>
            <header className="w-full flex items-center px-3 p-2">
                {/* Logo */}
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <img src={Logo} className=" brightness-120 rounded-md" alt="COACFUE" width={50} height={50} />
                    </div>
                    <div className=" mx-2 ms-auto sm:ms-10 sm:me-auto sm:w-150 ">
                        <form className="bg-[#cb415a] text-white/60 px-2 py-1 rounded-4xl flex flex-row justify-center sm:justify-between items-center w-[48px] h-[48px] sm:h-auto sm:w-[100%]" action="">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input placeholder="Buscar en Arquidb" type="search" className="hidden sm:flex outline-0 p-2 w-full text-white text-md" />
                            <div className="hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-white/80">
                        {/* notificaciones */}
                        <div className=" relative" onClick={() => handleClick(2)}>
                            <BotonIcons size={48}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                                </svg>
                                }
                                notis={1}
                            />
                            {modalNotis && (
                                <Notification />
                            )}
                        </div>
                        {/* historial */}
                        <div>
                            <BotonIcons size={48}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                </svg>
                                }
                            />
                        </div>
                        {/* avatar */}
                        <div className="relative" onClick={() => handleClick(1)}>
                            <Avatar name="H" foto="" size={48} />
                            {profile && (
                                <ProfileUser />
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;