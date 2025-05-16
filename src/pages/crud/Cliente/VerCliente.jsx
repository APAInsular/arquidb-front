import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudManager from "../../../hooks/CrudManager";
import { Mail, Phone, MapPin, UserCircle2 } from "lucide-react"; // iconos bonitos

const VerCliente = () => {
  const params = useParams();
  const { views } = CrudManager({ url: `personClient/${params.id}` });

  const [clients, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    views({ setData: setClient, setLoading, setErrors: setError });
  }, []);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const person = clients?.person || {};
  const address = clients?.address || {};
  const agent = clients?.client?.[0]?.agent || "-";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-lg p-8 space-y-10">
        <div className="flex items-center gap-4 border-b pb-6">
          <UserCircle2 className="w-12 h-12 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {person.name} {person.first_surname} {person.second_surname}
            </h2>
            <p className="text-sm text-gray-500">
              {person.identification_type}: {person.identification_number}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Datos personales */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">🧾 Datos Personales</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Identificación:</strong> {person.identification_type}</li>
              <li><strong>Número:</strong> {person.identification_number}</li>
              <li><strong>Nombre:</strong> {person.name}</li>
              <li><strong>1º Apellido:</strong> {person.first_surname || '-'}</li>
              <li><strong>2º Apellido:</strong> {person.second_surname || '-'}</li>
              <li><strong>Observaciones:</strong> {person.observations || '-'}</li>
              <li><strong>Agente:</strong> {agent}</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">📞 Contacto</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span><strong>Email:</strong> {clients?.email || '-'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span><strong>Teléfono:</strong> {clients?.phone || '-'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dirección */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">📍 Dirección</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <div><strong>País:</strong> {address.country || '-'}</div>
            <div><strong>Provincia:</strong> {address.province || '-'}</div>
            <div><strong>Municipio:</strong> {address.municipality || '-'}</div>
            <div><strong>Localidad:</strong> {address.locality || '-'}</div>
            <div><strong>Calle:</strong> {address.street || '-'}</div>
            <div><strong>Número:</strong> {address.number || '-'}</div>
            <div><strong>Código Postal:</strong> {address.postal_code || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerCliente;
