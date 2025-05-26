const PulseLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-25 h-25 rounded-full bg-gray-200"></div>
                <div className="h-7 bg-gray-200 rounded w-88"></div>
                <div className="h-7 bg-gray-200 rounded w-88"></div>
                <div className="flex flex-row space-x-2">
                    <div className="h-7 bg-gray-200 rounded w-43"></div>
                    <div className="h-7 bg-gray-200 rounded w-43"></div>
                </div>
            </div>
        </div>
    );
}

export default PulseLoader;