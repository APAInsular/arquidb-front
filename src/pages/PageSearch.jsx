import { useEffect, useState } from "react";
import CrudManager from "../hooks/CrudManager";
import { useParams, useSearchParams } from "react-router-dom";

const PageSearch = () => {

    const [searchParams] = useSearchParams();

    const title = searchParams.get('title') || '';
    const phase = searchParams.get('phase') || '';
    const client = searchParams.get('client') || '';
    const collegiate = searchParams.get('collegiate') || '';
    const date = searchParams.get('date') || '';

    console.log(title, phase, client, collegiate, date)

    const [expedientes, setExpedientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { views } = CrudManager({
        url: `expedient?title=${title}&phase=${phase}&client=${client}&collegiate=${collegiate}&date=${date}&all=true`
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