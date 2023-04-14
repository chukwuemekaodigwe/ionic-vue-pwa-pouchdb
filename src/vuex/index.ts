import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate"
import productsModule from './Modules/productModule'
import { IProductState } from '../views/products/store/state';
import stocks, { stockInterface } from './Modules/stocks';
import stockTransfer, { transferInterface } from './Modules/stockTransfer';
import employeesStore, { employeeState } from '../views/auth/employeesStore';
import company, { companyState } from '../views/auth/auth.store'
import location, { locationState } from '../views/auth/locationsStore'


export interface rootState {
    products: IProductState,
    stocks: stockInterface,
    company: companyState,
    locations: locationState,
    employees: employeeState,
    stockTransfer: transferInterface
}
const store = createStore<rootState>({
    plugins: [createPersistedState()],
    modules: {
        products: productsModule,
        inventory: stocks,
        stockTransfer: stockTransfer,
        company: company,
        locations: location,
        employees: employeesStore,

    }
    //store.state.locations.locations 


});

export default store
