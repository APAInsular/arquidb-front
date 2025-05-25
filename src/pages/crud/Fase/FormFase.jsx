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
                {status ?
                    <div className="flex justify-center items-center">
                        <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    </div>
                    : "Enviar"}
            </button>
        </>
    );
};

export default FormFase;