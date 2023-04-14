import { MutationTree, ActionTree, GetterTree } from "vuex";
import { locationTyping } from "../../helpers/interfaces";
import { rootState } from "../../vuex";
import { location as DB } from '../../db/dbconnect'

export interface locationState {
    locations: locationTyping[],
    company: string
}

const state: locationState = {
    locations: [],
    company: ''
}

const mutation: MutationTree<locationState> = {
    createLocation(state, newlocation) {
        return state.locations.push(newlocation)
    },

    updateLocation(state, item) {
        const i = state.locations.findIndex(element => element._id == item._id)
        if (i === -1) return

        return state.locations.splice(i, 1, item)

    },

    deleteLocation(state, item) {
        const i = state.locations.findIndex(element => element._id == item._id)
        if (i === -1) return

        return state.locations.splice(i, 1)
    },

    loadBusinessLocation(state, { locations, company }) {
        state.locations = locations
        state.company = company
    }
}

const action: ActionTree<locationState, rootState> = {

    async saveNewLocation({ commit }, data) {        
            await DB.saveLocation(data)?.then((value) => {
                data._rev = value.rev
                console.log(value)
                commit('createLocation', data)
            })
        
    },

   async updateLocation({commit}, data){
       await DB.updateLocation(data)
        commit('updateLocation', data)
    },

    async loadLocations({commit}, companyId){
        await DB.getCompanyLocations().then((res)=>{
            console.log(res)
            commit('loadBusinessLocation', {locations: res, company: companyId})
            ret
        })
    }
}

const getter: GetterTree<locationState, rootState> = {
    getLocationById: (state) => (id:string) => {
       return state.locations.find((el)=>el._id == id)
    },

    getCompanyLocations(state){
        //console.log(state.locations)
        return state.locations
    }
}
export default {
    state: state,
    mutations: mutation,
    actions: action,
    getters: getter
}