import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ phases }}>
            {children}
        </ArquidbContext.Provider>
    );
}

export default PhaseContext;