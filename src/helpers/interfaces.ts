import {IProduct} from '../views/products/store/state'
import { stockInterface } from '../vuex/Modules/stocks'
import store from '../vuex'



export type productsType = IProduct

export type stocksType = stockInterface

export type stockProductType = stocksType & productsType

export interface CompanyTyping {
    _id: string,
    fullname: string,
    shortname?: string,  // taken over by id == from uuid
    address: string,
    email?: string,
    phone: string,
    contact: {
        name: string,
        email: string
    },
    currency?: string,
    units?: [
        {
            name: string,
            symbol: string
        }
    ],
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    admin?: string  //_id of the admin user
    logo?: Blob | string,
    _rev? : string
}

export interface employeeTyping{
    _id: string,
    fullname: string,
    email: string,
    phone?: string,
    username: string,
    password: string,
    last_active?: Date,
    login_token?: string,
    company: string,  //_id of the company
    location: string,
    role: string | number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    _rev? : string
}

export interface locationTyping{
    _id: string, 
    company: string, // company _id
    name: string,
    address: string,
    admin: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    _rev? : string
}


