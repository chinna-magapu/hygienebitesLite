import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productService from '../../Services/Products';

const useAction = actionFn => {
    const dispatch = useDispatch();
    return useCallback(
        (...args) => {
            return dispatch(actionFn(...args));
        },
        [dispatch]
    );
}

const useProducts = (category) => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const productsPageData = useSelector(state => state.useProductsReducer);

    const updateCategoryData = () => {
        console.log(allProducts, categories, productsPageData);
    }

    const getProducts = useAction(args => {
        return dispatch => {
            dispatch({ type: 'SET_DATA_LOADING' });
            if (args) {
                console.log(args);
                dispatch({
                    type: 'SET_PRODUCTS_DATA',
                    payload: { selCat: args }
                })
            } else {
                productService.getProducts().then(res => {
                    const totalProducts = res.products;
                    const categories = res.categories;
                    setAllProducts(totalProducts);
                    setCategories(categories);
                    const selCat = categories[0];
                    const products = totalProducts.length && selCat && selCat.name && totalProducts.filter(product => product.category === selCat.name)
                    dispatch({
                        type: 'SET_ALL_DATA',
                        payload: { totalProducts: totalProducts, categories: categories, selCat: selCat, products: products }
                    });
                });
            }

            console.log(allProducts, categories);
        }
    });
    return [productsPageData, getProducts];
}
export default useProducts;