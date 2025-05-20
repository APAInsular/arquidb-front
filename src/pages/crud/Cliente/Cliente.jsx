import { Link } from "react-router-dom";
import TitleCard from "../../../components/ui/TitleCard";
import Delete from "../../../components/modals/crud/Delete";
import { useCallback, useEffect, useState } from "react";
import CrudManager from "../../../hooks/CrudManager";
import StatsCard from "../../../components/ui/StatsCard";
import DefaultSearch from "../../../components/ui/DefaultSearch";
import DefaultTable from "../../../components/ui/DefaultTable";
import Paginate from "../../../components/ui/Paginate";

const Cliente = () => {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);
    const [clients, setClient] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);

    const buscador = useCallback((query = '') => {
        const { views } = CrudManager({ url: `personClient${query ? '?name=' + query : '?name='}&page=${page}` });
        views({ setData: setClient, setLoading, setErrors: setError, setPages: setTotalPages });
    }, [page]);

    useEffect(() => {
        buscador();
    }, [buscador]);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const clientColumns = [
        {
            key: 'id', label: '#',
            render: (client) =>
                <div className="text-center">
                    {client.id}
                </div>
        },
        { key: 'name', label: 'Nombre' },
        {
            key: 'fullSurname',
            label: 'Apellidos',
            render: (client) => `${client.first_surname} ${client.second_surname}`
        },
        { key: 'identification_number', label: 'Identificación' },
        { key: 'observations', label: 'Observación' }
    ];

    const formattedClients = clients.map(client => ({
        ...client,
        fullSurname: `${client.first_surname} ${client.second_surname}`,
    }));

    return (
        <>
            {deletes && (
                <Delete DatoId={deletes} type={"Cliente"} onClose={() => setDeletes(false)} url={"personClient"} />
            )}
            <div className="flex flex-col h-full">
                {/* titulo */}
                <TitleCard name={"Clientes"} />
                {/* añadir algo */}
                <div className="w-full flex justify-between space-x-1">
                    <DefaultSearch
                        title={'Clientes'}
                        Buscador={buscador}
                    />
                    <Link to={"/clientes/crear"} className="flex flex-row px-10 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-800 font-medium bg-red-100 w-min mt-2 p-1 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir</p>
                    </Link>
                </div>
                {/* card  */}
                <div className="grid grid-cols-3 justify-start gap-2 my-2">
                    <StatsCard
                        title={"Total Clientes (Cualquier Cliente)"}
                        value={clients.length}
                    />
                    {/* <StatsCard
                        title={"Total Admin (Solo usuarios Admin)"}
                        value={collegiates.length}
                    />
                    <StatsCard
                        title={"Total Visores (Solo usuario Visores)"}
                        value={collegiates.length}
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
                        columns={clientColumns}
                        data={formattedClients}
                        setDeletes={setDeletes}
                        openId={openId}
                        setOpenId={setOpenId}
                        tabla={'clientes'}
                        someText="name"
                        someNumber="id"
                        someDate="created_at"
                    />)}
            </div>
        </>
    );
}

export default Cliente;