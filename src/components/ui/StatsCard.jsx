
const StatsCard = ({title, value}) => {
    return (
        <div className="grid grid-rows-1 bg-red-800 text-red-200 hover:text-red-800 hover:bg-red-200 transition-all shadow-2xs border-1 border-gray-200/50 p-4 rounded-lg">
            <div className="text-nowrap text-ellipsis overflow-hidden">{title}</div>
            <div className="text-4xl font-medium">
                <p>{value}</p>
            </div>
        </div>
    );
}
export default StatsCard;