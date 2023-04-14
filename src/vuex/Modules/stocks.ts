import { ActionTree, GetterTree, MutationTree } from "vuex"
import { rootState } from '../index'
import { stocks as DB } from "../../db/dbconnect"
import { IProduct } from "../../views/products/store/state"

export interface stockInterface {
    _id: string,
    id?: string,
    product_id: string,
    location_id: string,
    company_id: string,
    quantity: number,
    registered_by: string,
    created_at?: string,
    deleted_at?: string,
    product?: IProduct
}

export const defaultStock: stockInterface = {
    _id: '',
    id: '',
    product_id: '',
    location_id: '',
    company_id: '',
    quantity: '',
    registered_by: '',
    created_at: new Date().toJSON(),

}

export interface stockStateInterface {
    loading: boolean,
    stock: stockInterface,
    stocks: stockInterface[],
    location: string,
    showCreateModal: boolean,
    showEditModal: boolean,
    showProductModal: boolean,
    isLoading: boolean,
    isCreating: boolean,
    isUpdating: boolean,
    isDeleting: boolean,

}

export const stockState: stockStateInterface = {
    loading: false,
    stock: defaultStock,
    stocks: [],
    location: '',
    showCreateModal: false,
    showEditModal: false,
    showProductModal: false,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
}


export const stockMutation: MutationTree<stockStateInterface> = {
    addStock(state, newStock) {
        return state.stocks.unshift(newStock)
    },

    deleteStock(state, stock: stockInterface) {
        const d = state.stocks.findIndex(element => element._id == stock._id)
        if (d === -1) return
        return state.stocks.splice(d, 1)
    },

    updateStock(state, stock) {
        const d = state.stocks.findIndex(element => element._id == stock._id)
        if (d === -1) return
        state.stocks.splice(d, 1, stock)
    },

    getStockByProduct(state, id: string) {
        const a = state.stocks.filter((e) => (e._id === id)).reduce((element1, element) => {
            return element1 + element.quantity
        }, 0)

        return a
    },

    setLoading(state, value) {
        state.loading = value
        //console.log('I\'m loading')
    },

    setCreateModal(state, value) {
        state.showCreateModal = value
    },

    setEditModal(state, value) {
        state.showEditModal = value
        //state.activeProductId = value.productId
    },

    setProductModal(state, value) {
        state.showProductModal = value
        //state.activeProductId = productId
    },

    setStockIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },

    setStockIsCreating(state, isCreating) {
        state.isCreating = isCreating
    },

    setStockIsUpdating(state, isUpdating) {
        state.isUpdating = isUpdating
    },

    setStockIsDeleting(state, isDeleting) {
        state.isDeleting = isDeleting
    },

    uploadStocks(state, stocks) {
        state.stocks = stocks
        //Object.assign(state.stocks, stocks)
    }

}


export const stockAction: ActionTree<stockStateInterface, rootState> = {
    async addNewStock({ commit }, newStock) {
        const save = {
            _id: new Date().toJSON(),
            created_at: new Date().toJSON(),
            company_id: localStorage.getItem('company_name'),
            registered_by: localStorage.getItem('employee_id'),
            ...newStock
        }
        const result = await DB.saveNewStock(save).then((res) => res).catch((err) => err)

        if (result) {
            commit('addStock', result)
        }
        //console.log(result)
        return result
    },

    async updateStock({ commit }, Stock) {
        DB.updateStock(Stock)
            .then((res) => {
                commit('updateStock', res)
            })
            .catch((err) => err)

    },

   async deleteStock ({commit}, stock){
   const dd = await DB.deleteStock(stock)

    commit('deleteStock', stock)
    return dd

   },

    async loadStock({ commit, rootState, rootGetters }) {
        const result = await DB.loadCompanyStock().then(async (res) => {
            const stocks = res.rows
            let ss = stocks.map((el) => el.doc)
            const limit = res.total_rows
            commit('uploadStocks', ss)
            return ss
        })
            .catch((err) => err)

        //console.log(result);
        return result
    },

}

export const stockGetters: GetterTree<stockStateInterface, rootState> = {

    loadStocksByProduct(state, getters, rootState) {
        const Products = rootState.products.products
        const inventoryArray = Products.map((element) => {
            const locations: string[] = []
            const stocks = state.stocks.filter(item => item.product_id == element._id)
            const qty = stocks.reduce((sum: number, el) => {
                sum -= -el.quantity
                locations.push(el.location_id)
                //sum = quantity
                // console.log(sum)
                return sum
            }, 0)

            return { 'product_id': element._id, 'quantity': qty, 'locations': locations }

        })
        //console.log(inventoryArray);
        return inventoryArray
    },

    getStockByLocation: (state, getters, rootState) => (location: string) => {
        const locations = rootState.locations.locations

        const stockArray = locations.map((location) => {
            const stocks = state.stocks.filter((e) => e.location_id === location._id)
            return stocks
        })

        return stockArray

    },

    async getCompanyStock(state, getters, rootState) {

        // const stocks = (location) ?
        //      getters.getStockByLocation(location)
        //     :
        let stocks = state.stocks

        //console.log(stocks)

        const newStock = await stocks.filter((element) =>
            ((element) && (Object.keys(element).length !== 0)))

        const resp: stockInterface[] = await newStock.map((element) => {
            const prod = rootState.products.products.find(item => element.product_id == item._id)
            const newP = { ...prod, ...element }
            //Object.assign('new', element, prod.name, prod.sku )
            //console.log(newP)
            return newP
        })

        return resp

    }

}
// if(newStock.reduce(item => element.product_id == item.product_id)){
//     const p =  newStock.find(item => element.product_id == item.product_id)
//     p.quantity += element.quantity
//     p.location_id = [...p.location_id, ...element.location_id]

//     return p
//   }



// sortStockAlphabet(state, rootState) {
//       const  storeKey = rootState.products.state
//         console.log('running mutation');
//         const jobs = this.state.jobs;
//         jobs.sort((a, b) => {
//             let compare = 0;
//             if (a[sortKey] > b[sortKey]) {
//                 compare = 1;
//             } else if (b[sortKey] > a[sortKey]) {
//                 compare = -1;
//             }
//             return compare;
//         });
//         state.jobs = jobs;
//     }
// },



export default {
    //namespaced: true,
    state: stockState,
    mutations: stockMutation,
    actions: stockAction,
    getters: stockGetters,

}