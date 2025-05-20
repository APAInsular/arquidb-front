import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="relative flex flex-col items-top justify-center
   min-h-screen bg-gray-100 sm:items-center sm:pt-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <NavLink to={"/"}>
                        <img src="https://dxr3k2zm7n01i.cloudfront.net/afb774bb-b62d-496e-876b-ffdedd53aa79/images/404.png" alt="" />
                    </NavLink>
                </div>
            </div>
        </>
    );
};
export default NotFound;