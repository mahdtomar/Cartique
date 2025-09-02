import Request from "@/common/api/axios"
import type { StoreContext } from "@/types/Store"
import React, { createContext, useEffect, useState } from "react"

const StoreContext = createContext<StoreContext>({
  previousPage: "",
  setPreviousPage: () => { },
  getProducts: () => { }
});

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [previousPage, setPreviousPage] = useState<string>('') // last store's page the user was in ex./store?page=3
  const productsLimit = 20
  const getProducts = async (page: number = 0, limit: number = productsLimit) => {
    const res = await Request('/products', 'GET', true, undefined, { page, limit })
    console.log(res)
  }

  useEffect(() => { getProducts() }, [])
  return (
    <StoreContext.Provider value={{ previousPage, setPreviousPage, getProducts }}>{children}</StoreContext.Provider>
  )
}

export default StoreProvider