import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/Auth'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'

const PasswordReset = () => {

    const params = useParams()
    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()
        resetPassword({
            email,
            password,
            password_confirmation,
            setErrors,
            setStatus
        })
    }

    useEffect(() => {
        setEmail(params.email || '')
    }, [params.email])

    return (
        <div className=" min-h-screen flex flex-col space-y-6 items-center justify-center bg-[#932236]">
            <div>
                <NavLink to="/">
                    <img src={Logo} alt="" width={100} height={100} className='rounded-md' />
                </NavLink>
            </div>
            <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-900 p-6 rounded-lg ">

                {status && <div className="mb-4 text-green-600">{status}</div>}

                {errors.length > 0 && (
                    <div className="mb-4 text-red-600">
                        <ul className="list-disc list-inside">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={submitForm}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-sm text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className={`block mt-1 w-full border-0 border-b-2 border-gray-400
      focus:border-red-600 focus:ring-opacity-50 outline-none`}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium text-sm text-gray-700">
                            Nueva Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={`block mt-1 w-full border-0 border-b-2 border-gray-400
      focus:border-red-600 focus:ring-opacity-50 outline-none`}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block font-medium text-sm text-gray-700">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            required
                            className={`block mt-1 w-full border-0 border-b-2 border-gray-400
      focus:border-red-600 focus:ring-opacity-50 outline-none`}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full cursor-pointer inline-flex items-center justify-center px-4 
    py-2 bg-gray-800 border border-transparent rounded-md font-semibold
     text-xs text-white uppercase tracking-widest hover:bg-gray-700
      active:bg-gray-900 focus:outline-none focus:border-gray-900 
      focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
                    >
                        Restablecer Contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset
