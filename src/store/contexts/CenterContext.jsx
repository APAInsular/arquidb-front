import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';
import { UseLoader } from './LoaderContext';
import { useAuth } from '../../hooks/Auth';

const ArquidbContext = createContext();
export const useCenter = () => useContext(ArquidbContext);

const CenterContext = ({ children }) => {
    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { views, creates, updates, counts } = CrudManager({ url: `centers`, showLoader, hideLoader, showError, hideError, allData: true });

    const [centers, setCenters] = useState([]);
    const [centerAccounts, setCenterAccounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            views({ setData: setCenters, setLoading, setErrors: setError });
            countCenter();
        }
    }, []);

    const createCenter = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateCenter = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    const countCenter = async () => {
        const result = await counts({ setErrors: setError, setStatus });
        setCenterAccounts(result);
    }

    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ centers, centerAccounts, createCenter, updateCenter, loading, error }}>
            {loading ? <WebLoader /> : ""}
            {children}
        </ArquidbContext.Provider>
    );
}

export default CenterContext;