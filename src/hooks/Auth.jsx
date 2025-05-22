import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    let navigate = useNavigate();
    let params = useParams();

    const setToken = (token) => localStorage.setItem("auth_token", token);
    const getToken = () => localStorage.getItem("auth_token");
    const removeToken = () => localStorage.removeItem("auth_token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                mutate('/verify-email')
            }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false
        }
    )

    const updateUser = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(true);
        console.log(props)
        axios
            .put('/api/user', props)
            .then((response) => {
                setStatus(false)
                console.log("res", response)
                window.location.pathname = '/profile'
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                setStatus(false);
            })
    }

    const deleteUser = async ({ setErrors, setStatus, ...password }) => {
        setErrors(null);
        setStatus(true);
        axios
            .delete('/api/user', { data: password })
            .then((response) => {
                console.log("res", response);
                setStatus(false);
                removeToken()
                window.location.pathname = '/login'
            })
            .catch(error => {
                setErrors(
                    Object.values(error.response.data.errors).flat());
                setStatus(false);
            });
    }

    const register = async ({ setErrors, ...props }) => {
        setErrors([])
        axios
            .post('/api/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(true)
        console.log(props)
        axios
            .post('/api/login', props)
            .then((response) => {
                setStatus(response.data)
                setToken(response.data.token);
                mutate();
                window.location.pathname = '/'
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                setStatus(false)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        setErrors([])
        setStatus(null)
        axios
            .post('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const changePassword = async ({ setErrors, setStatus, ...props }) => {
        setErrors(null);
        setStatus(true);
        console.log(props)
        axios
            .put('/api/change-password', props.data)
            .then((response) => {
                setStatus(false)
                console.log("res", response)
                window.location.pathname = '/profile'
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data).flat())
                setStatus(false);
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)
        axios
            .post('/api/reset-password', { token: params.token, ...props })
            .then(response => navigate(`/login?reset=${btoa(response.data.status)}`))
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout')
            removeToken();
            mutate()
        }
        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) navigate(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        updateUser,
        deleteUser,
        register,
        login,
        changePassword,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout
    }
}
