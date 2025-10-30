import { useQuery } from "@tanstack/react-query"
import ProductCard from "./ProductCard"
import Request from "@/common/api/axios"
import type { Product } from "@/types/Store"
import Spinner from "@/common/components/misc/Spinner"
import { Link } from "react-router-dom"

const RelatedProducts = ({ category, productId }: { category: string, productId: string }) => {

    const fetchRelatedProducts = async () => {
        const res = await Request("/products/category", "GET", true, undefined, { category, productId })
        return res.data as Product[]
    }


    const { data: products = [], isLoading, isError, error } = useQuery({
        queryKey: ['related-products', category, productId],
        queryFn: fetchRelatedProducts,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    })
    if (isLoading) {
        return <Spinner className="w-20" />
    }

    if (isError) {
        return (
            <h2>
                {error instanceof Error
                    ? error.message
                    : <>
                        Unexpected error, Please contact support at <span className="text-blue-500 underline"><Link to="mailto:omarmahdyq@gmail.com">omarmahdyq@gmail.com</Link></span>
                    </>
                }
            </h2>
        )
    }
    return (
        <div className="container flex flex-col justify-center items-stretch gap-2">
            <h2 className="text-2xl text-center">Related Products</h2>
            <div className="slider overflow-x-auto scroll-smooth snap-x snap-mandatory">
                <div className="flex gap-4 w-max flex-nowrap">
                    {products.map((product) => (
                        <div key={product._id} className="shrink-0 snap-start">
                            <ProductCard
                                id={product._id}
                                img={product.cloudinary_url}
                                title={product.title}
                                price={product.basePrice}
                                discount={product.discountPercentage * product.basePrice}
                                finalPrice={product.finalPrice}
                                discountType="fixed"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center w-full">
                <button className="primary">View More</button>
            </div>
        </div>
    )
}

export default RelatedProducts