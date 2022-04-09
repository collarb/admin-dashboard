import {useState, useEffect} from 'react';
import { INCIDENTS_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useFetchIncidents(navigation) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const ajax = useFetch();
    const itemsPerPage = 10;

    useEffect(() => {
        loadIncidents(setLoading);
    }, [page]);

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
        ajax(`${INCIDENTS_API}?page=${1+page}&page_size=${itemsPerPage}`).then(data => {
            if (data) {
                setIncidents(data.results);
                setPageCount(data.count);
            }
            callback(false);
        });
    };

    const onPageChange = value => {
        setPage(value);
    };

    return {loading, incidents, refreshing, pageCount, itemsPerPage, page, onPageChange, refresh};
}

export default useFetchIncidents;
