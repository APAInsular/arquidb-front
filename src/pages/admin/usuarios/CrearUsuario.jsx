
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
            navigate('/usuarios');
        }
    };

    return (
        <>

            <div className="h-full flex flex-col gap-4">
                <TitleCard name={"Usuarios"} action={"Crear"} />

                <FormUsuarios
                    onSubmit={handleUpdate}
                    status={status}
                    errors={errors}
                />

            </div>

        </>
    );
};

export default CrearUsuario;
