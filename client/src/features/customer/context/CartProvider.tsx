import Request from "@/common/api/axios";
import { UserContext } from "@/common/context/UserProvider";
import type { CartItemType } from "@/types/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
type cartContextTypes = { cart: CartItemType[]; useUpdateCart: (arg0: string, arg1: number) => void }
const CartContext = createContext<cartContextTypes>({
    cart: [],
    useUpdateCart: () => { }
});

const CartProvider = () => {
    const queryClient = useQueryClient()
    const userId = useContext(UserContext)?.user?.id
    const fetchCart = async () => {
        const res = await Request<CartItemType[]>(`/users/${userId}/cart`, "GET", true);
        return res.data
    };
    const { data: cart = [] } = useQuery({
        queryKey: ['cart', userId],
        queryFn: fetchCart,
        enabled: !!userId,
    });
    const useUpdateCart = (productId: string, count: number) => {
        return useMutation({
            mutationFn: async () => (await Request("/cart", "PUT", true, undefined, { productId, count })).data,
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["cart", userId] })
            },
        })
    }
    console.log("cart : ", cart)
    return (
        <CartContext.Provider value={{ cart, useUpdateCart }}>
            <Outlet />
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
export default CartProvider