import axiosHttp from "../Utils/axios";

import firebaseConfig from "../firebase/config";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { database } from "../firebase/config";

const OrderService = {
    getCategories: () => {
        return axiosHttp.get('/products/categories');
    },

    getProducts: () => {
        return new Promise((resolve, reject) => {
            const productsRef = ref(database, '/');
            onValue(productsRef, (snapshot) => {
                const data = snapshot.val();
                if (!!data) {
                    // console.log(data);
                    resolve(data);
                } else {
                    reject("data not found");
                }
            });
        })
    },

    createOrder: (userId, orderDetails) => {
        const orderId = 'ORD-' + Math.floor(Math.random() * Date.now()).toString(16);
        const data = {
            userId: userId,
            orderId: orderId,
            orderDetails: { ...orderDetails, orderId },
        }
        return new Promise((resolve, reject) => {
            set(ref(database, 'orders/' + userId + '/' + orderId), data).then((resp) => {
                console.log('success', resp);
                resolve(resp);
            }).catch((error) => {
                reject(error);
                console.log(error);
            })

        })
    },

    getUserOrders: (userId) => {
        console.log(userId);
        return new Promise((resolve, reject) => {
            const cartRef = ref(database, 'orders/' + userId);
            onValue(cartRef, (snapshot) => {
                //   console.log(snapshot,'snapshot')
                const data = snapshot.val();
                if (!!data) {
                    console.log(data, 'userData');
                    resolve(data);
                } else {
                    reject("data not available");
                }
            });
        })
    },

    getUserOrderById: (userId, orderId) => {
        return new Promise((resolve, reject) => {
            const cartRef = ref(database, 'orders/' + userId + '/' + orderId);
            onValue(cartRef, (snapshot) => {
                //   console.log(snapshot,'snapshot')
                const data = snapshot.val();
                if (!!data) {
                    console.log(data, 'userData');
                    resolve(data);
                } else {
                    reject("data not available");
                }
            });
        })
    },

    cancelOrder: (userId, orderId) => {
        const data = 'Cancelled'
        return new Promise((resolve, reject) => {
            set(ref(database, 'orders/' + userId + '/' + orderId + '/orderDetails/orderStatus/'), data).then((resp) => {
                console.log('success', resp);
                resolve(resp);
            }).catch((error) => {
                reject(error);
                console.log(error);
            });

        })
    },

}

export default OrderService;