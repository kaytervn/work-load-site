import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  API_DOCS,
  TOOLS,
  QR_GENERATOR,
  SEQUENCE_ACTIVATOR,
  CRUD_GENERATOR,
  PERMISSIONS_GENERATOR,
  DATA_MERGING,
  DATA_GENERATOR,
} from "../../types/pageConfig";
import NoData from "../../components/NoData";
import ToolCard from "../../components/ToolCard";
import Header from "../../components/swagger/Header";
import InputBox from "../../components/InputBox";
import {
  CodeIcon,
  CombineIcon,
  FileBoxIcon,
  FolderOpenDotIcon,
  LifeBuoyIcon,
  QrCodeIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();
  const data = [
    {
      label: API_DOCS.label,
      icon: LifeBuoyIcon,
      color: "#2A4F4F",
      onButtonClick: () => navigate(API_DOCS.path),
    },
    {
      label: CRUD_GENERATOR.label,
      icon: CodeIcon,
      color: "#8C4E4E",
      onButtonClick: () => navigate(CRUD_GENERATOR.path),
    },
    {
      label: DATA_GENERATOR.label,
      icon: FileBoxIcon,
      color: "#304C73",
      onButtonClick: () => navigate(DATA_GENERATOR.path),
    },
    {
      label: DATA_MERGING.label,
      icon: CombineIcon,
      color: "#463457",
      onButtonClick: () => navigate(DATA_MERGING.path),
    },
    {
      label: SEQUENCE_ACTIVATOR.label,
      icon: ShieldCheckIcon,
      color: "#304C73",
      onButtonClick: () => navigate(SEQUENCE_ACTIVATOR.path),
    },
    {
      label: PERMISSIONS_GENERATOR.label,
      icon: FolderOpenDotIcon,
      color: "#43357D",
      onButtonClick: () => navigate(PERMISSIONS_GENERATOR.path),
    },
    {
      label: QR_GENERATOR.label,
      icon: QrCodeIcon,
      color: "#01579B",
      onButtonClick: () => navigate(QR_GENERATOR.path),
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any>(data);

  useEffect(() => {
    document.title = TOOLS.label;
  }, []);

  useEffect(() => {
    const lowercasedValue = searchValue.toLowerCase();
    const filtered = data.filter((item: any) =>
      item.label.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Sidebar
      activeItem={TOOLS.name}
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
};

export default Tools;
