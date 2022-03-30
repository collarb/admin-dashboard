import { useContext, useState } from "react";
import useFetch from "../core/useFetch";
import { LOGIN_API } from "../../util/apis";
import { authContext } from "../../context/authContext";
import { setAuthToken } from "../../util/storage";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const ajax = useFetch();
  const { setLoggedIn } = useContext(authContext);

  const signin = (payload) => {
    setLoading(true);
    ajax(LOGIN_API, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((data) => {
      setLoading(false);
      if (data) {
        setAuthToken(data);
        setLoggedIn(true);
      }
    });
  };

  return { loading, signin };
}

export default useLogin;
