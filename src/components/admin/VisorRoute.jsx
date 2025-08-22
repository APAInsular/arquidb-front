import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import WebLoader from "../../routes/loaders/WebLoader";

const VisorRoute = () => {
    const { user, isLoading } = useAuth({ middleware: 'auth' });

    if (isLoading || user === undefined) {
        return <WebLoader />;
    }

    if (user && user.roles.some(u => u.name != "user")) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }

};

export default VisorRoute;