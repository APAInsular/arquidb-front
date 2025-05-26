import { useNavigate, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import WebLoader from "../../../routes/loaders/WebLoader";
import TitleCard from "../../../components/ui/TitleCard";
import { UseLoader } from "../../../store/contexts/LoaderContext";
import FormCentros from "./FormCentros";


const ActualizarCentro = () => {

    const { id } = useParams();
    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { updates } = CrudManager({ url: `centers/${id}`, showLoader, hideLoader, showError, hideError });
    const { views } = CrudManager({ url: `centers/${id}` });

    const [center, setCenter] = useState({});
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
            navigate('/centros');
        }
    };

    useEffect(() => {
        const fetchCentro = async () => {
            views({ setData: setCenter, setLoading, setErrors: setError });
        }
        fetchCentro();
    }, [id]);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Centros"} action={"Editar"} />

            {loading ? (
                <WebLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormCentros
                    center={center}
                    onSubmit={handleSubmit}
                    status={status}
                    errors={errors}
                    falses={true}
                />
            )}
        </div >
    );
}

export default ActualizarCentro;