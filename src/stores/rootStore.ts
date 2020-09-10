import { RootModel } from '../models/RootModel'
import { Instance } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { ProductsState } from '../models/ProductModel'

export const rootStore = RootModel.create({
    products: {
        state: ProductsState.Pending,
        filter: '',
        itemsPerPage: 10,
        page: 1,
        products: []
    }
})

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null)

export const StoreProvider = RootStoreContext.Provider

export function useStore(): RootInstance {
    return useContext(RootStoreContext)!!
}