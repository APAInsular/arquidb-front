import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import CrudManager from "../../../hooks/CrudManager";
import { useNavigate } from "react-router-dom";
import FormColegiado from "./FormColegiado";
import { UseLoader } from "../../../store/contexts/LoaderContext";

const CrearColegiado = () => {

    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { creates } = CrudManager({ url: `personCollegiate`, showLoader, hideLoader, showError, hideError });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        console.log(formData);
        const response = await creates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/colegiados');
        }
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Colegiados"} action={"Crear"} />
            <FormColegiado
                onSubmit={handleSubmit}
                status={status}
                errors={errors}
            />
        </div >
    );
};

export default CrearColegiado;
