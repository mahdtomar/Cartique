import CommentInputCard from "../comments/CommentInputCard"

const ReviewsSection = ({ productId }: { productId: string }) => {
    return (
        <div className="container flex flex-col items-stretch gap-2">
            <CommentInputCard productId={productId} />
        </div>
    )
}

export default ReviewsSection