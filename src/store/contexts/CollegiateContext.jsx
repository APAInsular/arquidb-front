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

    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ collegiates }}>
            {loading ? <WebLoader /> : ""}
            {children}
        </ArquidbContext.Provider>
    );
}

export default CollegiateContext;