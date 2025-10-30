import { Rating } from "@/common/components/misc/Rating";
import type { Comment } from "@/types/Store";
import guestIcon from './../../assets/icons/User.svg'

const CommentCard = ({ comment }: { comment: Comment }) => {
    return (
        <div className="flex flex-col items-stretch gap-4">
            <div className="flex gap-4">
                <img src={comment.user.avatar || guestIcon} alt={`${comment.user.name}'s comment`} className="border rounded-full w-14" />
                <p className="font-bold">{comment.user.name}</p>
                <Rating totalRating={comment.rating} ratingCount={1} />
            </div>
            <p className="line-clamp-3">{comment.review}</p>
        </div>
    )
}

export default CommentCard