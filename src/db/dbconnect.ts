import { ref } from 'vue'
import PouchDB from 'pouchdb';
import pouchdb_find from 'pouchdb-find'
import PouchAdapterCordovaSqlite from 'pouchdb-adapter-cordova-sqlite'
import * as types from '../helpers/interfaces'

PouchDB.plugin(pouchdb_find)
PouchDB.plugin(PouchAdapterCordovaSqlite)

const productDB = () => { return new PouchDB(`${localStorage.getItem('company_name')}-products`/*, {adapter: 'cordova-sqlite'}*/) }

// const db = new PouchDB('todos', { adapter: 'cordova-sqlite', location: 'default', androidDatabaseImplementation: 2 });
// db.info().then(console.log.bind(console))
//console.log('PouchDB adapter: ' + db.adapter); //it returns 'cordova-sqlite'

const locationDB = () => { return new PouchDB(`${localStorage.getItem('company_name')}-locations` /*, {'adapter': 'cordova-sqlite'}*/) }
const stockDB = () => { return new PouchDB(`${localStorage.getItem('company_name')}-inventory`/*,  {'adapter': 'cordova-sqlite'}*/) }
const customersDB = () => { return new PouchDB(`${localStorage.getItem('company_name')}-customers` /*, {'adapter': 'cordova-sqlite'}*/) }
const salesDB = () => { return new PouchDB(`${localStorage.getItem('company_name')}-sales`/*, {'adapter': 'cordova-sqlite'}*/) }

export const products = {
    async saveNewProduct(product: types.productsType) {

        //   console.log(product)
        const dd = await productDB().put(product).then((dd) => dd)
        //console.log({'dd': dd})
        return dd

    },

    async updateProduct(oldProduct: types.productsType) {
        let r = {}
        await productDB().get(oldProduct._id).then(async (product) => {

            r = await productDB().put({
                ...oldProduct,
                _rev: product._rev
            }).then((res) => {
                return res
            })
                .catch((err) => err)
        })

        return r
    },

    deleteProduct(product: string) {
        const res = productDB().get(product).then(function (doc) {
            return productDB().remove(doc);
        })

        return res
    },

    getCompanyProducts(company: string) {

        return productDB().allDocs({ attachments: true, include_docs: true })
    }

}

export const stocks = {

    async saveNewStock(stock: types.stocksType) {
        const res = await stockDB().put(stock).then(async (r) => {
            return await stockDB().get(r.id)
        })
            .catch((err) => err)

        return res
    },

    async loadCompanyStock() {
        const res = await stockDB().allDocs({ include_docs: true, limit: 50 })
        return res
    },


    async updateStock(stock: types.stocksType) {
        //console.log(stock)
        let output = {}
        const o = await stockDB().get(stock._id)
            .then((doc) => {
                doc.product_id = stock.product_id
                doc.quantity = stock.quantity,
                    doc.location_id = stock.location_id
                output = doc
                stockDB().put({
                    ...doc
                })

                    .then((res) => res)
                    .catch((err) => err)

            }).catch((err) => err)

        //console.log(output)
        return output

    },

     deleteStock(stock){
       return stockDB().get(stock._id).then(async (doc)=>{
            await stockDB().remove(doc).then((value)=>value).catch((err)=>err)
        })
    }
}
export const location = {
    async saveLocation(data: types.locationTyping) {
        data.created_at = new Date()
        let res = await locationDB().put(data).then((doc) => doc).catch((err) => err)
        return res

    },

    updateLocation(location: types.locationTyping) {
        locationDB().get(location._id).then((doc) => {
            location._rev = doc._rev
            location.updated_at = new Date()
            locationDB().put(location)
        })
    },

    async getCompanyLocations() {
        const locations: types.locationTyping[] = []
        await locationDB().allDocs({ "include_docs": true }).then(async (res) => {
            
            await res.rows.forEach((elem) => {
                locations.push(elem.doc)
            })
        })
            .catch((err) => err)
        if (locations.length > 0) return locations
        //else return 'None found yet'
    }
}

