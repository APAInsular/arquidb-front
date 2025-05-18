import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';
import axios from '../../lib/axios';

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
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updatePhase = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    const getPhaseTitles = async (data) => {
        return await axios.post('api/phase/titles', data).then(res => res.data);
    }

    if (loading) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ phases, createPhase, updatePhase, getPhaseTitles }}>
            {children}
        </ArquidbContext.Provider>
    );
}

export default PhaseContext;