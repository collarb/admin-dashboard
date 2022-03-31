import { useState } from "react";
import { ACCOUNT_API } from "../../util/apis";
import useFetch from "../core/useFetch";

function useAddUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addReport = (payload) => {
    const ajax = useFetch();
    ajax(ACCOUNT_API, { method: "POST", body: JSON.stringify(payload) }).then(
      (data) => {
        if (data) setSuccess(true);
        setLoading(false);
      }
    );
  };

  return { loading, success, addReport };
}

export default useAddUser;
