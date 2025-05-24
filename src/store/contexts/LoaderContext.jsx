import { createContext, useContext, useState } from "react";
import WebLoader from "../../routes/loaders/WebLoader";
import AlertPage from "../../components/modals/AlertPage";

const AlertLoaderContext = createContext();
export const UseLoader = () => useContext(AlertLoaderContext);


const LoaderContext = ({ children }) => {

    const [open, setOpen] = useState(false);

    const showLoader = () => setOpen(true);
    const hideLoader = () => setOpen(false);

    return (
        <AlertLoaderContext.Provider value={{ showLoader, hideLoader }}>
            {open && <AlertPage onClose={(() => setOpen(false))} />}
            {children}
        </AlertLoaderContext.Provider>
    );
};

export default LoaderContext;