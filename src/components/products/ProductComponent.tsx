import * as React from 'react'
import { IProductModel } from '../../models/ProductModel'
import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface ProductComponentProps {
    product: IProductModel
}

const useStyles = makeStyles({
    root: {
        marginBottom: 10
    },
    media: {
        height: 350,
        backgroundSize: 'contain'
    }
})

export const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
    const classes = useStyles()

    return (
        <Link href={product.pdpURL} target={'_blank'}>
            <Card className={classes.root}>
                <CardActionArea>
                    {product.imageURLs?.length && (
                        <CardMedia
                            className={classes.media}
                            image={product.imageURLs[0]}
                            title="Contemplative Reptile"
                        />
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Price: {product.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}