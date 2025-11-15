import Request from "@/common/api/axios"
import Spinner from "@/common/components/misc/Spinner"
import { UserContext } from "@/common/context/UserProvider"
import type { CartItemType } from "@/types/Store"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import CartItem from "../components/cart/CartItem"
import { Link } from "react-router-dom"
import CartSummery from "../components/cart/CartSummery"

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
  if (!userId) {
    return <p>Please <button className="primary"><Link to="/login">login</Link></button> to view your cart.</p>
  }
  if (cartItems.length === 0) {
    return <div>
      <p>your cart is empty, browse products</p>
    </div>
  }
  return (
    <div className="container flex gap-4 items-start pt-4">
      <div>
        {cartItems.map(cartItem => <CartItem key={cartItem._id} item={cartItem} />)}
      </div>
      <CartSummery />
    </div>
  )
}

export default CartPage