import { Link } from 'react-router-dom';

function Actions({ tabla, datos, setDeletes, openId, setOpenId }) {
    const isOpen = openId === datos.id;

    const toggleMenu = () => {
        if (isOpen) {
            setOpenId(null);
        } else {
            setOpenId(datos.id);
        }
    };

    return (
        <div className="relative">
            {/* Botón de 3 puntitos */}
            <div
                className="flex justify-center items-center hover:bg-red-200/40 rounded-2xl cursor-pointer"
                onClick={toggleMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </div>

            {/* Modal / Menú de acciones */}
            {isOpen && (
                <div className="absolute z-50 right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <div className="absolute bg-white p-2 right-5.5 top-[-5px] rotate-45"></div>
                    <ul className="text-sm text-gray-700 mt-2">
                        <li>
                            <Link
                                to={`/${tabla}/${datos.id}/show`}
                                className="flex items-center justify-between space-x-2 px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setOpenId(null)}
                            >
                                <div className=' space-x-2 flex flex-row items-center font-medium'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <p> Ver
                                    </p>
                                </div>
                                <p className='text-xs'>
                                    Show
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/${tabla}/${datos.id}/editar`}
                                className="flex items-center justify-between space-x-2 px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setOpenId(null)}
                            >
                                <div className=' space-x-2 flex flex-row items-center font-medium'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <p> Editar
                                    </p>
                                </div>
                                <p className='text-xs'>
                                    Update
                                </p>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setDeletes(datos.id);
                                    setOpenId(null);
                                }}
                                className="w-full cursor-pointer flex items-center justify-between space-x-2 px-4 py-2 hover:bg-gray-100 "
                            >
                                <div className=' space-x-2 flex flex-row items-center font-medium'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    <p> Borrar
                                    </p>
                                </div>
                                <p className='text-xs '>
                                    Delete
                                </p>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Actions;
