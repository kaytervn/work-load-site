import { TrashIcon } from "lucide-react";
import useDialog from "../../../hooks/useDialog";
import { ConfirmationDialog } from "../../Dialog";

const TableRowComponentHeader = ({ handleRemove, headers, columns }: any) => {
  const { isDialogVisible, showDialog, hideDialog, dialogConfig } = useDialog();

  const handleDeleteDialog = (index: any) => {
    showDialog({
      title: "Delete Header",
      message: "Are you sure you want to delete this header?",
      confirmText: "Delete",
      color: "red",
      onConfirm: () => {
        handleRemove(index);
        hideDialog();
      },
      onCancel: hideDialog,
    });
  };

  return (
    <>
      <table className="w-full bg-white rounded-lg">
        <tbody className="text-gray-700 text-base outline-none">
          {headers.map((item: any, index: any) => (
            <tr
              key={index}
              className="border-gray-100 border-t hover:bg-gray-50 transition-colors duration-200"
            >
              {columns.map((col: any) => (
                <td key={col.accessor} className={`py-2 text-${col.align}`}>
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              <td className="py-1 text-end pr-1">
                <div className="flex justify-end">
                  <button
                    className={`p-2 mr-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition duration-200 ease-in-out flex items-center justify-center`}
                    onClick={() => handleDeleteDialog(index)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isVisible={isDialogVisible}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
        confirmText={dialogConfig.confirmText}
        color={dialogConfig.color}
      />
    </>
  );
};

export default TableRowComponentHeader;
