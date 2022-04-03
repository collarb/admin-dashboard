import {useState} from 'react';
import {INCIDENTS_API} from '../../util/apis';
import useFetch from '../core/useFetch';

function useAddIncident() {
    const [submitting, setSubmitting] = useState(false);
    const ajax = useFetch();

    const addIncident = payload => {
        setSubmitting(true);
        const formData = new FormData();
        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key]);
        });

        ajax(INCIDENTS_API, {
            method: 'POST',
            body: formData,
        }).then(resp => {
            if (resp) {
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        });
    };
    return {addIncident, submitting};
}

export default useAddIncident;
