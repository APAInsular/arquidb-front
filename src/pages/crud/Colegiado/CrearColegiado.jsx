import { useState } from "react";
import TitleCard from "../../../components/ui/TitleCard";
import Stepper from "../../../components/ui/Stepper";
import InputForm from "../../../components/ui/InputForm";
import CrudManager from "../../../hooks/CrudManager";

const CrearColegiado = () => {
    const [step, setStep] = useState(1);

    const { creates } = CrudManager({ url: `person` });

    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        identification_type: "",
        identification_number: "",
        name: "",
        first_surname: "",
        second_surname: "",
        observations: "",
        collegiate: {
            birth_date: "",
            nationality: "",
            banking_entity: "",
            account_number: "",
            college: "",
            origin_college: "",
            origin_college_number: "",
            degree: "",
            collegiate_number: "",
            specialty: "",
            termination_date: "",
            graduation_date: "",
            career_end_et: "",
            web_page: "",
            council_reg_number: "",
            situation: "",
        },
        email: {
            email: "",
        },
        address: {
            country: "",
            province: "",
            municipality: "",
            locality: "",
            street: "",
            number: "",
            postal_code: "",
        },
        phone: {
            phone: "",
        },
    });

    const handleSubmit = async () => {

        console.log(formData)
        await creates({
            data: formData, setErrors, setStatus
        });
    };

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

    // if (status) { console.log("status: ", status); }
    // if (errors) { console.log("error: ", errors); }

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <div className="h-full flex flex-col gap-4">
            <TitleCard name={"Crear Colegiado"} />

            <Stepper currentStep={step} totalSteps={3} />

            <div className="flex-1 overflow-y-scroll">
                {step === 1 && (
                    <div>
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                            <p>Datos Generales</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <InputForm
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="first_surname"
                                placeholder="Apellido"
                                value={formData.first_surname}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="second_surname"
                                placeholder="Segundo Apellido"
                                value={formData.second_surname}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="tipo"
                                placeholder="Tipo"
                                value={formData.collegiate.situation}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.college"
                                placeholder="Colegio"
                                value={formData.collegiate.college}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.collegiate_number"
                                placeholder="Nº Colegiado"
                                value={formData.collegiate.collegiate_number}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="identification_type"
                                placeholder="Tipo De Documento"
                                value={formData.identification_type}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="number"
                                name="identification_number"
                                placeholder="Numero Del Documento"
                                value={formData.identification_number}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="date"
                                name="collegiate.birth_date"
                                placeholder="Fecha De Nacimiento"
                                value={formData.collegiate.birth_date}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.nationality"
                                placeholder="Nacionalidad"
                                value={formData.collegiate.nationality}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="titulacion"
                                placeholder="Titulación"
                                value={formData.collegiate.degree}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <label htmlFor="Titulación" className="block text-md font-medium text-gray-700 mb-1">
                            Obsevaciones
                        </label>
                        <textarea
                            name="Obsevaciones"
                            placeholder="Escribe algo..."
                            value={formData.observations}
                            onChange={handleChange}
                            className="w-full py-2.5 border-b-2 focus:border-red-700 transition-all outline-none border-gray-400"
                        />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                            <p>Datos Profesionales</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                            <InputForm
                                type="text"
                                name="collegiate.origin_college"
                                placeholder="Colegio De Procedencia"
                                value={formData.collegiate.origin_college}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.origin_college_number"
                                placeholder="Número De Colegio De Procedencia"
                                value={formData.collegiate.origin_college_number}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.specialty"
                                placeholder="Especilidad"
                                value={formData.collegiate.specialty}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="date"
                                name="collegiate.graduation_date"
                                placeholder="Fecha De Titulación"
                                value={formData.collegiate.graduation_date}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="date"
                                name="collegiate.termination_date"
                                placeholder="Fecha De Terminación"
                                value={formData.collegiate.termination_date}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.web_page"
                                placeholder="Pagina web"
                                value={formData.collegiate.web_page}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="text"
                                name="collegiate.career_end_et"
                                placeholder="ET Final De Carrera"
                                value={formData.collegiate.career_end_et}
                                onChange={handleChange}
                                className=""
                            />

                            <InputForm
                                type="number"
                                name="collegiate.council_reg_number"
                                placeholder="Nº Reg. Del Consejo Superior"
                                value={formData.collegiate.council_reg_number}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <div className="mb-7 mt-2">
                            <p className="text-xl font-medium border-b pb-3 text-gray-400">Datos Contables</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputForm
                                type="text"
                                name="collegiate.banking_entity"
                                placeholder="Entidad Bancaria"
                                value={formData.collegiate.banking_entity}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="collegiate.account_number"
                                placeholder="Nº Cuenta Bancaria"
                                value={formData.collegiate.account_number}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                            <p>Datos De Contacto</p>
                        </div>
                        <InputForm
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.phone.phone}
                            onChange={handleChange}
                            className=""
                        />

                        <InputForm
                            type="email"
                            name="email.email"
                            placeholder="Correo Electrónico"
                            value={formData.email.email}
                            onChange={handleChange}
                            className=""
                        />
                        {/*  */}
                        <div className="my-7">
                            <p className="text-xl font-medium border-b pb-3 text-gray-400">Dirección </p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <InputForm
                                type="text"
                                name="address.country"
                                placeholder="País"
                                value={formData.address.country}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="address.province"
                                placeholder="Prov­inci­a"
                                value={formData.address.province}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name=".address.municipality"
                                placeholder="Muni­ci­pio"
                                value={formData.address.municipality}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="address.locality"
                                placeholder="Loca­lidad"
                                value={formData.address.locality}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="address.street"
                                placeholder="Calle"
                                value={formData.address.street}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name="address.number"
                                placeholder="Numero"
                                value={formData.address.number}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                name=".address.postal_code"
                                placeholder="Codigo Postal"
                                value={formData.address.postal_code}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-10 mt-4 lg:mx-10">
                {step > 1 ? (
                    <button onClick={handleBack}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 hover:text-gray-200 transition-all rounded-full cursor-pointer">
                        Atrás
                    </button>
                ) : (
                    <div />
                )}

                {step < 3 ? (
                    <button onClick={handleNext}
                        className="px-4 py-2 bg-red-900 text-white hover:bg-red-200 hover:text-red-800 transition-all font-medium cursor-pointer rounded-full">
                        Siguiente
                    </button>
                ) : (
                    <button onClick={() => handleSubmit()}
                        className="px-4 py-2 bg-red-900 text-white hover:bg-red-300 hover:text-red-900 font-medium rounded cursor-pointer">
                        Enviar
                    </button>
                )}
            </div>
        </div >
    );
};

export default CrearColegiado;
