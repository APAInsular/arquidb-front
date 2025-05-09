
import { Link, useNavigate } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import FormUsuarios from "./FormUsuarios";
import TitleCard from "../../../components/ui/TitleCard";

const CrearUsuario = () => {

    const { creates } = CrudManager({ url: `users` });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleUpdate = async (formData) => {
        const response = await creates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/colegiados');
        }
    };

    return (
        <>
            <div className="">
                <div className="">
                    <TitleCard name={"Usuario"} action={"Crear"} />
                    <div className="p-4 sm:p-8 bg-white rounded-b-xl shadow">
                        <div className="w-full">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto text-2xl">
                                    <h1 className=" font-semibold leading-6 text-gray-900">Usuario</h1>
                                    <p className="mt-2 text-lg text-gray-700">Añadir nuevo usuario</p>
                                </div>
                            </div>

                            <div className="">
                                <div className="mt-8 overflow-x-auto">
                                    <div className="py-2 align-middle">
                                        <FormUsuarios
                                            onSubmit={handleUpdate}
                                            status={status}
                                            errors={errors}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrearUsuario;
