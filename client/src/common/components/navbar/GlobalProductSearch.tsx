import Request from "@/common/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
interface SuggestedProductsType {
    id: string,
    name: string
}
const GlobalProductSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            prev.set("search", e.target.value);
            prev.set("page", "1"); // reset to first page when searching
            return prev;
        });
    };
    const fetchSuggestions: SuggestedProductsType[] = async () => {
        const res = await Request<SuggestedProductsType[]>(`/product/suggestions?search=${search}`, "GET", false)
        return res.data
    }
    const { data: SuggestedProducts = [] } = useQuery({
        queryKey: ['product-search-suggestions', search],
        queryFn: () =>{},
        staleTime: 5 * 60 * 1000,
    })

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                className="block w-full focus:outline-0"
                value={search}
                onChange={handleChange}
            />
            {search && <ul className="">
                {SuggestedProducts.length > 0 ?
                    SuggestedProducts.map((product: SuggestedProductsType) => <li>{product.name}</li>) :
                    <li>Search <b>{search}</b></li>}
            </ul>}
        </div>
    )
}

export default GlobalProductSearch