
import { Link, useNavigate } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import { UseLoader } from "../../../store/contexts/LoaderContext";
import FormCentros from "./FormCentros";

const CrearCentro = () => {

    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { creates } = CrudManager({ url: `centers`, showLoader, hideLoader, showError, hideError });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleUpdate = async (formData) => {
        const response = await creates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/centros');
            navigate(0);
        }

    };


    return (
        <>
            <div className="h-full flex flex-col gap-4">
                <TitleCard name={"Centros"} action={"Crear"} />

                <FormCentros
                    onSubmit={handleUpdate}
                    status={status}
                    errors={errors}
                />

            </div>

        </>
    );
};

export default CrearCentro;
