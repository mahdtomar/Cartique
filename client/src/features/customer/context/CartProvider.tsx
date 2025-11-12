import Request from "@/common/api/axios";
import { UserContext } from "@/common/context/UserProvider";
import type { CartItemType } from "@/types/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
type cartContextTypes = { cart: CartItemType[]; updateCart: (arg0: string, arg1: number) => void }
const CartContext = createContext<cartContextTypes>({
    cart: [],
    updateCart: () => { }
});

const CartProvider = () => {
    const queryClient = useQueryClient()
    const userId = useContext(UserContext)?.user?.id
    const fetchCart = async () => {
        const res = await Request<CartItemType[]>(`/cart`, "GET", true);
        return res.data
    };
    const { data: cart = [] } = useQuery({
        queryKey: ['cart', userId],
        queryFn: fetchCart,
        enabled: !!userId,
    });
    const updateCartMutation = useMutation({
        mutationFn: async ({ productId, count }: { productId: string, count: number }) =>
            (await Request("/cart", "PUT", true, undefined, { productId, count })).data,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["cart", userId] })
        },
    })

    const updateCart = (productId: string, count: number) => {
        updateCartMutation.mutate({ productId, count })
    }
    console.log("cart : ", cart)
    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            <Outlet />
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
export default CartProvider