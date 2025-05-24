import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Auth";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useDocument } from "../../../store/contexts/DocumentContext";
import { useClient } from "../../../store/contexts/ClientContext";
import { useCollegiate } from "../../../store/contexts/CollegiateContext";
import PhaseSelector from "../../../components/modals/crud/PhaseSelector";
import DocumentSelector from "../../../components/modals/crud/DocumentSelector";
import WebLoader from "../../../routes/loaders/WebLoader";
import axios from "../../../lib/axios";
import TitleCard from "../../../components/ui/TitleCard";

const EditarExpediente = () => {
    const params = useParams();
    const { user } = useAuth({ middleware: 'auth' });
    const { expedients, updateExpedient } = useExpedient();
    const { phases, createPhase, getPhaseTitles } = usePhase();
    const { documents, multiUploadDocuments } = useDocument();
    const { clients } = useClient();
    const { collegiates } = useCollegiate();
    const navigate = useNavigate();
    const [expedient, setExpedient] = useState(null);
    const [modalPhase, setModalPhase] = useState(false);
    const [modalPhaseType, setModalPhaseType] = useState("");
    const [modalDocument, setModalDocument] = useState(false);
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [expedientDocuments, setExpedientDocuments] = useState([]);
    const [documentsPhase, setDocumentsPhase] = useState(null);
    const [expedientPeople, setExpedientPeople] = useState([]);

    useEffect(() => {
        if (expedients) setExpedient(expedients.find(e => e.id == params.id));
    }, [expedients]);

    useEffect(() => {
        if (phases && expedient) {
            setExpedientPhases(phases.filter(phase => phase.expedient_id == expedient.id));
            setExpedientPeople(expedient.people.map(person => {
                return { id: person.id, role: person.pivot.role }
            }
            ));
            console.log(expedient.people[0].pivot);
        };
    }, [phases, expedient]);

    useEffect(() => {
        if (expedientPhases) {
            setExpedientDocuments(documents.filter(document =>
                expedientPhases.find(phase => phase.id === document.phase_id)
            ));
        };
    }, [expedientPhases]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let satisfy = false;

        switch (name) {
            case "number":
                if (/^\d{0,10}$/.test(value)) {
                    satisfy = true;
                }
                break;
            case "postal_code":
                if (/^\d{0,5}$/.test(value)) {
                    satisfy = true;
                }
                break;
            case "budget":
                if (/^\d{0,9}(\.\d{0,2})?$/.test(value)) {
                    // Evitar múltiples puntos decimales
                    const decimalParts = value.split('.');
                    if (decimalParts.length <= 2) {
                        satisfy = true;
                    }
                }
                break;
            case "clients":
                if (value != "" && !expedientPeople.some(client => client.id == value)) {
                    const client = { id: parseInt(value), role: "client" };
                    setExpedientPeople([...expedientPeople, client]);
                }
                break;
            case "collegiates":
                if (value != "" && !expedientPeople.some(collegiate => collegiate.id == value)) {
                    const collegiate = { id: parseInt(value), role: "collegiate" };
                    setExpedientPeople([...expedientPeople, collegiate]);
                }
                break;
            default:
                satisfy = true;
                break;
        }

        if (satisfy) setExpedient(prev => ({ ...prev, [name]: value }));
    };

    const phaseSelectorActivate = useCallback((type) => {
        if (!modalPhase) {
            setModalPhase(true);
            setModalPhaseType(type);
        }
    }, [modalPhase]);

    const documentSelectorActivate = useCallback((phase) => {
        if (!modalDocument && phase) {
            setDocumentsPhase(phase);
            setModalDocument(true);
        }
    }, [modalDocument]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const newExpedient = Object.fromEntries(formData.entries());
        newExpedient.budget = parseFloat(newExpedient.budget);

        const oldExpedient = expedients.find(e => e.id == params.id);

        try {
            if (newExpedient.end_date && newExpedient.start_date > newExpedient.end_date) return alert("Error en las fechas");
            if (oldExpedient.number != newExpedient.number && expedients.find(e => e.number === newExpedient.number)) {
                return alert("El número de expediente seleccionado ya existe");
            }

            await axios.get("/sanctum/csrf-cookie");
            await updateExpedient(params.id, newExpedient);

            const newPhases = expedientPhases.filter(phase => !phase.id || !phase.expedient_id);

            const phasesData = await getPhaseTitles({ expedientPhases: newPhases, expedientId: params.id });

            const createPromises = phasesData.map(phase => createPhase(phase));
            await Promise.all(createPromises);

            const oldPhases = phases
                .filter(phase => phase.expedient_id == expedient.id)
                .filter(oldPhase => !expedientPhases.some(phase => phase == oldPhase));

            const deletePromises = oldPhases.map(async phase => await axios.delete(`api/phase/${phase.id}`));
            await Promise.all(deletePromises);

            // Filtrar los documentos que no existen por la id y la phase_id de document
            const newDocuments = expedientDocuments.filter(document => !document.id || !document.phase_id);
            await multiUploadDocuments(newDocuments, params.id);

            await axios.post(`api/expedients/${params.id}/people`, { people: expedientPeople });

            navigate('/expedientes');
            navigate(0);
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    };

    if (
        !expedient || !expedientPhases || !expedientPeople || !expedient.start_date
        || !user || !clients || !collegiates
    ) return <WebLoader />;

    expedient.start_date = new Date(expedient.start_date).toISOString().slice(0, 16);
    expedient.end_date = new Date(expedient.end_date).toISOString().slice(0, 16) || null;

    console.log(user);
    console.log(expedient);

    return (
        <>
            <div className="h-full overflow-y-scroll">
                <TitleCard name={"Expedientes"} action={"Editar"} />
                {modalPhase && <PhaseSelector expedientPhases={expedientPhases} setExpedientPhases={setExpedientPhases} setModalPhase={setModalPhase} inputName={modalPhaseType} />}
                {modalDocument && <DocumentSelector phase={documentsPhase} setModalDocument={setModalDocument} expedientDocuments={expedientDocuments} setExpedientDocuments={setExpedientDocuments} />}
                <form className="mb-10" method="POST" onSubmit={handleSubmit}>
                    <div className="p-2">
                        <h4 className="text-3xl text-gray-400">Datos Generales</h4>
                        <p className="mb-5 text-gray-400">El * indica los campos obligatorios</p>
                        <div className="grid grid-cols-12 gap-4 p-4">
                            {/* Cada div ocupa 4 columnas (12/3 = 4 columnas por elemento) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Nombre Proyecto
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.title} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Número
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    id="number"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={10} maxLength={10} value={expedient.number} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.description} onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Presupuesto
                                </label>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.budget} onChange={handleInputChange} min={0} step="0.01" required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="site" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Emplazamiento
                                </label>
                                <input
                                    type="text"
                                    name="site"
                                    id="site"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.site} onChange={handleInputChange} required
                                />
                            </div>

                            {/* Ejemplos adicionales (puedes agregar más campos) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={5} maxLength={5} value={expedient.postal_code} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                    <strong>*</strong> Fecha Inicial
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    id="start_date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.start_date} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                    Fecha Final
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    id="end_date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.end_date} onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h4 className="text-3xl text-gray-400 mb-5">Fases</h4>
                        <div className="flex space-x-2">
                            <button type="button" onClick={() => phaseSelectorActivate("new_phase")} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 bg-blue-700 text-white rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                            {expedientPhases.map(phase => {
                                return (
                                    <button type="button" key={phase.phase}
                                        className="bg-blue-700 text-white rounded-full py-2 px-6 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
                                        onClick={() => documentSelectorActivate(phase.phase)}>{phase.phase}</button>
                                );
                            })}
                            <button type="button" onClick={() => phaseSelectorActivate("old_phase")} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 bg-blue-700 text-white rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4 grid grid-cols-2">
                        <div className="text-center">
                            <h4 className="text-3xl text-gray-400 mb-5">Colegiados</h4>
                            <select name="collegiates" id="collegiates" onChange={handleInputChange} className="p-2 border border-gray-300 rounded-md">
                                <option value=""></option>
                                {collegiates.map(collegiate => {
                                    return (
                                        <option key={collegiate.id} value={collegiate.id}>
                                            {collegiate.name} {collegiate.first_surname}
                                        </option>
                                    );
                                })}
                            </select>
                            {expedientPeople.length > 0 && (
                                <div className="mt-6 text-md text-gray-600 w-1/2 text-center flex flex-col justify-center">
                                    {expedientPeople.filter(collegiate => collegiate.role == "collegiate").map(collegiateData => {
                                        const collegiate = collegiates.find(c => c.id === collegiateData.id);
                                        return collegiate ? (
                                            <div key={collegiateData.id} className="flex justify-between p-2 border border-gray-300 rounded-md">
                                                <p>{collegiate.name} {collegiate.first_surname}</p>
                                                <p className="cursor-pointer" onClick={() => setExpedientPeople(expedientPeople.filter(oldCollegiate => oldCollegiate != collegiateData))}>X</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl text-gray-400 mb-5">Clientes</h4>
                            <select name="clients" id="clients" onChange={handleInputChange} className="p-2 border border-gray-300 rounded-md">
                                <option value=""></option>
                                {clients.map(client => {
                                    return (
                                        <option key={client.id} value={client.id}>
                                            {client.name} {client.first_surname}
                                        </option>
                                    );
                                })}
                            </select>
                            {expedientPeople.length > 0 && (
                                <div className="mt-6 text-md text-gray-600 w-1/2 text-center flex flex-col justify-center">
                                    {expedientPeople.filter(client => client.role == "client").map(clientData => {
                                        const client = clients.find(c => c.id === clientData.id);
                                        return client ? (
                                            <div key={clientData.id} className="flex justify-between p-2 border border-gray-300 rounded-md">
                                                <p>{client.name} {client.first_surname}</p>
                                                <p className="cursor-pointer" onClick={() => setExpedientPeople(expedientPeople.filter(oldClient => oldClient != clientData))}>X</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <input type="hidden" name="center_id" value={user.center_id} />
                    <div className="text-center mt-5">
                        <button type="submit" className="bg-blue-600 text-white rounded-full py-2 px-6 w-2/3">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarExpediente;