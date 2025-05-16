import { useState, useEffect } from "react";
import InputForm from "../../../components/ui/InputForm";
import CrudManager from "../../../hooks/CrudManager";

const FormUsuarios = ({ user, onSubmit, status, errors }) => {

    const { views } = CrudManager({ url: `centers` });

    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        center_id: user?.center_id || "",
    });

    useEffect(() => {
        views({ setData: setCenters, setLoading, setErrors: setErrors });
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
                center_id: user.center_id || ""
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCenterChange = (e) => {
        const centerId = e.target.value;
        setFormData(prev => ({
            ...prev,
            center_id: centerId
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between h-full">
            <div>
                <div className="mb-4">
                    <InputForm
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <InputForm
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                    />
                    {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <InputForm
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                    />
                    {errors?.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="center_id" className="block text-md font-medium text-gray-700 mb-1">
                        Centros
                    </label>
                    {loading ? (
                        <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
                    ) : (
                        <select
                            id="center_id"
                            name="center_id"
                            value={formData.center_id}
                            onChange={handleCenterChange}
                            className="w-full border-b-2 border-gray-500/70 py-3 focus:border-b-red-700 outline-none"
                        >
                            <option value="">...</option>
                            {centers.map(center => (
                                <option key={center.id} value={center.id}>
                                    {center.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors?.center_id && <p className="text-red-500 text-sm mt-1">{errors.center_id}</p>}
                </div>
            </div>

            <div className="flex items-center gap-4 mt-auto mb-1">
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="cursor-pointer rounded-md px-4 w-full py-2 bg-red-900 text-white font-medium hover:bg-red-800 transition-colors disabled:opacity-70"
                >
                    {status === "loading" ? "Cargando..." : "Enviar"}
                </button>
            </div>

            {status === "success" ? (
                <p className="text-green-500 text-center">{status}</p>
            ) : status && status !== "loading" ? (
                <p className="text-red-500 text-center">{status}</p>
            ) : null}
        </form>
    );
};

export default FormUsuarios;