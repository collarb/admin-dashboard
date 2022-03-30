import {useState} from 'react';
import { REGISTER_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useRegister(navigation) {
    const [loading, setLoading] = useState();

    const ajax = useFetch();

    const registerUser = payload => {
        setLoading(true);
        ajax(REGISTER_API, {
            method: 'POST',
            body: JSON.stringify(payload),
        }).then(resp => {
            setLoading(false);
            if (resp) {
                toast.show("Your account has been created successfully", {
                    type: "success",
                    placement: "top | bottom",
                    duration: 10000,
                    offset: 30,
                    animationType: "slide-in | zoom-in",
                });
                navigation.navigate('SignIn');
            }
        });
    };

    return {loading, registerUser};
}

export default useRegister;
