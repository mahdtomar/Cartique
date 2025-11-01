import { useFetch } from "@/common/hooks/useFetch"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

interface ProductCount {
    count: number
}

const Pagination = ({ productsCount }: { productsCount: number }) => {
    const { Request } = useFetch()
    const [searchParams, setSearchParams] = useSearchParams();
    const fetchProductCount = async () => {
        const res = await Request<ProductCount>("/products/getProductsCount", "GET", false)
        return res.data
    }

    console.log(searchParams)
    const updatePage = (i: number) => {
        console.log(i)
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', String(i));
            return newParams;
        });
    }
    const { data } = useSuspenseQuery({
        queryKey: ["productCount"],
        queryFn: fetchProductCount,
    })
    const pagesCount = (data.count / productsCount)
    console.log("product count :", data.count)
    return <div className="flex gap-2">
        {Array(Math.floor(pagesCount)).fill(1).map((page, i) => <span className="bg-gray-300 p-2 rounded hover:bg-gray-600 hover:text-white" key={`${page}-${i}`} onClick={() => { updatePage(i + 1) }}>{i + 1}</span>)}
    </div>
}

export default Pagination
