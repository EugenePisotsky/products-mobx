import * as React from 'react'
import { Pagination } from '@material-ui/lab'

interface PaginationComponentProps {
    totalPages: number,
    page: number,
    onChanged: (page: number) => void
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, page, onChanged }) => {
    if (totalPages < 2) {
        return null
    }

    return <Pagination
        count={totalPages}
        page={page}
        onChange={(e, page) => onChanged(page)}
    />
}