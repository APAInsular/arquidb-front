import { useState } from "react";

const StatsCard = ({ title, value }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative ">
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="grid grid-rows-1 bg-red-800 text-red-200 hover:text-red-800 hover:bg-red-200 transition-all shadow-2xs border border-gray-200/50 p-4 rounded-lg"
            >
                <div className="truncate">{title}</div>
                <div className="text-4xl font-medium">
                    <p>{value ? value : 0}</p>
                </div>
            </div>
            {showTooltip && (
                <div className="modal-appear absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-lg whitespace-normal break-words text-sm text-gray-600 shadow shadow-gray-300 z-50 w-full border-5 border-[#00000007] sm:w-max ">
                    <div className="border-1 bg-white border-gray-300 w-full  py-1.5 px-2 rounded-lg text-xs">
                        {title}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
