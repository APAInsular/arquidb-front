import Avatar from "../ui/Avatar";

const Header = () => {
    return (
        <>
            <header class="w-full bg-[#932236] flex-shrink-0 flex items-center px-5 p-2">
                {/* Logo */}
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <img src="https://coacfue.es/wp-content/uploads/2024/04/logo_COACFUE.png" className="invert" alt="COACFUE" width={150} height={150} />
                    </div>
                    <div className="ms-10 me-auto">
                        <form className="bg-white text-gray-500 px-2 py-1 rounded-4xl flex flex-row justify-between items-center w-150" action="">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input type="search" className=" outline-0 p-2 w-full text-black text-lg" />
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        {/* avatar */}
                        <div>
                            <Avatar name="H" size="48" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;