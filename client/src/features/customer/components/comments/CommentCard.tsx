import { Rating } from "@/common/components/misc/Rating";

interface Comment {
    userName: string;
    image: string;
    rating: number;
    review: string;
    date: Date;
}
const CommentCard = ({ comment }: { comment: Comment }) => {
    return (
        <div className="flex flex-col items-stretch gap-4">
            <div className="flex gap-4">
                <img src={comment.image} alt={`${comment.userName}'s comment`} className="border rounded-full w-14" />
                <p className="font-bold">{comment.userName}</p>
                <Rating totalRating={comment.rating} ratingCount={1} />
            </div>
            <p className="line-clamp-1">{comment.review}</p>
        </div>
    )
}

export default CommentCard