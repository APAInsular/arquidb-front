import { Link, useNavigate } from "react-router-dom";
import PhaseSelector from "../../../components/modals/crud/PhaseSelector";
import DocumentSelector from "../../../components/modals/crud/DocumentSelector";
import { useExpedient } from "../../../store/contexts/ExpedientContext";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useState, useCallback } from "react";
import axios from "../../../lib/axios";
import TitleCard from "../../../components/ui/TitleCard";

const CrearExpediente = () => {
    const [modalPhase, setModalPhase] = useState(false);
    const [modalPhaseType, setModalPhaseType] = useState("");
    const [modalDocument, setModalDocument] = useState(false);
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [documentsPhase, setDocumentsPhase] = useState(null);
    const navigate = useNavigate();
    const { createExpedient } = useExpedient();
    const { createPhase } = usePhase();

    const [expedient, setExpedient] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "number":
                // Validación mejorada para el formato XX-XXXXX
                if (value.length <= 8) {
                    const isValid = (
                        (value.length < 3 && /^\d*$/.test(value)) ||
                        (value.length === 3 && /^\d{2}-?$/.test(value)) ||
                        (value.length > 3 && /^\d{2}-\d*$/.test(value))
                    );
                    if (isValid) {
                        setExpedient(prev => ({ ...prev, [name]: value }));
                    }
                }
                break;
            case "postal_code":
                if (/^\d*$/.test(value) && value.length <= 5) {
                    setExpedient(prev => ({ ...prev, [name]: value }));
                }
                break;
            case "budget":
                if (/^\d*$/.test(value) && (value === '' || parseInt(value) >= 0)) {
                    setExpedient(prev => ({ ...prev, [name]: value }));
                }
                break;
            default:
                setExpedient(prev => ({ ...prev, [name]: value }));
                break;
        }
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

        console.log(newExpedient);

        try {
            if (newExpedient.start_date > newExpedient.end_date) return alert("Error en las fechas");

            await axios.get("/sanctum/csrf-cookie");
            let response = await createExpedient(newExpedient);

            console.log(response.data.id);

            const newPhases = expedientPhases.map(phase => {
                let title = "";

                if (phase.phase.slice(0, 3) == '911') title = "Plan Parcial";
                else if (phase.phase.slice(0, 2) == '31') title = "Minuta A/C de Proyecto básico";
                else if (phase.phase.slice(0, 2) == '45') title = "Proyecto de ejecución - Proyectos parciales";
                else if (phase.phase.slice(0, 2) == '55') title = "Proyecto básico + Ejecución - Proyectos parciales";
                else if (phase.phase.slice(0, 2) == '62') title = "Libro de órdenes";
                else if (phase.phase.slice(0, 2) == '64') title = "Minutas A/C de Dirección de obras";
                else if (phase.phase.slice(0, 2) == '78') title = "Anexos a proyectos";
                else if (phase.phase.slice(0, 2) == '85') title = "Certificios";
                else if (phase.phase.slice(0, 2) == '92') title = "Plan General";
                else if (phase.phase.slice(0, 2) == '93') title = "Normas subsidiarias";
                else if (phase.phase.slice(0, 2) == '94') title = "Proyecto de urbanización";
                else if (phase.phase.slice(0, 2) == '95') title = "Plan especial";
                else if (phase.phase.slice(0, 2) == '96') title = "Informes";
                else if (phase.phase.slice(0, 2) == '97') title = "Varios urbanismo";
                else if (phase.phase.slice(0, 2) == '98') title = "Otros";
                else if (phase.phase.slice(0, 1) == '0') title = "Contrato o Comunicación de encargo";
                else if (phase.phase.slice(0, 1) == '1') title = "Estudios previos";
                else if (phase.phase.slice(0, 1) == '2') title = "Anteproyecto";
                else if (phase.phase.slice(0, 1) == '3') title = "Proyecto básico";
                else if (phase.phase.slice(0, 1) == '4') title = "Proyecto de ejecución";
                else if (phase.phase.slice(0, 1) == '5') title = "Proyecto básico + Ejecución";
                else if (phase.phase.slice(0, 1) == '6') title = "Certificado Parcial";
                else if (phase.phase.slice(0, 1) == '7') title = "Certificado final";
                else if (phase.phase.slice(0, 1) == '8') title = "Ampliación, Reformados y Acondicionamientos";
                else if (phase.phase.slice(0, 1) == '9') title = "Estudio de detalles";

                return { ...phase, title: title, expedient_id: response.data.id };
            })

            console.log(newPhases);

            for (const phase of newPhases) {
                await createPhase(phase);
            };

            navigate('/expedientes');
            navigate(0);
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    };

    console.log(expedientPhases);

    return (
        <>
            <div>
                <TitleCard name="Crear expediente" link="/expedientes" />
                {modalPhase && <PhaseSelector expedientPhases={expedientPhases} setExpedientPhases={setExpedientPhases} setModalPhase={setModalPhase} inputName={modalPhaseType} />}
                {modalDocument && <DocumentSelector phase={documentsPhase} setModalDocument={setModalDocument} />}
                <form className="mb-10" method="POST" onSubmit={handleSubmit}>
                    <div className="p-2">
                        <h4 className="text-3xl text-gray-400">Datos Generales</h4>
                        <div className="grid grid-cols-12 gap-4 p-4">
                            {/* Cada div ocupa 4 columnas (12/3 = 4 columnas por elemento) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Nombre Proyecto
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.title || ''} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    id="number"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={8} maxLength={8} value={expedient.number || ''} onChange={handleInputChange} required
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
                                    value={expedient.description || ''} onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                                    Presupuesto
                                </label>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.budget || ''} onChange={handleInputChange} min={0} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="site" className="block text-sm font-medium text-gray-700">
                                    Emplazamiento
                                </label>
                                <input
                                    type="text"
                                    name="site"
                                    id="site"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.site || ''} onChange={handleInputChange} required
                                />
                            </div>

                            {/* Ejemplos adicionales (puedes agregar más campos) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    id="postal_code"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={5} maxLength={5} value={expedient.postal_code || ''} onChange={handleInputChange} required
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                    Fecha Inicial
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    id="start_date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.start_date || ''} onChange={handleInputChange} required
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
                                    value={expedient.end_date || ''} onChange={handleInputChange} required
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
                    <input type="hidden" name="center_id" value={1} />
                    <div className="text-center">
                        <button type="submit" className="bg-blue-600 text-white rounded-full py-2 px-6 w-2/3">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CrearExpediente;