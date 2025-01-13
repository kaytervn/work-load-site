const Breadcrumb = ({ parentLabel, onClickParent, childLabel }: any) => {
  return (
    <nav className="text-gray-100 mb-2 font-semibold">
      <ul className="flex space-x-2">
        <li
          className="cursor-pointer py-1 px-2 rounded-lg hover:bg-gray-700 hover:text-gray-200"
          onClick={onClickParent}
        >
          {parentLabel}
        </li>
        <>
          <li className="p-1">/</li>
          <li className="text-blue-400 p-1 font-semibold">{childLabel}</li>
        </>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
