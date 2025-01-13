import notFoundImage from "../assets/error_404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
      <img src={notFoundImage} alt="404 Not Found" className="w-64" />
      <h1 className="text-4xl font-semibold text-blue-600">Page not found</h1>
      <p className="text-lg text-gray-100 mt-2">
        Oops! This page does not exist
      </p>
    </div>
  );
};

export default NotFound;
