import { useParams, Link, useNavigate } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useDocument } from "../../../store/contexts/DocumentContext";
import { useState, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";
import axios from "../../../lib/axios";
import PhaseEditor from "../../../components/modals/crud/PhaseEditor";
import WebLoader from "../../../routes/loaders/WebLoader";
import Delete from "../../../components/modals/crud/Delete";
import TitleCard from "../../../components/ui/TitleCard";
import { ArrowBigRightDashIcon, ArrowLeftRightIcon, Download, Edit, File, FileCheck2, FileText, LucideAward, User, UserRoundIcon, Users } from "lucide-react";
import { UseLoader } from "../../../store/contexts/LoaderContext";
import { useAuth } from "../../../hooks/Auth";

const VerExpediente = () => {

    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { user } = useAuth({ middleware: 'auth' });
    const params = useParams();
    const { showExpedient } = useExpedient();
    const { phases } = usePhase();
    const { documents } = useDocument();
    const navigate = useNavigate();
    const [expedient, setExpedient] = useState({});
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [expedientDocuments, setExpedientDocuments] = useState([]);
    const [phaseSelected, setPhaseSelected] = useState(null);
    const [documentsToSign, setDocumentsToSign] = useState([]);
    const [clients, setClients] = useState([]);
    const [collegiates, setCollegiates] = useState([]);

    const [modalPhase, setModalPhase] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(false);

    useEffect(() => {
        const getExpediente = async () => {
            try {
                const response = await axios.get(`/api/expedient/${params.id}`);
                console.log(response.data);
                setExpedient(response.data)
            } catch (error) {
                console.error('Error al obtener el expediente:', error);
            }
        };

        getExpediente();
    }, [params.id]);

    useEffect(() => {
        if (phases && expedient.id) {
            const filteredPhases = phases.filter(phase => phase.expedient_id == expedient.id);
            setExpedientPhases(filteredPhases);
            if (filteredPhases.length > 0 && !phaseSelected) {
                setPhaseSelected(filteredPhases[0]);
            }
        }

        if (Array.isArray(expedient?.people)) {
            const foundClients = expedient.people
                .filter(p => p.pivot.role == "client")
                .map(p => {
                    const { collegiates, ...clientData } = p;
                    return { ...clientData };
                });

            const foundCollegiates = expedient.people
                .filter(p => p.pivot.role == "collegiate")
                .map(p => {
                    const { client, ...collegiatesData } = p;
                    return { ...collegiatesData };
                });

            setClients(foundClients);
            setCollegiates(foundCollegiates);
        }
    }, [expedient, phases]);

    useEffect(() => {
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
    }, [expedientPhases, documents]);

    const filteredDocuments = useMemo(() => {
        return expedientDocuments.filter(expedient =>
            phaseSelected ? expedient.phase.id === phaseSelected.id : false
        );
    }, [expedientDocuments, phaseSelected]);

    const phaseEditorActivate = useCallback(() => {
        if (!modalPhase) {
            setModalPhase(true);
        }
    }, [modalPhase]);

    const deleteActive = useCallback((id) => {
        if (!modalDelete) {
            setDeleteId(id);
            setModalDelete(true);
        }
    }, [modalDelete]);

    const onToggleDocument = (id) => {
        setDocumentsToSign(prev => {
            if (prev.includes(id)) {
                return prev.filter(docId => docId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const signSelectedDocuments = async () => {
        if (documentsToSign.length === 0) {
            alert("Selecciona al menos un documento para visar.");
            return;
        }

        try {
            const response = await axios.post("api/user/documents/sign", {
                documents: documentsToSign,
            });

            showLoader();
            setTimeout(() => hideLoader(), 4000);
            setDocumentsToSign([]);
            navigate(0);
        } catch (error) {
            console.error("Error al visar documentos:", error);
            showError();
            setTimeout(() => hideError(), 4000);
        }
    };

    if (!expedient || !expedientPhases || !clients || !collegiates) return <WebLoader />;

    return (
        <>
            <TitleCard name={"Expedientes"} action={expedient.title} />
            <div className="overflow-y-auto h-full">
                {modalPhase && (
                    <PhaseEditor expedientPhases={expedientPhases} setModalPhase={setModalPhase} />
                )}
                {modalDelete && (
                    <Delete DatoId={deleteId} onClose={() => setModalDelete(false)} type={"Documento"} url={"document"} />
                )}
                <div className="p-2">
                    <div className="rounded-md p-2 mb-4">
                        <div className="text-center flex flex-col lg:flex-row space-y-12 lg:space-y-0 justify-between items-center p-10">
                            {/* Colegiados */}
                            <div className="flex flex-col space-y-12">
                                <div className="flex flex-col justify-center items-center">
                                    <h4 className="text-lg text-gray-400 mb-5">Colegiado</h4>
                                    <div className="bg-green-300 text-green-900 rounded-4xl">
                                        <Users className="w-30 h-30" />
                                    </div>
                                    {collegiates.map(collegiate => (
                                        <Link key={collegiate.id} to={`/colegiados/${collegiate.id}/show`} className="hover:text-gray-400 hover:underline text-3xl">{collegiate.name} {collegiate.first_surname}</Link>
                                    ))}
                                </div>
                            </div>

                            <div className="flex">
                                <ArrowBigRightDashIcon className="w-20 h-20" />
                            </div>

                            {/* Clientes */}
                            <div className="flex flex-col space-y-12">
                                <div className="flex flex-col justify-center items-center">
                                    <h4 className="text-lg text-gray-400 mb-5">Cliente</h4>
                                    <div className="bg-amber-300 text-amber-900 rounded-4xl">
                                        <Users className="w-30 h-30" />
                                    </div>
                                    {clients.map(client => (
                                        <Link key={client.id} to={`/clientes/${client.id}/show`} className="hover:text-gray-400 hover:underline text-3xl">{client.name} {client.first_surname}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-2 mb-4">
                        <div className="p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 mb-6 border-b-1 pb-4 border-gray-200">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <User className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                                </div>
                                <div className="flex items-center">
                                    <Link to={`/expedientes/${expedient.id}/editar`}
                                        className="flex flex-row space-x-4 items-center justify-center cursor-pointer bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        <Edit className="w-5 h-5" />
                                        <p>Editar expediente</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-2 gap-5 p-2">
                                <div className="space-y-3">
                                    <div className="">
                                        <p className="text-sm text-gray-500">Expediente Nº</p>
                                        <p className="font-medium">{expedient?.number}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Título del proyecto</p>
                                        <p className="font-medium">{expedient?.title}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Expediente</p>
                                        <p className="font-medium">{expedient?.number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Clase de trabajo</p>
                                        -
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Superficie estimada (m2)</p>
                                        <p className="font-medium">{expedient?.Info ? expedient?.Info : "-"}</p>
                                    </div>
                                </div>
                                <div className=" col-span-2 space-y-3">

                                    <div className="">
                                        <p className="text-sm text-gray-500">Dirección</p>
                                        <p className="font-medium">{expedient?.site ? expedient?.site : "-"}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Observación</p>
                                        <p className="font-medium text-xs">{expedient?.description ? expedient?.description : "-"}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Facturas</p>
                                        <p className="font-medium">{expedient?.budget ? expedient?.budget : "-"}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm text-gray-500">Expedientes asociados</p>
                                        <p className="font-medium">
                                            -
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-500">Referenciado por</p>
                                    -
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-2 mb-4">
                        <div className="p-2">
                            <div className="flex items-center gap-3 mb-6 border-b-1 pb-4 border-gray-200">
                                <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                                    <FileCheck2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Fases</h3>
                            </div>

                            <div className="flex justify-center space-x-4">
                                {expedientPhases.map(phase => (
                                    <div
                                        className={`bg-yellow-50 inset-shadow-2xs inset-shadow-black/5 rounded-b-none border-b-3 size-17 hover:bg-yellow-600  hover:border-yellow-200 hover:text-white transition-all rounded-md flex flex-col items-center justify-center cursor-pointer  ${phaseSelected?.id === phase.id ? 'bg-yellow-600  border-yellow-200 text-yellow-100' : 'text-yellow-600'
                                            }`}
                                        key={phase.id}
                                        onClick={() => setPhaseSelected(phase)}
                                    >
                                        <LucideAward className="w-7 h-7" />
                                        <p className="self-center">{phase.phase}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-start mb-6 border-t-1 pt-5 border-gray-200 rounded-t-lg">
                                <button
                                    type="button"
                                    className="flex flex-row space-x-4 items-center justify-center cursor-pointer bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => phaseEditorActivate()}
                                    disabled={expedientPhases.length === 0}
                                >
                                    <Edit className="w-5 h-5" />
                                    <p>Editar fase</p>
                                </button>
                            </div>

                            {phaseSelected && (
                                <div className="grid grid-cols-6 gap-4 p-2">
                                    <div className="col-span-2 space-y-2">
                                        <div className="">
                                            <p className="text-sm text-gray-500"> Nº Fase</p>
                                            <p className="font-medium">{phaseSelected?.phase || "-"}</p>
                                        </div>
                                        <div className="">
                                            <p className="text-sm text-gray-500">Fecha de Registro</p>
                                            <p className="font-medium">
                                                {phaseSelected?.record_date ?
                                                    format(new Date(phaseSelected.record_date), "dd 'de' MMM, yyyy") :
                                                    "-"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Estado</p>
                                            {phaseSelected.state == 'signed' ? (
                                                <p className="font-medium">Visado</p>
                                            ) : (
                                                <p className="font-medium">Sin visar</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Fecha de Visado</p>
                                            {phaseSelected.state == 'signed' ? (
                                                <p className="font-medium">
                                                    {phaseSelected?.sign_date ?
                                                        format(new Date(phaseSelected?.sign_date), "dd 'de' MMM, yyyy") :
                                                        "-"}
                                                </p>
                                            ) : <p className="font-medium">Aun no hay fecha</p>}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Visador</p>
                                        {(() => {
                                            const users = phaseSelected.documents.reduce((acc, doc) => {
                                                if (doc.user && !acc.includes(doc.user.name)) acc.push(doc.user.name);
                                                return acc;
                                            }, []);

                                            return users.length > 0
                                                ? users.map((name, index) => (
                                                    <p key={index} className="font-medium">{name}</p>
                                                ))
                                                : <p className="font-medium">No tiene visador</p>;
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-2">
                        <div className="p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 mb-6 border-b-1 pb-4 border-gray-200">
                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Documentos asociados</h3>
                                </div>
                                <div>
                                    {user?.roles.map(u => u.name == "visor") ? (
                                        <button
                                            type="button"
                                            onClick={signSelectedDocuments}
                                            className="flex flex-row space-x-4 items-center justify-center cursor-pointer bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                            disabled={documentsToSign.length === 0}
                                        >
                                            <Edit className="w-5 h-5" />
                                            <p>Visar</p>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="flex flex-row space-x-4 items-center justify-center cursor-pointer bg-blue-700 text-white rounded-md py-2 px-4 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                            disabled
                                        >
                                            <Edit className="w-5 h-5" />
                                            <p>Visar</p>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 mb-10">
                                {phaseSelected ? (
                                    filteredDocuments.length > 0 ? (
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {filteredDocuments.map((expedientDoc) => (
                                                expedientDoc.documents.map(document => {
                                                    console.log(document);
                                                    //abro console log
                                                    return (
                                                    <div key={document.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="flex items-center space-x-2">
                                                            {!document.user_id ? (
                                                                <>
                                                                    {user?.roles.map(u => u.name == "visor") ? (
                                                                        <>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={documentsToSign.includes(document.id)}
                                                                                onChange={() => onToggleDocument(document.id)}
                                                                                disabled={document.user_id}
                                                                                className="form-checkbox h-4 w-4 text-blue-600"
                                                                            />
                                                                            <label className="text-sm text-gray-700">Seleccionar</label>
                                                                        </>
                                                                    ) : ""}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={true}
                                                                        disabled={true}
                                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                                    />
                                                                    <label className="text-sm text-gray-700">Visado</label>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-row items-center justify-between p-4">
                                                            <a
                                                                href={document.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-start gap-3 cursor-pointer"
                                                            >
                                                                <div className="mt-0.5 p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                                    <File className="w-5 h-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium text-gray-900 truncate w-20 text-ellipsis overflow-hidden">{document.name}</p>
                                                                    <p className="text-xs text-gray-500 mt-1">Fase {expedientDoc.phase.phase}</p>
                                                                </div>
                                                            </a>
                                                            <div className="bg-white text-white  shadow-xl p-1 rounded-md cursor-pointer" onClick={() => deleteActive(document.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="  fill-red-500 size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    //Cierre console log
                                                    );
                                                })
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No hay documentos en esta fase
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Selecciona una fase para ver sus documentos
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerExpediente;
