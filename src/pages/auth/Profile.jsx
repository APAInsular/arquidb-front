import { useEffect, useState } from "react";
import Avatar from "../../components/ui/Avatar";
import { useAuth } from "../../hooks/auth";
import CrudManager from "../../hooks/CrudManager";

const Profile = () => {

    const { user } = useAuth({ middleware: 'auth' });

    const { views } = CrudManager({ url: `centers/${user?.center_id}` });

    const [center, setCenter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCenter, setLoading, setErrors: setError });
    }, []);

    console.log(center)

    return (
        <>
            <div className="h-full overflow-y-scroll xl:px-20">
                {/* imagen y banner */}
                <div className="relative flex flex-col justify-center items-center">
                    <div className=" items-end relative w-full bg-gradient-to-l from-gray-300 to-gray-400 h-[180px] rounded-2xl rounded-b-none"></div>
                    <div className="absolute border-7 border-gray-100 rounded-full">
                        <Avatar name={user?.name.at(0).toUpperCase()} foto="" size={120} text={"text-white text-5xl"} />
                    </div>
                    <div className="w-full bg-gray-100 h-[150px]">
                        <p className="h-full flex justify-center items-center text-3xl mt-3">
                            Bienvenido, {user?.name}
                        </p>
                    </div>
                </div>
                {/* otras cosas */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 text-red-100 text-center">
                    <div className="bg-red-900 px-5 shadow-2xl p-2 py-4 rounded-xl">
                        <p className="text-2xl font-medium text-start pb-4 border-b-1 border-red-200/30">Cambiar la contraseña </p>
                        <div className="grid grid-cols-3 items-center my-7">
                            <div className="flex justify-center">
                                <div className="bg-red-300 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-red-900">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="col-span-2 text-justify text-sm">Si sientes que alguen entra en tu cuenta cambia la contraseña para no perder los permisos de tu cuenta</p>
                        </div>
                        <div className="text-end">
                            <button className=" bg-red-300 text-red-900 p-2 rounded-full px-4 font-medium">Cambia de contraseña </button>
                        </div>
                    </div>
                    <div className="bg-red-900 px-5 shadow-2xl p-2 py-4 rounded-xl">
                        <p className="text-2xl font-medium text-start pb-4 border-b-1 border-red-200/30">Más info </p>
                        <div className="grid grid-cols-3 items-center my-7">
                            <div className="flex justify-center">
                                <div className="bg-red-300 rounded-full p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-red-900">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="col-span-2 text-justify text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ea adipisci similique, culpa expedita ullam</p>
                        </div>
                        <div className="text-end">
                            <button className=" bg-red-300 text-red-900 p-2 rounded-full px-4 font-medium">Buscar más info</button>
                        </div>
                    </div>
                    <div className="bg-red-900 px-5 shadow-2xl p-2 py-4 rounded-xl">
                        <p className="text-2xl font-medium text-start pb-4 border-b-1 border-red-200/30">Añadir el Correo </p>
                        <div className="grid grid-cols-3 items-center my-7">
                            <div className="flex justify-center">
                                <div className="bg-red-300 rounded-full p-2">
                                    <p className="size-14 flex items-center justify-center text-5xl text-red-900">@</p>
                                </div>
                            </div>
                            <p className="col-span-2 text-justify text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate nostrum dicta modi.</p>
                        </div>
                        <div className="text-end">
                            <button className=" bg-red-300 text-red-900 p-2 rounded-full px-4 font-medium">Añadir el Correo </button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 space-y-5.5">
                    <div className="bg-white p-3 py-4 w-full shadow-2xs rounded-xl border-1 border-gray-200">
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Nombre</div>
                            <div className="text-xl font-medium text-center">{user?.name}</div>
                            <div className="flex justify-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-400/30"></div>
                            <div className="flex-1 border-t border-gray-400/30"></div>
                        </div>
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Correo</div>
                            <div className="text-xl font-medium text-center">{user?.email}</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-400/30"></div>
                            <div className="flex-1 border-t border-gray-400/30"></div>
                        </div>
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Contraseña</div>
                            <div className="text-xl font-medium text-center">****</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-400/30"></div>
                            <div className="flex-1 border-t border-gray-400/30"></div>
                        </div>
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Centro</div>
                            <div className="text-xl font-medium flex justify-center items-center">{loading ?
                                <svg className="size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                : center?.name}</div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-3 py-4 w-full shadow-2xs rounded-xl border-1 border-gray-200">
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Rol</div>
                            <div className="text-xl font-medium text-center">Admin  </div>
                            <div className="flex justify-end items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-400/30"></div>
                            <div className="flex-1 border-t border-gray-400/30"></div>
                        </div>
                        <div className="grid grid-cols-3 w-full text-md">
                            <div>Privilegios</div>
                            <div className="text-xl font-medium flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                            </svg>
                            </div>
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}

export default Profile;
