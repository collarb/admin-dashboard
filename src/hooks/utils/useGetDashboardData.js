import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import {DASHBOARD_DATA_API} from '../../util/apis';

function useGetDashboardData() {
    const [data, setData] = useState(null);
    const [params, setParmas] = useState("")
    const ajax = useFetch();

    const getData = () => {
        ajax(`${DASHBOARD_DATA_API}?${params}`).then(data => {
            if (data) setData(data);
        });
    };

    useEffect(()=>{
        getData()
    },[params])

    return {data, setParmas};
}

export default useGetDashboardData;
