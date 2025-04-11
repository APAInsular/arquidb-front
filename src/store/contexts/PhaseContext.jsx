import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const usePhase = () => useContext(ArquidbContext);

const PhaseContext = ({ children }) => {
    const { views, creates, updates } = CrudManager({ url: `phase` });

    const [phases, setPhases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setPhases, setLoading, setErrors: setError });
    }, []);

    const createPhase = async (data) => {
        return creates({ setErrors: setError, setStatus, data });
    }

    const updatePhase = async (id, data) => {
        updates({ setErrors: setError, setStatus, id, data });
    }

    if (loading) return <WebLoader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ phases, createPhase, updatePhase }}>
            {children}
        </ArquidbContext.Provider>
    );
}

export default PhaseContext;