import { useState, useEffect, createContext } from 'react';
import CrudManager from '../../hooks/CrudManager';

export const ArquidbContext = createContext();

const ExpedientContenxt = ({ children }) => {

    const { views } = CrudManager({ url: `expedient` });

    const [expedients, setExpedients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setExpedients, setLoading, setErrors: setError });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ expedients }}>
            {children}
        </ArquidbContext.Provider>
    );
};

export default ExpedientContenxt;
