import {useState, useEffect} from 'react';
import { INCIDENTS_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useFetchIncidents(navigation) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const ajax = useFetch();

    useEffect(() => {
        loadIncidents(setLoading);
    }, []);

    useEffect(() => {
        if (navigation?.route?.params?.formForm) {
            setLoading(true);
            loadIncidents(setLoading);
        }
    }, [navigation?.route?.params.formForm]);

    const refresh = () => {
        loadIncidents(setRefreshing);
    };

    const loadIncidents = callback => {
        ajax(INCIDENTS_API).then(data => {
            if (data) setIncidents(data.results);
            callback(false);
        });
    };

    return {loading, incidents, refreshing, refresh};
}

export default useFetchIncidents;
