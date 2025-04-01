
const TitleCard = ({ name }) => {
    return (
        <div className="flex flex-row justify-between items-center border-b-2 border-gray-200 pb-2 text-black/60 w-full ">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </div>
            <div className="text-2xl font-medium">
                {name}
            </div>
        </div>
    );
}

export default TitleCard;