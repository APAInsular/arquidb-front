import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';
import { UseLoader } from './LoaderContext';

const ArquidbContext = createContext();
export const useCenter = () => useContext(ArquidbContext);

const CenterContext = ({ children }) => {
    const { showLoader, hideLoader, showError, hideError } = UseLoader();
    const { views, creates, updates } = CrudManager({ url: `centers`, showLoader, hideLoader, showError, hideError, allData: true });

    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCenters, setLoading, setErrors: setError });
    }, []);

    const createCenter = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateCenter = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    // if (loading) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ centers, createCenter, updateCenter, loading, error }}>
            {loading ? <WebLoader /> : ""}
            {children}
        </ArquidbContext.Provider>
    );
}

export default CenterContext;