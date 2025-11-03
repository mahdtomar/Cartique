import Request from "@/common/api/axios"
import Spinner from "@/common/components/misc/Spinner"
import { UserContext } from "@/common/context/UserProvider"
import type { CartItemType } from "@/types/Store"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import CartItem from "../components/cart/CartItem"

const CartPage = () => {
  const userId = useContext(UserContext)?.user?.id
  const getCart = async () => {
    const res = await Request<CartItemType[]>("/cart", "GET", true)
    return res.data
  }
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCart,
    enabled: !!userId
  })
  if (isLoading) {
    return <Spinner className="w-15" />
  }
  return (
    <div className="container">
      {cartItems.map(cartItem => <CartItem item={cartItem} />)}
    </div>
  )
}

export default CartPage