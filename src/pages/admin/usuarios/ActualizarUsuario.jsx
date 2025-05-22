import { useNavigate, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { useEffect, useState } from "react";
import FormUsuarios from "./FormUsuarios";
import WebLoader from "../../../routes/loaders/WebLoader";
import TitleCard from "../../../components/ui/TitleCard";


const ActualizarUsuario = () => {

    const { id } = useParams();
    const { updates } = CrudManager({ url: `users/${id}` });
    const { views } = CrudManager({ url: `users/${id}` });

    const [user, setUsers] = useState({});
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
            navigate('/usuarios');
        }
    };

    useEffect(() => {
        const fetchCliente = async () => {
            views({ setData: setUsers, setLoading, setErrors: setError });
        }
        fetchCliente();
    }, [id]);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Usuarios"} action={"Editar"} />

            {loading ? (
                <WebLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <FormUsuarios
                    user={user}
                    onSubmit={handleSubmit}
                    status={status}
                    errors={errors}
                    falses={true}
                />
            )}
        </div >
    );
}

export default ActualizarUsuario;