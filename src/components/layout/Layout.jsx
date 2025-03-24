import Header from './Header'
import Aside from './Aside'
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
    return (
        <>

            <div class="w-screen h-screen flex flex-col bg-[#932236]">
                <Header />
                <div class="flex flex-1">
                    <Aside />
                    <div className="flex-1 bg-white p-4 rounded-[13px] me-2.5 mb-2.5">
                    <Outlet />
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout;