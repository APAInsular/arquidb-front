import axios from '../lib/axios'

export default function CrudManager({ url }) {

    const api = "api/"
    // Ver los datos 
    const views = async ({ setData, setLoading, setErrors, setPages }) => {
        setLoading(true);
        await axios
            .get(api + url)
            .then(res => {
                setData(res.data.data ?? res.data);
                setPages(res.data.last_page);
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
        setStatus(null);
        return await axios
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
                setErrors(error)
                throw error;
            });
    };

    // Actualizar los datos
    const updates = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(null);

        const endpoint = props.id ? `${api}${url}/${props.id}` : `${api}${url}`;

        return axios
            .put(endpoint, props.data)
            .then(res => res.data)
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                } else {
                    setErrors(['Ocurrió un error al actualizar.']);
                }
                return null;
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
            });
    };

    return {
        views,
        creates,
        updates,
        deletes
    };

}; 