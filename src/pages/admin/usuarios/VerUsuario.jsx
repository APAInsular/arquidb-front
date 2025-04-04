import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";


const VerUsuario = () => {

    const params = useParams();

    const { views } = CrudManager({ url: `users/${params.id}` });

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setUser, setLoading, setErrors: setError });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div>
                <h2>{user.name}</h2>
            </div>
        </div>
    )

}

export default VerUsuario;