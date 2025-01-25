import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FIGHTING_GAME, GAMES } from "../../types/pageConfig";
import NoData from "../../components/NoData";
import ToolCard from "../../components/ToolCard";
import Header from "../../components/swagger/Header";
import InputBox from "../../components/InputBox";
import { SearchIcon, SwordsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const data = [
    {
      label: FIGHTING_GAME.label,
      icon: SwordsIcon,
      color: "#A35454",
      onButtonClick: () => navigate(FIGHTING_GAME.path),
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any>(data);

  useEffect(() => {
    document.title = GAMES.label;
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
      activeItem={GAMES.name}
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

export default Games;
