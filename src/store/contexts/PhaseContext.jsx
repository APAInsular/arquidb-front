import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const usePhase = () => useContext(ArquidbContext);

const PhaseContext = ({ children }) => {
    const { views } = CrudManager({ url: `phase` });

    const [phases, setPhases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setPhases, setLoading, setErrors: setError });
    }, []);

    if (loading) return <WebLoader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ phases }}>
            {children}
        </ArquidbContext.Provider>
    );
}

export default PhaseContext;