//Requiring the package
import PouchDB from 'pouchdb';
import pouchdb_find from 'pouchdb-find'
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite'
import * as types from '../helpers/interfaces'

PouchDB.plugin(pouchdb_find)

const companyDB = new PouchDB(`companies`)
const employeeDB = new PouchDB(`employees`)


export const employees = {
  async saveNewEmployee(data: types.employeeTyping) {

      return await employeeDB.put(data)


  },

  async saveUpdate(data: types.employeeTyping) {
     /// const result = {}
      const result = await employeeDB.get(data._id).then( (doc) => {
          data._rev = doc._rev
         employeeDB.put(data)
      }).catch((err) => {
          console.log(err)
      })
      return data
  },


  async getEmployeeByUsername(username: string) {

      const res = await employeeDB.get(username)
    //   .then((doc) => {
    //     return doc
    //   })
    //       .catch((err) => {
    //           return err
    //       })
      return res
  },

  async getEmployeeByCompany(company_id:string) {
    // console.log(employeeDB.info())
   
   
    // employeeDB.createIndex({
    //     index: {fields: ['company']}
    //   }); 
    return await employeeDB.find({
          selector: {
              company: company
          },
          
      })
  }
}

export const company = {
  saveNewCompany(data: types.CompanyTyping) {
      if ((data) && Object.keys(data).length !== 0) {
          return companyDB.post(data)
      }
  },

  updateCompany(data: types.CompanyTyping) {
console.log(data)
    companyDB.get(data._id).then((doc) => {
          data._rev = doc._rev
          companyDB.put(data)
      })
      return data
  },

  addCompanyLogo(img, company: types.CompanyTyping) {

  },

  async getCompanyById(id: string) {
      
     const res = await companyDB.get(id, { attachments: true }).then((doc) => {
          return doc
          // console.log(res)
      })
      .catch((err)=>err)
      return res
  },

  getCompanyLogo(id: string) {
      companyDB.getAttachment(id, 'company_logo').then((blob) => {
          if (blob) {
              var url = URL.createObjectURL(blob);
              return url
          }

      })

  }

}


/**
 * VIT configurations
 */

  // vite: {
  //   optimizeDeps: {
  //       exclude: ['bcrypt']
  //   },
  //   ssr: {
  //       external: ['mock-aws-s3', 'aws-sdk', 'nock', 'node-pre-gyp']
  //   },
  //   resolve: {
  //       alias: {
  //           $lib: resolve('src/lib'),
  //           $components: resolve('src/components'),
  //           $utils: resolve('src/utils')
  //       }
  //   }