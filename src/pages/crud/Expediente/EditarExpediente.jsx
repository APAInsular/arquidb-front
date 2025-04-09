import { Link, useNavigate, useParams } from "react-router-dom";
import PhaseSelector from "../../../components/modals/crud/PhaseSelector";
import DocumentSelector from "../../../components/modals/crud/DocumentSelector";
import { usePhase } from "../../../store/contexts/PhaseContext";
import { useExpedient } from "../../../store/contexts/ExpedientContenxt";
import { useState, useCallback, useEffect } from "react";
import axios from "../../../lib/axios";

const EditarExpediente = () => {
    const params = useParams();
    const { expedients } = useExpedient();
    const { phases } = usePhase();
    const navigate = useNavigate();
    const [expedient, setExpedient] = useState({});
    const [modalPhase, setModalPhase] = useState(false);
    const [modalDocument, setModalDocument] = useState(false);
    const [expedientPhases, setExpedientPhases] = useState([]);
    const [documentsPhase, setDocumentsPhase] = useState(null);

    useEffect(() => {
        if (expedients) setExpedient(expedients.find(e => e.id == params.id));
    }, [expedients]);

    if (!expedient) return <h1>Cargando...</h1>

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

    const phaseSelectorActivate = useCallback(() => {
        if (!modalPhase) setModalPhase(true);
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
            await axios.put(`/api/expedient/${params.id}`, newExpedient);
            navigate('/expedientes');
            navigate(0);
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    };

    if (!expedient.start_date || !expedient.end_date) return <h1>Cargando...</h1>

    expedient.start_date = new Date(expedient.start_date).toISOString().slice(0, 19);
    expedient.end_date = new Date(expedient.end_date).toISOString().slice(0, 19);

    console.log(expedient);

    return (
        <>
            <div>
                <div className="flex justify-between border-b p-2">
                    <Link to="/expedientes" className="text-5xl">←</Link>
                    <h3 className="text-5xl">Crear expediente</h3>
                </div>
                {modalPhase && <PhaseSelector expedientPhases={expedientPhases} setExpedientPhases={setExpedientPhases} setModalPhase={setModalPhase} />}
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
                                    value={expedient.title} onChange={handleInputChange} required
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
                                    minLength={8} maxLength={8} value={expedient.number} onChange={handleInputChange} required
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
                                    Presupuesto
                                </label>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={expedient.budget} onChange={handleInputChange} min={0} required
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
                                    value={expedient.site} onChange={handleInputChange} required
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
                                    minLength={5} maxLength={5} value={expedient.postal_code} onChange={handleInputChange} required
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
                                    value={expedient.end_date} onChange={handleInputChange} required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h4 className="text-3xl text-gray-400 mb-5">Fases</h4>
                        <div className="flex space-x-2">
                            <button type="button" onClick={() => phaseSelectorActivate()} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 bg-blue-700 text-white rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                            {expedientPhases.map(phase => {
                                return (
                                    <button type="button" key={phase}
                                        className="bg-blue-700 text-white rounded-full py-2 px-6 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
                                        onClick={() => documentSelectorActivate(phase)}>{phase}</button>
                                );
                            })}
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

export default EditarExpediente;