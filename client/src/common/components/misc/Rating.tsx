import fullStar from './../../../assets/icons/FullStar.svg';
import emptyStar from './../../../assets/icons/Empty-Star.svg';
import halfStar from './../../../assets/icons/StarHalf.svg';
import { useRef } from 'react';

/**
 * takes in the total rating of a product and how many ratings has occured and return stars representing the rating in 5  as a `full star` || `half star` || `empty star`  
 * @param  totalRating  Number >= 0 
 * @param  ratingCount  Number >= 0 
 * @returns `star images` depending on the rating  
 */
export function Rating({ totalRating, ratingCount }: { totalRating: number; ratingCount: number }) {
    const containerRef = useRef(null)
    if (totalRating <= 0 || ratingCount <= 0) {
        const emptyStars = Array(5).fill(0);
        return (
            <div className="flex gap-1">
                {emptyStars.map((_, i) => (
                    <img key={`empty-${i}`} src={emptyStar} alt="empty star icon" />
                ))}
            </div>
        );
    }

    const rating = totalRating / ratingCount;
    const isHalf = (rating % 1) >= 0.5;

    const roundedRating = Math.floor(rating);
    const emptyStarsCount = 5 - (roundedRating + Number(isHalf));

    const fullStars = Array(roundedRating).fill(0);
    const emptyStars = Array(emptyStarsCount).fill(0);

    return (
        <div className="flex gap-1" ref={containerRef}>
            {fullStars.map((_, i) => <img key={`full-${i}`} src={fullStar} alt="star icon" />)}
            {isHalf && <img src={halfStar} alt="half star icon" />}
            {emptyStars.map((_, i) => <img key={`empty-${i}`} src={emptyStar} alt="empty star icon" />)}
        </div>
    );
}
