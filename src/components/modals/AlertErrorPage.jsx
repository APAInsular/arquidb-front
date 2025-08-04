import { AlertCircleIcon, LaptopMinimalCheckIcon, X } from "lucide-react";


const AlertErrorPage = ({ onClose }) => {
    return (
        <>
            <div className="text-nowrap fixed z-50 m-2 p-2 top-0">
                <div className="modal-appear-alert shadow-2xl shadow-black">
                    <div className=" flex flex-col bg-red-300 rounded-t-md">
                        <div className="flex flex-row h-full justify-center items-center space-x-13">
                            <div className="flex flex-row items-center space-x-2.5">
                                <div className="bg-red-700 m-2 p-1 rounded-sm">
                                    <AlertCircleIcon className="text-red-300 w-6 h-6" />
                                </div>
                                <div className="text-red-800 text-md flex flex-row items-center"><p className="font-medium">Error</p>, Problema en la operación</div>
                            </div>
                            <button className="bg-red-400/50 rounded-xl p-1.5 px-1.5 me-1.5 " onClick={() => setShowSuccessAlert(false)}>
                                <X onClick={onClose} className="w-6 h-6 text-red-800 font-bold" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-red-200 h-1">
                        <div className="w-full bg-red-600 h-1 animate-spin2"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlertErrorPage;