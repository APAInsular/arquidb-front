import Default from "../Default";
import { useState, useEffect } from "react";

const PhaseEditor = ({ expedientPhases, setExpedientPhases, setModalPhase }) => {
    const [oldPhase, setOldPhase] = useState({});
    const [newPhase, setNewPhase] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        if (expedientPhases.some(item => item.phase === oldPhase.phase)) {
            if (!expedientPhases.some(item => item.phase === newPhase.phase)) {
                let phaseObj = expedientPhases.find(phase => phase.phase == oldPhase.phase);
                phaseObj.phase = newPhase.phase;
                setExpedientPhases([...expedientPhases]);
            } else alert("Por favor, en el segundo campo ingrese una fase que no exista.");

        } else alert("Por favor, en el primer campo ingrese una fase que exista.");
        console.log(expedientPhases);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) { // Solo permite hasta 4 dígitos
            if (e.target.name == "old_phase") setOldPhase({ phase: value });
            else if (e.target.name == "new_phase") setNewPhase({ phase: value });
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
                                <input type="number" name="old_phase" id="old_phase"
                                    value={oldPhase.phase || ""} onChange={handleInputChange} min={0} max={9999}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-10" />
                                <input type="number" name="new_phase" id="new_phase"
                                    value={newPhase.phase || ""} onChange={handleInputChange} min={0} max={9999}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-10" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h4 className="text-2xl">¿Está seguro/a de su elección?</h4>
                        <div className="flex justify-center space-x-10 mt-5 p-2">
                            <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-lg">Crear</button>
                            <button type="button" className="bg-gray-200 py-2 px-4 rounded-lg" onClick={() => setModalPhase(false)}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </Default>
    );
}

export default PhaseEditor;