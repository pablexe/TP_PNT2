import {defineStore} from 'pinia'
export const useShoppingStore = defineStore ('Shopping',{
    state: ()=> {
        return { products: [{id:10,product:'Table'},{id:12,product:'Silla'}]} 
    },
    actions: {
        addToCar(product) {
            this.products.push(product);
        }
    },
    getters: {
        getProducts: (state) => state.products,
        getLenghtPoducts: (state) => state.products.length 
    }
})