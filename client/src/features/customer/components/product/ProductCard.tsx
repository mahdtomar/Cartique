type productCardProps = {
    img: string;
    title: string;
    price: number;
    discount: number;
    finalPrice: number;
    discountType: "fixed" | "percentage";
};
const ProductCard = ({
    img,
    title,
    price,
    discount,
    finalPrice,
    discountType,
}: productCardProps) => {
    return (
        <div>
            <img src={img} alt={title} />
            <p></p>
            <div className="price">
                <div className="discount">
                    <span>
                        {discountType === "fixed"
                            ? (discount / price).toFixed(0)
                            : discount}
                        %
                    </span>
                    <span>{price}</span>
                </div>
                <p>
                    {finalPrice} <span className="uppercase">usd</span>
                </p>
            </div>
            <button className="primary">Add To Cart</button>
        </div>
    );
};

export default ProductCard;
