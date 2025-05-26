import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/images/logo.png'
import GoogleAuthButton from "../../hooks/GoogleAuthButton";

const Login = () => {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/'
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = async event => {
        event.preventDefault()
        login({ email, password, setErrors: setErrors, setStatus: setStatus })

    }

    console.log(status)

    return (
        <>
            {/* contenedor  */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
                {/* imagen / algo */}
                <div className=" hidden md:block relative">
                    <div className="bg-[url(https://www.iq-arquitec.com/projects-img/iq-arquitec-4-1.jpg)] h-full ">
                        <div className="w-full h-full space-y-6 bg-[#932236]/40 text-white flex justify-center items-center flex-col px-10 overflow-hidden">
                            <div className=" uppercase text-6xl lg:text-7xl xl:text-8xl font-bold">
                                Bienvenido a
                                <p className="p-0 m-0 xl:text-9xl lg:text-8xl text-7xl">coaf</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* login  */}
                <div className="bg-[#932236] shadow-xl z-40 shadow-gray-900 text-white p-10 xl:px-25 flex flex-col justify-center items-center">
                    {/*info  */}

                    <div className="flex flex-row items-center w-full mb-auto space-x-3">
                        <img src={Logo} className=" brightness-120" alt="COACFUE" width={50} height={50} />

                        <div className="flex flex-row">
                            <p className="font-medium text-4xl">C</p>
                            <p className="font-medium text-4xl text-white/70">O</p>
                            <p className="font-medium text-4xl text-white/50">A</p>
                            <p className="font-medium text-4xl text-white/30">F</p>
                        </div>
                    </div>

                    <div className="w-full mb-auto">
                        <span className="w-full space-y-3">
                            <p className=" text-3xl">Inicia sesión</p>
                            <p className="text-sm text-white/70">Inicia sesión para poder usar ArquiDB</p>
                        </span>
                    </div>
                    <div className="mt-10 mb-auto w-full">
                        {/* inputs */}
                        <form className=" space-y-3" onSubmit={submitForm}>
                            <div className=" relative flex items-center border-s-5 rounded-lg overflow-hidden border-[#751c2c]">
                                <input type="email" name="email" className=" w-full bg-white/10 py-3 px-2 outline-none hover:bg-white/40 transition-all" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div className=" relative flex items-center border-s-5 rounded-lg overflow-hidden border-[#751c2c]">
                                <input type="password" name="password" className="w-full bg-white/10 py-3 px-2 outline-none hover:bg-white/40 transition-all" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <NavLink
                                to="/forgot-password"
                                className="hover:underline text-md text-white hover:text-red-400"
                            >
                                ¿Olvidaste tu contraseña?
                            </NavLink>
                            <div>
                                <button type="submit" className="bg-[#4c131d] cursor-pointer hover-shadow text-white/90 font-medium p-2.5 w-full rounded-lg mt-6 flex justify-center items-center">
                                    {status ?
                                        <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        :
                                        <div className="flex flex-row items-center space-x-3">
                                            <p>Iniciar sesión</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    }
                                </button>
                            </div>
                            {errors && <div className="text-red-500 text-sm">{errors}</div>}
                        </form>
                    </div>

                    <div className="my-8 w-full">
                        <div className="bg-white/30 p-[0.3px]"></div>
                    </div>

                    <div className="w-full space-y-3">
                        <GoogleAuthButton />
                        {/* <div className="relative border-s-4 cursor-pointer hover-shadow border-white bg-white/10 rounded-sm text-white p-2 flex flex-row items-center justify-center  shadow inset-shadow-2xs inset-shadow-white/5">
                            <span className="left-2 absolute invert"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 64 64">
                                <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                            </svg>
                            </span>
                            <div className="text-center w-full font-medium">
                                <p>Usar GitHub</p>
                            </div>
                        </div> */}
                    </div>



                </div>
            </div>
        </>
    )
}

export default Login;