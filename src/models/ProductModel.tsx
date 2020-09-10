import { flow, Instance, types } from 'mobx-state-tree'

const PRODUCTS_URL = `https://raw.githubusercontent.com/traa/apiplp/master/db.json`

export enum ProductsState {
    Pending = 'Pending',
    Done = 'Done',
    Error = 'Error'
}

const pageItems = (items: IProductModel[], itemsPerPage: number, page: number) => {
    const startIndex = itemsPerPage * (page - 1)
    const endIndex = startIndex + itemsPerPage

    return items.slice(startIndex, endIndex)
}

const filterItemsByQuery = (items: IProductModel[], query: string) => {
    if (!query?.length) {
        return items
    }

    return items.filter(
        item => item.productName.toLowerCase().includes(query.toLowerCase())
    );
}

export const ProductModel = types.model({
    code: types.string,
    productName: types.string,
    pdpURL: types.string,
    imageURLs: types.array(types.string),
    price: types.string
})

export const ProductsModel = types
    .model({
        state: types.enumeration<ProductsState>(Object.values(ProductsState)),
        filter: types.string,
        itemsPerPage: types.number,
        page: types.number,
        products: types.array(ProductModel)
    })
    .views(self => {
        return {
            get filteredProducts() {
                const { products, itemsPerPage, page, filter } = self
                const items = filterItemsByQuery(products, filter)

                return pageItems(items, itemsPerPage, page)
            },

            get totalPages() {
                return Math.ceil(filterItemsByQuery(self.products, self.filter).length / self.itemsPerPage)
            }
        }
    })
    .actions(self => {
        const fetchProducts = flow(function* fetchProducts() {
            self.state = ProductsState.Pending

            try {
                const result = yield fetch(PRODUCTS_URL)
                const json = yield result.json()

                self.products = json.pageItems
                self.state = ProductsState.Done
            } catch (e) {
                self.state = ProductsState.Error
            }
        })

        return {
            fetchProducts,
            search(query: string) {
                self.page = 1
                self.filter = query
            },
            setPage(page: number) {
                self.page = page
            }
        }
    })

export interface IProductModel extends Instance<typeof ProductModel> {
}