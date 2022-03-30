import {useState, useEffect} from 'react';
import { REPORT_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useGetReports() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [reports, setReports] = useState([]);

    const ajax = useFetch();

    useEffect(() => {
        loadReports(setLoading);
    }, []);

    const loadReports = callback => {
        ajax(REPORT_API).then(data => {
            if (data) setReports(data.results);
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadReports(setRefreshing);
    };

    return {loading, reports, refreshing, loadReports, refresh};
}

export default useGetReports;
