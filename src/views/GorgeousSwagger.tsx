import { useEffect, useState } from "react";
import { GORGEOUS_SWAGGER } from "../types/constant";
import {
  addItemToStorage,
  deleteItemFromStorage,
  encrypt,
  getItemById,
  getPaginatedStorageData,
  getStorageData,
  initializeStorage,
  overwriteItemInStorage,
  parseResponseText,
} from "../types/utils";
import Header from "../components/swagger/Header";
import InputBox from "../components/InputBox";
import { SearchIcon } from "lucide-react";
import Card from "../components/swagger/Card";
import { SwaggerCollection } from "../types/interfaces";
import { toast, ToastContainer } from "react-toastify";
import NoData from "../components/NoData";
import Pagination from "../components/Pagination";
import { ConfimationDialog, LoadingDialog } from "../components/Dialog";
import useDialog from "../hooks/useDialog";
import ConvertCollection from "../components/swagger/ConvertCollections";
import { transformJson } from "../types/converter";
import { useLoading } from "../hooks/useLoading";
import ExportCollection from "../components/swagger/ExportCollection";
import ImportCollection from "../components/swagger/ImportCollection";
import CollectionForm from "../components/swagger/CollectionForm";
import useModal from "../hooks/useModal";

const GorgeousSwagger = ({ sidebar }: any) => {
  const { isDialogVisible, showDialog, hideDialog, dialogConfig } = useDialog();
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();
  const [convertModalVisible, setConvertModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [data, setData] = useState<SwaggerCollection[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchedJson, setFetchedJson] = useState<any>(null);
  const [exportedText, setExportedText] = useState<string>("");
  const { isLoading, showLoading, hideLoading } = useLoading();
  const size = 6;

  useEffect(() => {
    document.title = "Gorgeous Swagger";
    fetchData(0, searchValue);
  }, []);

  const fetchData = (page: number, search: string) => {
    let { items, totalPages } = getPaginatedStorageData(
      GORGEOUS_SWAGGER,
      page,
      size,
      "collectionName",
      search
    );
    let newPage = page;
    if (items.length === 0 && newPage > 0) {
      newPage = totalPages - 1;
      ({ items, totalPages } = getPaginatedStorageData(
        GORGEOUS_SWAGGER,
        newPage,
        size,
        "collectionName",
        search
      ));
    }
    setData(items);
    setTotalPages(totalPages);
    setCurrentPage(newPage);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchData(0, value);
  };

  const handlePageChange = (page: number) => {
    fetchData(page, searchValue);
  };

  const handleExport = () => {
    setExportModalVisible(false);
    setExportedText("");
  };

  const handleImport = () => {
    setImportModalVisible(false);
    fetchData(currentPage, searchValue);
  };

  const handleDelete = (id: any) => {
    hideDialog();
    deleteItemFromStorage(GORGEOUS_SWAGGER, id);
    toast.success("Collection deleted successfully");
    fetchData(currentPage, searchValue);
  };

  const handleConvert = async (id: any) => {
    showLoading();
    const item = getItemById(GORGEOUS_SWAGGER, id);
    const url = item.local?.isInit
      ? `${item.local.url}/v2/api-docs`
      : `${item.remote?.url}/v2/api-docs`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const text = await response.text();
      const transformedJson = transformJson(
        JSON.parse(parseResponseText(text)),
        item
      );
      setFetchedJson(transformedJson);
      setConvertModalVisible(true);
    } catch (error: any) {
      toast.error("Error: " + error.message);
      setFetchedJson(null);
    } finally {
      hideLoading();
    }
  };

  const handleDeleteDialog = (id: any) => {
    showDialog({
      title: "Delete Collection",
      message: "Are you sure you want to delete this collection?",
      confirmText: "Delete",
      color: "red",
      onConfirm: () => {
        handleDelete(id);
      },
      onCancel: hideDialog,
    });
  };

  const handleDeleteAllDialog = () => {
    const count = getStorageData(GORGEOUS_SWAGGER).length;
    if (!count) {
      toast.warning("There is no collection to delete");
      return;
    }
    showDialog({
      title: "Delete All Collections",
      message: `Are you sure you want to delete ${count} ${
        count === 1 ? "collection" : "collections"
      }?`,
      confirmText: "Delete",
      color: "red",
      onConfirm: () => {
        hideDialog();
        initializeStorage(GORGEOUS_SWAGGER, []);
        fetchData(0, "");
        toast.success(`Deleted ${count} collections`);
      },
      onCancel: hideDialog,
    });
  };

  const handleCloseConvertModal = () => {
    setConvertModalVisible(false);
    setFetchedJson(null);
  };

  const onExportButtonClick = (value: any) => {
    const count = value.length;
    if (!count) {
      toast.warning("There is no collection to export");
      return;
    }
    setExportedText(encrypt(JSON.stringify(value, null, 2)));
    setExportModalVisible(true);
    toast.success(
      `Exported ${count} ${count === 1 ? "collection" : "collections"}`
    );
  };

  const onCreateButtonClick = () => {
    showModal({
      isUpdateForm: false,
      title: "Create New Collection",
      color: "gray",
      buttonText: "CREATE",
      onButtonClick: (formattedItem: any) => {
        addItemToStorage(GORGEOUS_SWAGGER, formattedItem);
        toast.success("Collection created successfully");
        hideModal();
        fetchData(0, "");
      },
      initForm: {
        collectionName: "",
        localUrl: "",
        localIsChecked: false,
        remoteUrl: "",
        remoteIsChecked: false,
        requests: [],
      },
    });
  };

  const onUpdateButtonClick = (id: any) => {
    const item = getItemById(GORGEOUS_SWAGGER, id);
    const requests = [];
    if (item.requests?.length > 0) {
      for (const i in item.requests) {
        const req = item.requests[i];
        requests.push({
          name: req.name,
          method: req.method,
          body: req.body ? req.body : "",
          preScript: req.preScript ? req.preScript : "",
          preScriptIsChecked: req.preScript ? true : false,
          postScript: req.postScript ? req.postScript : "",
          postScriptIsChecked: req.postScript ? true : false,
          path: req.path,
          basicAuthIsChecked: req.basicAuth,
        });
      }
    }
    showModal({
      isUpdateForm: true,
      title: "Update Collection",
      color: "blue",
      buttonText: "UPDATE",
      onButtonClick: (formattedItem: any) => {
        overwriteItemInStorage(GORGEOUS_SWAGGER, formattedItem);
        toast.success("Collection updated successfully");
        hideModal();
        fetchData(currentPage, searchValue);
      },
      initForm: {
        id: item.id,
        collectionName: item.collectionName,
        localUrl: item.local ? item.local.url : "",
        localIsChecked: item.local ? true : false,
        remoteUrl: item.remote ? item.remote.url : "",
        remoteIsChecked: item.remote ? true : false,
        createdAt: item.createdAt,
        requests: requests,
      },
    });
  };

  return (
    <div className="flex bg-gray-50">
      {sidebar}
      <div className="flex-grow p-6">
        <Header
          onCreate={onCreateButtonClick}
          onDeleteAll={handleDeleteAllDialog}
          onImport={() => {
            setImportModalVisible(true);
          }}
          onExport={() => {
            onExportButtonClick(getStorageData(GORGEOUS_SWAGGER));
          }}
          SearchBoxes={
            <InputBox
              placeholder="Searching..."
              icon={SearchIcon}
              value={searchValue}
              onChangeText={handleSearch}
            />
          }
        />
        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onExport={(id: any) => {
                    onExportButtonClick([getItemById(GORGEOUS_SWAGGER, id)]);
                  }}
                  onUpdate={(id: any) => {
                    onUpdateButtonClick(id);
                  }}
                  onDelete={(id: any) => {
                    handleDeleteDialog(id);
                  }}
                  onConvert={async (id: any) => {
                    await handleConvert(id);
                  }}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <NoData />
        )}
      </div>
      <LoadingDialog isVisible={isLoading} />
      <ToastContainer position="bottom-right" style={{ width: "400px" }} />
      <ConfimationDialog
        isVisible={isDialogVisible}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
        confirmText={dialogConfig.confirmText}
        color={dialogConfig.color}
      />
      <CollectionForm
        isVisible={isModalVisible}
        hideModal={hideModal}
        formConfig={formConfig}
      />
      <ConvertCollection
        isVisible={convertModalVisible}
        setVisible={setConvertModalVisible}
        json={fetchedJson}
        onButtonClick={handleCloseConvertModal}
      />
      <ExportCollection
        isVisible={exportModalVisible}
        setVisible={setExportModalVisible}
        onButtonClick={handleExport}
        text={exportedText}
      />
      <ImportCollection
        isVisible={importModalVisible}
        setVisible={setImportModalVisible}
        onButtonClick={handleImport}
      />
    </div>
  );
};

export default GorgeousSwagger;
