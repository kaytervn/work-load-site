import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS_GENERATOR, TOOLS } from "../../types/pageConfig";

const Permissions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = PERMISSIONS_GENERATOR.label;
  }, []);

  return (
    <Sidebar
      activeItem={TOOLS.name}
      renderContent={
        <>
          <Breadcrumb
            parentLabel={TOOLS.label}
            childLabel={PERMISSIONS_GENERATOR.label}
            onClickParent={() => navigate(TOOLS.path)}
          />
        </>
      }
    />
  );
};

export default Permissions;
