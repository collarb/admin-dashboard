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

    const mark_as_read = (notification_id, index) => {
        setLoading(true);
        ajax(`${NOTIFICATIONS_API}${notification_id}/mark_as_read/`).then(data => {
            let new_notifications = notifications
            new_notifications[index] = data
            setNotifications(new_notifications)
            setLoading(false)
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadNotitifcations(setRefreshing);
    };

    return {loading, refreshing, notifications, refresh, mark_as_read};
}

export default useNotifications;
