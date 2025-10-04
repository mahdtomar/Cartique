import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Request from "@/common/api/axios"
import Header from "../components/product/Header"
import type { Product } from "@/types/Store"
import { AxiosError } from "axios"
import Spinner from "@/common/components/misc/Spinner"

const ProductPage = () => {
    const { proudctId } = useParams()

    const getProduct = async (): Promise<Product | undefined> => {
        try {
            const res = await Request<Product>(`/product/${proudctId}`, "GET", false)
            return res.data
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    }
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', proudctId],
        queryFn: getProduct,
        enabled: !!proudctId, // only fetch when proudctId exists
    })

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div>
            <p>
                {error instanceof Error
                    ? error.message
                    : <>
                        Unexpected error, Please contact support at <span className="text-blue-500 underline"><Link to="mailto:omarmahdyq@gmail.com">omarmahdyq@gmail.com</Link></span>
                    </>
                }
            </p>
        </div>
    }

    if (!product || !proudctId) {
        return <p>404 not found</p>
    }

    return (
        <div className="flex flex-col items-stretch">
            <Header product={product} />
        </div>
    )
}

export default ProductPage