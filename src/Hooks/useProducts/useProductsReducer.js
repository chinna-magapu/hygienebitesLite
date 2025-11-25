const initialState = {
    totalProducts:[],
    products: [],
    categories: [],
    selCat: null,
    isLoading: true,
    error: false
}

const useProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DATA_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "SET_ALL_DATA":
            return {
                ...state,
                categories: action.payload.categories,
                selCat: action.payload.selCat,
                isLoading: false,
                totalProducts: action.payload.totalProducts,
                products: action.payload.products
            }
        case "SET_PRODUCTS_DATA":
            return {
                ...state,
                products: state.totalProducts.filter(prd => prd.category === action.payload.selCat.name),
                selCat: action.payload.selCat,
                isLoading: false,
            }
        default:
            return state
    }
}

export default useProductsReducer;
