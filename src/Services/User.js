import axiosHttp from "../Utils/axios";

import firebaseConfig from "../firebase/config";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { database } from "../firebase/config";

const userService = {
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

    updateUserAddress: (userId, address) => {
        const data = {
            userId: userId,
            address: address,
        }
        return new Promise((resolve, reject) => {
            set(ref(database, 'address/' + userId), data).then((resp) => {
                console.log('success', resp);
                resolve(resp);
            }).catch((error) => {
                reject(error);
                console.log(error);
            })

        })
    },

    getUserAddress: (userId) => {
        console.log(userId);
        return new Promise((resolve, reject) => {
            const cartRef = ref(database, 'address/' + userId);
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
    }
}

export default userService;