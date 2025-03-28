import Default from "../Default";

const Notification = () => {
    return (
        <>
            <Default className="">
                <div>
                    <div className="px-3 text-2xl flex flex-row items-center space-x-50">
                        <p>Notificaciones</p>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>

                        </span>
                    </div>
                    <div className="flex items-center my-2 px-2">
                        <div className="flex-1 border-t border-gray-300/30"></div>
                        <div className="flex-1 border-t border-gray-300/30"></div>
                    </div>
                    <div className="justify-center space-x-3 grid grid-cols-2 px-3 mb-2">
                        <button className="p-2 border-2 border-transparent bg-white/20 text-red-300 font-medium rounded-4xl hover:bg-white/10 hover:text-red-200 ">Leido</button>
                        <button className="p-2 text-red-100/50 rounded-4xl hover:bg-white/10 hover:text-red-200 hover:border-transparent">No leido</button>
                    </div>
                    <div className="">
                        <div className="hover:bg-amber-200/10 cursor-pointer space-y-2 px-3 grid grid-cols-6 gap-2 justify-between items-center">
                            <div className="text-nowrap text-ellipsis overflow-hidden">Alejandro Valdivia</div>
                            <div className=" max-h-20 col-span-4 overflow-hidden break-words">
                                <p className="line-clamp-3">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum obcaecati ducimus laborum minus tempore possimus officia!
                                </p>
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="bg-red-500 p-2 w-min rounded-full"></div>
                            </div>
                        </div>
                        <div className="hover:bg-amber-200/10 cursor-pointer px-3 grid grid-cols-6 gap-2 justify-between items-center">
                            <div className="text-nowrap text-ellipsis overflow-hidden">Alejandro Valdivia</div>
                            <div className=" max-h-20 col-span-4 overflow-hidden break-words">
                                <p className="line-clamp-3">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum obcaecati ducimus laborum minus tempore possimus officia!
                                </p>
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="bg-red-500 p-2 w-min rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Default>
        </>
    )
}
export default Notification;