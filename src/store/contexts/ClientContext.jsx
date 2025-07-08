import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useClient = () => useContext(ArquidbContext);

const ClientContext = ({ children }) => {
    const { views, creates, updates } = CrudManager({ url: `personClient`, allData: true });

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setClients, setLoading, setErrors: setError });
    }, []);

    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ clients, loading }}>
            {/* {loading ? <WebLoader /> : ""} */}
            {children}
        </ArquidbContext.Provider>
    );
}

export default ClientContext;