import axios from '../lib/axios'

export default function CrudManager({ url }) {

    const api = "api/"
    // Ver los datos 
    const views = ({ setData, setLoading, setErrors }) => {
        setLoading(true);
        axios
            .get(api + url)
            .then(res => { setData(res.data.data ?? res.data); })
            .catch(error => {
                setErrors(Object.values(error.response?.data?.errors ?? {}).flat());
            })
            .finally(() => { setLoading(false); });
    };

    // Crear los datos
    const creates = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(null);
        return axios
            .post(api + url, props.data)
            .then((res) => {
                setStatus("success");
                return res.data;
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setStatus("error");
                throw error;
            });
    };

    // Actualizar los datos
    const updates = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(null);
        axios
            .put(api + url + "/" + props.id, props.data)
            .then(res => res.data)
            .catch(error => {
                setErrors(
                    Object.values(error.response.data.errors).flat());
            });
    };

    // Borrar los datos
    const deletes = async ({ setErrors, setStatus, ElementId }) => {
        setErrors(null);
        setStatus(true);
        axios
            .delete(`${api}${url}/${ElementId}`,)
            .then(res => res.data)
            .catch(error => {
                setErrors(
                    Object.values(error.response.data.errors).flat());
            });
    };

    return {
        views,
        creates,
        updates,
        deletes
    };

}; 