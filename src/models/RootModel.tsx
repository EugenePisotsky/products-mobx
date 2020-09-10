import { types } from 'mobx-state-tree'
import { ProductsModel } from './ProductModel'

export const RootModel = types.model({
    products: ProductsModel
})