import { useContext } from "react"
import { StoreContext } from "../context/StoreProvider"
import ProductCard from "../components/product/ProductCard"

const Store = () => {
    const { products } = useContext(StoreContext)
    return (
        <div className="container">
            <h1 className="text-4xl">Shop All Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-between flex-wrap justify-items-center gap-4">
                {products.map(product => <ProductCard
                    key={product._id}
                    id={product._id}
                    img={product.cloudinary_url}
                    title={product.title}
                    price={product.basePrice}
                    discount={product.discountPercentage * product.basePrice}
                    finalPrice={product.finalPrice}
                    discountType="fixed" />)
                }
            </div>
        </div>
    )
}

export default Store