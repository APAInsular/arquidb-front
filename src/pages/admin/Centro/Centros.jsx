import { Link, useNavigate } from "react-router-dom";
import TitleCard from "../../../components/ui/TitleCard";
import StatsCard from "../../../components/ui/StatsCard";
import { useCallback, useEffect, useState } from "react";
import Delete from "../../../components/modals/crud/Delete";
import CrudManager from "../../../hooks/CrudManager";
import DefaultSearch from "../../../components/ui/DefaultSearch";
import Avatar from "../../../components/ui/Avatar";
import Paginate from "../../../components/ui/Paginate";
import Actions from "../../../components/modals/crud/Actions";
import DefaultTable from "../../../components/ui/DefaultTable";
import GeneralSearch from "../../../components/modals/filters/GeneralSearch";
import Search from "../../../components/modals/filters/Search";

const Centros = () => {

    const [totalPages, setTotalPages] = useState([]);
    const [generalSearch, setGeneralSearch] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        municipality: "",
        locality: "",
        street: "",
        number: "",
        phone: "",
    });
    const [centers, setcenters] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);


    const buscador = useCallback((query = '') => {
        const { views } = CrudManager({ url: `centers${query ? `?name=${query}&phone=${query}` : '?name=&phone='}&page=${page}` });
        views({ setData: setcenters, setLoading, setErrors: setError, setPages: setTotalPages });
    }, [page]);

    useEffect(() => {
        buscador();
    }, [buscador]);

    if (error) return <p>Error: {error}</p>;

    const centerColumns = [
        { key: 'name', label: 'Nombre' },
        { key: 'municipality', label: 'Municipio' },
        { key: 'locality', label: 'Localidad' },
        { key: 'street', label: 'Calle' },
        { key: 'number', label: 'Número' },
        { key: 'phone', label: 'Teléfono' },
    ];

    const formattedCenters = centers.map(center => ({
        ...center,
    }));

    return (
        <>
            {deletes && (
                <Delete DatoId={deletes} type={"Centro"} onClose={() => setDeletes(false)} url={"centers"} />
            )}
            <div className="flex flex-col h-full">
                {/* titulo */}
                <TitleCard name="Centros" link="/" />
                {/* añadir algo */}
                <div className="w-full flex justify-between space-x-1">
                    <DefaultSearch
                        title={'Centro'}
                        Buscador={buscador}
                    />

                    {generalSearch && (
                        <div onClick={(e) => e.stopPropagation()}>
                            {/* <Search onClose={() => setGeneralSearch(false)} /> */}
                            <GeneralSearch
                                onClose={() => setGeneralSearch(false)}
                                icons={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                }
                                title={"Centros"}
                                url={"/centros"}
                                setFormData={setFormData}
                                children={3}
                            >
                            </GeneralSearch>
                        </div>
                    )
                    }
                    <div className="">
                        <Link to={'/centros/crear'} className="text-nowrap flex flex-row items-center px-5 py-1.5 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-900 font-medium bg-red-200 w-min mt-2 p-1 rounded-full shadow-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <p>Añadir centro</p>
                        </Link>
                    </div>
                </div>
                {/* card  */}
                <div className="grid grid-cols-3 justify-start gap-2 my-2">
                    <StatsCard
                        title={"Total Centros (Cualquier centro)"}
                        value={centers.length}
                    />
                    {/* <StatsCard
                        title={"Total Admin (Solo usuarios Admin)"}
                        value={admin.length}
                    />
                    <StatsCard
                        title={"Total Visores (Solo usuario Visores)"}
                        value={visator.length}
                    /> */}
                </div>
                <div className="">
                    <Paginate page={page} setPage={setPage} totalPages={totalPages} />
                </div>
                {/* tabla */}
                {loading ? (
                    <div className="flex justify-center mt-2 items-center ">
                        <svg className="size-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <DefaultTable
                        columns={centerColumns}
                        data={formattedCenters}
                        setDeletes={setDeletes}
                        openId={openId}
                        setOpenId={setOpenId}
                        tabla={'centros'}
                        someText="name"
                        someNumber="id"
                        someDate="created_at"
                    />
                )}
            </div>
        </>
    );
}

export default Centros;