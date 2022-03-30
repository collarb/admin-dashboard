import { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "./authContext";
import { getAuthToken } from "../util/storage";

function useFetch() {
  const { logout } = useContext(authContext);

  const ajax = async (api, options = {}) => {
    const authToken = getAuthToken();
    const method = options.method || "GET";
    const headers = {
      ...(!options.body || typeof options.body === "string"
        ? { "Content-Type": "application/json" }
        : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };

    const params = {
      method: method,
      headers: headers,
      ...(options.body ? { body: options.body } : {}),
    };

    /** Check if connected */
    let errorMsg = "Error occured while processing this request";
    try {
      const resp = await fetch(api, params);
      if ((resp && resp.status === 200) || resp.status === 201) {
        return await resp.json(); // Return and exit the function
      } else {
        const data = await resp.json();
        const detail = data[Object.keys(data)[0]];
        if (typeof detail === "string") {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          if (detail.length && detail.length) {
            errorMsg = `${Object.keys(data)[0]}: ${detail[0]}`;
          }
        }

        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: {
            minWidth: '40%',
            backgroundColor: 'red',
            color: 'white'
          }
        });
      }
    } catch (err) {
      // console.log(err);
      toast.error(errorMsg, {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return ajax;
}

export default useFetch;
