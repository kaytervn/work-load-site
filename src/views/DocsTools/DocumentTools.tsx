import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { DOCUMENT_TOOLS } from "../../types/pageConfig";
import NoData from "../../components/NoData";
import Pagination from "../../components/Pagination";
import ToolCard from "../../components/ToolCard";
import Header from "../../components/swagger/Header";
import InputBox from "../../components/InputBox";
import { QrCodeIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";
import OpenSequence from "../../components/document/OpenSequence";

function DocumentTools() {
  const [openSequenceVisible, setOpenSequenceVisible] = useState(false);
  const [data, setData] = useState<any>([
    {
      label: "QR Generator",
      icon: QrCodeIcon,
      color: "#2B3A42",
      onButtonClick: () => {},
    },
    {
      label: "Sequence Activator",
      icon: ShieldCheckIcon,
      color: "#304C73",
      onButtonClick: () => {
        setOpenSequenceVisible(true);
      },
    },
  ]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    document.title = DOCUMENT_TOOLS.label;
  }, []);
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // fetchData(0, value);
  };
  return (
    <Sidebar
      activeItem={DOCUMENT_TOOLS.name}
      renderContent={
        <>
          <Header
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
                {data.map((item: any) => (
                  <ToolCard
                    key={item.label}
                    item={item}
                    onButtonClick={item.onButtonClick}
                  />
                ))}
              </div>
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
            </>
          ) : (
            <NoData />
          )}
          <OpenSequence
            isVisible={openSequenceVisible}
            setVisible={setOpenSequenceVisible}
          />
        </>
      }
    />
  );
}

export default DocumentTools;
