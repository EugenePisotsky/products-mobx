import React from 'react'
import './App.css'
import { rootStore, StoreProvider } from './stores/rootStore'
import { ProductsPage } from './components/products/ProductsPage'
import { Container } from '@material-ui/core'

function App() {
    return (
        <StoreProvider value={rootStore}>
            <Container maxWidth="sm">
                <ProductsPage />
            </Container>
        </StoreProvider>
    )
}

export default App
