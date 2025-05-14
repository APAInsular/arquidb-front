
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import InputForm from "../../../components/ui/InputForm";
import CrudManager from "../../../hooks/CrudManager";
// import Success from "../../../components/Success";

const FormUsuarios = ({ user, onSubmit, status, errors }) => {

    let navigate = useNavigate();
    // const [open, setOpen] = useState(false)

    const { views } = CrudManager({ url: `centers` });

    const [center, setCenter] = useState({});
    const [loading, setLoading] = useState(null);
    const [error, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        center_id: user?.center_id || 1,
    });

    useEffect(() => {
        views({ setData: setCenter, setLoading, setErrors: setErrors });
    }, []);

    console.log(center)

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            center_id: user?.center_id || 1,
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey], [childKey]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev, [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);

    };

    console.log("Error", errors)

    return (
        <>
            {/* {open && (
                <Success />
            )} */}
            <div className="space-y-6 flex flex-col justify-between h-full">

                <div>
                    <div>
                        <InputForm
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            className=""
                        />
                        {errors && errors?.name && <p className="text-red-500">{errors?.name}</p>}
                    </div>

                    <div>
                        <InputForm
                            type="email"
                            name="email"
                            placeholder="Correo Electronico"
                            value={formData.email}
                            onChange={handleChange}
                            className=""
                        />
                        {errors && errors?.email && <p className="text-red-500">{errors?.email}</p>}
                    </div>

                    <div>
                        <InputForm
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className=""
                        />
                        {errors && errors?.password && <p className="text-red-500">{errors?.password}</p>}
                    </div>

                    <div>
                        <label htmlFor={"name"} className="block text-md font-medium text-gray-700 mb-1">
                            Centros
                        </label>
                        {loading ?
                            <div>Cargando...</div>
                            :
                            <select className="w-full border-b-2 border-gray-500/70 py-3 focus:border-b-red-700 outline-none" name="centros" id="centros">
                                {center.length >= 1 ? center.map(datos => (
                                    <option key={datos?.id} value={datos?.id}>{datos?.name}</option>)) : ""}
                            </select>
                        }
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-auto mb-1">
                    <button onClick={() => handleSubmit()} type="submit" className="cursor-pointer rounded-md px-4 w-full py-2 bg-red-900 text-white font-medium">
                        {status ? "Cargando..." : "Enviar"}
                        {/* Enviar */}
                    </button>
                </div>

                {status == "success" ? <p className="text-green-500">{status}</p> : <p className="text-red-500">{status}</p>}
            </div>
        </>
    );
};

export default FormUsuarios;
