import { Box, Input } from '@material-ui/core'
import { useStore } from '../../stores/rootStore'
import React from 'react'

export const ProductsSearchComponent: React.FC = () => {
    const store = useStore()

    return <Box marginBottom={2}>
        <Input
            fullWidth={true}
            value={store.products.filter}
            placeholder={'Search products...'}
            onChange={(e) => store.products.search(e.currentTarget.value)}
        />
    </Box>
}