import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GORGEOUS_SWAGGER, REQUEST_MANAGER } from "../../types/pageConfig";
import Sidebar from "../../components/Sidebar";
import ListRequestsComponent from "../../components/swagger/request/ListRequestsComponent";
import { getItemById, overwriteItemInStorage } from "../../types/utils";
import { toast, ToastContainer } from "react-toastify";
import { mapCollectionRequests } from "../../services/SwaggerService";

const RequestManager = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const { state } = useLocation();

  const getDataById = () => {
    if (item == null) {
      navigate(GORGEOUS_SWAGGER.path);
      return;
    }
    return getItemById(GORGEOUS_SWAGGER.name, item.id);
  };

  const handleAddRequest = (request: any) => {
    const handledRequests = [...requests, request];
    handledRequests.sort((a, b) => {
      const folderCompare = a.folder.localeCompare(b.folder);
      return folderCompare !== 0 ? folderCompare : a.name.localeCompare(b.name);
    });
    const item = getDataById();
    item.requests = mapCollectionRequests(handledRequests);
    overwriteItemInStorage(GORGEOUS_SWAGGER.name, item);
    setRequests(handledRequests);
    toast.success("Request added successfully");
  };

  const handleEditRequest = (index: any, updatedRequest: any) => {
    const item = getDataById();
    setRequests((prevRequests: any) => {
      const updatedRequests = prevRequests.map((item: any, i: number) =>
        i === index ? updatedRequest : item
      );
      updatedRequests.sort((a: any, b: any) => {
        const folderCompare = a.folder.localeCompare(b.folder);
        return folderCompare !== 0
          ? folderCompare
          : a.name.localeCompare(b.name);
      });
      item.requests = mapCollectionRequests(updatedRequests);
      overwriteItemInStorage(GORGEOUS_SWAGGER.name, item);
      return updatedRequests;
    });
    toast.success("Request edited successfully");
  };

  const handleRemoveRequest = (index: number) => {
    const handledRequests = requests.filter((_: any, i: any) => i !== index);
    handledRequests.sort((a: any, b: any) => {
      const folderCompare = a.folder.localeCompare(b.folder);
      return folderCompare !== 0 ? folderCompare : a.name.localeCompare(b.name);
    });
    const item = getDataById();
    item.requests = mapCollectionRequests(handledRequests);
    overwriteItemInStorage(GORGEOUS_SWAGGER.name, item);
    setRequests(handledRequests);
    toast.success("Request deleted successfully");
  };

  useEffect(() => {
    if (state?.collectionId) {
      const item = getItemById(GORGEOUS_SWAGGER.name, state.collectionId);
      if (item) {
        setItem(item);
        const requests = [];
        if (item.requests?.length > 0) {
          for (const req of item.requests) {
            requests.push({
              name: req.name,
              method: req.method,
              body: req.body ? req.body : "",
              preScript: req.preScript ? req.preScript : "",
              preScriptIsChecked: req.preScript ? true : false,
              postScript: req.postScript ? req.postScript : "",
              postScriptIsChecked: req.postScript ? true : false,
              path: req.path,
              authKind: req.authKind || "0",
              isCustomHost: req.host || "0",
              host: req.host || "",
              folder: req.folder || "custom-requests",
            });
          }
        }
        setRequests(requests);
      } else {
        navigate(GORGEOUS_SWAGGER.path);
      }
    } else {
      navigate(GORGEOUS_SWAGGER.path);
    }
  }, [state]);

  return (
    <Sidebar
      activeItem={GORGEOUS_SWAGGER.name}
      breadcrumbs={[
        {
          label: GORGEOUS_SWAGGER.label,
          path: GORGEOUS_SWAGGER.path,
          state: { collectionId: item?.id },
        },
        { label: REQUEST_MANAGER.label },
      ]}
      renderContent={
        <>
          <ListRequestsComponent
            title={item?.collectionName}
            requests={requests}
            handleAddRequest={handleAddRequest}
            handleEditRequest={handleEditRequest}
            handleRemoveRequest={handleRemoveRequest}
          />
          <ToastContainer
            position="bottom-right"
            style={{ width: "400px" }}
            theme="dark"
          />
        </>
      }
    ></Sidebar>
  );
};

export default RequestManager;
