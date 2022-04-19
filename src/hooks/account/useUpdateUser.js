
import { USERS_API } from '../../util/apis';
import useFetch from '../core/useFetch';
import toast from "react-hot-toast";
import colors from '../../util/colors';
function useUpdateUser() {
    const ajax = useFetch();

    const updateUser = (userId, payload) => {
        ajax(
            `${USERS_API}${userId}/`,
            {
                method: 'PATCH',
                body: JSON.stringify(payload)
            }
        )
        .then(data => {
            if(data) {
                toast.success("Successfully updated user", {
                    duration: 6000,
                    position: "top-center",
                    style: {
                      minWidth: '40%',
                      backgroundColor: colors.THEME_GREEN,
                      color: 'white'
                    }
                });
            }
        })
    }

    return { updateUser };
}

export default useUpdateUser;