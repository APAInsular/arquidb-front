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

    const createDocument = async (data, expedientId) => {
        try {
            const uploadResponse = await uploadDocument(data.data);

            const response = await axios.get('api/phase?all=true');
            const createdPhases = response.data;

            const phase = createdPhases.find(phase => phase.phase === data.phase && phase.expedient_id === expedientId);
            if (!phase) {
                console.error(`Fase no encontrada: ${data.phase}`);
                return;
            }

            data = {
                ...data,
                name: uploadResponse.url,
                phase_id: phase.id
            };
            delete data.data;
            delete data.phase;

            return await creates({ setErrors: setError, setStatus, data });
        } catch (error) {
            console.error('Error detallado:', error);
            throw error;
        }
    }

    const uploadDocument = async (data) => {
        return await axios.post('api/upload', data).then(res => res.data);
    }

    const eraseDocument = async (data) => {
        await axios.post('api/erase', data).then(res => res.data);
    }

    if (loading) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ documents, createDocument, uploadDocument, eraseDocument }}>
            {children}
        </ArquidbContext.Provider>
    );
};

export default DocumentContext;
