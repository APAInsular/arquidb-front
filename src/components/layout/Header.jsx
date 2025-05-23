import Avatar from "../ui/Avatar";
import BotonIcons from "../ui/BotonIcons";
import Logo from '../../assets/images/logo.png'
import { useEffect, useRef, useState } from "react";
import ProfileUser from "../modals/profile/ProfileUser";
import Notification from "../modals/profile/Notification";
import Search from "../modals/filters/Search";
import { useAuth } from "../../hooks/Auth";
import CrudManager from "../../hooks/CrudManager";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import DataSearch from "../modals/filters/DataSearch"

const Header = ({ onClicks }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchRef = useRef(null);

    const [profile, setProfile] = useState(false);
    const [modalNotis, setModalNotis] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    const [expedientes, setExpedientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useAuth({ middleware: 'auth' });

    const query = searchParams.get("search") || "";

    const { views } = CrudManager({
        url: `expedient${query ? `?title=${query}` : ""}`
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            views({ setData: setExpedientes, setLoading, setError });
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleSearchChange = (event) => {
        setModalSearch(true);
        setSearchParams(event.target.value ? { search: event.target.value } : {});
    };

    const handleClick = (cases) => {

        switch (cases) {
            case 1:
                setModalSearch(false);
                if (profile) { setProfile(false); }
                else { setProfile(true); setModalNotis(false) }
                break;
            case 2:
                setModalSearch(false);
                if (modalNotis) { setModalNotis(false); }
                else { setModalNotis(true); setProfile(false); }
                break;
            case 3:
                setModalSearch(false);
                if (modalFilter) { setModalFilter(false); }
                else { setModalFilter(true); }
                break;
        }
    }

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        if (!searchActive) {
            setSearchActive(true);
        }
        setModalSearch(false)
    };

    return (
        <>
            <header className="w-full flex items-center px-3 p-2">
                {/* Logo */}
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <img src={Logo} className=" brightness-120 rounded-md" alt="COACFUE" width={50} height={50} />
                    </div>
                    <div onClick={onClicks}
                        className="ms-6 rounded-full p-1 text-white cursor-pointer hover:bg-white/10 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M9 4l0 16" /></svg>
                    </div>
                    <div className={`mx-2 ${searchActive ? 'w-full' : 'sm:ms-10 sm:me-auto sm:w-150'}`}>
                        {/* search */}
                        <form
                            action="/"
                            ref={searchRef}
                            className={`bg-[#b83345] inset-shadow-2xs inset-shadow-white/18 relative text-white/60 px-3 py-1 ${modalSearch ? "rounded-t-4xl" : "rounded-4xl"} flex flex-row justify-center sm:justify-between items-center ${searchActive ? 'w-full' : 'w-[78px]'} h-[48px] sm:h-auto sm:w-[100%]`}
                        >
                            <div onClick={toggleSearch} className="sm:hidden cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>

                            <input
                                onFocus={() => setModalFilter(false)}
                                placeholder="Buscar en Arquidb"
                                type="search"
                                name="search"
                                value={modalFilter ? '' : query}
                                onChange={handleSearchChange}
                                className={`${searchActive ? 'flex' : 'hidden'} sm:flex outline-0 p-2 w-full text-white text-md`}
                            />

                            <div
                                onClick={() => handleClick(3)}
                                className={`${searchActive ? 'hidden' : 'flex'} sm:flex relative cursor-pointer hover:bg-red-300/20 p-2 rounded-full`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>

                                {modalFilter && (
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Search onClose={() => setModalFilter(false)} />
                                    </div>
                                )}
                            </div>

                            {modalSearch && (
                                <DataSearch datos={expedientes} query={query} />
                            )}
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
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Notification />
                                </div>
                            )}
                        </div>
                        {/* historial */}
                        <div>
                            <NavLink to={'/historial'}>
                                <BotonIcons size={48}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                    </svg>
                                    }
                                />
                            </NavLink>
                        </div>
                        {/* avatar */}
                        <div className="relative" onClick={user ? () => handleClick(1) : undefined}>
                            <Avatar name={user?.name.at(0).toUpperCase()} foto="" size={48} text={"text-white text-xl"} />
                            {user && (
                                <>
                                    {profile && (
                                        <ProfileUser user={user} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;