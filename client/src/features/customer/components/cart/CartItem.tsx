import Counter from "@/common/components/misc/Counter"
import type { CartItemType } from "@/types/Store"
import { useState } from "react"

const CartItem = ({ item }: { item: CartItemType }) => {
    const [count, setCount] = useState(item.count)
    const discountType = "fixed"
    return (
        <div className="border rounded p-2 flex gap-4 h-[260px]">
            <img className="w-1/4 aspect-square object-cover rounded shadow" src={item.product.cloudinary_url} alt={item.product.title} />
            <div className="flex flex-col gap-4 justify-between items-stretch">
                <div>
                    <div className="flex justify-between">
                        <span className="font-bold text-2xl line-clamp-1">{item.product.title}</span>
                    </div>
                    <p className="line-clamp-4">{item.product.briefDescription}</p>
                </div>
                <div>
                    <div className="price flex gap-1">
                        <div className="discount">
                            <span className="font-bold text-green-500">
                                {discountType === "fixed"
                                    ? ((item.product.discountPercentage * item.product.basePrice) / item.product.basePrice).toFixed(0)
                                    : item.product.discountPercentage}
                                %
                            </span>
                            <span className="line-through text-gray-500">{item.product.basePrice}</span>
                        </div>
                        <p className="text-2xl">
                            <span className="font-bold">{item.product.finalPrice}</span> <span className="uppercase">EGP</span>
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <Counter value={count} setValue={setCount} min={1} className="min-w-26 justify-between" />
                        <button className="primary">Product Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem