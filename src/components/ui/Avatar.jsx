
const Avatar = ({ name, foto, size, text }) => {

    const avatarStyle = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: foto ? `url(${foto})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const baseClasses = `select-none rounded-full flex shrink-0 justify-center items-center cursor-pointer`;
    const bgClass = foto ? '' : 'bg-gray-400 hover:bg-gray-300 transition-all';

    return (

        <div className={`${baseClasses} ${bgClass}`} style={avatarStyle}>
            {!foto && <div className={`${text}`}>{name}</div>}
        </div>

    );
};

export default Avatar;
