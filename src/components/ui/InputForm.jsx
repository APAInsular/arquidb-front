const InputForm = ({ type, name, value, onChange, placeholder, className, ...props }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-md font-medium text-gray-700 mb-1">
                {placeholder}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder + "..."}
                value={value}
                onChange={onChange}
                {...props}
                className={`w-full py-2.5 bg-gray-200/60 focus:bg-rose-100/60 ps-2 rounded-t-lg border-b-2 focus:border-red-700 transition-all outline-none border-gray-400 ${className}`}
            />
        </div>
    );
};

export default InputForm;
