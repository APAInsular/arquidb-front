
import Logo from '../../assets/images/logo.png'

const WebLoader = () => {
    return (
        <div className="">
            <div className={`bg-black/20 cursor-none loading overflow-hidden fixed inset-0 z-300 flex justify-start flex-col space-y-5 items-center`}>
                <div className="relative h-1 w-full overflow-hidden">
                    <div className="absolute h-full w-full bg-gradient-to-r from-red-500 to-rose-500 animate-slide rounded-full"></div>
                </div>
                <div className='mt-auto mb-auto space-y-3.5'>
                    <img src={Logo} alt="" width={100} height={100} className=' brightness-120' />
                    <div className="size-25 rounded-full animate-spin border-8 border-dashed border-red-300 border-t-transparent">
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WebLoader;