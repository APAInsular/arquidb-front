import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import CrudManager from "../../../hooks/CrudManager";
import { useNavigate } from "react-router-dom";
import FormCliente from "./FormCliente";
import { UseLoader } from "../../../store/contexts/LoaderContext";

const CrearCliente = () => {

    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { creates } = CrudManager({ url: `personClient`, showLoader, hideLoader, showError, hideError });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        console.log(formData);
        const response = await creates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/clientes');
            navigate(0);
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Clientes"} action={"Crear"} />
            <FormCliente
                onSubmit={handleSubmit}
                status={status}
                errors={errors}
            />
        </div >
    );
};

export default CrearCliente;
