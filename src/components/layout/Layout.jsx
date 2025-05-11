import Header from './Header'
import Aside from './Aside'
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
    return (
        <>

            <div className="w-screen h-screen overflow-hidden flex flex-col layout">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <Aside />
                    <div className=" flex-1 bg-gray-100 p-4 pb-1 rounded-t-[13px] sm:rounded-[13px] overflow-hidden relative sm:me-2.5 sm:mb-2.5">
                    <Outlet />
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout;