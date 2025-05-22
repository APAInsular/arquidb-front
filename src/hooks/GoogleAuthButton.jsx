import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import axios from '../lib/axios'

const GoogleAuthWrapper = () => (

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleAuthButton />
    </GoogleOAuthProvider>
);

const GoogleAuthButton = () => {

    const setToken = (token) => localStorage.setItem("auth_token", token);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useGoogleLogin({

        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError(null);

            await axios
                .post('/api/auth/google/token',
                    { token: tokenResponse.access_token },

                ).then((response) => {
                    setToken(response.data.access_token);
                    window.location.href = '/';
                }).catch((error) => {
                    console.error('Login failed:', error);
                    setError(error.response?.data?.error || 'Failed to authenticate. Please try again.');
                }).finally(
                    setLoading(false)
                )
        },
        onError: (errorResponse) => {
            console.log('Google login error:', errorResponse);
            setError('Google authentication failed. Please try again.');
        }
    });

    return (
        <>
            {error && <div className="error-message">{error}</div>}

            <div
                onClick={() => login()}
                disabled={loading}
                className={`relative border-s-4 cursor-pointer hover-shadow border-white bg-white/10 rounded-sm text-white p-2 flex flex-row items-center justify-center google-login-button shadow inset-shadow-2xs inset-shadow-white/5 ${loading ? 'cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <span className="left-2 absolute invert"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 50 50">
                            <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
                        </svg>
                        </span>
                        <div className="text-center w-full font-medium">
                            <p>Usar Google</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GoogleAuthWrapper;