import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  API_DOCS,
  DOCUMENT_TOOLS,
  QR_GENERATOR,
  SEQUENCE_ACTIVATOR,
} from "../../types/pageConfig";
import NoData from "../../components/NoData";
import ToolCard from "../../components/ToolCard";
import Header from "../../components/swagger/Header";
import InputBox from "../../components/InputBox";
import {
  LifeBuoyIcon,
  QrCodeIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function DocumentTools() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([
    {
      label: API_DOCS.label,
      icon: LifeBuoyIcon,
      color: "#2A4F4F",
      onButtonClick: () => navigate(API_DOCS.path),
    },
    {
      label: SEQUENCE_ACTIVATOR.label,
      icon: ShieldCheckIcon,
      color: "#304C73",
      onButtonClick: () => navigate(SEQUENCE_ACTIVATOR.path),
    },
    {
      label: QR_GENERATOR.label,
      icon: QrCodeIcon,
      color: "#2B3A42",
      onButtonClick: () => navigate(QR_GENERATOR.path),
    },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any>(data);

  useEffect(() => {
    document.title = DOCUMENT_TOOLS.label;
  }, []);

  useEffect(() => {
    const lowercasedValue = searchValue.toLowerCase();
    const filtered = data.filter((item: any) =>
      item.label.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  }, [searchValue, data]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
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
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.map((item: any) => (
                <ToolCard
                  key={item.label}
                  item={item}
                  onButtonClick={item.onButtonClick}
                />
              ))}
            </div>
          ) : (
            <NoData />
          )}
        </>
      }
    />
  );
}

export default DocumentTools;
