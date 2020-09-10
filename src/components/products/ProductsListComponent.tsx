import { IProductModel } from '../../models/ProductModel'
import * as React from 'react'
import { ProductComponent } from './ProductComponent'

interface ProductsListProps {
    products: IProductModel[]
}

export const ProductsListComponent: React.FC<ProductsListProps> = ({ products }) => {
    return (
        <>
            {products.map(item => <ProductComponent key={item.code} product={item} />)}
        </>
    )
}