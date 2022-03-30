import {useState} from 'react';
import { OTP_API } from '../../util/apis';

function useOtp() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = () => {
        if (otp.length !== 5) {
            setError('OTP length must be 5');
        } else {
            setLoading(true);
            wrapper(`${OTP_API}?format=json`, {
                method: 'POST',
                body: JSON.stringify({verification_code: otp}),
            }).then(resp => {
                setLoading(false);
                if (resp) {
                    console.log(resp);
                }
            });
        }
    };

    return {loading, otp, error, setOtp, submit};
}

export default useOtp;
