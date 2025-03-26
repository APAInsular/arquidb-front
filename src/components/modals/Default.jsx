
const Default = ({ children, className }) => {
    return (
        <div className={`absolute z-20 bg-red-950 text-white/70 py-3 rounded-md right-0 mt-2 shadow-2xl ${className}`}>
            <div className="absolute bg-red-950 p-2 right-4 top-[-3px] rotate-45"></div>
            {children}
        </div>
    );
}

export default Default;
