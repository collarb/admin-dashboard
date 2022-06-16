import {useState, useEffect} from 'react';
import { INCIDENTS_API } from '../../util/apis';
import useFetch from '../core/useFetch';
import { createQueryParams } from '../../util/helper';

function useFetchIncidents(pageSize) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const ajax = useFetch();
    const itemsPerPage = pageSize || 10;

    useEffect(() => {
        loadIncidents({},setLoading);
    }, [page]);


    const refresh = () => {
        loadIncidents(setRefreshing);
    };

    const loadIncidents = (filter,callback) => {
        ajax(`${INCIDENTS_API}?page=${1+page}&page_size=${itemsPerPage}${createQueryParams(filter)}`).then(data => {
            if (data) {
                setIncidents(data.results);
                setPageCount(data.count);
            }
            callback(false);
        });
    };

    const onPageChange = value => {
        setPage(value);
        setLoading(true);
    };

    return {loading, incidents, refreshing, pageCount, itemsPerPage, page, onPageChange, refresh, loadIncidents};
}

export default useFetchIncidents;
