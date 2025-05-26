import { Link, useNavigate } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { useState, useEffect, useCallback } from "react";
import Delete from "../../../components/modals/crud/Delete";
import TitleCard from "../../../components/ui/TitleCard";
import StatsCard from "../../../components/ui/StatsCard";
import DefaultTable from "../../../components/ui/DefaultTable";

const Expediente = () => {
    const [expedientes, setExpedientes] = useState([]);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);
    const { expedients, loading } = useExpedient();

    const expedientesColumns = [
        {
            key: 'number',
            label: 'Número',
            render: (expediente) => (
                <div className="text-center">
                    {expediente?.number}
                </div>)
        },
        {
            key: 'cliente',
            label: 'Cliente',
            render: (expediente) => {
                return expediente?.people
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
                        ? expediente.phases[0].documents?.length || 0
                        : 0}
                </div>
            )
        }
    ];

    const formattedExpedientes = expedients.map(expediente => ({
        ...expediente,
        fullTitle: `${expediente.title} (${expediente.budget}€) - ${expediente.site}, ${expediente.postal_code}`,
    }));


    useEffect(() => {
        if (expedients) {
            setExpedientes(expedients);
        }
    }, [formattedExpedientes]);


    console.log("HOLAA", expedients)

    return (
        <>
            {deletes && <Delete DatoId={deletes} onClose={() => { setDeletes(false); }} type="Expediente" url={"expedient"} />}
            <div className="flex flex-col h-full">
                <TitleCard name="Expedientes" link="/" />
                <div className="w-full flex justify-end">
                    <Link to={"/expedientes/crear"} className="text-nowrap flex flex-row items-center px-5 py-1.5 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-900 font-medium bg-red-200 w-min mt-2 p-1 rounded-full shadow-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir expedientes</p>
                    </Link>
                </div>
                <div className="grid grid-cols-3 justify-start gap-2 my-2 mb-15">
                    <StatsCard
                        title={"Total Expedientes (Cualquier Expediente)"}
                        value={expedientes.length}
                    />
                    <StatsCard
                        title={"Total Clientes (Cualquier Cliente)"}
                        value={expedientes?.people?.[0]?.clients.length}
                    />
                    <StatsCard
                        title={"Total Colegiados (Cualquier Colegiado)"}
                        value={expedientes?.people?.[0]?.collegiate.length}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center ">
                        <svg className="size-9 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>)
                    : (
                        <>
                            {/* tabla */}
                            < DefaultTable
                                columns={expedientesColumns}
                                data={formattedExpedientes}
                                setDeletes={setDeletes}
                                openId={openId}
                                setOpenId={setOpenId}
                                tabla={'expedientes'}
                                someText="title"
                                someNumber="number"
                                someDate="start_date"
                            />
                        </>
                    )}
            </div>
        </>
    )
}

export default Expediente;