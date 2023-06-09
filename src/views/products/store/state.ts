export interface IProduct {
    _id : string,
    name: string,
    desc?: string,
    cost_price: number | string,
    selling_price: number | string,
    sku: string,
    productUnit: string | undefined,
    productType: string,
    imageData?: string,
    product_img?: Blob,
    company_id: string,
    reg_date: Date,
    employee_id: string,
    deleted_at: Date | undefined
    _rev: ''
}


export const defaultState: IProduct = {
    _id: '',
    name: '',
    desc: '',
    cost_price: 0,
    selling_price: 0,
    sku: '',
    productUnit: '',
    productType: '',    
    imageData: '',
    company_id: '',
    reg_date: new Date(),
    employee_id: '',
    deleted_at: undefined
}

export interface IProductState {
    loading: boolean;
    product: IProduct,
    products: IProduct[];
    showCreateModal: boolean;
    showEditModal: boolean;
    showProductModal: boolean;
    
    activeProduct: IProduct,
    isLoading: boolean,
    isCreating: boolean,
    
    isUpdating: boolean,
    
    isDeleting: boolean,
   

}

export const state: IProductState = {
    loading: false,
    product: defaultState,
    products: [],
    showCreateModal: false,
    showEditModal: false,
    showProductModal: false,
    activeProduct: defaultState,
    
    isLoading: false,
    isCreating: false,
    
    isUpdating: false,
    
    isDeleting: false,
    
}
