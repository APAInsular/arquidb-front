import { CheckCircle, X } from "lucide-react";

const AlertPage = () => {
    return (
        <>
            <div className=" text-nowrap fixed z-50 m-2 p-2 bottom-0">
                <div className="modal-appear-alert flex flex-col py-4 rounded-md shadow-2xl shadow-black bg-green-300 border-e-4 border-green-800">
                    <div className="flex px-1 flex-row h-full justify-center items-center space-x-20">
                        <div className="flex flex-row space-x-2.5">
                            <CheckCircle className="text-green-800" />
                            <div className="text-green-800 ms-auto">Correcto, Inserción correctan</div>
                        </div>
                        <div><X className="w-5 h-5 text-green-800" /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertPage;

