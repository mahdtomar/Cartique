import { Rating } from "@/common/components/misc/Rating";
import type { Comment } from "@/types/Store";
import guestIcon from './../../assets/icons/User.svg'
import { Link } from "react-router-dom";

const CommentCard = ({ comment }: { comment: Comment }) => {
    return (
        <div className="flex flex-col items-stretch gap-4 bg-[#FAFAFA] p-4 rounded relative">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center justify-start">
                    <img src={comment.user.avatar || guestIcon} alt={`${comment.user.name}'s comment`} className="border rounded-full w-14" />
                    <p className="font-bold">{comment.user.name}</p>
                    <Rating totalRating={comment.rating} ratingCount={1} />
                </div>
                <button className="primary"><Link to={`comments/${comment._id}`}>read</Link></button>
            </div>
            <div className="shadow rounded-md border border-gray-100 p-2">
                <span className="line-clamp-3">{comment.review}</span>
            </div>
        </div>
    )
}

export default CommentCard