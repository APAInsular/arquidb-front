import { Link } from "react-router-dom";

const DataSearch = ({ datos, query }) => {

    return (
        <div className={`absolute z-20 top-10 left-0 w-full bg-[#a81d37] text-white/70 pt-3  rounded-b-xl mt-2 shadow-2xl space-y-3`}>
            {datos.length >= 1 ? datos.map(data => (
                <Link to={`/expedientes/${data.id}`} key={data.id}>
                    <div className="flex flex-row items-center space-x-5 border-b-1 border-red-300/20 pb-2 hover:bg-red-900 px-2 py-1 transition-all">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col overflow-hidden text-ellipsis">
                            <div className="text-md font-medium">{data.title}</div>
                            <div className="text-white/40 text-sm text-nowrap animate-text">{data.description}</div>
                        </div>
                    </div>

                </Link>
            )) :
                (
                    <>
                        <div className="px-2 pb-2 text-md">
                            No existe resultados...
                        </div>
                    </>
                )}


            {datos.length >= 1 && query ?
                <Link to={`/search?search=${query}`} className="my-2 cursor-pointer py-2 px-2 flex space-x-4 flex-row hover:bg-red-900" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                    <p>
                        Todos los resultados de busqueda de "{query}"
                    </p>
                </Link>
                : ""}

        </div>
    );
}

export default DataSearch;