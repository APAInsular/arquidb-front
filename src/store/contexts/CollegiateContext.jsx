import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useCollegiate = () => useContext(ArquidbContext);

const CollegiateContext = ({ children }) => {
    const { views, creates, updates, counts } = CrudManager({ url: `personCollegiate`, allData: true });

    const [collegiates, setCollegiates] = useState([]);
    const [collegiateAccounts, setCollegiateAccounts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setCollegiates, setLoading, setErrors: setError });
        countCollegiate();
    }, []);

    const countCollegiate = async () => {
        const result = await counts({ setErrors: setError, setStatus });
        setCollegiateAccounts(result);
    }

    if (!collegiateAccounts) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ collegiates, collegiateAccounts, loading }}>
            {/* {loading ? <WebLoader /> : ""} */}
            {children}
        </ArquidbContext.Provider>
    );
}

export default CollegiateContext;