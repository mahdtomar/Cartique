import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation()
    return (
        <div className="border rounded flex flex-col gap-2 p-2 w-full sm:w-[200px] md:w-[200px] lg:w-[210px] hover:shadow">
            <div className="flex-1  flex flex-col justify-between gap-2" onClick={() => navigate(`/product/${id}`)}>
                <div>
                    <div className="aspect-[218/233] overflow-hidden rounded">
                        <img className="object-fill block" src={img} alt={title} loading="lazy" />
                    </div>
                    <p className="line-clamp-3">{title}</p>
                </div>
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
            <button className="primary" >{t("addToCart")}</button>
        </div>
    );
};

export default ProductCard;
