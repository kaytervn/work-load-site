import { useEffect, useState } from "react";
import { GORGEOUS_SWAGGER } from "../types/constant";
import {
  deleteItemFromStorage,
  encrypt,
  getItemById,
  getPaginatedStorageData,
  getStorageData,
  parseResponseText,
} from "../types/utils";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { SearchIcon } from "lucide-react";
import Card from "../components/swagger/Card";
import { SwaggerCollection } from "../types/interfaces";
import CreateCollection from "../components/swagger/CreateCollection";
import { toast, ToastContainer } from "react-toastify";
import NoData from "../components/NoData";
import Pagination from "../components/Pagination";
import { ConfimationDialog, LoadingDialog } from "../components/Dialog";
import useDialog from "../hooks/useDialog";
import ConvertCollection from "../components/swagger/ConvertCollections";
import { transformJson } from "../types/converter";
import { useLoading } from "../hooks/useLoading";
import UpdateCollection from "../components/swagger/UpdateCollection";
import ExportCollection from "../components/swagger/ExportCollection";
import ImportCollection from "../components/swagger/ImportCollection";

const GorgeousSwagger = ({ sidebar }: any) => {
  const { isDialogVisible, showDialog, hideDialog } = useDialog();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [convertModalVisible, setConvertModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [data, setData] = useState<SwaggerCollection[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemId, setItemId] = useState(null);
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

  const handleCreate = () => {
    setCreateModalVisible(false);
    fetchData(0, "");
  };

  const handleExport = () => {
    setExportModalVisible(false);
    setExportedText("");
  };

  const handleImport = () => {
    setImportModalVisible(false);
    fetchData(currentPage, searchValue);
  };

  const handleUpdate = () => {
    setItemId(null);
    setUpdateModalVisible(false);
    fetchData(currentPage, searchValue);
  };

  const handleDelete = async () => {
    hideDialog();
    deleteItemFromStorage(GORGEOUS_SWAGGER, itemId);
    toast.success("Collection deleted successfully");
    fetchData(currentPage, searchValue);
  };

  const handleConvert = async (id: any) => {
    setItemId(id);
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
      toast.success("Collection converted successfully");
      setConvertModalVisible(true);
    } catch (error: any) {
      toast.error("Error: " + error.message);
      setFetchedJson(null);
    } finally {
      hideLoading();
    }
  };

  const handleDeleteDialog = (id: any) => {
    setItemId(id);
    showDialog();
  };

  const handleCloseConvertModal = () => {
    setItemId(null);
    setConvertModalVisible(false);
    setFetchedJson(null);
  };

  const onExportButtonClick = (value: any) => {
    setExportedText(encrypt(JSON.stringify(value, null, 2)));
    setExportModalVisible(true);
    toast.success("Collection exported successfully");
  };

  return (
    <div className="flex bg-gray-50">
      {sidebar}
      <div className="flex-grow p-6">
        <Header
          onCreate={() => setCreateModalVisible(true)}
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
                    setItemId(id);
                    setUpdateModalVisible(true);
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
      <ToastContainer position="bottom-right" />
      <ConfimationDialog
        isVisible={isDialogVisible}
        title="Delete collection"
        message="Do you want to delete this collection?"
        onConfirm={handleDelete}
        confirmText="Delete"
        onCancel={hideDialog}
        color="red"
      />
      <CreateCollection
        isVisible={createModalVisible}
        setVisible={setCreateModalVisible}
        onButtonClick={handleCreate}
      />
      <UpdateCollection
        isVisible={updateModalVisible}
        setVisible={setUpdateModalVisible}
        itemId={itemId}
        onButtonClick={handleUpdate}
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
