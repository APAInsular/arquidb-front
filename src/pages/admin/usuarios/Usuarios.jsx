import { Link, useNavigate } from "react-router-dom";
import TitleCard from "../../../components/ui/TitleCard";
import StatsCard from "../../../components/ui/StatsCard";
import { useCallback, useEffect, useState } from "react";
import Delete from "../../../components/modals/crud/Delete";
import CrudManager from "../../../hooks/CrudManager";
import DefaultSearch from "../../../components/ui/DefaultSearch";
import Avatar from "../../../components/ui/Avatar";
import Paginate from "../../../components/ui/Paginate";
import Actions from "../../../components/modals/crud/Actions";
import DefaultTable from "../../../components/ui/DefaultTable";

const Usuarios = () => {

    const [totalPages, setTotalPages] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [openId, setOpenId] = useState(null);


    const buscador = useCallback((query = '') => {
        const { views } = CrudManager({ url: `users${query ? '?name=' + query : '?name='}&page=${page}` });
        views({ setData: setUsers, setLoading, setErrors: setError, setPages: setTotalPages });
    }, [page]);

    useEffect(() => {
        buscador();
    }, [buscador]);

    if (error) return <p>Error: {error}</p>;

    const admin = users.filter((item) => item.roles === "Admin");
    const visator = users.filter((item) => item.roles === "visor");
    console.log(users.filter((item) => item.roles === "visor"))

    const userColumns = [
        {
            key: 'name',
            label: 'Usuario',
            render: (user) => (
                <div className="flex flex-row justify-start items-center space-x-2 w-min">
                    <Avatar name={user?.name?.at(0)} size={32} text={"text-white"} />
                    <p>{user.name}</p>
                </div>
            ),
        },
        { key: 'email', label: 'Correo' },
        { key: 'centerName', label: 'Centro', render: (user) => user.center.name },
        {
            key: 'role',
            label: 'Usuario Rol',
            render: (user) =>
                user.roles?.[0] ? (
                    <div className="bg-yellow-500/20 rounded-sm text-center text-yellow-700 font-medium">
                        {user.roles[0].name}
                    </div>
                ) : (
                    <div className="bg-gray-500/10 rounded-sm text-center text-gray-700 font-medium">Ninguno</div>
                ),
        },
    ];

    const formattedUsers = users.map(user => ({
        ...user,
        centerName: user.center.name,
    }));

    return (
        <>
            {deletes && (
                <Delete DatoId={deletes} type={"Usuario"} onClose={() => setDeletes(false)} url={"users"} />
            )}
            <div className="flex flex-col h-full">
                {/* titulo */}
                <TitleCard name="Usuarios" link="/" />
                {/* añadir algo */}
                <div className="w-full flex justify-between">
                    <DefaultSearch
                        title={'Usuario'}
                        Buscador={buscador}
                    />
                    <Link to={'/usuarios/crear'} className="flex flex-row px-10 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-800 font-medium bg-red-100 w-min mt-2 p-1 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir</p>
                    </Link>
                </div>
                {/* card  */}
                <div className="grid grid-cols-3 justify-start gap-2 my-2">
                    <StatsCard
                        title={"Total Usuarios (Cualquier usuario)"}
                        value={users.length}
                    />
                    <StatsCard
                        title={"Total Admin (Solo usuarios Admin)"}
                        value={admin.length}
                    />
                    <StatsCard
                        title={"Total Visores (Solo usuario Visores)"}
                        value={visator.length}
                    />
                </div>
                <div>
                    <Paginate page={page} setPage={setPage} totalPages={totalPages} />
                </div>
                {/* tabla */}
                {loading ? (
                    <div className="flex justify-center mt-2 items-center ">
                        <svg className="size-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <DefaultTable
                        columns={userColumns}
                        data={formattedUsers}
                        setDeletes={setDeletes}
                        openId={openId}
                        setOpenId={setOpenId}
                    />
                )}
            </div>
        </>
    );
}

export default Usuarios;