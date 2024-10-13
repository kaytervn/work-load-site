import { useState, useEffect } from "react";
import {
  CheckIcon,
  BellIcon,
  MailCheckIcon,
  TrashIcon,
  BellOffIcon,
} from "lucide-react";
import useFetch from "../hooks/useFetch";
import { ConfimationDialog } from "./Dialog";
import useDialog from "../hooks/useDialog";

const Notification = () => {
  const { isDialogVisible, showDialog, hideDialog } = useDialog();
  const [activeTab, setActiveTab] = useState(1);
  const [notifications, setNotifications] = useState<any>([]);
  const { get, put, del, loading } = useFetch();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await get("/v1/notification/list?isPaged=0&getMyNotifications=1");
    setNotifications(res.data.content);
  };

  const markAsRead = async (id: string) => {
    const res = await put(`/v1/notification/read/${id}`);
    setNotifications(res.data);
  };

  const markAllAsRead = async () => {
    const res = await put("/v1/notification/read-all");
    setNotifications(res.data);
  };

  const deleteNotification = async (id: string) => {
    const res = await del(`/v1/notification/delete/${id}`);
    setNotifications(res.data);
  };

  const deleteAllNotifications = async () => {
    const res = await del("/v1/notification/delete-all");
    setNotifications(res.data);
    hideDialog();
  };

  const handleDeleteDialog = () => {
    showDialog();
  };

  const filteredNotifications: any =
    activeTab === 3
      ? notifications
      : notifications.filter((n: any) => n.status === activeTab);

  return (
    <div className="absolute ml-4 left-64 top-48 w-[32rem] bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="p-4 bg-gray-50">
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
          {[1, 2, 3].map((tab: number) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === 1 ? "Chưa đọc" : tab === 2 ? "Đã đọc" : "Tất cả"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification: any) => (
            <div key={notification._id} className="border-b last:border-b-0">
              <div className="flex items-start p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex-shrink-0 mr-3 mt-3">
                  {notification.status === 1 ? (
                    <BellIcon className="h-5 w-5 text-blue-500" />
                  ) : (
                    <MailCheckIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.createdAt}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {notification.status === 1 && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors duration-200"
                    >
                      <CheckIcon size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <BellOffIcon className="h-8 w-8 mb-2" />
            <p>Không có thông báo</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-50">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {filteredNotifications.length} thông báo
        </span>
        <div className="space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đánh dấu tất cả đã đọc
          </button>
          <button
            onClick={handleDeleteDialog}
            className="px-3 py-1 text-sm font-medium text-white bg-red-600 border rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Xóa tất cả
          </button>
        </div>
      </div>
      <ConfimationDialog
        isVisible={isDialogVisible}
        title="Xóa tất cả thông báo"
        message="Bạn có chắc muốn xóa tất cả thông báo?"
        onConfirm={deleteAllNotifications}
        confirmText="Xóa"
        onCancel={hideDialog}
        color="red"
      />
    </div>
  );
};

export default Notification;
