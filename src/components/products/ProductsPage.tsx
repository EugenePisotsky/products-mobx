import * as React from 'react'
import { useEffect } from 'react'
import { useStore } from '../../stores/rootStore'
import { ProductsListComponent } from './ProductsListComponent'
import { observer } from 'mobx-react'
import { ProductsState } from '../../models/ProductModel'
import { PaginationComponent } from '../partials/PaginationComponent'
import { Box } from '@material-ui/core'
import { ProductsSearchComponent } from './ProductsSearchComponent'

const LoadingComponent = () => <p>Loading...</p>
const ErrorComponent = () => <p>An error occured...</p>

export const ProductsPage: React.FC = observer(() => {
    const store = useStore()
    const {
        state, filteredProducts, totalPages, page, setPage
    } = store.products

    useEffect(() => {
        store.products.fetchProducts()
    }, [store])

    const changePage = (page: number) => {
        setPage(page)
        window.scroll(0, 0)
    }

    if (state === ProductsState.Pending) {
        return <LoadingComponent />
    }

    if (state === ProductsState.Error) {
        return <ErrorComponent />
    }

    return (
        <Box display="flex" flexDirection="column" padding={[0, 5]}>
            <ProductsSearchComponent />
            <ProductsListComponent products={filteredProducts} />

            <Box alignSelf="center" marginTop={2}>
                <PaginationComponent
                    totalPages={totalPages}
                    page={page}
                    onChanged={changePage}
                />
            </Box>
        </Box>
    )
})