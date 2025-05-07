import { useNavigate, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import FormCliente from "./FormCliente";
import WebLoader from "../../../routes/loaders/WebLoader";
import TitleCard from "../../../components/ui/TitleCard";

const ActualizarCliente = () => {

    const { id } = useParams();
    const { updates } = CrudManager({ url: `personClient/${id}` });
    const { views } = CrudManager({ url: `personClient/${id}` });

    const [cliente, setCliente] = useState({});
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
            navigate('/clientes');
        }
    };

    useEffect(() => {
        const fetchCliente = async () => {
            views({ setData: setCliente, setLoading, setErrors: setError });
        }
        fetchCliente();
    }, [id]);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Actualizar Cliente"} />

            {loading ? (
                <WebLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormCliente
                    cliente={cliente}
                    onSubmit={handleSubmit}
                    status={status}
                    errors={errors}
                />
            )}
        </div >
    );
}
export default ActualizarCliente