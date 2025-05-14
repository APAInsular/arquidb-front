import { act } from "react";
import { Link, useNavigate } from "react-router-dom";

const TitleCard = ({ name, action, icon }) => {

    const navigate = useNavigate();

    const handleclick = (nav) => {
        navigate(nav);
    }

    return (
        <div className="flex flex-row justify-start space-x-4 items-center border-b-2 border-gray-200 pb-2 text-black/70 w-full">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
            </svg>

            <div className="flex flex-row items-center text-lg font-medium">
                <button onClick={() => handleclick(action ? -1 : 0)} className="p-0 m-0 cursor-pointer hover:text-gray-400 transition-all">{name}</button>
                {action ?
                    <>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                        <button onClick={() => handleclick(0)} className=" p-0 m-0 font-medium cursor-pointer hover:text-gray-400 transition-all">
                            {action}
                        </button>
                    </>
                    : ""}

            </div>

        </div>
    );
}

export default TitleCard;