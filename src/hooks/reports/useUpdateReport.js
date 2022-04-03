import { useState } from "react";
import toast from "react-hot-toast";
import useModal from "../core/useModal";
import useFetch from "../core/useFetch";
import { REPORT } from "../../util/constants";
import { INCIDENTS_API, REPORT_API } from "../../util/apis";
import colors from "../../util/colors";

function useUpdateReport() {
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const { openConfirm, closeModal } = useModal();
  const ajax = useFetch();

  const updateReport = (type, title, id, payload) => {
    openConfirm(title, () => {
      setUpdating(true);
      submitUpdate(type, id, payload);
    });
  };

  const submitUpdate = (type, id, payload) => {
    const API = type === REPORT ? REPORT_API : INCIDENTS_API;
    ajax(`${API}${id}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }).then(data => {
        setUpdating(false);
        closeModal();
        if(data) {
          toast.success("Successfully updated report", {
            duration: 6000,
            position: "top-center",
            style: {
              minWidth: '40%',
              color: 'white',
              backgroundColor: colors.THEME_GREEN
            }
          });
          setSuccess(true)
        };
    });
  }

  return { updating, success, submitUpdate, updateReport };
}

export default useUpdateReport;
