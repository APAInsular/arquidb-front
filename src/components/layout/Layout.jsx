import Header from './Header'
import Aside from './Aside'
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
    return (
        <>

            <div className="w-screen h-screen overflow-hidden flex flex-col layout">
                <Header />
                <div className="flex flex-1">
                    <Aside />
                    <div className=" flex-1 bg-gray-100 p-4 rounded-[13px] me-2.5 mb-2.5">
                    <Outlet />
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout;