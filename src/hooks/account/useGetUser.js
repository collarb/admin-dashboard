import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {ACCOUNT_API} from '../../util/apis';

function useGetUser() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const ajax = useFetch();

    const getUser = () => {
        ajax(ACCOUNT_API).then(data => {
            if (data) setUser(data);
            setLoading(false);
        });
    };

    return {loading, user, setUser, getUser};
}

export default useGetUser;
