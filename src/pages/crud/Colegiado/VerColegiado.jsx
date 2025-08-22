import { Link, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import { UserCircle2, BookOpen, GraduationCap, Globe, Banknote, Briefcase, Calendar, MapPin, FileText, Shield, Phone, Mail, Navigation, Edit, UserIcon } from "lucide-react";
import TitleCard from "../../../components/ui/TitleCard";
import PulseLoader from "../../../routes/loaders/PulseLoader";
import WebError from "../../../routes/errors/WebError";
import UserFilter from "../../../components/crud/UserFilter";

const VerColegiado = () => {
    const params = useParams();
    const { views } = CrudManager({ url: `personCollegiate/${params.id}` });

    const [collegiate, setCollegiate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCollegiate, setLoading, setErrors: setError });
    }, []);

    if (loading) { return <PulseLoader /> };
    if (error) { return <WebError /> };

    if (!collegiate) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    const person = collegiate.person || {};
    const colleg = collegiate.collegiate?.[0] || {};

    return (
        <>
            <TitleCard name={"Colegiados"} action={"Ver"} />
            <div className="h-full overflow-y-scroll">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-100 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="relative">
                                <UserIcon className="w-30 h-30 bg-gray-400/70 rounded-full text-gray-100 shadow" />
                                <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {person.name} {person.first_surname} {person.second_surname}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {person.identification_type} / {person.identification_number}
                                </p>
                            </div>
                            <UserFilter>
                                <Link className="flex flex-row gap-4 bg-sky-600 text-sky-200 transition-all border-sky-100 hover:text-sky-900 hover:border-sky-800 border-2 hover:bg-sky-200 p-2 rounded-md font-medium px-4" to={`/colegiados/${params.id}/editar`}>
                                    <Edit />
                                    Editar
                                </Link>
                            </UserFilter>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium bg-blue-100 text-blue-800">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {colleg.degree || 'Sin titulación'}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium bg-purple-100 text-purple-800">
                                <Shield className="w-4 h-4 mr-1" />
                                Nº {colleg.collegiate_number || 'Sin número'}
                            </span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                    <UserCircle2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Datos Personales</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <p className="text-sm text-gray-500">Tipo ID</p>
                                        <p className="font-medium">{person.identification_type}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Número ID</p>
                                        <p className="font-medium">{person.identification_number}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Nombre completo</p>
                                    <p className="font-medium">
                                        {person.name} {person.first_surname} {person.second_surname}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                                        <p className="font-medium">{formatDate(colleg.birth_date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nacionalidad</p>
                                        <p className="font-medium">{colleg.nationality || 'No especificada'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Datos Profesionales</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Shield className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Número de colegiado</p>
                                        <p className="font-medium">{colleg.collegiate_number || 'No especificado'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Colegio</p>
                                        <p className="font-medium">{colleg.college || 'No especificado'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <GraduationCap className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Titulación</p>
                                        <p className="font-medium">{colleg.degree || 'No especificada'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Especialidad</p>
                                        <p className="font-medium">{colleg.specialty || 'No especificada'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Info Section */}
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Datos Académicos</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha de titulación</p>
                                        <p className="font-medium">{formatDate(colleg.graduation_date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha final</p>
                                        <p className="font-medium">{formatDate(colleg.termination_date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Colegio de procedencia</p>
                                        <p className="font-medium">{colleg.origin_college || 'No especificado'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Página web</p>
                                        <p className="font-medium">{colleg.web_page || 'No especificada'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                                        <Banknote className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Datos Contables</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Número de cuenta</p>
                                        <p className="font-medium">{colleg.account_number || 'No especificado'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Entidad bancaria</p>
                                        <p className="font-medium">{colleg.banking_entity || 'No especificada'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Observaciones</h3>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                                    {person.observations || 'No hay observaciones registradas'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="flex items-center gap-3 mb-2 p-6">
                            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Datos de contacto</h3>
                        </div>
                        <div className="grid grid-cols-2 mb-5 p-7 pt-0">
                            {collegiate?.email && (
                                <>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Correo electrónico</p>
                                            <div className="flex flex-col">
                                                {collegiate?.email.map(client =>
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

                            {collegiate?.phone && (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <div className="flex flex-col">
                                            {collegiate?.phone.map(client =>
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
                        {collegiate?.address && (
                            <div className="bg-white p-6 sm:p-8 border-t-2 border-gray-200 mb-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-indigo-200 text-indigo-700">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Dirección</h3>
                                </div>

                                {collegiate?.address.map(add =>
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
                                            <div className="mt-6 mb-5">
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerColegiado;