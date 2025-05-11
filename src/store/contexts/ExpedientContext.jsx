import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useExpedient = () => useContext(ArquidbContext);

const ExpedientContext = ({ children }) => {

    const { views, creates, updates } = CrudManager({ url: `expedient` });

    const [expedients, setExpedients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setExpedients, setLoading, setErrors: setError });
    }, []);

    const createExpedient = async (data) => {
        return creates({ setErrors: setError, setStatus, data });
    }

    const updateExpedient = async (id, data) => {
        updates({ setErrors: setError, setStatus, id, data });
    }

    if (loading) return <WebLoader />;
    // if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ expedients, createExpedient, updateExpedient }}>
            {children}
        </ArquidbContext.Provider>
    );
};

export default ExpedientContext;
