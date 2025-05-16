
import Logo from '../../assets/images/logo.png'

const WebLoader = () => {
    return (
        <div className="">
            <div className="loading overflow-hidden fixed inset-0 z-300 flex justify-center flex-col space-y-5 items-center ">
                <img src={Logo} alt="" width={100} height={100} className=' brightness-120' />
                <div className="size-25 rounded-full animate-spin border-8 border-dashed border-red-300 border-t-transparent">
                </div>
            </div>
        </div>
    )
}

export default WebLoader;