import Request from "@/common/api/axios"
import type { Product, StoreContextTypes } from "@/types/Store"
import React, { createContext, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

export const StoreContext = createContext<StoreContextTypes>({
  previousPage: "",
  setPreviousPage: () => { },
  storePage: 0,
  productsCount: 20,
  search: '',
  getProducts: async () => { return [] },
});

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousPage, setPreviousPage] = useState<string>(''); // last store's page the user was in ex./store?page=3
  // const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const productsLimit = Number(searchParams.get("limit")) || 20;

  const getProducts = useCallback(async (pageNumber: number = Math.max(page && +page || 1, 1), limit: number = productsLimit, searchText: string = ''): Promise<Product[]> => {
    const res = await Request('/product/getAllProducts', 'GET', true, undefined, { page: pageNumber - 1, limit, searchText })
    return res.data as Product[]
  }, [page, productsLimit])


  useEffect(() => { getProducts() }, [getProducts])
  return (
    <StoreContext.Provider value={{
      previousPage,
      setPreviousPage,
      getProducts,
      storePage: Number(page),
      productsCount: 20,
      search,
    }}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider