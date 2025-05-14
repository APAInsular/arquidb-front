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
                <div className="grid grid-cols-1 xl:grid-cols-4 relative h-full overflow-y-scroll gap-2 mt-1">
                    <div className=" flex justify-center items-center flex-col space-y-3">
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-300 p-2 text-gray-500 w-min rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-25">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>
                            <p className="text-2xl font-medium text-start px-10">{collegiates.person?.name + " " + collegiates.person?.first_surname + " " + collegiates.person?.second_surname}</p>
                        </div>
                        <div className="w-full p-2 space-y-4">
                            <div className="text-black-100 w-full py-2 px-3 space-y-2.5 flex flex-col ">
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Tipos</div>
                                    <div>{collegiates.collegiate?.[0].degree}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Colegio</div>
                                    <div>{collegiates.collegiate?.[0].college}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">{collegiates.person?.identification_type}</div>
                                    <div>{collegiates.person?.identification_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Fecha de Naicimiento</div>
                                    <div>{collegiates.collegiate?.[0].birth_date?.slice(0, 10).split("-").reverse().join("/")}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Nacionaliidad</div>
                                    <div>{collegiates.collegiate?.[0].nationality}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Nº Colegio</div>
                                    <div>{collegiates.collegiate?.[0].collegiate_number}</div>
                                </div>
                                <div className="flex flex-row justify-between items-center pb-2 border-s-4 border-gray-500 ps-2">
                                    <div className="font-semibold">Titulación</div>
                                    <div>{collegiates.collegiate?.[0].degree}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-12 col-span-3">
                        <div className=" flex flex-col items-end justify-center space-y-2">
                            <div className="bg-gray-200 cursor-pointer hover:bg-gray-400 p-4 py-10 rounded-bl-xl rounded-tr-xl">a</div>
                            <div className="bg-gray-100 border-2 border-e-0 border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-400 p-4 py-10 rounded-bl-xl rounded-tr-xl">b</div>
                            <div className="bg-gray-100 border-2 border-e-0 border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-400 p-4 py-10 rounded-bl-xl rounded-tr-xl">c</div>
                        </div>
                        <div className="bg-gray-200 overflow-scroll h-full w-full rounded-md col-span-11">
                            <div className=" text-gray-800 py-2 px-3">
                                <div className="flex items-center my-2">
                                    <div className="flex-1 border-t border-gray-700 border-[1px]"></div>
                                    <div className="px-7 font-medium text-lg text-gray-800">Datos Profecioanles</div>
                                    <div className="flex-1 border-t border-gray-700 border-[1px]"></div>
                                </div>
                                <div className=" space-y-6">
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Observación</div>
                                        <div>{collegiates.person?.observations}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Colegio De Procedencia</div>
                                        <div>{collegiates.collegiate?.[0].origin_college}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Especialidad</div>
                                        <div>{collegiates.collegiate?.[0].specialty}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Fecha Final</div>
                                        <div>{collegiates.collegiate?.[0].termination_date}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Fecha Titulación</div>
                                        <div>{collegiates.collegiate?.[0].graduation_date}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">ET FInal De Carrera</div>
                                        <div>{collegiates.collegiate?.[0].career_end_et}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center pb-2 border-b-1 border-gray-900/40">
                                        <div className="font-medium">Nº Reg</div>
                                        <div>{collegiates.collegiate?.[0].council_reg_number}</div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="font-medium">Pagina Web</div>
                                        <div>{collegiates.collegiate?.[0].web_page}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col col-span-3 space-y-4">
                        <div className="bg-red-900 rounded-2xl text-red-100 py-2 px-3">
                            <div className="flex flex-row justify-between items-center">
                                <div>Observación</div>
                                <div>{collegiates.person?.observations}</div>
                            </div>
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default VerColegiado;