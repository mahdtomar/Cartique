import { Link, useSearchParams } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import ProductCard from "../components/product/ProductCard"
import type { Product } from "@/types/Store"
import Request from "@/common/api/axios"
import { useDebounce } from "@/common/hooks/useDebounce"
import Pagination from "../components/store/Pagination"
import Spinner from "@/common/components/misc/Spinner"

const fetchProducts = async (
    page: number,
    limit: number,
    search: string
): Promise<Product[]> => {
    const res = await Request('/products/getAllProducts', 'GET', true, undefined, {
        page: page,
        limit,
        searchText: search,
    })
    return res.data as Product[]
}

const Store = () => {
    const [searchParams] = useSearchParams()
    const rawSearch = searchParams.get("search") || "";
    const storePage = Number(searchParams.get("page")) || 1;
    const productsCount = 20;
    const search = useDebounce(rawSearch, 500);

    const { data: products, isLoading, isError, error } = useQuery<Product[]>({
        queryFn: () => fetchProducts(storePage, productsCount, search),
        queryKey: ["products", storePage, productsCount, search],
        placeholderData: keepPreviousData
    })

    if (isLoading) {
        return <Spinner />
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
        <div className="container">
            <h1 className="text-4xl">Shop All Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-between flex-wrap justify-items-center gap-4">
                {(
                    products?.length === 0 ? <div className="text-center">sorry, no products found with the title <b>{search}</b></div>
                        : products?.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                img={product.cloudinary_url}
                                title={product.title}
                                price={product.basePrice}
                                discount={product.discountPercentage * product.basePrice}
                                finalPrice={product.finalPrice}
                                discountType="fixed"
                            />
                        ))
                )}
            </div>
            <Pagination productsCount={productsCount} />
        </div>
    )
}

export default Store
