import Header from './Header'
import Aside from './Aside'
const Layout = ({children}) => {
    return (
        <>
            <Header />
            <Aside />
            {children}
        </>
    )
}

export default Layout;