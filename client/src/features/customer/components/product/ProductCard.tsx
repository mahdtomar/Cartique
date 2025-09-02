type productCardProps = {
    id:string;
    img: string;
    title: string;
    price: number;
    discount: number;
    finalPrice: number;
    discountType: "fixed" | "percentage";
};
// {
//         _id: this._id,
//         title: this.title,
//         description: this.description,
//         briefDescription: this.briefDescription,
//         basePrice: this.basePrice,
//         discountPercentage: this.discountPercentage,
//         finalPrice: this.finalPrice,
//         image: this.image,
//         cloudinary_url: this.cloudinary_url,
//         rating: this.rating,
//         ratingCount: this.ratingCount,
//         totalRating: this.totalRating,
//         category: this.category,
//         createdAt: this.createdAt,
//         updatedAt: this.updatedAt,
//     };
const ProductCard = ({
    id,
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
                    {finalPrice} <span className="uppercase">EGP</span>
                </p>
            </div>
            <button className="primary">Add To Cart</button>
        </div>
    );
};

export default ProductCard;
