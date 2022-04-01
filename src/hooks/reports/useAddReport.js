import { useState } from "react";
import { REPORT_API } from "../../util/apis";
import useFetch from "../core/useFetch";
import { generateFormData } from "../../util/helper";

function useAddReport() {
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  const ajax = useFetch();

  const addReport = (payload) => {
    ajax(REPORT_API, { method: "POST", body: generateFormData(payload) }).then(
      (data) => {
        if (data) setSuccess(true);
        setAdding(false);
      }
    );
  };

  return { adding, success, addReport };
}

export default useAddReport;
