import { useState } from "react";
import useFetch from "../core/useFetch";
import { FORGOT_PASS_API } from "../../util/apis";

function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const ajax = useFetch();

  const submitForgotPassword = (payload) => {
    setLoading(true);
    ajax(FORGOT_PASS_API, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((data) => {
      setLoading(false);
      if (data) {
        setSuccess(true);
      }
    });
  };

  return { loading, success, submitForgotPassword };
}

export default useForgotPassword;
