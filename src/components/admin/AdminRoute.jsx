import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import WebLoader from "../../routes/loaders/WebLoader";

const AdminRoute = () => {
    const { user, isLoading } = useAuth({ middleware: 'auth' });

    if (isLoading || user === undefined) {
        return <WebLoader />;
    }

    if (user && user.roles.map(u => u.name == "superAdmin")) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }

};

export default AdminRoute;
