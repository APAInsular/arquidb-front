import { useEffect, useState } from "react";
import CrudManager from "../hooks/CrudManager";
import { useParams } from "react-router-dom";

const PageSearch = () => {

    const params = useParams();

    const [expedientes, setExpedientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { views } = CrudManager({
        url: `expedient?title=${params.search}&all=true`
    });

    useEffect(() => {
        views({ setData: setExpedientes, setLoading, setError });
    }, []);

    console.log(expedientes)

    return (
        <></>
    );
};

export default PageSearch;