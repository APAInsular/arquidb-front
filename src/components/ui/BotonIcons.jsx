
const BotonIcons = ({ size, color, icon, notis }) => {
    return (
        <>
            <div className={`flex justify-center items-center shrink-0 relative w-[${size}px] h-[${size}px] rounded-full 
                            bg-${color}-950
                            hover:bg-${color}-300/20 transition-all cursor-pointer`}>
                <div>{icon}</div>
                {notis ?
                    (
                        <div className="flex justify-center items-center absolute bottom-0 right-0 bg-red-600 size-4.5 rounded-full text-xs">{notis}</div>
                    ) : null
                }
            </div>
        </>
    )
}

export default BotonIcons;