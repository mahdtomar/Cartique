import { Rating } from "@/common/components/misc/Rating"
import type { Product } from "@/types/Store"
import HeartIcon from "../../assets/icon-components/HeartIcon"
const Header = ({ product }: { product: Product }) => {
    const discountType = 'fixed'

    return (
        <header className="mt-5">
            <div className="container flex max-h-[450px]">
                <div className="wrapper w-full flex flex-col items-stretch justify-between">
                    <div>
                        <h1 className="text-4xl mb-4 line-clamp-3">{product.title}</h1>
                        <p className="w-full line-clamp-5">{product.briefDescription}</p>
                    </div>
                    <div className="flex flex-col items-stretch gap-4 w-fit">
                        <div className="flex justify-between gap-4 items-center">
                            <div className="price flex gap-1">
                                <div className="discount">
                                    <span className="font-bold text-green-500">
                                        {discountType === "fixed"
                                            ? ((product.discountPercentage * product.basePrice) / product.basePrice).toFixed(0)
                                            : product.discountPercentage}
                                        %
                                    </span>
                                    <span className="line-through text-gray-500">{product.basePrice}</span>
                                </div>
                                <p className="text-2xl">
                                    <span className="font-bold">{product.finalPrice}</span> <span className="uppercase">EGP</span>
                                </p>
                            </div>
                            <Rating totalRating={product.totalRating} ratingCount={product.ratingCount} />
                        </div>
                        <div className="flex gap-4 items-center h-[75px]">
                            <button className="primary h-full px-25 text-2xl w-65">Add To Cart</button>
                            <button className="shadow rounded border border-gray-200 h-full grid place-items-center pointer p-2 aspect-square">
                                <HeartIcon className="pointer" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="image-container w-full flex justify-end">
                    <img className="object-cover aspect-square w-[550px] rounded-xl" src={product.cloudinary_url} alt={product.title} loading="lazy" />
                </div>
            </div>
        </header>
    )
}

export default Header