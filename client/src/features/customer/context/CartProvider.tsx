import Request from "@/common/api/axios";
import { UserContext } from "@/common/context/UserProvider";
import type { CartItem } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
type cartContextTypes = { cart: CartItem[]; }
const CartContext = createContext<cartContextTypes>({
    cart: [],
});

const CartProvider = () => {
    const userId = useContext(UserContext)?.user?.id
    const fetchCart = async () => {
        const res = await Request<CartItem[]>(`/users/${userId}/cart`, "GET", true);
        return res.data
    };
    const { data: cart = [] } = useQuery({
        queryKey: ['cart', userId],
        queryFn: fetchCart,
        enabled: !!userId,
    });
    console.log("cart : ", cart)
    return (
        <CartContext.Provider value={{ cart }}>
            <Outlet/>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
export default CartProvider