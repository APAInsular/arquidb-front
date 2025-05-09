import { Navigate, useNavigate, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import FormColegiado from "./FormColegiado";
import TitleCard from "../../../components/ui/TitleCard";
import WebLoader from "../../../routes/loaders/WebLoader";

const ActualizarColegiado = () => {

    const { id } = useParams();
    const { updates } = CrudManager({ url: `personCollegiate/${id}` });
    const { views } = CrudManager({ url: `personCollegiate/${id}` });

    const [colegiado, setColegiado] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        console.log(formData);
        const response = await updates({
            data: formData, setErrors, setStatus
        });

        if (response) {
            navigate('/colegiados');
        }
    };

    useEffect(() => {
        const fetchColegiado = async () => {
            views({ setData: setColegiado, setLoading, setErrors: setError });
        }
        fetchColegiado();
    }, [id]);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Colegiados"} action={"Editar"} />

            {loading ? (
                <WebLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormColegiado
                    colegiado={colegiado}
                    onSubmit={handleSubmit}
                    status={status}
                    errors={errors}
                />
            )}
        </div >
    );
}

export default ActualizarColegiado;