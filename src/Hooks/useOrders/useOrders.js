import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productService from '../../Services/Products';
import OrderService from '../../Services/Orders';


const useAction = actionFn => {
    const dispatch = useDispatch();
    return useCallback(
        (...args) => {
            return dispatch(actionFn(...args));
        },
        [dispatch]
    );
}

const useOrders = () => {
    let result = useSelector(state => state.useOrdersReducer);

    const createOrder = useAction(args => {
        const [orderDetails, userId] = args;
        console.log(orderDetails)
        return dispatch => {
            dispatch({ type: 'SET_DATA_LOADING_ON' });
            OrderService.createOrder(userId, orderDetails).then(res => {
                dispatch({ type: 'SET_ORDER_CREATED', payload: { data: true } });
                dispatch({ type: 'SET_DATA_LOADING_OFF' });
                dispatch({
                    type: 'UPDATE_USER_ORDERS',
                    payload: { data: orderDetails }
                });
                productService.updateUserCart(userId, []).then(res => {
                    const billingDetails = {
                        totalPrice: 0,
                        discount: 0,
                        deliveryCharges: 0,
                        finalPrice: 0
                    };
                    dispatch({
                        type: 'UPDATE_CART_PRODUCTS',
                        payload: { data: [], count: 0, cartId: 0, cartId: 0, billingDetails: billingDetails }
                    })
                });
            });


        }

    });

    const getUserOrders = useAction(args => {
        const userId = args;
        return dispatch => {
            dispatch({ type: 'SET_ORDER_CREATED', payload: { data: false } });
            OrderService.getUserOrders(userId).then(res => {
                console.log('res', res);
                dispatch({
                    type: 'UPDATE_USER_ORDERS',
                    payload: { data: res }
                })
            }).catch(err => {
                console.log(err, 'err');
                dispatch({
                    type: 'UPDATE_USER_ORDERS',
                    payload: { data: [] }
                })
            });
        }
    });

    return [
        result,
        createOrder,
        getUserOrders
    ];
}



export default useOrders;