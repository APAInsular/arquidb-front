import { Check, CheckCheck, CheckCircle, LaptopMinimalCheckIcon, X } from "lucide-react";

const AlertPage = ({ onClose }) => {
    return (
        <>
            <div className="text-nowrap fixed z-50 m-2 p-2 top-0">
                <div className="modal-appear-alert shadow-2xl shadow-black">
                    <div className=" flex flex-col bg-green-300 rounded-t-md">
                        <div className="flex flex-row h-full justify-center items-center space-x-13">
                            <div className="flex flex-row items-center space-x-2.5">
                                <div className="bg-green-700 m-2 p-1 rounded-sm">
                                    <LaptopMinimalCheckIcon className="text-green-300 w-6 h-6" />
                                </div>
                                <div className="text-green-800 text-md flex flex-row items-center"><p className="font-medium">Hecho</p>, Inserción correcta</div>
                            </div>
                            <button className="bg-green-400/50 rounded-xl p-1.5 px-1.5 me-1.5 " onClick={() => setShowSuccessAlert(false)}>
                                <X onClick={onClose} className="w-6 h-6 text-green-800 font-bold" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-green-200 h-1">
                        <div className="w-full bg-green-600 h-1 animate-spin2"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertPage;

