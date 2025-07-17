import axios from '../lib/axios'

export default function CrudManager({ url, showLoader, hideLoader, showError, hideError, allData }) {

    const api = "api/"
    let all = '';
    if (allData) all = '?all=true';

    // Ver los datos 
    const views = async ({ setData, setLoading, setErrors, setPages }) => {
        setLoading(true);

        // Obtener token de localStorage (o de donde lo guardes)
        const token = localStorage.getItem('token'); // Asegúrate que esté guardado así

        console.log("Usando token:", token); // 🪵 Debug: Verificar token cargado

        await axios
            .get(api + url + all, {

                withCredentials: true  // ← Esto es lo importante
            })
            .then(res => {
                setData(res.data.data ?? res.data);
                console.log(res.data.data ?? res.data)
                if (typeof setPages === 'function') {
                    setPages(res?.data?.data?.last_page ?? res?.data?.last_page);
                }
            })
            .catch(error => {
                console.error("❌ Error en petición:", error);
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                throw error;
            })
            .finally(() => { setLoading(false); });
    };

    const shows = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(true);

        const endpoint = props.id ? `${api}${url}/${props.id}` : `${api}${url}`;

        return axios
            .get(endpoint)
            .then(res => {
                return res.data
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setStatus(false);
                setErrors(error);
                throw error;
            });
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
                setTimeout(() => hideLoader(), 4000);
                return res.data;
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setStatus(false);
                showError();
                setTimeout(() => hideError(), 4000);
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
            .then(res => {
                showLoader();
                setTimeout(() => hideLoader(), 4000);
                return res.data
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(Object.values(error.response.data.errors).flat());
                }
                setStatus(false);
                showError();
                setTimeout(() => hideError(), 4000);
                setErrors(error);
                throw error;
            });
    };

    // Borrar los datos
    const deletes = async ({ setErrors, setStatus, ElementId }) => {
        setErrors(null);
        setStatus(true);
        await axios
            .delete(`${api}${url}/${ElementId}`,)
            .then(res => {
                showLoader();
                setTimeout(() => hideLoader(), 4000);
                res.data
            })
            .catch(error => {
                setStatus(false);
                setErrors(error.response.data.errors);
                showError();
                setTimeout(() => hideError(), 4000);
            });
    };

    const counts = async ({ setErrors, setStatus }) => {
        setErrors(null);
        setStatus(true);
        return await axios
            .get(api + url + 'Count')
            .then(res => {
                return res.data
            })
            .catch(error => {
                setStatus(false);
                setErrors(error.response.data.errors);
                showError();
                setTimeout(() => hideError(), 4000);
                throw error;
            });
    };

    return {
        views,
        shows,
        creates,
        updates,
        deletes,
        counts
    };

}; 