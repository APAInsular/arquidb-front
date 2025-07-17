import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useClient = () => useContext(ArquidbContext);

const ClientContext = ({ children }) => {
    const { views, creates, updates, counts } = CrudManager({ url: `personClient`, allData: true });

    const [clients, setClients] = useState([]);
    const [clientAccounts, setClientAccounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setClients, setLoading, setErrors: setError });
        countClient();
    }, []);

    const countClient = async () => {
        const result = await counts({ setErrors: setError, setStatus });
        setClientAccounts(result);
    }

    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ clients, clientAccounts, loading }}>
            {/* {loading ? <WebLoader /> : ""} */}
            {children}
        </ArquidbContext.Provider>
    );
}

export default ClientContext;