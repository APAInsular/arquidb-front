import { useAuth } from "../../hooks/Auth";

const UserFilter = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' });

    if (user && user.roles.some(u => u.name != "user")) return [children];
}

export default UserFilter;