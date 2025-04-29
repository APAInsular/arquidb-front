import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import CrudManager from "../../../hooks/CrudManager";
import { useNavigate } from "react-router-dom";
import FormCliente from "./FormCliente";

const CrearCliente = () => {

    const { creates } = CrudManager({ url: `personClient` });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        console.log(formData);
        const response = await creates({
            data: formData, setErrors, setStatus
        });

        if (response?.success) {
            navigate('/');
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Crear Cliente"} />
            <FormCliente
                onSubmit={handleSubmit}
                status={status}
                errors={errors}
            />
        </div >
    );
};

export default CrearCliente;
