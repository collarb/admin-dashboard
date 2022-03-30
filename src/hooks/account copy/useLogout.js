import {useContext} from 'react';
import {Alert} from 'react-native';
import {authContext} from '../../context/AuthContext';

function useLogout() {
    const {logout} = useContext(authContext);

    const logoutUser = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => logout(), style: 'cancel'},
            ],
            {
                cancelable: true,
            },
        );
    };

    return logoutUser;
}

export default useLogout;
