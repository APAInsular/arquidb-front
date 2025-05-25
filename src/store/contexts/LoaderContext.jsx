import { createContext, useContext, useState } from "react";
import WebLoader from "../../routes/loaders/WebLoader";
import AlertPage from "../../components/modals/AlertPage";
import AlertErrorPage from "../../components/modals/AlertErrorPage";

const AlertLoaderContext = createContext();
export const UseLoader = () => useContext(AlertLoaderContext);


const LoaderContext = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const showLoader = () => setOpen(true);
    const hideLoader = () => setOpen(false);

    const showError = () => setError(true);
    const hideError = () => setError(false);

    return (
        <AlertLoaderContext.Provider value={{ showLoader, hideLoader, showError, hideError }}>
            {open && <AlertPage onClose={(() => setOpen(false))} />}
            {error && <AlertErrorPage onClose={(() => setError(false))} />}
            {children}
        </AlertLoaderContext.Provider>
    );
};

export default LoaderContext;