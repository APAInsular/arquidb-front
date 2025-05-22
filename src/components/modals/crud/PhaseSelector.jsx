import Default from "../Default";
import { useState } from "react";

const PhaseSelector = ({ expedientPhases, setExpedientPhases, setModalPhase, inputName }) => {
    const [phase, setPhase] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phase.phase.length === 4) {
            switch (inputName) {
                case "new_phase":
                    if (!expedientPhases.some(item => item.phase === phase.phase)) {
                        setExpedientPhases([...expedientPhases, phase]);
                        setPhase("");
                        setModalPhase(false);
                    } else alert("Por favor ingrese una fase que no exista.");
                    break;
                case "old_phase":
                    if (expedientPhases.some(item => item.phase === phase.phase)) {
                        setExpedientPhases(expedientPhases.filter(oldPhase => oldPhase.phase != phase.phase));
                        setPhase("");
                        setModalPhase(false);
                    } else alert("Por favor ingrese una fase que exista.");
                    break;

            }
        } else alert("La fase debe tener cuatro dígitos.");
        console.log(phase);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) { // Solo permite hasta 4 dígitos
            setPhase({ phase: value });
        }
    };

    return (
        <Default className="text-center">
            <div className="bg-white text-red-500">
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-10 text-black">
                        <h3 className="text-3xl border-b">Fases</h3>
                        <div className="flex justify-center">
                            <div className="w-2/3 overflow-y-auto max-h-[200px]">
                                <input type="number" name={inputName} id={inputName} value={phase.phase || ""} onChange={handleInputChange} min={0} max={9999} className="w-full p-2 border border-gray-300 rounded-md mt-10" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h4 className="text-2xl">¿Está seguro/a de su elección?</h4>
                        <div className="flex justify-center space-x-10 mt-5 p-2">
                            {inputName == "new_phase" ? (
                                <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-lg">Crear</button>
                            ) : (
                                <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-lg">Eliminar</button>
                            )}
                            <button type="button" className="bg-gray-200 py-2 px-4 rounded-lg" onClick={() => setModalPhase(false)}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </Default>
    );
}

export default PhaseSelector;