import { NavLink } from "react-router-dom";

const BotonNavbar = ({ navegate, icon, name }) => {
    return (
        <>
            <NavLink className="flex flex-row justify-center inset-shadow-2xs inset-shadow-white/20 shadow shadow-back/80  bg-amber-100/20 items-center sm:p-3 py-3 rounded-xl navbar" to={navegate}>
                <span className="">
                    {icon}
                </span>
                <p className="text-white/80 font-medium text-sm">{name}</p>
            </NavLink>
        </>

    )
}

export default BotonNavbar;