import { useContext } from 'react';
import axios from '../lib/axios'
import { UseLoader } from '../store/contexts/LoaderContext';
import { useNavigate } from 'react-router-dom';

export default function CrudManager({ url, showLoader, hideLoader, showError, hideError }) {

    const api = "api/"

    // Ver los datos 
    const views = async ({ setData, setLoading, setErrors, setPages }) => {
        setLoading(true);
        await axios
            .get(api + url)
            .then(res => {
                setData(res.data.data ?? res.data);
                if (typeof setPages === 'function') {
                    setPages(res?.data?.data?.last_page ?? res?.data?.last_page);
                }
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                throw error;
            })
            .finally(() => { setLoading(false); });
    };

    // Crear los datos
    const creates = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(true);
        return await axios
            .post(api + url, props.data)
            .then((res) => {
                setStatus("success");
                showLoader();
                setTimeout(() => hideLoader(), 2000);
                return res.data;
            })
            .catch((error) => {
                hideLoader();
                showError();
                setTimeout(() => hideError(), 2000);
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setStatus(false);
                setErrors(error)
                throw error;
            });
    };

    // Actualizar los datos
    const updates = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(true);

        const endpoint = props.id ? `${api}${url}/${props.id}` : `${api}${url}`;

        return axios
            .put(endpoint, props.data)
            .then(res => res.data)
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setErrors(error)
                setStatus(false);
                throw error;
            });
    };

    // Borrar los datos
    const deletes = async ({ setErrors, setStatus, ElementId }) => {
        setErrors(null);
        setStatus(true);
        await axios
            .delete(`${api}${url}/${ElementId}`,)
            .then(res => res.data)
            .catch(error => {
                setErrors(
                    Object.values(error.response.data.errors).flat());
                setStatus(false);
            });
    };

    return {
        views,
        creates,
        updates,
        deletes
    };

}; 