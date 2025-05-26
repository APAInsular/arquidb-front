import { NavLink, useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import WebError from "../../../routes/errors/WebError";
import PulseLoader from "../../../routes/loaders/PulseLoader";
import TitleCard from "../../../components/ui/TitleCard";
import { useEffect, useState } from "react";
import { Building2Icon, Edit, MapPin, School2Icon } from "lucide-react";

const VerCentro = () => {

    const params = useParams();
    const { views } = CrudManager({ url: `centers/${params.id}` });

    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const address = `${centers?.street}, ${centers?.municipality}, ${centers?.locality}`;
    const encodedAddress = encodeURIComponent(address);
    const mapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;


    useEffect(() => {
        views({ setData: setCenters, setLoading, setErrors: setError });
    }, []);

    if (loading) { return <PulseLoader /> };
    if (error) { return <WebError /> };

    console.log(centers)
    return (
        <>
            <TitleCard name={"Centros"} action={"Ver"} />
            <div className="h-full overflow-y-scroll">
                <div className=" mt-5 rounded-t-lg  p-6 sm:p-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative">
                            <div className="bg-amber-900 rounded-lg text-amber-100 shadow p-2">
                                <Building2Icon className="w-25 h-25 " />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-black">
                                {centers?.name}
                            </h2>
                            <p className="text-gray-900 mt-1 text-lg">
                                {centers?.number}
                            </p>
                        </div>
                        <NavLink className="flex flex-row gap-4 bg-sky-600 text-sky-200 transition-all border-sky-100 hover:text-sky-900 hover:border-sky-800 border-2 hover:bg-sky-200 p-2 rounded-md font-medium px-4" to={`/centros/${params.id}/editar`}>
                            <Edit />
                            Editar
                        </NavLink>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md shadow mb-4">
                    <div className="flex items-center gap-3 mb-6 w-full">
                        <div className="p-2 rounded-lg bg-orange-200 text-orange-700">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Dirección del centro</h3>
                    </div>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
                        <div>
                            <p className="text-sm text-gray-500">Localidad</p>
                            <p className="font-medium">{centers?.locality}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Municipio</p>
                            <p className="font-medium">{centers?.municipality}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Calle</p>
                            <p className="font-medium">{centers?.street}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <p className="font-medium">{centers?.phone}</p>
                        </div>
                    </div>

                </div>
                    <div className="mb-10" style={{ width: '100%' }}>
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src={mapSrc}
                            style={{ border: 0 }}
                            allowFullScreen
                        ></iframe>
                    </div>
            </div>
        </>
    );
}

export default VerCentro;