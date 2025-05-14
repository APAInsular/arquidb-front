import { useState, useEffect, createContext, useContext } from 'react';
import CrudManager from '../../hooks/CrudManager';
import WebLoader from '../../routes/loaders/WebLoader';
import axios from '../../lib/axios';

const ArquidbContext = createContext();
export const useDocument = () => useContext(ArquidbContext);

const DocumentContext = ({ children }) => {

    const { views, creates, updates } = CrudManager({ url: `document` });

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        views({ setData: setDocuments, setLoading, setErrors: setError });
    }, []);

    const createDocument = async (data) => {
        return await creates({ setErrors: setError, setStatus, data });
    }

    const updateDocument = async (id, data) => {
        await updates({ setErrors: setError, setStatus, id, data });
    }

    const uploadDocument = async (data) => {
        return await axios.post('api/upload', data).then(res => res.data);
    }

    if (loading) return <WebLoader />;
    // if (error) return <p>Error: {error}</p>;

    return (
        <ArquidbContext.Provider value={{ documents, createDocument, updateDocument, uploadDocument }}>
            {children}
        </ArquidbContext.Provider>
    );
};

export default DocumentContext;
