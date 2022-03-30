import {useState, useContext} from 'react';
import {setAuthToken} from '../../services/storage';
import {authContext} from '../../context/AuthContext';
import {LOGIN_API} from '../../util/apis';
import useFetch from '../core/useFetch';

function useSignIn() {
    const [loading, setLoading] = useState(false);
    const {setLoggedIn} = useContext(authContext);

    const ajax = useFetch();

    const signIn = async payload => {
        setLoading(true);
        const resp = await ajax(LOGIN_API, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        if (resp) {
            await setAuthToken(resp);
            setLoading(false);
            setLoggedIn(true);
        } else {
            setLoading(false);
        }
    };

    return {signIn, loading};
}

export default useSignIn;
