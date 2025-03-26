
const BotonIcons = ({ size, icon, notis }) => {
    return (
        <>
            <div className={`flex justify-center items-center shrink-0 relative w-[${size}px] h-[${size}px] rounded-full 
                            bg-red-400/20
                            hover:bg-red-950/20 hover:text-red-950 transition-all cursor-pointer`}>
                <div>{icon}</div>
                {notis ?
                    (
                        <div className="flex justify-center text-white/80 items-center absolute bottom-0 right-0 bg-red-950 size-4.5 rounded-full text-xs">{notis}</div>
                    ) : null
                }
            </div>
        </>
    )
}

export default BotonIcons;