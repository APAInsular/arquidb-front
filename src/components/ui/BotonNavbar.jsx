import { NavLink } from "react-router-dom";

const BotonNavbar = ({ navegate, icon, name }) => {
    return (
        <>
            <NavLink className="flex flex-row justify-center bg-amber-100/20 items-center p-3 rounded-xl navbar" to={navegate}>
                <span>
                    {icon}
                </span>
                <p className="text-white/80 font-medium text-sm">{name}</p>
            </NavLink>
        </>

    )
}

export default BotonNavbar;