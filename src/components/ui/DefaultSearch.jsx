import { useSearchParams } from "react-router-dom";
import CrudManager from "../../hooks/CrudManager";
import { useEffect, useState } from "react";

const DefaultSearch = ({ title, Buscador }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("info") || "";

    const handleSearchChange = (event) => {
        const value = event.target.value;
        if (value !== query) { setSearchParams(value ? { info: value } : {}); }
    };

    const [previousQuery, setPreviousQuery] = useState(query);

    useEffect(() => {
        if (query !== previousQuery) {
            setPreviousQuery(query);
            Buscador(query);
        }
    }, [query, Buscador, previousQuery]);

    return (
        <>
            <form action="/colegiados" className={` bg-gray-300/40 relative text-black px-2 rounded-full flex flex-row justify-center sm:justify-between items-center mt-2`} >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black/50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <input
                    placeholder={title + '...'}
                    type="search"
                    name={"info"}
                    value={query}
                    onChange={handleSearchChange}
                    className="hidden sm:flex outline-0 w-full text-black ps-2 text-md" />
            </form>
        </>
    );
};

export default DefaultSearch;