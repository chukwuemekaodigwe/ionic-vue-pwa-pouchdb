import store, { ActionTree, GetterTree } from 'vuex'
import { CompanyTyping, employeeTyping } from '../../helpers/interfaces'
import { MutationTree, ActionContext, Getter, mapActions, mapGetters } from 'vuex'
import { rootState } from '../../vuex'
import { employees as DB } from '../../db/dbconnect-1'

export interface employeeState {
    employee: employeeTyping | {},
    employees: employeeTyping[],
    showCreateModal: boolean,
    showEditModal: boolean,
    showModal: boolean
}

const state: employeeState = {
    employee: {},
    employees: [],
    showCreateModal: false,
    showEditModal: false,
    showModal: false,
}


const mutation: MutationTree<employeeState> = {
    saveEmployee(state, employee: employeeTyping) {
        return state.employees.push(employee)
    },

    updateEmployee(state, employee: employeeTyping) {
        const d = state.employees.findIndex(element => element._id == employee._id)
        if (d === -1) return
        state.employees.splice(d, 1, employee)

    },

    removeEmployee(state, employee) {
        const d = state.employees.findIndex(element => element._id == employee._id)
        if (d === -1) return
        state.employees.splice(d, 1)

    },

    loadEmployees(state, employees: employeeTyping[]) {
        state.employees = employees
    },

    setActiveEmployee(state, employee: employeeTyping) {
        state.employee = employee
    }

}

const actions: ActionTree<employeeState, rootState> = {
    saveNewEmployee({ commit }, employee: employeeTyping) {
     const result =   DB.saveNewEmployee(employee).then((res) => {
          
            employee._id = res.id
            employee._rev = res.rev
            commit("saveEmployee", employee)
            return employee
        }).catch((rr)=>{
            return rr
        })

        return result
    },

   async saveUpdate({ commit }, employee: employeeTyping) {
        employee.updated_at = new Date()
        //console.log({'store1': employee})
        
       await DB.saveUpdate(employee).then((res) => {
            //employee._rev = res.rev
            //console.log({'store2': res})
            commit('updateEmployee', employee)
        })
        //console.log(employee)

    },
    loadCompanyEmployees({commit}, company:string){
        DB.getEmployeeByCompany(company).then((res)=>{
           // console.log({'emp': res})
            commit('loadEmployees', res)

        })
        .catch((err)=>{throw new Error(err)})
    }
}

const getters: GetterTree<employeeState, rootState> = {
    getEmployeeByToken: (state) => (token: string) => {
        return state.employees.find((el) => el.login_token === token)
    },

    getEmployeeByUsername: (state) => (username: string) => {
    
       const result = DB.getEmployeeByUsername(username)
      
       return result
       // return state.employees.find((el) => el.username === username)
    },

    getEmployeeById: (state) => (id: string) => {
        return state.employees.find((el) => el._id === id)
    },

    getCompanyEmployees(state){
        return state.employees
    }
    
}
export default {
    state: state,
    mutations: mutation,
    actions: actions,
    getters: getters,

}