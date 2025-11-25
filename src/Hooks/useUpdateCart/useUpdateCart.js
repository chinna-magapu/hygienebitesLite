import { useCallback } from 'react';
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

const useUpdateCart = () => {
    let result = useSelector(state => state.useUpdateCartReducer);
    const updateQuantitySafely = (
        currentProduct,
        targetProduct,
        quantity
    ) => {
        if (currentProduct.id === targetProduct.id) {
            return Object.assign({
                ...currentProduct,
                quantity: currentProduct.quantity + quantity,
            });
        } else {
            return currentProduct;
        }
    };

    const getPriceDetails = (totalProducts) => {

        if (totalProducts && totalProducts.length) {
            const totalPrice = totalProducts.reduce((sum, product) => {
                sum += product.price * product.quantity;
                return sum;
            }, 0);
            const discount = 0;
            const deliveryCharges = 0;
            const finalPrice = (totalPrice + deliveryCharges) - discount;

            return {
                totalPrice,
                discount,
                deliveryCharges,
                finalPrice
            };
        } else {
            return {
                totalPrice: 0,
                discount: 0,
                deliveryCharges: 0,
                finalPrice: 0
            };
        }


    }



    const handleAddProduct = (args) => {
        let [products, newProduct, userId] = args;
        let updatedProducts = [];
        const isProductAlreadyInCart = products.some(
            (product) => newProduct.id == product.id
        );
        if (isProductAlreadyInCart) {
            updatedProducts = products.map((product) => {
                return updateQuantitySafely(product, newProduct, newProduct.quantity);
            });
        } else {
            updatedProducts = [...products, newProduct];
        }
        return [updatedProducts, userId];
    }

    const handleRemoveProduct = (args) => {
        let [products, productToRemove, userId] = args;
        const updatedProducts = products.filter(
            (product) => product.id !== productToRemove.id
        );
        return [updatedProducts, userId];
        // setProducts(updatedProducts);
        // updateCartTotal(updatedProducts);
    };

    const handleDecreaseProductQuantity = (args) => {
        let [products, productToDecrease, userId] = args;
        const updatedProducts = products.map((product) => {
            return updateQuantitySafely(product, productToDecrease, -1);
        });
        return [updatedProducts, userId];
    }

    const handleIncreaseProductQuantity = (args) => {
        let [products, productToDecrease, userId] = args;
        const updatedProducts = products.map((product) => {
            return updateQuantitySafely(product, productToDecrease, 1);
        });
        return [updatedProducts, userId];;
    }

    const addProduct = useAction(args => {
        const [updatedProducts, userId] = handleAddProduct(args);
        const billingDetails = getPriceDetails(updatedProducts);
        return dispatch => {
            productService.updateUserCart(userId, updatedProducts).then(res => {
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { cartId: userId, data: updatedProducts, count: updatedProducts.length, billingDetails: billingDetails }
                })
            });
        }
    });

    // const getCartproducts = getUserCart
    const getCartProducts = useAction(args => {
        const userId = args;
        return dispatch => {
            productService.getUserCart(userId).then(res => {
                console.log(res, 'from get cart action');
                const billingDetails = getPriceDetails(res.products);
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { cartId: userId, data: res.products, count: res.products.length, billingDetails: billingDetails }
                })
            }).catch(err => {
                console.log(err, 'err');
                const billingDetails = getPriceDetails([]);
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { data: [], count: 0, cartId: userId, billingDetails: billingDetails }
                })
            });
        }
    });

    // to do update cartID 

    const removeProduct = useAction(args => {
        const [updatedProducts, userId] = handleRemoveProduct(args);
        console.log(updatedProducts, 'updated products')
        const billingDetails = getPriceDetails(updatedProducts);

        return dispatch => {
            productService.updateUserCart(userId, updatedProducts).then(res => {
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { data: updatedProducts, count: updatedProducts.length, cartId: 0, billingDetails: billingDetails }
                });
            });
        }

    });

    const decreaseProductQuantity = useAction(args => {
        const [updatedProducts, userId] = handleDecreaseProductQuantity(args);
        const billingDetails = getPriceDetails(updatedProducts);

        return dispatch => {
            productService.updateUserCart(userId, updatedProducts).then(res => {
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { data: updatedProducts, count: updatedProducts.length, cartId: userId, billingDetails: billingDetails }
                });
            });
        }

    });

    const increaseProductQuantity = useAction(args => {
        const [updatedProducts, userId] = handleIncreaseProductQuantity(args);
        const billingDetails = getPriceDetails(updatedProducts);

        return dispatch => {
            productService.updateUserCart(userId, updatedProducts).then(res => {
                dispatch({
                    type: 'UPDATE_CART_PRODUCTS',
                    payload: { data: updatedProducts, count: updatedProducts.length, cartId: userId, billingDetails: billingDetails }
                });
            });
        }

    });

    const resetCartData = useAction(args => {
        const billingDetails = getPriceDetails([]);
        return dispatch => {
            dispatch({
                type: 'UPDATE_CART_PRODUCTS',
                payload: { data: [], count: 0, cartId: 0, cartId: 0, billingDetails: billingDetails }
            })
        }
    });

    

    return [
        result,
        addProduct,
        removeProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        getCartProducts,
        resetCartData
    ];
}

export default useUpdateCart;