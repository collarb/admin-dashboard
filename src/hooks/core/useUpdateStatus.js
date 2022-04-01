import { useState } from "react";
import useModal from "./useModal";
import useFetch from "./useFetch";
import { REPORT } from "../../util/constants";
import { INCIDENTS_API, REPORT_API } from "../../util/apis";

function useUpdateStatus() {
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const { openConfirm } = useModal();
  const ajax = useFetch();

  const updateStatus = (type, title, id, status) => {
    openConfirm(title, () => {
      setUpdating(true);
      let API = type === REPORT ? REPORT_API : INCIDENTS_API;
      ajax(`${API}${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: status}),
      }).then(data => {
          if(data) setSuccess(true);
          setUpdating(false);
      });
    });
  };

  return { updating, success, updateStatus };
}

export default useUpdateStatus;
