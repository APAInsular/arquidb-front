
const Avatar = ({name, foto, size}) => {
    return (
        <>
            <div className={`${foto ? `bg-[url(${foto})]` : "bg-gray-400"} w-[${size}px] h-[${size}px] select-none rounded-full flex shrink-0 justify-center items-center`}>
                <div className="text-xl text-white">
                    {name}
                </div>
            </div >
        </>
    )
}

export default Avatar;