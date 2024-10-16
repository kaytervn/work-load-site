const Button = ({ onPress, title, icon: Icon }: any) => {
  return (
    <button
      onClick={onPress}
      className="bg-blue-500 flex items-center justify-center text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200"
    >
      {Icon && <Icon className="mr-2" size={20} color="#fff" />}
      <span className="font-semibold text-lg text-center">{title}</span>
    </button>
  );
};

export default Button;
