import {useState} from 'react';
import { INCIDENTS_API } from '../../util/apis';
import useFetch from '../core/useFetch';

function useGetIncidentDetails() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [incident, setIncident] = useState({});

    const ajax = useFetch();

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

    return {loading, error, incident, getIncident};
}

export default useGetIncidentDetails;
