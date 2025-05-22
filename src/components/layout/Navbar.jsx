import { FolderCheck, Home, LucideBuilding2, School2, Table2Icon, TableConfig, UserCheck2Icon, UsersRoundIcon } from "lucide-react";
import { useAuth } from "../../hooks/Auth";
import BotonNavbar from "../ui/BotonNavbar";

const Navbar = () => {

    const { user } = useAuth({ middleware: 'auth' });

    return (
        <>
            <ul className=" space-y-2 navbar-2">
                <li>
                    <BotonNavbar
                        navegate={"/"}
                        icon={<Home />}
                        name={"Home"}
                    />
                </li>
                <li>
                    <BotonNavbar
                        navegate={"/expedientes"}
                        icon={<FolderCheck />}
                        name={"Expediente"}
                    />
                </li>
                {user?.roles.map(u => u.name) == "superAdmin" && (
                    <>
                        <li>
                            <BotonNavbar
                                navegate={"/usuarios"}
                                icon={<UserCheck2Icon />}
                                name={"Usuarios"}
                            />
                        </li>
                        <li>
                            <BotonNavbar
                                navegate={"/centros"}
                                icon={<LucideBuilding2 />}
                                name={"entros"}
                            />
                        </li>
                    </>
                )}
                <li>
                    <BotonNavbar
                        navegate={"/fases"}
                        icon={<Table2Icon />}
                        name={"Fases"}
                    />
                </li>
                <li>
                    <BotonNavbar
                        navegate={"/clientes"}
                        icon={<UsersRoundIcon />}
                        name={"Clientes"}
                    />
                </li>
                <li>
                    <BotonNavbar
                        navegate={"/colegiados"}
                        icon={<School2 />}
                        name={"Colegiados"}
                    />
                </li>
            </ul>
        </>
    )
}

export default Navbar;