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
import InputForm from "../../../components/ui/InputForm";

const EditarExpediente = () => {
    const params = useParams();
    const { user } = useAuth({ middleware: 'auth' });
    const { expedients, updateExpedient, error: expedientError } = useExpedient();
    const { phases, createPhase, getPhaseTitles } = usePhase();
    const { documents, multiUploadDocuments } = useDocument();
    const { clients, clientsLoading } = useClient();
    const { collegiates, collegiatesLoading } = useCollegiate();
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [expedient, setExpedient] = useState(null);
    const [modalPhase, setModalPhase] = useState(false);
    const [errors, setErrors] = useState(false);
    const [errors2, setErrors2] = useState(false);
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
                if (/^\d{0,7}(\.\d{0,2})?$/.test(value)) {
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
        setClick(true);

        const formData = new FormData(e.target);

        const newExpedient = Object.fromEntries(formData.entries());
        newExpedient.budget = parseFloat(newExpedient.budget);

        const oldExpedient = expedients.find(e => e.id == params.id);

        try {
            if (newExpedient.end_date && newExpedient.start_date > newExpedient.end_date) {
                setClick(false);
                return setErrors2("La fecha de inicio no puede ser posterior a la fecha de finalización");
            }
            if (oldExpedient.number != newExpedient.number && expedients.find(e => e.number === newExpedient.number)) {
                setClick(false);
                return setErrors("El número de expediente seleccionado ya existe");
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

            const newDocuments = expedientDocuments.filter(document => !document.id || !document.phase_id);
            await multiUploadDocuments(newDocuments, params.id);

            await axios.post(`api/expedients/${params.id}/people`, { people: expedientPeople });

            navigate('/expedientes');
            navigate(0);
        } catch (error) {
            setClick(false);
            console.error("Error al actualizar expediente:", error);
        }
    };

    if (
        !expedient ||
        !expedientPhases ||
        !expedientPeople ||
        !expedient?.start_date ||
        !user ||
        !clients ||
        !collegiates
    ) return <WebLoader />;

    expedient.start_date = expedient?.start_date ? new Date(expedient.start_date).toISOString().slice(0, 10) : '';
    expedient.end_date = expedient?.end_date ? new Date(expedient.end_date).toISOString().slice(0, 10) : '';


    console.log(user);
    console.log(expedient);

    return (
        <>
            <div className="h-full overflow-y-hidden">
                <TitleCard name={"Expedientes"} action={"Crear"} />
                {modalPhase && <PhaseSelector expedientPhases={expedientPhases} setExpedientPhases={setExpedientPhases} setModalPhase={setModalPhase} inputName={modalPhaseType} />}
                {modalDocument && <DocumentSelector phase={documentsPhase} setModalDocument={setModalDocument} expedientDocuments={expedientDocuments} setExpedientDocuments={setExpedientDocuments} />}
                <form className="h-full flex flex-col gap-4 mt-2" method="POST" onSubmit={handleSubmit}>
                    <div className="flex-1 overflow-y-scroll flex flex-col">
                        <div className="">
                            <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                                <p>Datos Expediente</p>
                            </div>
                            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                                <InputForm
                                    onChange={handleInputChange}
                                    errors={expedientError?.response?.data?.errors?.title}
                                    type={"text"}
                                    name={"title"}
                                    placeholder={"Titulo"}
                                    value={expedient?.title || ''}
                                    required
                                />

                                <div>
                                    <InputForm
                                        onChange={handleInputChange}
                                        type="text"
                                        errors={expedientError?.response?.data?.errors?.number}
                                        name="number"
                                        placeholder="Número"
                                        value={expedient?.number || ''}
                                        minLength={10}
                                        maxLength={10}
                                        className={errors ? "border-red-500 bg-red-200" : "border-gray-400"}
                                        required
                                    />
                                    <p className="text-red-500">{errors}</p>
                                </div>
                                <InputForm
                                    onChange={handleInputChange}
                                    type="text"
                                    errors={expedientError?.response?.data?.errors?.description}
                                    name="description"
                                    placeholder="Descripción"
                                    value={expedient?.description || ''}
                                />

                                <InputForm
                                    onChange={handleInputChange}
                                    errors={expedientError?.response?.data?.errors?.budget}
                                    type="number"
                                    name="budget"
                                    placeholder="Presupuesto"
                                    value={expedient?.budget || ''}
                                    min={0}
                                    step="0.01"
                                    required
                                />

                                <InputForm
                                    onChange={handleInputChange}
                                    errors={expedientError?.response?.data?.errors?.site}
                                    type="text"
                                    name="site"
                                    placeholder="Emplazamiento"
                                    value={expedient?.site || ''}
                                    required
                                />

                                <InputForm
                                    onChange={handleInputChange}
                                    type="text"
                                    errors={expedientError?.response?.data?.errors?.postal_code}
                                    name="postal_code"
                                    placeholder="Código Postal"
                                    value={expedient?.postal_code || ''}
                                    minLength={5}
                                    maxLength={5}
                                    required
                                />

                                <InputForm
                                    onChange={handleInputChange}
                                    type="date"
                                    errors={expedientError?.response?.data?.errors?.start_date}
                                    name="start_date"
                                    placeholder="Fecha Inicial"
                                    value={expedient?.start_date || ''}
                                    className={errors2 ? 'border-red-500 bg-red-200' : ''}
                                    required
                                />

                                <InputForm
                                    onChange={handleInputChange}
                                    type="date"
                                    errors={expedientError?.response?.data?.errors?.end_date}
                                    name="end_date"
                                    placeholder="Fecha Final"
                                    className={errors2 ? 'border-red-500 bg-red-200' : ''}
                                    value={expedient?.end_date || ''}
                                />

                            </div>
                            <p className="text-red-500"> {errors2}</p>
                        </div>

                        <div overflow-y-scrolliv className="">
                            <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                                <p>Datos Fase</p>
                            </div>
                            <div className="grid grid-cols-2 space-x-2">
                                <button type="button" onClick={() => phaseSelectorActivate("new_phase")} className="flex flex-row items-center justify-center py-1.5 px-2.5 bg-red-900/90 hover:bg-red-700/90 transition-all space-x-2 text-white rounded-sm cursor-pointer">
                                    <p className="text-lg">Añadir Fases</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                                <button type="button" onClick={() => phaseSelectorActivate("old_phase")} className="flex flex-row items-center justify-center py-1.5 px-2.5 bg-red-900/90 hover:bg-red-700/90 transition-all space-x-2 text-white rounded-sm cursor-pointer">
                                    <p className="text-lg" >Quitar Fase</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 grid-cols-1  gap-2 pt-2">
                                {expedientPhases?.map(phase => {
                                    return (
                                        <button type="button" key={phase.phase}
                                            className="bg-rose-900 text-white rounded-md text-center font-medium py-2 px-6 hover:bg-rose-500 focus:ring-2"
                                            onClick={() => documentSelectorActivate(phase.phase)}>{phase.phase}</button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mt-5 mb-4">
                            <p>Personas</p>
                        </div>
                        <div className="p-4 grid sm:grid-cols-2 sm:space-x-5">
                            <div className="flex flex-col items-center justify-center space-x-2">
                                <h4 className="p-2 text-md w-full font-medium text-gray-800">Colegiados</h4>
                                {collegiatesLoading ? <div className="flex justify-center items-center ">
                                    <svg className="size-9 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div> :
                                    <>
                                        <select name="collegiates" id="collegiates" onChange={handleInputChange} className="p-2 border-b-2 border-gray-400 bg-gray-200/50 pt-3 rounded-t-md w-full focus:bg-red-50 focus:border-red-800">
                                            <option value="" >...</option>
                                            {collegiates?.map(collegiate => {
                                                return (
                                                    <option key={collegiate.id} value={collegiate.id}>
                                                        {collegiate.name} {collegiate.first_surname}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {expedientPeople?.length > 0 && (
                                            <div className="mt-6 text-md text-gray-600 w-full text-nowrap text-center flex flex-col justify-center">
                                                {expedientPeople?.filter(collegiate => collegiate.role == "collegiate").map(collegiateData => {
                                                    const collegiate = collegiates?.find(c => c.id === collegiateData.id);
                                                    return collegiate ? (
                                                        <div key={collegiateData.id} className="flex items-center justify-between p-2 border-b-2 border-gray-300 rounded-t-md bg-gray-50 mb-1">
                                                            <p>{collegiate.name} {collegiate.first_surname}</p>
                                                            <p className="cursor-pointer" onClick={() => setExpedientPeople(expedientPeople.filter(oldCollegiate => oldCollegiate != collegiateData))}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                </svg>

                                                            </p>
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    </>
                                }
                            </div>
                            <div className="flex flex-col items-center justify-center space-x-2">
                                <h4 className="p-2 text-md w-full font-medium text-gray-800">Clientes</h4>
                                {clientsLoading ? <div className="flex justify-center items-center ">
                                    <svg className="size-9 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div> :
                                    <>
                                        <select name="clients" id="clients" onChange={handleInputChange} className="p-2 border-b-2 border-gray-400 bg-gray-200/50 pt-3 rounded-t-md w-full focus:bg-red-50 focus:border-red-800">
                                            <option value="">...</option>
                                            {clients?.map(client => {
                                                return (
                                                    <option key={client.id} value={client.id}>
                                                        {client.name} {client.first_surname}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {expedientPeople?.length > 0 && (
                                            <div className="mt-6 text-md text-gray-600 w-full text-nowrap text-center flex flex-col justify-center">
                                                {expedientPeople?.filter(client => client.role == "client").map(clientData => {
                                                    const client = clients.find(c => c.id === clientData.id);
                                                    return client ? (
                                                        <div key={clientData.id} className="flex items-center justify-between p-2 border-b-2 border-gray-300 rounded-t-md bg-gray-50 mb-1">
                                                            <p>{client.name} {client.first_surname}</p>
                                                            <p className="cursor-pointer" onClick={() => setExpedientPeople(expedientPeople.filter(oldClient => oldClient != clientData))}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                </svg>
                                                            </p>
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                        <input type="hidden" name="center_id" className="hidden" value={user?.center_id} />
                    </div>

                    <div className="text-center w-full sm:mb-11.5 mb-15 gap-2 lg:mx-0">
                        <button type="submit" className="w-full px-4 py-2 bg-red-900 text-white hover:bg-red-300 hover:text-red-900 font-medium rounded cursor-pointer transition-all">
                            {click ?
                                <div className="flex justify-center items-center ">
                                    <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                : "Enviar"}
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default EditarExpediente;