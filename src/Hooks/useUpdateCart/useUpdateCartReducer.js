const initialState = {
    cartId: '',
    products: [],
    count: 0,
    billingDetails: {
        totalPrice: 0,
        discount: 0,
        deliveryCharges: 0,
        finalPrice: 0
    }
}

const useUpdateCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CART_PRODUCTS":
            console.log('called with', action)
            return {
                ...state,
                cartId: action.payload.cartId,
                products: action.payload.data,
                count: action.payload.count,
                billingDetails: action.payload.billingDetails,
            }
        default:
            return state;
    }
}

export default useUpdateCartReducer;
