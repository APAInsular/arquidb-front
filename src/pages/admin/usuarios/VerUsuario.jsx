import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import TitleCard from "../../../components/ui/TitleCard";
import Avatar from "../../../components/ui/Avatar";


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

    console.log(user)

    return (
        <div>
            <div className="flex flex-col h-full">
                {/* titulo */}
                <TitleCard name="Usuarios" action={user.name} />
                <Avatar name={user?.name?.at(0)} size={100} text={"text-white"} />
                <h2>{user?.name}</h2>
                <h2>{user.email}</h2>
                <h2>{user.center?.name}</h2>
                <h2>{user?.roles?.[0].name}</h2>
            </div>
        </div>
    )

}

export default VerUsuario;