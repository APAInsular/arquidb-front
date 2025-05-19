import { useParams, Link } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useDocument } from "../../../store/contexts/DocumentContext";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import WebLoader from "../../../routes/loaders/WebLoader";

const VerExpediente = () => {
    const params = useParams();
    const { expedients } = useExpedient();
    const { phases } = usePhase();
    const { documents } = useDocument();
    const [expedient, setExpedient] = useState({});
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [expedientDocuments, setExpedientDocuments] = useState([]);
    const [phaseSelected, setPhaseSelected] = useState(null);
    const [clients, setClients] = useState([]);
    const [collegiates, setCollegiates] = useState([]);

    useEffect(() => {
        if (expedients) {
            setExpedient(expedients.find(e => e.id == params.id));
        }
    }, [expedients]);

    useEffect(() => {
        if (phases) {
            setExpedientPhases(phases.filter(phase => phase.expedient_id == expedient.id));
        }

        if (Array.isArray(expedient?.people)) {
            const foundClients = expedient.people
                .filter(p => p.client)
                .map(p => {
                    const { collegiates, ...clientData } = p;
                    return { ...clientData };
                });

            const foundCollegiates = expedient.people
                .filter(p => p.collegiates)
                .map(p => {
                    const { client, ...collegiatesData } = p;
                    return { ...collegiatesData };
                });

            setClients(foundClients);
            setCollegiates(foundCollegiates);
        }
    }, [expedient]);

    useEffect(() => {
        if (expedientPhases[0]) {
            setPhaseSelected(expedientPhases[0]);
        }

        if (expedientPhases.length && documents) {
            const groupedDocs = expedientPhases.reduce((acc, phase) => {
                const phaseDocs = documents.filter(doc => doc.phase_id === phase.id);
                if (phaseDocs.length) {
                    acc.push({ phase, documents: phaseDocs });
                }
                return acc;
            }, []);
            setExpedientDocuments(groupedDocs);
        }
    }, [expedientPhases]);

    if (!expedient || !expedientPhases || !clients || !collegiates) return <WebLoader />
    console.log(expedient);
    console.log(clients);
    console.log(collegiates);
    console.log(expedientDocuments);

    return (
        <>
            <div className="overflow-y-auto h-full">
                <div className="flex justify-between p-2 mb-5">
                    <h3 className="text-3xl">{expedient.title}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <div className="mx-28 p-2">
                    <div className="bg-gray-200 rounded-lg p-2 mb-4">
                        <Link to="/expedientes" className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                        <div className="text-center flex flex-col lg:flex-row space-y-12 lg:space-y-0 justify-between items-center p-10">
                            <div className="flex flex-col space-y-12">
                                {collegiates.map(collegiate => {
                                    return (
                                        <div className="flex flex-col" key={collegiate.id}>
                                            <h4 className="text-2xl">Colegiado</h4>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 self-center">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <h3 className="text-3xl">{collegiate.name} {collegiate.first_surname}</h3>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 self-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <div className="flex flex-col space-y-12">
                                {clients.map(client => {
                                    return (
                                        <div className="flex flex-col" key={client.id}>
                                            <h4 className="text-2xl">Cliente</h4>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 self-center">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            <h3 className="text-3xl">{client.name} {client.first_surname}</h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-2 mb-4">
                        <div className="border-t">
                            <strong>Datos generales</strong>
                            <div className="grid grid-cols-12 gap-4 p-2">
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                    <div>
                                        <p>Expediente</p>
                                        <strong>{expedient.number}</strong>
                                    </div>
                                    <div>
                                        <p>Título del proyecto</p>
                                        <strong>{expedient.title}</strong>
                                    </div>
                                    <div>
                                        <p>Clase de trabajo</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p>Superficie estimada (m2)</p>
                                        <strong>Info</strong>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                    <div>
                                        <p>Dirección</p>
                                        <strong>{expedient.site}</strong>
                                    </div>
                                    <div>
                                        <p>Observación</p>
                                        <strong>{expedient.description}</strong>
                                    </div>
                                    <div>
                                        <p>Facturas</p>
                                        <strong>{expedient.budget} €</strong>
                                    </div>
                                    <div>
                                        <p>Expedientes asociados</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-2">
                                    <p>Referenciado por</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-2 mb-4">
                        <div className="border-t">
                            <strong>Fases</strong>
                            <div className="flex justify-center space-x-4">
                                {expedientPhases.map(phase => {
                                    return (
                                        <div className="flex flex-col" key={phase.phase} onClick={() => setPhaseSelected(phase)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-center">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <p className="self-center">{phase.phase}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <button type="button" className="bg-blue-700 text-white py-2 px-6 rounded-full mb-5">Editar Fase</button>
                            {phaseSelected && (
                                <div className="grid grid-cols-12 gap-4 p-2">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                        <div>
                                            <p>N° Fase</p>
                                            <strong>{phaseSelected.phase}</strong>
                                        </div>
                                        <div>
                                            <p>Fecha de Registro</p>
                                            <strong>{format(new Date(phaseSelected.record_date), "dd 'de' MMM, yyyy")}</strong>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                        <div>
                                            <p>Estado</p>
                                            {phaseSelected.state == 'signed' ? (
                                                <strong>Visado</strong>
                                            ) : (
                                                <strong>Sin visar</strong>
                                            )}
                                        </div>
                                        <div>
                                            <p>Fecha de Visado</p>
                                            {phaseSelected.state == 'signed' && (
                                                <strong>{format(new Date(phaseSelected.sign_date), "dd 'de' MMM, yyyy")}</strong>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12 lg:col-span-2">
                                        <p>Visador</p>
                                        <strong>Info</strong>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-2">
                        <div className="border-t">
                            <strong>Documentos</strong>
                            <div>
                                {expedientDocuments.map(({ phase, documents }) => (
                                    <div key={phase.id} className="mb-6">
                                        <p className="mb-2">Fase {phase.phase}</p>
                                        <div className="grid grid-cols-12 gap-4">
                                            {documents.map(document => (
                                                <div key={document.id} className="col-span-12 md:col-span-6 lg:col-span-3">
                                                    <Link to={document.name}>
                                                        <img
                                                            src={document.name}
                                                            alt={`Documento ${document.id}`}
                                                            className="w-full h-[200px] object-cover rounded shadow"
                                                        />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerExpediente;