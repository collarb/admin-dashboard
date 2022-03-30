import {useState, useEffect, useContext} from 'react';
import {authContext} from '../../context/AuthContext';
import useFetch from '../core/useFetch';
import {REPORT_API} from '../../util/apis';

function useGetReport(reportId) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [liking, setLiking] = useState(false);
    const [report, setReport] = useState({});

    const {user} = useContext(authContext);
    const ajax = useFetch();

    useEffect(() => {
        if (reportId) loadReport(setLoading);
    }, [reportId]);

    const loadReport = callback => {
        ajax(`${REPORT_API}${reportId}/`).then(resp => {
            if (resp) setReport(resp);
            callback(false);
        });
    };

    const refresh = () => {
        setRefreshing(true);
        loadReport(setRefreshing);
    };

    const likeReport = () => {
        setLiking(true);
        ajax(`${REPORT_API}like/`, {
            method: 'POST',
            body: JSON.stringify({
                report: reportId,
                user: user?.id,
                thumbs_up: true,
            }),
        }).then(resp => {
            if (resp) setReport({...report, thumbs_up: resp.thumbs_up});
            setLiking(false);
        });
    };

    return {
        loading,
        refreshing,
        report,
        liking,
        refresh,
        likeReport,
    };
}

export default useGetReport;
