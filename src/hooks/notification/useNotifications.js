import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {NOTIFICATIONS_API} from '../../util/apis';

function useNotifications(params) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const ajax = useFetch();

    const api_parmas = params || "";

    useEffect(() => {
        loadNotitifcations(setLoading);
    }, []);

    const loadNotitifcations = callback => {
        ajax(`${NOTIFICATIONS_API}?${api_parmas}`).then(data => {
            if (data) setNotifications(data.results);
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadNotitifcations(setRefreshing);
    };

    return {loading, refreshing, notifications, refresh};
}

export default useNotifications;
