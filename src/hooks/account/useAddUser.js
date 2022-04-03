import { useState } from "react";
import toast from "react-hot-toast";
import { REGISTER_API } from "../../util/apis";
import useFetch from "../core/useFetch";
import useModal from '../core/useModal';
import colors from '../../util/colors';

function useAddUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const ajax = useFetch();
  const {closeModal} = useModal();

  const addUser = (payload) => {
    ajax(`${REGISTER_API}`, { method: "POST", body: JSON.stringify(payload) }).then(
      (data) => {
        setLoading(false);
        if (data) {
          toast.success("Successfully created user", {
            duration: 6000,
            position: "top-center",
            style: {
              minWidth: '40%',
              backgroundColor: 'red',
              color: colors.THEME_GREEN
            }
          });
          setSuccess(true);
          closeModal();
        };
      }
    );
  };

  return { loading, success, addUser };
}

export default useAddUser;
