import { useParams, Link } from "react-router-dom";
import { useExpedient } from "../../../store/contexts/ExpedientContenxt";
import { useState, useEffect } from "react";

const VerExpediente = () => {
    const [expedient, setExpedient] = useState({});
    const params = useParams();
    const { expedients } = useExpedient();

    useEffect(() => {
        if (expedients) {
            setExpedient(expedients.find(e => e.id == params.id));
        }
    }, [expedients]);

    if (!expedient) return <h1>Cargando...</h1>

    return (
        <>
            <div className="overflow-y-auto h-full">
                <div className="flex justify-between p-2 mb-5">
                    <h3 className="text-3xl">Vivienda Familiar</h3>
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
                            <div className="flex flex-col">
                                <h4 className="text-2xl">Colegiado</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 self-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <h3 className="text-3xl">(Nombre Colegiado)</h3>
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 self-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-2xl">Cliente</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 self-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <h3 className="text-3xl">(Nombre Cliente)</h3>
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
                                        <strong>{expedient.budget}</strong>
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
                    <div className="bg-gray-200 rounded-lg p-2">
                        <div className="border-t">
                            <strong>Fases</strong>
                            <div>
                                <p>(Falta el selector de fase*)</p>
                            </div>
                            <button type="button" className="bg-blue-700 text-white py-2 px-6 rounded-full mb-5">Editar Fase</button>
                            <div className="grid grid-cols-12 gap-4 p-2">
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                    <div>
                                        <p>N° Fase</p>
                                        <strong>Info</strong>
                                    </div>
                                    <div>
                                        <p>Fecha de Inicio</p>
                                        <strong>Info</strong>
                                    </div>
                                    <div>
                                        <p>Fecha de creación</p>
                                        <strong>Info</strong>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-2">
                                    <div>
                                        <p>Estado</p>
                                        <strong>Info</strong>
                                    </div>
                                    <div>
                                        <p>Visado</p>
                                        <strong>Info</strong>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-2">
                                    <p>Visador</p>
                                    <strong>Info</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerExpediente;