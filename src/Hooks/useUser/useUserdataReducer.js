const initialState = {
    showDrawer: false,
    userAddress: [],
    selectedAddress:{}
}

const useUserdataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_SHOW_LOGIN":
            console.log('called with', action)
            return {
                ...state,
                showDrawer: action.payload.data
            }
        case "UPDATE_USER_ADDRESS":
            console.log('called with', action)
            return {
                ...state,
                userAddress: action.payload.data
            }
            case "UPDATE_SELECTED_ADDRESS":
                console.log('called with', action)
                return {
                    ...state,
                    selectedAddress: action.payload.data
                }
        default:
            return state;
    }
}

export default useUserdataReducer;
