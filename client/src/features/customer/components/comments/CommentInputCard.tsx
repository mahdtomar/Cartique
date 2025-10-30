import { useContext, useState } from 'react'
import guestIcon from './../../assets/icons/User.svg'
import { UserContext } from '@/common/context/UserProvider'
import { RatingPicker } from '@/common/components/misc/RatingPicker'
import Request from '@/common/api/axios'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

const CommentInputCard = ({ productId }: { productId: string }) => {
    const queryClient = useQueryClient()
    const user = useContext(UserContext)?.user
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [isPosting, setIsPosting] = useState(false)
    const submit = async () => {
        setIsPosting(true)
        try {
            if (rating === 0 || !review.trim()) {
                toast.error("Please add a rating and a review before submitting.")
                return
            }
            if (!user) {
                return
            }
            const res = await Request("/comments/add", "POST", true, undefined, undefined, {
                productId, rating, review
            })
            toast.success("review posted")
            await queryClient.refetchQueries({
                queryKey: ['product', 'comments', productId],
            })
            setIsPosting(false)
            return res
        } catch (error) {
            setIsPosting(false)
            toast.error("Failed to post review")
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-stretch gap-4 bg-[#FAFAFA] p-4 rounded relative">
            {!user && <div className='absolute top-0 left-0 grid place-items-center w-full h-full '>
                <div className='bg-[rgba(0,0,0,0.2)] absolute w-full h-full blur-sm z-10'></div>
                <Link className="z-20" to="/login"><button className="primary z-20">Login</button></Link>
            </div>}
            <div className="flex justify-between">
                <div className="flex gap-4 items-center justify-start">
                    <img src={user?.image || guestIcon} alt={`${user?.name || 'guest'}'s comment`} className="border rounded-full w-14" />
                    <p className="font-bold">{user?.name || 'guest'}</p>
                    <RatingPicker onChange={setRating} />
                </div>
                <button className="primary" onClick={submit} disabled={isPosting}>{isPosting ? "Pending..." : "Post"}</button>
            </div>
            <textarea name="review" value={review} onChange={e => setReview(e.target.value)} id="user-review" className='resize-none bg-white shadow rounded-md border border-gray-100 focus:outline-0 p-2' rows={3}></textarea>
        </div>
    )
}

export default CommentInputCard