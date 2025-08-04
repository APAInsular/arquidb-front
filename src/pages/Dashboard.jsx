import { useEffect, useState } from "react";
import CrudManager from "../hooks/CrudManager";
import { useSearchParams } from "react-router-dom";
import { useExpedient } from "../store/contexts/ExpedientContext";
import Delete from "../components/modals/crud/Delete";
import TitleCard from "../components/ui/TitleCard";
import DefaultTable from "../components/ui/DefaultTable";
import Paginate from "../components/ui/Paginate";
import StatsCard from "../components/ui/StatsCard";

const Dashboard = () => {

    const [searchParams] = useSearchParams();
    const { expedientAccounts } = useExpedient();

    const SearchTitle = searchParams.get('search') || '';
    const title = searchParams.get('title') || '';
    const phase = searchParams.get('phase') || '';
    const client = searchParams.get('client') || '';
    const collegiate = searchParams.get('collegiate') || '';
    const number = searchParams.get('number') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const page = searchParams.get('page') || '';

    // console.log(number, title, phase, client, collegiate, dateFrom, dateTo, SearchTitle)

    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState([]);
    const [expedientes, setExpedientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);

    // useEffect(() => {
    //     async function fetchCounts() {
    //         try {
    //             const { data } = await axios.get('/api/expedientCount');
    //             // Suponiendo que la respuesta tiene esta estructura:
    //             // { expedients_account: number, clients_account: number, collegiates_account: number }
    //             setExpedientCount(data.expedients_account);
    //             setClientsCount(data.clients_account);
    //             setCollegiatesCount(data.collegiates_account);
    //         } catch (error) {
    //             console.error('Error al obtener counts:', error);
    //         }
    //     }
    //     fetchCounts();
    // }, []);

    const { views } = CrudManager({
        url: `expedient?
        number=${number}
        &title=${title ? title : SearchTitle}
        &phase=${phase}
        &client=${client}&collegiate=${collegiate}
        &dateFrom=${dateFrom}&dateTo=${dateTo}
        &page=${pages}`
    });

    useEffect(() => {
        views({ setData: setExpedientes, setLoading, setError, setPages: setTotalPages });
    }, [pages]);

    if (error) return <p>Error: {error}</p>;

    const expedientesColumns = [
        {
            key: 'number',
            label: 'Número',
            render: (expediente) => (
                <div className="text-center">
                    {expediente.number}
                </div>)
        },
        {
            key: 'cliente',
            label: 'Cliente',
            render: (expediente) => {
                return expediente.people
                    ?.filter(person => person.client && !person.collegiates)
                    .map(person => person.name)
                    .join(', ') || '...';
            }
        },
        {
            key: 'colegiado',
            label: 'Colegiado',
            render: (expediente) => {
                return expediente.people
                    ?.filter(person => person.collegiates && !person.client)
                    .map(person => person.name)
                    .join(', ') || '...';
            }
        },
        {
            key: 'budget',
            label: 'Presupuesto',
        },
        {
            key: 'title',
            label: 'Título',
        },
        {
            key: 'site',
            label: 'Emplazamiento',
            render: (expediente) => `${expediente.site}, (${expediente.postal_code})`
        },
        {
            key: 'documents',
            label: 'Docs',
            render: (expediente) => (
                <div className="text-center">
                    {Array.isArray(expediente.phases) && expediente.phases.length > 0
                        ? expediente.phases.reduce((acc, fase) => acc + (fase.documents?.length || 0), 0)
                        : 0}
                </div>
            )
        }
    ];

    const formattedExpedientes = expedientes.map(expediente => ({
        ...expediente,
        fullTitle: `${expediente.title} (${expediente.budget}€) - ${expediente.site}, ${expediente.postal_code}`,
    }));

    return (
        <>
            {deletes && (
                <Delete DatoId={deletes} type={"Expediente"} onClose={() => setDeletes(false)} url={"expedient"} />
            )}
            <div className="flex flex-col h-full">
                <TitleCard name="Home" />
                <div className="mt-2">
                    <Paginate page={pages} setPage={setPages} totalPages={totalPages} />
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
                        columns={expedientesColumns}
                        data={formattedExpedientes}
                        setDeletes={setDeletes}
                        openId={openId}
                        setOpenId={setOpenId}
                        tabla={'expedientes'}
                        someText="title"
                        someNumber="id"
                        someDate="start_date"
                    />)}
            </div>
        </>
    )
};

export default Dashboard;