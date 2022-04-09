import {useState, useEffect} from 'react';
import { INCIDENTS_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useGetIncidentDetails(incidentId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [incident, setIncident] = useState({});

    const ajax = useFetch();

    useEffect(() => {
        if (incidentId) {
            setLoading(true)
            getIncident(incidentId)
        };
    }, [incidentId]);

    const getIncident = id => {
        ajax(`${INCIDENTS_API}${id}/`).then(resp => {
            if (resp) {
                setIncident(resp);
            } else {
                setError(true);
            }
            setLoading(false);
        });
    };

    return {loading, error, incident};
}

export default useGetIncidentDetails;
