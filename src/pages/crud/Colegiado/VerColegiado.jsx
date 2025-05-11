import { useParams } from "react-router-dom";
import TitleCard from "../../../components/ui/TitleCard";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";

const VerColegiado = () => {

    const params = useParams();

    const { views } = CrudManager({ url: `personCollegiate/${params.id}` });

    const [collegiates, setCollegiate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCollegiate, setLoading, setErrors: setError });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(collegiates)

    return (
        <>
            <div className="h-full flex flex-col">
                <TitleCard name={"Colegiados"} action={"Ver"} />
                <div className="grid grid-cols-1 xl:grid-cols-4 relative h-full overflow-y-scroll gap-2 mt-5">
                    <div className=" flex justify-center items-center flex-col space-y-3">
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-red-900 p-2 w-min rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-25 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <p className="text-2xl mt-2 font-medium text-center px-10">{collegiates.person?.name + " " + collegiates.person?.first_surname + " " + collegiates.person?.second_surname}</p>
                        </div>
                        <div className="w-full p-2 space-y-4">
                            <div className=" bg-red-900 rounded-2xl text-red-100  shadow-2xs w-full py-2 px-3 space-y-2.5 flex flex-col ">
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Tipos</div>
                                    <div>{collegiates.collegiate?.[0].degree}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Colegio</div>
                                    <div>{collegiates.collegiate?.[0].college}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>{collegiates.person?.identification_type}</div>
                                    <div>{collegiates.person?.identification_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Fecha de Naicimiento</div>
                                    <div>{collegiates.collegiate?.[0].birth_date?.slice(0, 10).split("-").reverse().join("/")}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Nacionaliidad</div>
                                    <div>{collegiates.collegiate?.[0].nationality}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Nº Colegio</div>
                                    <div>{collegiates.collegiate?.[0].collegiate_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div>Titulación</div>
                                    <div>{collegiates.collegiate?.[0].degree}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-3 space-y-4">
                        <div className="bg-red-900 rounded-2xl text-red-100 py-2 px-3">
                            <div className="flex flex-row justify-between items-center">
                                <div>Observación</div>
                                <div>{collegiates.person?.observations}</div>
                            </div>
                            {/*  */}
                            <div className="flex items-center my-2">
                                <div className="flex-1 border-t border-gray-100/40"></div>
                                <div className="px-7 font-medium text-lg text-gray-100">Datos Profecioanles</div>
                                <div className="flex-1 border-t border-gray-100/40"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Colegio De Procedencia</div>
                                    <div>{collegiates.collegiate?.[0].origin_college}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Especialidad</div>
                                    <div>{collegiates.collegiate?.[0].specialty}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Fecha Final</div>
                                    <div>{collegiates.collegiate?.[0].termination_date}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Fecha Titulación</div>
                                    <div>{collegiates.collegiate?.[0].graduation_date}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>ET FInal De Carrera</div>
                                    <div>{collegiates.collegiate?.[0].career_end_et}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Nº Reg</div>
                                    <div>{collegiates.collegiate?.[0].council_reg_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div>Pagina Web</div>
                                    <div>{collegiates.collegiate?.[0].web_page}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-900 rounded-2xl text-red-100 py-2 px-3">
                            <div className="flex items-center my-2">
                                <div className="flex-1 border-t border-gray-100/40"></div>
                                <div className="px-7 font-medium text-lg text-gray-100">Datos Contables</div>
                                <div className="flex-1 border-t border-gray-100/40"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-100/40">
                                    <div>Nº Cuenta Bancaria</div>
                                    <div>{collegiates.collegiate?.[0].account_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div>Entidad Bancaria</div>
                                    <div>{collegiates.collegiate?.[0].banking_entity}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-gray-200">a</div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerColegiado;