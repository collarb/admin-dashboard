import {useState, useEffect} from 'react';
import { REPORT_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useGetReports() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const ajax = useFetch();
    const itemsPerPage = 10;

    useEffect(() => {
        loadReports(setLoading);
    }, [page]);

    const loadReports = callback => {
        ajax(`${REPORT_API}?page=${1+page}&page_size=${itemsPerPage}`).then(data => {
            if (data) {
                setReports(data.results);
                setPageCount(data.count);
            }
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadReports(setRefreshing);
    };

    const onPageChange = value => {
        setPage(value);
        setLoading(true);
    };

    return {loading, reports, refreshing, loadReports, pageCount, itemsPerPage, page, refresh, onPageChange};
}

export default useGetReports;
