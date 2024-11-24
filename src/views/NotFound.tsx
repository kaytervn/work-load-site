import notFoundImage from "../assets/error_404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <img src={notFoundImage} alt="404 Not Found" className="w-64" />
      <h1 className="text-4xl font-bold text-red-500">Page not found</h1>
      <p className="text-lg text-gray-700 mt-2">
        Oops! This page does not exist
      </p>
    </div>
  );
};

export default NotFound;
