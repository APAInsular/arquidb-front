import { Link } from "react-router-dom";

const CrearExpediente = () => {
    return (
        <>
            <div>
                <div className="flex justify-between border-b p-2">
                    <Link to="/expedientes" className="text-5xl">←</Link>
                    <h3 className="text-5xl">Crear expediente</h3>
                </div>
                <div className="p-2">
                    <h4 className="text-3xl text-gray-400">Datos Generales</h4>
                    <form>
                        <div className="grid grid-cols-12 gap-4 p-4">
                            {/* Cada div ocupa 4 columnas (12/3 = 4 columnas por elemento) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Nombre Proyecto
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    id="number"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={8} maxLength={8}
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                                    Presupuesto
                                </label>
                                <input
                                    type="number"
                                    name="budget"
                                    id="budget"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="site" className="block text-sm font-medium text-gray-700">
                                    Emplazamiento
                                </label>
                                <input
                                    type="text"
                                    name="site"
                                    id="site"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Ejemplos adicionales (puedes agregar más campos) */}
                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    minLength={5} maxLength={5}
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Fecha Inicial
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    id="startDate"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 lg:col-span-4 space-y-2">
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                    Fecha Final
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    id="endDate"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-2 mb-10">
                    <h4 className="text-3xl text-gray-400 mb-5">Fases</h4>
                    <div>
                        <button type="button" className="bg-red-700 text-white rounded-full text-5xl">+</button>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="bg-blue-600 text-white rounded-full py-2 px-6">Enviar</button>
                </div>
            </div>
        </>
    )
}

export default CrearExpediente;