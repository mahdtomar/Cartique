import { useDebounce } from "@/common/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import searchIcon from "./../../../assets/icons/MagnifyingGlass.svg";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Request from "@/common/api/axios";

interface SuggestedProductsType {
    _id: string;
    title: string;
}

const GlobalProductSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const debouncedSearch = useDebounce(search, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            prev.set("search", e.target.value);
            prev.set("page", "1");
            return prev;
        });
    };

    const fetchSuggestions = useCallback(async (): Promise<SuggestedProductsType[]> => {
        if (debouncedSearch) {
            const res = await Request<SuggestedProductsType[]>(`/product/suggestions?search=${debouncedSearch}`, "GET", false);
            console.log(res.data);
            return res.data;
        }
        return [];
    }, [debouncedSearch]);

    const { data: SuggestedProducts = [] } = useQuery({
        queryKey: ['product-search-suggestions', debouncedSearch],
        queryFn: fetchSuggestions,
        enabled: !!debouncedSearch,
        staleTime: 5 * 60 * 1000,
    });
    return (
        <label
            className="search border-1 shadow-md flex flex-col p-2 gap-2 justify-start rounded-sm overflow-hidden w-[444px]"
            htmlFor="navbar-search"
        >
            <div className="flex gap-2">
                <img
                    src={searchIcon}
                    alt="Magnifying Glass icon"
                    className="w-6 self-start"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="block w-full focus:outline-0"
                    value={search}
                    onChange={handleChange}
                />
            </div>
            {debouncedSearch && (
                <ul>
                    {SuggestedProducts.length > 0 ? (
                        SuggestedProducts.map((product) => (
                            <li className="w-full p-1 rounded hover:bg-gray-200" key={product._id}>{product.title.split(search)[0]}<b>{search}</b>{product.title.split(search)[1]}</li>
                        ))
                    ) : (
                        <li>No results for <b>{debouncedSearch}</b></li>
                    )}
                </ul>
            )}
        </label>
    );
};

export default GlobalProductSearch;
