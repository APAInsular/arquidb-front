import { useEffect, useState } from "react";
import InputForm from "../../../components/ui/InputForm";
import Stepper from "../../../components/ui/Stepper";
import { useNavigate } from "react-router-dom";

const FormColegiado = ({ colegiado, onSubmit, status, errors }) => {

    const person = colegiado?.person;
    const collegiate = colegiado?.collegiate?.[0];

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (errors?.response?.data?.errors?.name
            || errors?.response?.data?.errors?.identification_type
            || errors?.response?.data?.errors?.identification_number
            || errors?.response?.data?.errors?.first_surname) { setStep(1) }
    }, [errors]);

    const [formData, setFormData] = useState({
        identification_type: person?.identification_type || "",
        identification_number: person?.identification_number || "",
        name: person?.name || "",
        first_surname: person?.first_surname || "",
        second_surname: person?.second_surname || "",
        observations: person?.observations || "",
        collegiate: {
            birth_date: collegiate?.birth_date || "",
            nationality: collegiate?.nationality || "",
            banking_entity: collegiate?.banking_entity || "",
            account_number: collegiate?.account_number || "",
            college: collegiate?.college || "",
            origin_college: collegiate?.origin_college || "",
            origin_college_number: collegiate?.origin_college_number || "",
            degree: collegiate?.degree || "",
            collegiate_number: collegiate?.collegiate_number || "",
            specialty: collegiate?.specialty || "",
            termination_date: collegiate?.termination_date || "",
            graduation_date: collegiate?.graduation_date || "",
            career_end_et: collegiate?.career_end_et || "",
            web_page: collegiate?.web_page || "",
            council_reg_number: collegiate?.council_reg_number || "",
            situation: collegiate?.situation || "",
        },
        email: colegiado?.email?.length
            ? colegiado.email.map(e => ({ email: e.email }))
            : [{ email: "" }],
        phone: colegiado?.phone?.length
            ? colegiado.phone.map(p => ({ phone: p.phone }))
            : [{ phone: "" }],
        address: colegiado?.address?.length
            ? colegiado.address.map(a => ({ ...a }))
            : [{
                country: "", province: "", municipality: "", locality: "",
                street: "", number: "", postal_code: ""
            }],
    });

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

    const handleArrayChange = (e, index, field) => {
        const { name, value } = e.target;
        const updatedArray = [...formData[field]];
        updatedArray[index][name] = value;
        setFormData(prev => ({
            ...prev,
            [field]: updatedArray,
        }));
    };

    const addField = (field, emptyValue) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], emptyValue],
        }));
    };

    const removeField = (field, index) => {
        setFormData(prev => {
            const updated = [...prev[field]];
            updated.splice(index, 1);
            return {
                ...prev,
                [field]: updated,
            };
        });
    };

    const handleSubmit = () => {
        onSubmit(formData);

    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    return (
        <>
            <Stepper currentStep={step} totalSteps={3} />

            <div className="flex-1 overflow-y-scroll">
                {/* {errors  ? `Error : ${errors}` : ""} */}
                {step === 1 && (
                    <div>
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                            <p>Datos Generales</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.name}
                                // errors={errors?.response?.data?.errors?.[`email.${i}.email`]}
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.first_surname}
                                name="first_surname"
                                placeholder="Apellido"
                                value={formData.first_surname}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.second_surname}
                                name="second_surname"
                                placeholder="Segundo Apellido"
                                value={formData.second_surname}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.situation"]}
                                name="collegiate.situation"
                                placeholder="Tipo"
                                value={formData.collegiate?.situation}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.college"]}
                                name="collegiate.college"
                                placeholder="Colegio"
                                value={formData.collegiate?.college}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="number"
                                errors={errors?.response?.data?.errors?.["collegiate.collegiate_number"]}
                                name="collegiate.collegiate_number"
                                placeholder="Nº Colegiado"
                                value={formData.collegiate?.collegiate_number}
                                onChange={handleChange}
                                className=""
                            />
                            <div className="mb-4">
                                <label htmlFor="" className="block text-md font-medium text-gray-700 mb-1">
                                    Tipo De Documento
                                </label>
                                <select
                                    id="center_id"
                                    name="identification_type"
                                    value={formData.identification_type}
                                    onChange={handleChange}
                                    className={`w-full h-min py-2.5 bg-gray-200/60 focus:bg-rose-100/60 ps-2 rounded-t-lg border-b-2 focus:border-red-700 ${errors?.response?.data?.errors?.identification_type ? " border-red-400 bg-red-200" : ""} transition-all outline-none border-gray-400`}
                                    required
                                >
                                    <option disabled value="">Tipo de documento...</option>
                                    <option value="DNI">DNI</option>
                                    <option value="NIF">NIF</option>
                                </select>
                                {errors?.response?.data?.errors?.identification_type && <p className="text-red-500 text-sm mt-1">{errors?.response?.data?.errors?.identification_type}</p>}
                            </div>
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.identification_number}
                                name="identification_number"
                                placeholder="Numero Del Documento"
                                value={formData.identification_number}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="date"
                                errors={errors?.response?.data?.errors?.["collegiate.birth_date"]}
                                name="collegiate.birth_date"
                                placeholder="Fecha De Nacimiento"
                                value={formData.collegiate?.birth_date}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.nationality"]}
                                name="collegiate.nationality"
                                placeholder="Nacionalidad"
                                value={formData.collegiate?.nationality}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.degree"]}
                                name="collegiate.degree"
                                placeholder="Titulación"
                                value={formData.collegiate?.degree}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <label htmlFor="Titulación" className="block text-md font-medium text-gray-700 mb-1">
                            Obsevaciones
                        </label>
                        <textarea
                            name="observations"
                            placeholder="Escribe algo..."
                            value={formData.observations}
                            onChange={handleChange}
                            className="bg-gray-200/50 rounded-t-lg focus:bg-rose-100/60 w-full py-2.5 border-b-2 focus:border-red-700 transition-all outline-none border-gray-400"
                        />
                        {errors?.response?.data?.errors?.observations && <p className="text-red-500 text-sm mt-1">{errors?.response?.data?.errors?.observations}</p>}
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
                                errors={errors?.response?.data?.errors?.["collegiate.origin_college"]}
                                name="collegiate.origin_college"
                                placeholder="Colegio De Procedencia"
                                value={formData.collegiate?.origin_college}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="number"
                                errors={errors?.response?.data?.errors?.["collegiate.origin_college_number"]}
                                name="collegiate.origin_college_number"
                                placeholder="Número De Colegio De Procedencia"
                                value={formData.collegiate?.origin_college_number}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.specialty"]}
                                name="collegiate.specialty"
                                placeholder="Especilidad"
                                value={formData.collegiate?.specialty}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="date"
                                errors={errors?.response?.data?.errors?.["collegiate.graduation_date"]}
                                name="collegiate.graduation_date"
                                placeholder="Fecha De Titulación"
                                value={formData.collegiate?.graduation_date}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="date"
                                errors={errors?.response?.data?.errors?.["collegiate.termination_date"]}
                                name="collegiate.termination_date"
                                placeholder="Fecha De Terminación"
                                value={formData.collegiate?.termination_date}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.web_page"]}
                                name="collegiate.web_page"
                                placeholder="Pagina web"
                                value={formData.collegiate?.web_page}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.career_end_et"]}
                                name="collegiate.career_end_et"
                                placeholder="ET Final De Carrera"
                                value={formData.collegiate?.career_end_et}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="number"
                                errors={errors?.response?.data?.errors?.["collegiate.council_reg_number"]}
                                name="collegiate.council_reg_number"
                                placeholder="Nº Reg. Del Consejo Superior"
                                value={formData.collegiate?.council_reg_number}
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
                                errors={errors?.response?.data?.errors?.["collegiate.banking_entity"]}
                                name="collegiate.banking_entity"
                                placeholder="Entidad Bancaria"
                                value={formData.collegiate?.banking_entity}
                                onChange={handleChange}
                                className=""
                            />
                            <InputForm
                                type="text"
                                errors={errors?.response?.data?.errors?.["collegiate.account_number"]}
                                name="collegiate.account_number"
                                placeholder="Nº Cuenta Bancaria"
                                value={formData.collegiate?.account_number}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="text-xl font-medium text-gray-400 border-b-1 pb-3 mb-4">
                            <p>Datos De Contacto</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                {formData.phone.map((p, i) => (
                                    <div key={i} className=" mb-4">
                                        <InputForm
                                            type="tel"
                                            errors={errors?.response?.data?.errors?.[`phone.${i}.phone`]}
                                            name="phone"
                                            placeholder={`Teléfono ${i + 1}`}
                                            value={p.phone}
                                            onChange={(e) => handleArrayChange(e, i, "phone")}
                                        />
                                        {formData.phone.length > 1 && (
                                            <div className="flex justify-end items-center">
                                                <button onClick={() => removeField("phone", i)} className="text-red-200 hover:text-red-700 hover:bg-red-300 bg-red-500 p-1 rounded-md cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => addField("phone", { phone: "" })} className="flex space-x-3 flex-row items-center justify-center text-sm text-gray-700 hover:underline bg-gray-200 p-2 rounded-sm font-medium w-full cursor-pointer  shadow shadow-gray-300 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Añadir teléfono</p>
                                </button>
                            </div>

                            <div>
                                {formData.email.map((e, i) => (
                                    <div key={i} className="mb-4">
                                        <InputForm
                                            type="email"
                                            errors={errors?.response?.data?.errors?.[`email.${i}.email`]}
                                            name="email"
                                            placeholder={`Correo ${i + 1}`}
                                            value={e.email}
                                            onChange={(e) => handleArrayChange(e, i, "email")}
                                        />
                                        {formData.email.length > 1 && (
                                            <div className="flex justify-end items-center">
                                                <button onClick={() => removeField("email", i)} className="text-red-200 hover:text-red-700 hover:bg-red-300 bg-red-500 p-1 rounded-md cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => addField("email", { email: "" })} className="flex space-x-3 flex-row items-center justify-center text-sm text-gray-700 hover:underline bg-gray-200 p-2 rounded-sm font-medium w-full cursor-pointer  shadow shadow-gray-300 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Añadir Correo</p>
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 mb-2">Direcciones</p>
                            {formData.address.map((addr, i) => (
                                <div key={i} className="mb-4 mx-1 p-3 shadow shadow-gray-300 rounded-md bg-gray-50">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.country`]}
                                            name="country" placeholder="País" value={addr.country}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.province`]}
                                            name="province" placeholder="Provincia" value={addr.province}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.municipality`]}
                                            name="municipality" placeholder="Municipio" value={addr.municipality}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.locality`]}
                                            name="locality" placeholder="Localidad" value={addr.locality}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.street`]}
                                            name="street" placeholder="Calle" value={addr.street}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.number`]}
                                            name="number" placeholder="Número" value={addr.number}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />

                                        <InputForm type="text"
                                            errors={errors?.response?.data?.errors?.[`address.${i}.postal_code`]}
                                            name="postal_code" placeholder="Código Postal" value={addr.postal_code}
                                            onChange={(e) => handleArrayChange(e, i, "address")} />
                                    </div>
                                    {formData.address.length > 1 && (
                                        <button onClick={() => removeField("address", i)} className=" mt-2 text-sm text-red-500 hover:underline font-medium cursor-pointer">Eliminar</button>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => addField("address", {
                                country: "", province: "", municipality: "", locality: "",
                                street: "", number: "", postal_code: ""
                            })} className="flex space-x-3 flex-row items-center justify-center text-sm text-gray-700 hover:underline bg-gray-200 p-2 rounded-sm font-medium w-full cursor-pointer mb-5 shadow shadow-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                <p>Añadir Dirección</p>
                            </button>
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
                        {status ?
                            <div className="flex justify-center items-center ">
                                <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            : "Enviar"}
                    </button>
                )}
            </div>
        </>
    );
}

export default FormColegiado;