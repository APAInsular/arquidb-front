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

    const visator = users.filter(item => item.roles.some(role => role.name === "visor"));
    const admin = users.filter(item => item.roles.some(role => role.name === "superAdmin"));

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
                    <div className=" uppercase text-xs bg-yellow-200 rounded-full flex w-min px-2 py-0.5 items-center text-yellow-600 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        {user.roles[0].name}
                    </div>
                ) : (
                    <div className="bg-gray-200 text-xs uppercase py-0.5 rounded-full w-min px-2 text-center text-gray-600 font-medium">Ninguno</div>
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
                    <div className="">
                        <Link to={'/usuarios/crear'} className="text-nowrap flex flex-row items-center px-5 py-1.5 space-x-3 cursor-pointer hover:bg-red-800 hover:text-red-300 transition-all text-red-900 font-medium bg-red-200 w-min mt-2 p-1 rounded-full shadow-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <p>Añadir usuario</p>
                        </Link>
                    </div>
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
                <div className="">
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
                        tabla={'usuarios'}
                        someText="name"
                        someNumber="id"
                        someDate="created_at"
                    />
                )}
            </div>
        </>
    );
}

export default Usuarios;