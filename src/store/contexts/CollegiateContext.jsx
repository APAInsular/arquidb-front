import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useCollegiate = () => useContext(ArquidbContext);

const CollegiateContext = ({ children }) => {
    const { views, creates, updates } = CrudManager({ url: `personCollegiate` });

    const [collegiates, setCollegiates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCollegiates, setLoading, setErrors: setError });
    }, []);

    const createCollegiate = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateCollegiate = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    if (loading) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ collegiates, createCollegiate, updateCollegiate }}>
            {children}
        </ArquidbContext.Provider>
    );
}

export default CollegiateContext;