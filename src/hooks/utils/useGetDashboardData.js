import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {DASHBOARD_DATA_API} from '../../util/apis';
import { createQueryParams } from '../../util/helper';

function useGetDashboardData() {
    const [data, setData] = useState(null);
    const [params, setParams] = useState({});
    const ajax = useFetch();

    const getData = () => {
        ajax(`${DASHBOARD_DATA_API}?${createQueryParams(params)}`).then(data => {
            if (data) setData(data);
        });
    };

    const handleParams = newParams => {
        setParams({...params, ...newParams});
    }

    useEffect(()=>{
        getData()
    },[params])

    return {data, handleParams};
}

export default useGetDashboardData;
