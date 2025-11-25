import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userService from '../../Services/User';

const useAction = actionFn => {
    const dispatch = useDispatch();
    return useCallback(
        (...args) => {
            return dispatch(actionFn(...args));
        },
        [dispatch]
    );
}

const useUserData = () => {
    let result = useSelector(state => state.useUserdataReducer);

    const showLoginDrawer = useAction(args => {
        return dispatch => {
            dispatch({
                type: 'UPDATE_SHOW_LOGIN',
                payload: { data: true }
            })
        }
    });

    const hideLoginDrawer = useAction(args => {
        return dispatch => {
            dispatch({
                type: 'UPDATE_SHOW_LOGIN',
                payload: { data: false }
            })
        }
    });

    const isUserAutheticated = () => {
        return (localStorage.getItem('userData') !== null && localStorage.getItem('userData') !== undefined && localStorage.getItem('userData') !== '')
    }

    const getCurrentUserData = () => {
        if (isUserAutheticated()) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            return userData;
        }
    }

    const logout = () => {
        if (isUserAutheticated()) {
            localStorage.removeItem('userData');
        }
    }

    const handleAddAddress = (args) => {
        let [addresses, addressToAdd, userId] = args;
        addresses.push(addressToAdd)
        return [addresses, userId];
    };

    const updateUserAddress = useAction(args => {
        console.log(args);
        const [updatedAddresses, userId] = handleAddAddress(args);

        return dispatch => {
            userService.updateUserAddress(userId, updatedAddresses).then(res => {
                dispatch({
                    type: 'UPDATE_USER_ADDRESS',
                    payload: { data: updatedAddresses }
                });
            });
        }

    });

    const getuserAddress = useAction(args => {
        const userId = args;
        return dispatch => {
            userService.getUserAddress(userId).then(res => {
                console.log(res, 'from get address action');
                dispatch({
                    type: 'UPDATE_USER_ADDRESS',
                    payload: { userId: userId, data: res.address }
                })
            }).catch(err => {
                dispatch({
                    type: 'UPDATE_USER_ADDRESS',
                    payload: { data: []}
                })
            });
        }
    });

    const setSelectedAddress = useAction(args => {
        const address = args;
        return dispatch => {
            dispatch({
                type: 'UPDATE_SELECTED_ADDRESS',
                payload: { data: address }
            })
        }
    })

    return [result, showLoginDrawer, hideLoginDrawer, isUserAutheticated, getCurrentUserData, logout, updateUserAddress, 
        getuserAddress, setSelectedAddress];
}

export default useUserData;