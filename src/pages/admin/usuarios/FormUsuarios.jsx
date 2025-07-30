import { useState, useEffect } from "react";
import InputForm from "../../../components/ui/InputForm";
import CrudManager from "../../../hooks/CrudManager";

const FormUsuarios = ({ user, onSubmit, status, errors, falses }) => {

    const { views } = CrudManager({ url: `centers` });

    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
        center_id: user?.center_id || "",
        role: user?.roles?.length ? user.roles.map(r => r.name) : [""],
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
                center_id: user.center_id || "",
                role: user?.roles?.length ? user.roles.map(r => r.name) : [""],
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

    const handleArrayChange = (e, index, field) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({
            ...formData,
            [field]: newArray
        });
    };

    const addField = (field, defaultValue) => {
        if (formData.role.length < 2) {
            setFormData({
                ...formData,
                [field]: [...formData[field], defaultValue]
            });
        }
    };

    const removeField = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [field]: newArray.length ? newArray : [""]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    console.log(errors)

    return (
        <form onSubmit={handleSubmit} className="overflow-y-scroll space-y-6 flex flex-col justify-between h-full">
            <div>
                <div className="mb-4">
                    <InputForm
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full ${errors?.response?.data?.errors?.name ? " border-red-400" : ""}`}
                        required
                    />
                    {errors?.response?.data?.errors?.name && <p className="text-red-500 text-sm mt-1">{errors.response.data.errors.name}</p>}
                </div>

                <div className="mb-4">
                    <InputForm
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full ${errors?.response?.data?.errors?.email ? " border-red-400" : ""}`}
                        required
                    />
                    {errors?.response?.data?.errors?.email && <p className="text-red-500 text-sm mt-1">{errors.response.data.errors.email}</p>}
                </div>
                {falses ? null :
                    <div className="mb-4">
                        <InputForm
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full ${errors?.response?.data?.errors?.password ? " border-red-400" : ""}`}
                            required
                        />
                        {errors?.response?.data?.errors?.password && <p className="text-red-500 text-sm mt-1">{errors.response.data.errors.password}</p>}
                    </div>}

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
                            className="w-full border-b-2 bg-gray-200/60 focus:bg-rose-100/60 rounded-t-lg border-gray-500/70 py-3 focus:border-b-red-700 outline-none"
                            required
                        >
                            <option value="">...</option>
                            {centers.map(center => (
                                <option key={center.id} value={center.id}>
                                    {center.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    {/* <div> */}
                    {formData?.role?.map((role, i) => (
                        <div key={i} className="mb-4">
                            <select
                                type="text"
                                name={`role-${i}`}
                                placeholder={`Rol ${i + 1}`}
                                value={role}
                                onChange={(e) => handleArrayChange(e, i, "role")}
                                required
                            >
                                <option value="superAdmin">Admin</option>
                                <option value="visor">Visor</option>
                                <option value="user">User</option>
                            </select>
                            {formData?.role?.length > 1 && (
                                <div className="flexitems-center">
                                    <button
                                        onClick={() => removeField("role", i)}
                                        className="text-white flex justify-center w-full hover:text-red-700 hover:bg-red-300 bg-red-500 p-1 rounded-md cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {errors?.response?.data?.errors?.[`role.${i}`] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.response.data.errors[`role.${i}`][0]}
                                </p>
                            )}
                        </div>
                    ))}
                    {/* </div> */}
                    {formData.role.length < 2 && <button onClick={() => addField("role", "")}
                        className="flex space-x-3 flex-row items-center justify-center text-sm text-gray-700 hover:underline bg-gray-200 p-2 rounded-sm font-medium w-full cursor-pointer shadow shadow-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <p>Añadir Rol</p>
                    </button>}
                </div>
            </div>

            <div className="flex items-center gap-4 mt-auto mb-1">
                <button
                    type="submit"
                    disabled={status}
                    className="cursor-pointer rounded-md px-4 w-full py-2 bg-red-900 text-white font-medium hover:bg-red-800 transition-colors disabled:opacity-70"
                >
                    {status ?
                        <div className="flex justify-center items-center">
                            <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                        : "Enviar"}
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