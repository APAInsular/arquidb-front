import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormFase from "./FormFase";
import WebLoader from "../../../routes/loaders/WebLoader";
import CrudManager from "../../../hooks/CrudManager";
import TitleCard from "../../../components/ui/TitleCard";

const EditarFase = () => {

    const { id } = useParams();
    const { updates } = CrudManager({ url: `phase/${id}` });
    const { views } = CrudManager({ url: `phase/${id}` });

    const [fase, setFase] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        const response = await updates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/fases');
            navigate(0);
        }
    };

    useEffect(() => {
        const fetchPhase = async () => {
            views({ setData: setFase, setLoading, setErrors: setError });
        }
        fetchPhase();
    }, [id]);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Actualizar Fase"} />

            {loading ? (
                <WebLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormFase
                    fase={fase}
                    onSubmit={handleSubmit}
                    status={status}
                    errors={errors}
                />
            )}
        </div >
    );
};

export default EditarFase;