import { combineReducers } from 'redux'
import useProductsReducer from '../Hooks/useProducts/useProductsReducer';
import useUpdateCartReducer from '../Hooks/useUpdateCart/useUpdateCartReducer';
import useUserdataReducer from '../Hooks/useUser/useUserdataReducer';
import useOrdersReducer from '../Hooks/useOrders/useOrdersReducer';
const rootReducer = combineReducers({
    useProductsReducer,
    useUpdateCartReducer,
    useUserdataReducer,
    useOrdersReducer,
});

export default rootReducer;
