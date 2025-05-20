// import ApplicationLogo from 'components/ApplicationLogo'
// import AuthCard from 'components/AuthCard'
// import AuthSessionStatus from 'components/AuthSessionStatus'
// import AuthValidationErrors from 'components/AuthValidationErrors'
// import Button from 'components/Button'
// import GuestLayout from 'components/Layouts/GuestLayout'
// import Input from 'components/Input'
// import Label from 'components/Label'
import { useAuth } from '../../hooks/Auth'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import Avatar from '../../components/ui/Avatar';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()
        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <>

            <div className="font-sans text-gray-900 antialiased">
                <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#932236]">
                    <div>
                        <NavLink to="/">
                            <img src={Logo} alt="" width={100} height={100} className='rounded-md' />
                        </NavLink>
                    </div>
                    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-2xl shadow-gray-900 overflow-hidden sm:rounded-lg">
                        <div className="mb-4 text-sm text-gray-900 text-justify border-b-1 border-b-gray-400 pb-2">
                            <strong className='font-medium'>¿Olvidaste tu contraseña?</strong> Indícanos tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña. Te permitirá elegir una nueva.
                        </div>
                        {status && (
                            <div className={`mb-4 font-medium text-sm text-green-600`}>
                                {status}
                            </div>
                        )}
                        {errors.length > 0 && (
                            <div className='mb-4'>
                                <div className="font-medium text-red-600">
                                    ¡Ups! Algo salió mal.
                                </div>
                                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                                    {errors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <form onSubmit={submitForm}>
                            <div>
                                <label
                                    className={` block font-medium text-sm text-gray-700`}
                                    htmlFor="email">
                                    Email
                                </label>

                                <input className={`block mt-1 w-full border-0 border-b-2 border-gray-400
      focus:border-red-600 focus:ring-opacity-50 outline-none`}
                                    onChange={event => setEmail(event.target.value)}
                                    id="email" type="email" name="email"
                                    value={email} required autoFocus
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <button
                                    className={`cursor-pointer inline-flex items-center px-4 
    py-2 bg-gray-800 border border-transparent rounded-md font-semibold
     text-xs text-white uppercase tracking-widest hover:bg-gray-700
      active:bg-gray-900 focus:outline-none focus:border-gray-900 
      focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
                                >Email Password Reset Link</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassword
