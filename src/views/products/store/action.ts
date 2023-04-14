import { rootState } from "../../../vuex"
import { ActionContext, ActionTree } from "vuex"
import { IProduct, IProductState, defaultState } from "./state"
import { products as DB, products } from "../../../db/dbconnect"

export const actions: ActionTree<IProductState, rootState> = {

  async setActiveProduct(context, id) {
    // await context.dispatch('resetProductState').then(()=>{
    const presentProduct = context.getters.getProductById(id)
    //context.commit('setActiveProduct', presentProduct)
    return presentProduct
  },

  resetProductState({ commit }) {

    //this.dispatch('setupCompanyProduct')
    commit('setCreateModal', false)
    commit('setEditModal', false)
    commit('setProductIsCreating', false)
    commit('setProductIsLoading', false)
    commit('setProductModal', false)
    commit('setProductIsUpdating', false)
    commit('setProductIsDeleting', false)
  },

  actionSaveProduct({ commit, dispatch }, product: IProduct) {

    const res = DB.saveNewProduct(product)
      .then((r) => {
        product._rev = r.rev
        commit('createProduct', product)

        return r

      })
      .catch((err) => err)
    return res
  },

  async actionUpdateProduct({ commit, dispatch }, product: IProduct) {
    await DB.updateProduct(product).then((res) => {
      product._rev = res.rev
      commit('updateProduct', product)
      dispatch('resetProductState')
    })


  },
  async actionDeleteProduct({ commit, dispatch }, product: IProduct) {
    const r = await DB.deleteProduct(product._id)
      .then((res) => {
        commit('deleteProduct', product)
        dispatch('resetProductState')
      }
      )
      .catch((err) => err)

  },
  searchProduct({ state }, searchkey) {
    return state.products.filter((element: IProduct, index, searchResult) => {
      //console.log(index)
      return (element.name.toLowerCase().includes(searchkey) || element.sku.toLowerCase().includes(searchkey))

    })


  },
  /**
   * 
   * @param param0 Active product houses the recent activated active product
   * Product houses the default product setting of the company
   */

  async setupCompanyProduct(rootState, context) {
    const company_id = context.rootState.company.company._id
    const employee_id = context.rootState.employee.employee._id

    //commit('setupProduct', { company_id, employee_id })

    //Object.assign(state, resetState)
    const storeP = defaultState;
    storeP.company_id = company_id
    storeP.employee_id = employee_id
    storeP.id = new Date().toJSON()
    return storeP
  },

  deleteProductState({ state }) {
    state.products = []
    //return state.products
  },

  loadProducts({ commit }, company) {
    let products: IProduct[] = []
    DB.getCompanyProducts(company).then((value) => {
      value.rows.forEach(element => {
        products.push(element.doc)
      });

      commit('loadProducts', products)
    })
      .catch((err) => err)

  }


}