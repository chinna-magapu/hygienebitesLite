const initialState = {
    orders: [],
    isLoading: false,
    isOrderCreated: false
}

const useOrdersReducer = (state = initialState, action) => {
    console.log('called with', action);
    switch (action.type) {
        case "SET_DATA_LOADING_ON":
            return {
                ...state,
                isLoading: true
            }
        case "SET_DATA_LOADING_OFF":
            return {
                ...state,
                isLoading: false
            }
        case "SET_ORDER_CREATED":
            return {
                ...state,
                isOrderCreated: action.payload.data
            }
        case "UPDATE_USER_ORDERS":
            console.log('called with', action)
            return {
                ...state,
                orders: action.payload.data,
                isLoading: false
            }
        default:
            return state;
    }
}

export default useOrdersReducer;
