import Header from './Header'
import Aside from './Aside'
import { Outlet } from 'react-router-dom';
import { useRef } from 'react';
const Layout = ({ children }) => {

    const asideRef = useRef(null);

    const handleHideAside = () => {
        if (asideRef.current) {
            const currentDisplay = asideRef.current.style.display;
            asideRef.current.style.display = currentDisplay === "none" ? "block" : "none";
        }
    };


    return (
        <>

            <div className="w-screen h-screen overflow-hidden flex flex-col layout">
                <Header onClicks={handleHideAside} />
                <div className="flex flex-1 overflow-hidden">
                    <Aside ref={asideRef} />
                    <div className=" flex-1 bg-gray-100 ps-1 pt-1 sm:p-4 pb-1 rounded-t-[13px] sm:rounded-[13px] overflow-hidden relative sm:me-2.5 sm:ms-2.5 sm:mb-2.5">
                        <Outlet />
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout;