import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { FileText, Calendar, CheckCircle, Clock, Download, AlertCircle, File } from "lucide-react";
import TitleCard from "../../../components/ui/TitleCard";
import PulseLoader from "../../../routes/loaders/PulseLoader";
import WebError from "../../../routes/errors/WebError";

const VerFase = () => {
    const params = useParams();
    const { views } = CrudManager({ url: `phase/${params.id}` });

    const [phase, setPhase] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setPhase, setLoading, setErrors: setError });
    }, []);

    if (loading) { return <PulseLoader /> };
    if (error) { return <WebError /> };

    if (!phase) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const getStateBadge = (state) => {
        if (state === 'signed') {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Firmada
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <Clock className="w-4 h-4 mr-1" />
                Pendiente de firma
            </span>
        );
    };

    return (
        <>
            <TitleCard name={"Fases"} action={"Ver"} />
            <div className="mt-4 h-full overflow-y-scroll">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-14">
                    <div className=" bg-gray-100 p-6 sm:p-8 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-gray-200 text-gray-700">
                                        <FileText className="w-17 h-17" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        <span className="text-blue-400">{phase.phase}</span> <span className="text-gray-300">/</span> {phase.title}
                                    </h2>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    {getStateBadge(phase.state)}
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-1.5" />
                                        <span>Registrada el {formatDate(phase.record_date)}</span>
                                    </div>
                                    {phase.state === 'signed' && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" />
                                            <span>Firmada el {formatDate(phase.sign_date)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-6 sm:p-8 md:col-span-2">
                            <div className="space-y-6">
                                {phase.observations && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 ">Observaciones</h3>
                                        <div className=" max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {phase.observations}
                                        </div>
                                    </div>
                                )}

                                {phase.objections && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Objecciones</h3>
                                        <div className=" max-w-none text-gray-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                            {phase.objections}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-0 p-6 sm:p-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b-1 border-gray-300 pb-2 px-2">Información de la Fase</h3>
                                    <div className="space-y-3 px-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Código de Fase</p>
                                            <p className="font-medium">{phase.phase}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Estado</p>
                                            <div className="mt-1">
                                                {getStateBadge(phase.state)}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Fecha de registro</p>
                                            <p className="font-medium">{formatDate(phase.record_date)}</p>
                                        </div>
                                        {phase.state === 'signed' && (
                                            <div>
                                                <p className="text-sm text-gray-500">Fecha de firma</p>
                                                <p className="font-medium">{formatDate(phase.sign_date)}</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm text-gray-500">Expediente de procedencía</p>
                                            <Link to={`/expedientes/${phase.expedient_id}/show`} className=" hover:text-blue-400 hover:underline font-medium">Nº {phase.expedient_id}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {phase.documents && phase.documents.length > 0 && (
                        <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <File className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Documentos asociados</h3>
                                </div>
                                <span className="text-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {phase.documents.length} documento{phase.documents.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {phase.documents.map((doc, index) => (
                                    <div key={index} className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                                    <p className="text-xs text-gray-500 mt-1">Documento {index + 1}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end">
                                                <a
                                                    href={`/api/documents/${doc.id}/download`}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    download
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Descargar
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerFase;