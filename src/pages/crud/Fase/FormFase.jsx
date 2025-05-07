import { useState } from "react";
import InputForm from "../../../components/ui/InputForm";

const FormFase = ({ fase, onSubmit, status, errors }) => {

    const [formData, setFormData] = useState({

        expedientId: fase?.expedient_id || "",
        expedientPhases: [
            {
                phase: fase?.phase || ""
            }
        ]
    })

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

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <InputForm
                    type="number"
                    name="expedientPhases.0.phase"
                    placeholder="Numero"
                    value={formData.expedientPhases[0].phase ?? ''}
                    onChange={handleChange}
                    className=""
                />
                <InputForm
                    type="number"
                    name="expedientId"
                    placeholder="Expediente"
                    value={formData.expedientId}
                    onChange={handleChange}
                    className=""
                />
            </div>

            <button onClick={() => handleSubmit()}
                className="mt-auto px-4 py-2 bg-red-900 text-white hover:bg-red-300 hover:text-red-900 font-medium rounded cursor-pointer">
                {status ? "Cargando..." : "Enviar"}
            </button>
        </>
    );
};

export default FormFase;