import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useClient = () => useContext(ArquidbContext);

const ClientContext = ({ children }) => {
    const { views, creates, updates } = CrudManager({ url: `personClient` });

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setClients, setLoading, setErrors: setError });
    }, []);

    const createClient = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateClient = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ clients, createClient, updateClient }}>
            {loading ? <WebLoader /> : ""}
            {children}
        </ArquidbContext.Provider>
    );
}

export default ClientContext;