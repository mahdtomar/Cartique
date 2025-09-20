import { useNavigate } from "react-router-dom";

type productCardProps = {
    id: string;
    img: string;
    title: string;
    price: number;
    discount: number;
    finalPrice: number;
    discountType: "fixed" | "percentage";
};


const ProductCard = ({
    id,
    img,
    title,
    price,
    discount,
    finalPrice,
    discountType,
}: productCardProps) => {
    const navigate = useNavigate()
    return (
        <div className="border rounded flex flex-col gap-2 p-2 w-[160px] sm:w-[200px] lg:[238px] hover:shadow">
            <div className="flex-1  flex flex-col justify-between gap-2" onClick={() => navigate(`/product/${id}`)}>
                <div className="aspect-[218/233] overflow-hidden rounded">
                    <img className="object-fill block" src={img} alt={title} loading="lazy" />
                </div>
                <p className="line-clamp-3">{title}</p>
                <div className="price flex gap-1">
                    <div className="discount text-sm">
                        <span className="font-bold text-green-500">
                            {discountType === "fixed"
                                ? (discount / price).toFixed(0)
                                : discount}
                            %
                        </span>
                        <span className="line-through text-gray-500">{price}</span>
                    </div>
                    <p>
                        <span className="font-bold">{finalPrice}</span> <span className="uppercase">EGP</span>
                    </p>
                </div>
            </div>
            <button className="primary">Add To Cart</button>
        </div>
    );
};

export default ProductCard;
