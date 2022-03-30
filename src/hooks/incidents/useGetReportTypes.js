import {useState, useEffect} from 'react';
import {INCIDENTS_API} from '../../util/apis';
import useFetch from '../core/useFetch';

function useGetReportTypes() {
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    const ajax = useFetch();

    useEffect(() => {
        ajax(`${INCIDENTS_API}type/`)
            .then(data => {
                if (data) setTypes(data.results);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    return {loading, types};
}

export default useGetReportTypes;
