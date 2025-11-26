import Request from "@/common/api/axios";
import { UserContext } from "@/common/context/UserProvider";
import type { CartItemType } from "@/types/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
type CartTotalsType = {
    quantity: number;
    price: number;
    products: number;
}
type cartContextTypes = {
    cart: CartItemType[];
    totals: CartTotalsType;
    updateCart: (arg0: string, arg1: number) => void;
    removeItem: (arg0: string) => void
}

const CartContext = createContext<cartContextTypes>({
    cart: [],
    updateCart: () => { },
    removeItem: () => { },
    totals: {
        quantity: 0,
        price: 0,
        products: 0
    }
});

const CartProvider = () => {
    const queryClient = useQueryClient()
    const userId = useContext(UserContext)?.user?.id
    const fetchCart = async () => {
        const res = await Request<CartItemType[]>(`/cart`, "GET", true);
        return res.data
    };
    const [totals, setTotal] = useState<CartTotalsType>({
        quantity: 0,
        price: 0,
        products: 0,
    })
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

    const removeItemMutation = useMutation({
        mutationFn: async (itemId: string) => await Request(`/cart/${itemId}`, "DELETE", true),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] })
        }
    })
    const removeItem = (itemId: string) => removeItemMutation.mutate(itemId)
    console.log("cart : ", cart)

    const calculateTotals = (cart: CartItemType[]) => {
        let quantity = 0
        let price = 0
        let products = 0
        cart.map(cartItem => {
            quantity += cartItem.count
            price += (cartItem.product.finalPrice * cartItem.count)
            products += 1
        })
        setTotal({ quantity, price, products })
    }
    useEffect(() => { calculateTotals(cart) }, [cart])
    return (
        <CartContext.Provider value={{ cart, totals, updateCart, removeItem }}>
            <Outlet />
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
export default CartProvider