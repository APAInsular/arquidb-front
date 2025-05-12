

const CheckSelect = ({ datos, total, setDeletes }) => {

    return (
        <>
            <div className="fixed bottom-0 right-[30%] me-5 z-50 mb-5 flex justify-center items-center">
                <div className="bg-gray-800 text-white p-4 rounded-full shadow-2xl mx-2 w-full">
                    <div className="flex flex-row justify-between items-center space-x-2.5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:bg-gray-600 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-2 text-nowrap me-12">
                            <div className="bg-gray-600 px-3 rounded-full">{total}</div>
                            <p>Objetos seleccionados</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setDeletes(datos);
                                }}
                                type="button" className=" py-2 flex flex-row items-center px-5 space-x-3 cursor-pointer hover:text-red-800 hover:bg-red-500 transition-all bg-red-600 font-medium text-white w-min p-1 rounded-full text-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                                <p>Borrar</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckSelect;