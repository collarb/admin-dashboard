import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {USERS_API} from '../../util/apis';

function useGetUsers() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([]);

    const ajax = useFetch();

    useEffect(() => {
        loadUsers(setLoading);
    }, []);

    const loadUsers = callback => {
        ajax(USERS_API).then(data => {
            if (data) setUsers(data.results);
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadUsers(setRefreshing);
    };

    return {loading, refreshing, users, refresh};
}

export default useGetUsers;
