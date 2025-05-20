
const Default = ({ children, className }) => {
    return (
        <div className={`absolute z-200 modal-appear bg-red-950 text-white/70 py-3 rounded-md right-0 mt-2 shadow-2xl ${className}`}>
            <div className="absolute bg-red-950 right-4 top-[-3px] p-2 rotate-45"></div>
            {children}
        </div>
    );
}

export default Default;
