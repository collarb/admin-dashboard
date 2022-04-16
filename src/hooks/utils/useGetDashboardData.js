import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {DASHBOARD_DATA_API} from '../../util/apis';

function useGetDashboardData(filter_params) {
    const [data, setData] = useState(null);
    const [params, setParmas] = useState(filter_params)
    const ajax = useFetch();

    const getData = () => {
        ajax(`${DASHBOARD_DATA_API}?${params}`).then(data => {
            if (data) setData(data);
        });
    };

    useEffect(()=>{
        getData()
    },[params])

    return {data};
}

export default useGetDashboardData;
