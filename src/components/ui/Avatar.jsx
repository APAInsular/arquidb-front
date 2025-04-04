
const Avatar = ({ name, foto, size, text }) => {
    return (
        <>
            <div className={`${foto ? `bg-[url(${foto})]` : "bg-gray-400 hover:bg-gray-300 transition-all"} w-[${size}px] h-[${size}px] select-none rounded-full flex shrink-0 justify-center items-center cursor-pointer`}>
                <div className={`${text}`}>
                    {name}
                </div>
            </div >
        </>
    )
}

export default Avatar;