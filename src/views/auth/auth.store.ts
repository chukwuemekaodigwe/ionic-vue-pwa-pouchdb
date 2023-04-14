import store, { GetterTree } from 'vuex'
import { CompanyTyping } from '../../helpers/interfaces'
import { MutationTree, ActionTree, Getter, mapActions, mapGetters } from 'vuex'
import { rootState } from '../../vuex'
import * as DB from '../../db/dbconnect-1'

export interface companyState {
    company: CompanyTyping,
    admin?: string | null
}

const state: companyState = {
    company: {},
    admin: null

}

const mutation: MutationTree<companyState> = {
    loadCompany(state, company: CompanyTyping) {
        state.company = company,
            state.admin = company.admin
    },

    updateCompany(state, info) {
        state.company = info
        //Object.assign(state.company, info)
    },

    addNewUnit(state, newUnit) {
        console.log(state)
        const units = state.company
         units.units = [newUnit]
        return units
    },

    removeUnit(state, unit) {
        const index = state.company?.units.findIndex(e => e == unit)
        if (index === -1) return;
        state.company?.units.splice(index, 1)
    },


}

const actions: ActionTree<companyState, rootState> = {
    async createCompany({ commit }, data) {
        if ((data) && Object.keys(data).length !== 0) {
            await DB.company.saveNewCompany(data)?.then((res) => {

                data._id = res.id
                data._rev = res.rev

                commit('loadCompany', data)
                //return data
            })

        }

    },

    updateCompanyInfo({ commit }, data: CompanyTyping) {
        if ((data) && Object.keys(data).length !== 0) {
            data = DB.company.updateCompany(data)
            commit('updateCompany', data)
        }
        return data
    },

    async setActiveCompany({ state, commit }, company_id) {
    const res =   await DB.company.getCompanyById(company_id)
            .then((result) => {
                
                commit('loadCompany', result)
                return result
            })
            .catch((err) => {
                throw new Error(err);
            })

           return res
            
    },

   async saveUnit (unit) {
    DB.company.updateCompany
   }
}

const getters: GetterTree<companyState, rootState> = {
    getCompanyById: (state) => (_id) => {
        return DB.company.getCompanyById(_id)
    },
    getCompanyUnits(){
        return state.company?.units
    }
    
}

export default {
    state: state,
    mutations: mutation,
    actions: actions,
    getters: getters
}