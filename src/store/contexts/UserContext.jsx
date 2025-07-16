import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';

const ArquidbContext = createContext();
export const useUser = () => useContext(ArquidbContext);

const UserContext = ({ children }) => {
    const { views, creates, updates, counts } = CrudManager({ url: `users`, allData: true });

    const [users, setUsers] = useState([]);
    const [userAccounts, setUserAccounts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setUsers, setLoading, setErrors: setError });
        countUser();
    }, []);

    const countUser = async () => {
        const result = await counts({ setErrors: setError, setStatus });
        setUserAccounts(result);
    }

    if (!userAccounts) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ users, userAccounts, loading }}>
            {/* {loading ? <WebLoader /> : ""} */}
            {children}
        </ArquidbContext.Provider>
    );
}

export default UserContext;