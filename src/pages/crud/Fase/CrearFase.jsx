import { useNavigate } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import FormFase from "./FormFase";

const CrearFase = () => {
    const { creates } = CrudManager({ url: `phase` });

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
            <TitleCard name={"Crear Fase"} />
            <FormFase
                onSubmit={handleSubmit}
                status={status}
                errors={errors}
            />
        </div >
    );
};

export default CrearFase;