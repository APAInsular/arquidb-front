import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { Mail, Phone, MapPin, UserCircle2, Calendar, Info, Home, Globe, Navigation, UserCircle } from "lucide-react";
import TitleCard from "../../../components/ui/TitleCard";

const VerCliente = () => {

    const params = useParams();
    const { views } = CrudManager({ url: `personClient/${params.id}` });

    const [clients, setClient] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setClient, setLoading, setErrors: setError });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
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
                        <p className="text-sm text-red-700">Error al cargar el cliente: {error}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const person = clients?.person || {};
    const address = clients?.address || {};
    const agent = clients?.client?.[0]?.agent || "-";

    console.log(clients)

    return (
        <>
            {/* Main Card */}
            <TitleCard name={"Clientes"} action={"Ver"} />
            <div className="h-full overflow-y-scroll">
                <div className=" mt-5 rounded-t-lg  p-6 sm:p-14">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative">
                            <div className="text-gray-600 bg-gray-200 rounded-xl p-2">
                                <UserCircle className="w-30 h-30 " />
                            </div>
                            <span className="absolute -bottom-[-5px] -right-[-5px] bg-gray-600 rounded-full p-1 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-5xl font-bold text-black">
                                {person?.name} {person?.first_surname} {person?.second_surname}
                            </h2>
                            <p className="text-gray-900 mt-1 text-xl">
                                {person?.identification_type} / {person?.identification_number}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className=" shadow inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    Cliente activo
                                </span>
                                {agent && (
                                    <span className=" shadow inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Agente: {agent}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Profile Header */}

                {/* Content Grid */}
                <div className="bg-white grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-gray-200">
                    {/* Personal Info Section */}
                    <div className="p-6 sm:p-8" >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-200 text-blue-700">
                                <UserCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Datos Personales</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <p className="text-sm text-gray-500">Tipo ID</p>
                                    <p className="font-medium">{person?.identification_type}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Número ID</p>
                                    <p className="font-medium">{person?.identification_number}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Nombre completo</p>
                                <p className="font-medium">
                                    {person?.name} {person?.first_surname} {person?.second_surname}
                                </p>
                            </div>

                            {person?.observations && (
                                <div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Info className="w-4 h-4" />
                                        <span>Observaciones</span>
                                    </div>
                                    <p className="mt-1 text-gray-700">{person?.observations}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className=" p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-green-200 text-green-700">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Información de Contacto</h3>
                        </div>

                        <div className="space-y-4">
                            {clients?.email && (
                                <>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Correo electrónico</p>
                                            <div className="flex flex-col">
                                                {clients?.email.map(client =>
                                                    <a key={client.email.id}
                                                        href={`mailto:${client?.email}`}
                                                        className="font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        {client?.email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {clients?.phone && (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <div className="flex flex-col">
                                            {clients?.phone.map(client =>
                                                <a key={client.phone.id}
                                                    href={`tel:${client?.phone}`}
                                                    className="font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    {client?.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                {clients?.address && (
                    <div className="bg-white p-6 sm:p-8 border-t-2 border-gray-200 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-indigo-200 text-indigo-700">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Dirección</h3>
                        </div>

                        {clients?.address.map(add =>
                            <div key={add.address?.id}>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">País</p>
                                        <p className="font-medium">{add?.country || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Provincia</p>
                                        <p className="font-medium">{add?.province || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Municipio</p>
                                        <p className="font-medium">{add?.municipality || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Localidad</p>
                                        <p className="font-medium">{add?.locality || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Calle</p>
                                        <p className="font-medium">{add?.street || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Código Postal</p>
                                        <p className="font-medium">{add?.postal_code || '-'}</p>
                                    </div>
                                </div>

                                {add?.street && (
                                    <div className="mt-6 mb-10">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${add?.street}+${add?.number}+${add?.postal_code}+${add?.locality}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <Navigation className="w-4 h-4 mr-2" />
                                            Ver en mapa
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>)}
            </div>
        </>
    );
};

export default VerCliente;