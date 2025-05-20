import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

const AdminRoute = () => {
    const { user, isLoading } = useAuth({ middleware: 'auth' });

    // console.log("Usuario cargado:", user, "Cargando:", isLoading);

    if (isLoading || user === undefined) {
        return <div>Cargando...</div>;
    }

    if (user && user.roles.map(u => u.name) == "superAdmin") {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }

};

export default AdminRoute;
