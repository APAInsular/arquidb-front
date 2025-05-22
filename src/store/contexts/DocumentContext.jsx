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
    };

    const multiUploadDocuments = async (data, expedientId) => {
        try {
            const createdPhases = await axios.get('api/phase?all=true').then(res => res.data);

            // Agrupar archivos por fase
            const groupedByPhase = data.reduce((acc, item) => {
                if (!acc[item.phase]) {
                    acc[item.phase] = [];
                }
                acc[item.phase].push(item.file);
                return acc;
            }, {}); // { '1111': [File, File], '2222': [File] }

            // Hacer una petición por cada grupo de fase
            const uploads = await Promise.all(
                Object.entries(groupedByPhase).map(async ([phaseKey, files]) => {
                    const phase = createdPhases.find(
                        p => p.phase === phaseKey && p.expedient_id == expedientId
                    );

                    if (!phase) {
                        console.error(`Fase no encontrada: ${phaseKey}`);
                        return null;
                    }

                    const formData = new FormData();
                    files.forEach(file => {
                        if (!(file instanceof File)) {
                            console.error('No es un archivo válido:', file);
                            throw new Error('Uno o más archivos no son válidos.');
                        }
                        formData.append('files[]', file);
                    });
                    formData.append('phase_id', phase.id);

                    return await axios.post('api/multiupload', formData);
                })
            );

            return uploads.filter(Boolean);
        } catch (error) {
            console.error('Error detallado:', error);
            throw error;
        }
    };

    const uploadDocument = async (data) => {
        return await axios.post('api/upload', data).then(res => res.data);
    };

    const eraseDocument = async (data) => {
        await axios.post('api/erase', data).then(res => res.data);
    };

    if (loading) return <WebLoader />;
    if (error) return console.log(error);

    return (
        <ArquidbContext.Provider value={{ documents, createDocument, multiUploadDocuments, uploadDocument, eraseDocument }}>
            {children}
        </ArquidbContext.Provider>
    );
};

export default DocumentContext;
