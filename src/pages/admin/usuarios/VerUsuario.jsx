import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { Mail, Building, Shield, Calendar, User } from "lucide-react";
import TitleCard from "../../../components/ui/TitleCard";

const VerUsuario = () => {
    const params = useParams();
    const { views } = CrudManager({ url: `users/${params.id}` });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setUser, setLoading, setErrors: setError });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">Error al cargar el usuario: {error}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!user) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <>
            <TitleCard name={"Usuarios"} action={"Ver"} />
            <div className="h-full overflow-y-scroll mt-4 pb-10">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-100 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-white text-4xl font-bold">
                                    {user?.name?.charAt(0)}
                                </div>
                                <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium bg-purple-100 text-purple-800">
                                        {user?.roles?.[0]?.name || 'Sin rol asignado'}
                                    </span>
                                    {user.created_at && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                            Registrado el {formatDate(user.created_at)}
                                        </span>
                                    )}
                                </div>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Correo electrónico</p>
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {user.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nombre Completo</p>
                                        <p
                                            className="font-medium text-black"
                                        >
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                    <Building className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Organización</h3>
                            </div>

                            <div className="space-y-4">
                                {user.center && (
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            <Building className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Centro asignado</p>
                                            <p className="font-medium">{user.center.name}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Shield className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Rol del sistema</p>
                                        <p className="font-medium">{user?.roles?.[0]?.name || 'No asignado'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Fechas</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Fecha de creación</p>
                                <p className="font-medium">{formatDate(user.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Última actualización</p>
                                <p className="font-medium">{formatDate(user.updated_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerUsuario;