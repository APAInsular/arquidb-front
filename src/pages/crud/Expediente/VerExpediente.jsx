import { useParams, Link, useNavigate } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useDocument } from "../../../store/contexts/DocumentContext";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import axios from "../../../lib/axios";
import PhaseEditor from "../../../components/modals/crud/PhaseEditor";
import WebLoader from "../../../routes/loaders/WebLoader";
import Delete from "../../../components/modals/crud/Delete";

const VerExpediente = () => {
    const params = useParams();
    const { expedients } = useExpedient();
    const { phases } = usePhase();
    const { documents } = useDocument();
    const navigate = useNavigate();
    const [expedient, setExpedient] = useState({});
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [expedientDocuments, setExpedientDocuments] = useState([]);
    const [phaseSelected, setPhaseSelected] = useState(null);
    const [clients, setClients] = useState([]);
    const [collegiates, setCollegiates] = useState([]);

    const [modalPhase, setModalPhase] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(false);

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
            // setExpedientDocuments(documents.filter(document =>
            //     expedientPhases.find(phase => phase.id === document.phase_id)
            // ));
        }
    }, [expedientPhases]);

    const phaseEditorActivate = useCallback(() => {
        if (!modalPhase) {
            setModalPhase(true);
        }
    }, [modalPhase]);

    const deleteActivate = (id) => {
        setModalDelete(true);
        setDeleteId(id);
    }

    if (!expedient || !expedientPhases || !clients || !collegiates) return <WebLoader />
    console.log(expedient);
    console.log(clients);
    console.log(collegiates);
    console.log(expedientDocuments);

    return (
        <>
            <div className="overflow-y-auto h-full">
                {modalPhase && (
                    <PhaseEditor expedientPhases={expedientPhases} setModalPhase={setModalPhase} />
                )}
                {modalDelete && (
                    <Delete DatoId={deleteId} onClose={() => setModalDelete(false)} type={"Documento"} url={"document"} />
                )}
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
                                        <div className="flex flex-col cursor-pointer" key={phase.phase} onClick={() => setPhaseSelected(phase)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 self-center">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <p className="self-center">{phase.phase}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-center mt-5">
                                <button type="button" className="cursor-pointer bg-blue-700 text-white rounded-full py-2 px-4 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => phaseEditorActivate()}>Editar fases</button>
                            </div>
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
                            <div className="mt-6">
                                {expedientDocuments.map(({ phase, documents }) => (
                                    <div key={phase.id} className="gap-6">
                                        <p className="text-center text-3xl font-semibold mb-2">Fase {phase.phase}</p>
                                        <div className="gap-4">
                                            {documents.map(document => (
                                                <div key={document.id} className="grid grid-cols-2 py-1.5 px-4 hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8 mt-2 transition-all shrink-0 overflow-x-scroll">
                                                    <p className="text-center text-2xl font-semibold">Documento {document.id}</p>
                                                    <div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <Link to={import.meta.env.VITE_APP_BACKEND_URL + "/storage/" + document.name} className="flex justify-center items-center bg-sky-300 text-sky-600 hover:bg-sky-600 hover:text-orange-300 cursor-pointer font-medium py-1 text-sm rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                                </svg>
                                                            </Link>

                                                            <button type="button" onClick={() => deleteActivate(document.id)} className="flex justify-center items-center bg-red-300 text-red-600 hover:bg-red-600 hover:text-red-300 cursor-pointer font-medium py-1 text-sm rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <div className="">
                                <Paginate page={page} setPage={setPage} totalPages={totalPages} />
                            </div>
                            <DefaultTable
                                columns={documentsColumns}
                                data={expedientDocuments}
                                setDeletes={setDeletes}
                                openId={openId}
                                setOpenId={setOpenId}
                                tabla={'documentos'}
                                someText="name"
                                someNumber="phase"
                                someDate="created_at"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerExpediente;