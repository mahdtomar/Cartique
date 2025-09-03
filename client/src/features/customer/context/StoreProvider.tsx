import Request from "@/common/api/axios"
import type { Product, StoreContextTypes } from "@/types/Store"
import React, { createContext, useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export const StoreContext = createContext<StoreContextTypes>({
  previousPage: "",
  setPreviousPage: () => { },
  getProducts: () => { },
  products: [],
  search: '',
  searchProducts: (e: string) => {console.log(e) }
});

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousPage, setPreviousPage] = useState<string>(''); // last store's page the user was in ex./store?page=3
  const [products, setProducts] = useState<Product[]>([]);
  const productsLimit = 20;
  const [search, setSearch] = useState<string>('')
  const { page } = useParams()
  const getProducts = useCallback(async (pageNumber: number = Math.max(page && +page || 1, 1), limit: number = productsLimit) => {
    const res = await Request('/product/getAllProducts', 'GET', true, undefined, { page: pageNumber - 1, limit, search })
    setProducts(res.data as Product[])
  }, [search, page])
  const searchProducts = (value: string) => {
    setSearch(value)
  }

  useEffect(() => { getProducts() }, [getProducts])
  return (
    <StoreContext.Provider value={{ previousPage, setPreviousPage, getProducts, products, search, searchProducts }}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider