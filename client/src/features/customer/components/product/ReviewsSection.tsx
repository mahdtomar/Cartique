import Request from "@/common/api/axios"
import CommentCard from "../comments/CommentCard"
import CommentInputCard from "../comments/CommentInputCard"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/common/components/misc/Spinner"
import { useContext } from "react"
import { UserContext } from "@/common/context/UserProvider"
import type { Comment } from "@/types/Store"

const ReviewsSection = ({ productId }: { productId: string }) => {
    const getComments = async () => {
        const res = await Request<Comment[]>(`/products/${productId}/comments`, "GET", false)
        return res.data
    }
    const user = useContext(UserContext)?.user
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['product', 'comments', productId],
        queryFn: getComments
    })
    if (isLoading) {
        return <Spinner className="w-15" />
    }
    const userComment = () => {
        if (isLoading || !user) {
            return <CommentInputCard productId={productId} />
        }
        const userComment = comments.find(comments => comments.user._id === user.id)
        return userComment ? <CommentCard key={userComment._id} comment={userComment} /> : <CommentInputCard productId={productId} />
    }
    return (
        <div className="container flex flex-col items-stretch gap-2">
            {userComment()}
            {comments?.filter((comment) => comment.user._id !== user?.id)
                .map(comment => <CommentCard key={comment._id} comment={comment} />)}
        </div>
    )
}

export default ReviewsSection