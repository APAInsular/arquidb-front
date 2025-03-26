
const Login = () => {
    return (
        <>
            {/* contenedor  */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
                {/* imagen / algo */}
                <div className=" hidden md:block relative">
                    <div className="bg-[url(https://coacfue.es/wp-content/uploads/2024/04/architect-3.jpg)] h-full ">
                        <div className="w-full h-full space-y-6 bg-[#932236]/60 text-white  flex justify-center items-center flex-col px-10 overflow-hidden">
                        <div className="text-6xl rounded-full p-3 px-6">
                            <p>COAF</p>
                        </div>
                            <div className=" uppercase text-7xl lg:text-8xl xl:text-9xl font-bold">
                                welcome back
                            </div>
                            {/* <div className="text-center font-medium text-md">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil doloremque autem odio possimus unde nobis at, nulla quo! Sed eius voluptatem iure quas itaque optio modi architecto! Corrupti, corporis facere.
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* login  */}
                <div className="bg-[#932236]  text-white p-10 xl:px-25 flex flex-col justify-center items-center">
                    {/*info  */}

                    <div>
                        <span className=" text-center space-y-3">
                            <p className=" text-4xl">Inicia sesión</p>
                            <p className="text-sm text-white/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure nemo animi cumque, ex magnam minus, perferendis voluptatem sunt at possimus hic quidem ut consequatur qui officiis quia quos ipsa. Quaerat?</p>
                        </span>
                    </div>
                    <div className="mt-10 w-full">
                        {/* inputs */}
                        <form className=" space-y-3" action="">
                            <div className=" relative flex items-center border-s-5 border-[#751c2c]">
                                {/* <label className="absolute text-white/70 px-2" htmlFor="email">Correo Electrónico</label> */}
                                <input type="email" name="email" className="w-full bg-white/10 py-3 px-2 outline-none hover:bg-white/40 transition-all" placeholder="Correo Electrónico" />
                            </div>
                            <div className=" relative flex items-center border-s-5 border-[#751c2c]">
                                {/* <label className="absolute text-white/70 px-2" htmlFor="password">Contraseña</label> */}
                                <input type="password" name="password" className="w-full bg-white/10 py-3 px-2 outline-none hover:bg-white/40 transition-all" placeholder="Contraseña" />
                            </div>
                            <div>
                                <button type="submit" className="bg-[#4c131d] cursor-pointer hover-shadow text-white/90 font-medium p-2.5 w-full rounded-4xl mt-6">
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="my-8 w-full">
                        <div className="bg-white/30 p-[0.5px]"></div>
                    </div>

                    <div className="w-full space-y-3">
                        <div className="relative border-2 cursor-pointer hover-shadow border-white bg-white/10 rounded-md text-white p-2 flex flex-row items-center justify-center">
                            <span className="left-1 absolute invert"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
                                <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
                            </svg>
                            </span>
                            <div className="text-center w-full font-medium">
                                <p>Usar Google</p>
                            </div>
                        </div>
                        <div className="relative border-2 cursor-pointer hover-shadow border-white bg-white/10 rounded-md text-white p-2 flex flex-row items-center justify-center">
                            <span className="left-1 absolute invert"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 64 64">
                                <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                            </svg>
                            </span>
                            <div className="text-center w-full font-medium">
                                <p>Usar GitHub</p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Login;