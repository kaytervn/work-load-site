const Breadcrumb = ({ parentLabel, onClickParent, childLabel }: any) => {
  return (
    <nav className="text-gray-500 mb-2">
      <ul className="flex space-x-2">
        <li
          className="cursor-pointer p-1 rounded-lg hover:bg-gray-100"
          onClick={onClickParent}
        >
          {parentLabel}
        </li>
        <>
          <li className="p-1 rounded-lg">/</li>
          <li className="text-blue-500 p-1 font-semibold">{childLabel}</li>
        </>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
