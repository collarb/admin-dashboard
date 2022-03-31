import { useState } from "react";
import { REPORT_API } from "../../util/apis";
import useFetch from "../core/useFetch";
import { generateFormData } from "../../util/helper";

function useAddReport() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addReport = (payload) => {
    const ajax = useFetch();
    ajax(REPORT_API, { method: "POST", body: generateFormData(payload) }).then(
      (data) => {
        if (data) setSuccess(true);
        setLoading(false);
      }
    );
  };

  return { loading, success, addReport };
}

export default useAddReport;
