import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';
import { UseLoader } from './LoaderContext';

const ArquidbContext = createContext();
export const useExpedient = () => useContext(ArquidbContext);

const ExpedientContext = ({ children }) => {
    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { views, creates, updates, counts } = CrudManager({ url: `expedient`, showLoader, hideLoader, showError, hideError, allData: true });

    const [expedients, setExpedients] = useState([]);
    const [expedientAccounts, setExpedientAccounts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setExpedients, setLoading, setErrors: setError });
        countExpedient();
    }, []);

    const createExpedient = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateExpedient = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    const countExpedient = async () => {
        const result = await counts({ setErrors: setError, setStatus });
        setExpedientAccounts(result);
    }

    if (!expedientAccounts) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ expedients, expedientAccounts, createExpedient, updateExpedient, loading, error }}>
            {loading ? <WebLoader /> : ""}
            {children}
        </ArquidbContext.Provider>
    );
};

export default ExpedientContext;
