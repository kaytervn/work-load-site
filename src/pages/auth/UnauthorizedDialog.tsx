/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGlobalContext } from "../../components/config/GlobalProvider";
import useModal from "../../hooks/useModal";
import { ConfirmationDialog } from "../../components/form/Dialog";
import { USER_CONFIG } from "../../components/config/PageConfigDetails";
import { SOCKET_CMD } from "../../types/constant";
import { removeSessionCache } from "../../services/storages";

const UnauthorizedDialog = () => {
  const { isUnauthorized, on, setIsUnauthorized, setProfile } =
    useGlobalContext();
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();

  useEffect(() => {
    on(SOCKET_CMD.CMD_LOCK_DEVICE, () => {
      removeSessionCache();
      setProfile(null);
      setIsUnauthorized(true);
    });
  }, []);

  useEffect(() => {
    if (isUnauthorized) {
      showModal({
        title: "Session timed out",
        message: "Please login again",
        confirmText: "OK",
        color: "goldenrod",
        onConfirm: () => {
          hideModal();
          window.location.href = USER_CONFIG.LOGIN.path;
        },
      });
    }
  }, [isUnauthorized]);

  return (
    <ConfirmationDialog isVisible={isModalVisible} formConfig={formConfig} />
  );
};

export default UnauthorizedDialog;
