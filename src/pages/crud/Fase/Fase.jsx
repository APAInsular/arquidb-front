import { useCallback, useEffect, useState } from "react";
import CrudManager from "../../../hooks/CrudManager";
import TitleCard from "../../../components/ui/TitleCard";
import { Link } from "react-router-dom";
import StatsCard from "../../../components/ui/StatsCard";
import Delete from "../../../components/modals/crud/Delete";
import DefaultTable from "../../../components/ui/DefaultTable";
import Paginate from "../../../components/ui/Paginate";
import DefaultSearch from "../../../components/ui/DefaultSearch";

const Fase = () => {



    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);
    const [phases, setPhase] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);

    const buscador = useCallback((query = '') => {
        const { views } = CrudManager({ url: `phase${query ? '?title=' + query : '?title='}&page=${page}` });
        views({ setData: setPhase, setLoading, setErrors: setError, setPages: setTotalPages });
    }, [page]);

    useEffect(() => {
        buscador();
    }, [buscador]);

    if (error) return <p>Error: {error}</p>;

    console.log(totalPages)

    const phasesColumns = [
        {
            key: 'id', label: '#',
            render: (phase) =>
                <div className="text-center">
                    {phase.id}
                </div>
        },
        {
            key: 'phase', label: 'Fase',
            render: (phase) =>
                <div className="text-center">
                    {phase.phase}
                </div>
        },
        { key: 'fullTitle', label: 'Título' },
        {
            key: 'documents',
            label: 'Docs',
            render: (phase) => (
                <div className="text-center">
                    {Array.isArray(phase.documents) ? phase.documents.length : 0}
                </div>
            )
        },
    ];

    const formattedPhases = phases.map(phase => ({
        ...phase,
        fullTitle: `${phase.title}`,
    }));

    return (
        <>
            {deletes && (
                <Delete DatoId={deletes} type={"Fase"} onClose={() => setDeletes(false)} url={"phase"} />
            )}
            <div className="flex flex-col h-full">
                {/* titulo */}
                <TitleCard name={"Fases"} />
                {/* poco necesario  */}
                <div className="w-full flex justify-between space-x-1">
                    <DefaultSearch
                        title={'Fases'}
                        Buscador={buscador}
                    />
                    <Link
                        // to={"/fases/crear"}
                        // cursor-pointer hover:bg-red-800 hover:text-red-300
                        className="text-nowrap flex flex-row items-center px-5 py-1.5 space-x-3 transition-all text-gray-500 font-medium bg-gray-300 w-min mt-2 p-1 rounded-full shadow-2xl cursor-not-allowed ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir Fase</p>
                    </Link>
                </div>
                {/* card  */}
                <div className="grid grid-cols-3 justify-start gap-2 my-2">
                    <StatsCard
                        title={"Total Fases (Cualquier Fase)"}
                        value={phases?.length}
                    />
                    <StatsCard
                        title={"Total Documentos (Cualquier Documento)"}
                        value={phases?.documents?.length}
                    />
                </div>
                <div className="">
                    <Paginate page={page} setPage={setPage} totalPages={totalPages} />
                </div>
                {loading ? (
                    <div className="flex justify-center mt-2 items-center ">
                        <svg className="size-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <DefaultTable
                        columns={phasesColumns}
                        data={formattedPhases}
                        setDeletes={setDeletes}
                        openId={openId}
                        setOpenId={setOpenId}
                        tabla={'fases'}
                        someText="name"
                        someNumber="phase"
                        someDate="created_at"
                    />)}
            </div>
        </>
    )
};

export default Fase; 