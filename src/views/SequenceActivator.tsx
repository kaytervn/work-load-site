import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { SEQUENCE_ACTIVATOR } from "../types/pageConfig";

function SequenceActivator() {
  useEffect(() => {
    document.title = SEQUENCE_ACTIVATOR.label;
  }, []);
  return (
    <Sidebar
      activeItem={SEQUENCE_ACTIVATOR.name}
      renderContent={<>SEQUENCE_ACTIVATOR</>}
    />
  );
}

export default SequenceActivator;
