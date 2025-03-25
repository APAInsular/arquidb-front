import Avatar from "../ui/Avatar";
import BotonIcons from "../ui/BotonIcons";

const Header = () => {
    return (
        <>
            <header class="w-full bg-[#932236] flex items-center px-5 p-2">
                {/* Logo */}
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <img src="https://coacfue.es/wp-content/uploads/2024/04/logo_COACFUE.png" className=" brightness-700" alt="COACFUE" width={150} height={150} />
                    </div>
                    <div className=" mx-2 ms-auto sm:ms-10 sm:me-auto sm:w-150 ">
                        <form className="bg-[#cb415a] text-white/60 px-2 py-1 rounded-4xl flex flex-row justify-center sm:justify-between items-center w-[48px] h-[48px] sm:h-auto sm:w-[100%]" action="">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input placeholder="Buscar en Arquidb" type="search" className="hidden sm:flex outline-0 p-2 w-full text-white text-md" />
                            <div className="hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-white">
                        <div>
                            <BotonIcons size={48} color={"red"}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>}
                                notis={1}
                            />
                        </div>
                        <div>
                            <BotonIcons size={48} color={"red"}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                </svg>}
                            />
                        </div>
                        {/* avatar */}
                        <div>
                            <Avatar name="H" foto="" size={48} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;