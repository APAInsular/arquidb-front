import { useState, useEffect } from "react";
import InputForm from "../../../components/ui/InputForm";
import CrudManager from "../../../hooks/CrudManager";

const FormCentros = ({ center, onSubmit, status, errors, falses }) => {

    const [formData, setFormData] = useState({
        name: center?.name || "",
        phone: center?.phone || "",
        locality: center?.locality || "",
        municipality: center?.municipality || "",
        number: center?.number || "",
        street: center?.street || "",
    });

    useEffect(() => {
        if (center) {
            setFormData(prev => ({
                ...prev,
                name: center?.name || "",
                phone: center?.phone || "",
                locality: center?.locality || "",
                municipality: center?.municipality || "",
                number: center?.number || "",
                street: center?.street || "",
            }));
        }
    }, [center]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                        errors={errors?.response?.data?.errors?.name}
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <InputForm
                        errors={errors?.response?.data?.errors?.locality}
                        type="text"
                        name="locality"
                        placeholder="Localidad"
                        value={formData.locality}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <InputForm
                        errors={errors?.response?.data?.errors?.municipality}
                        type="text"
                        name="municipality"
                        placeholder="Municipo"
                        value={formData.municipality}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <InputForm
                        errors={errors?.response?.data?.errors?.number}
                        type="number"
                        name="number"
                        placeholder="Numero"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <InputForm
                        errors={errors?.response?.data?.errors?.phone}
                        type="phone"
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <InputForm
                        errors={errors?.response?.data?.errors?.street}
                        type="text"
                        name="street"
                        placeholder="Calle"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
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

export default FormCentros;