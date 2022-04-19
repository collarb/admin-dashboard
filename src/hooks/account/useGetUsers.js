import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {USERS_API} from '../../util/apis';
import { createQueryParams } from '../../util/helper';

function useGetUsers() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const ajax = useFetch();
    const itemsPerPage = 10;

    useEffect(() => {
        loadUsers({}, setLoading);
    }, [page]);

    const loadUsers = (filter, callback) => {
        ajax(`${USERS_API}?page=${1+page}&page_size=${itemsPerPage}${createQueryParams(filter)}`).then(data => {
            if (data) {
                setPageCount(data.count);
                setUsers(data.results);
            }
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadUsers({}, setRefreshing);
    };

    const onPageChange = value => {
        setPage(value);
        setLoading(true);
    };

    return {loading, refreshing, users, pageCount, itemsPerPage, page, refresh, onPageChange, loadUsers};
}

export default useGetUsers;
