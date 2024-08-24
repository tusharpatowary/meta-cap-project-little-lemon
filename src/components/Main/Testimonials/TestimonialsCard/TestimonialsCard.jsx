import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const TestimonialsCard = ({rating, img, comment, profileName}) =>{
    
    const drawRatingStars = () =>{
        let clampedRating = Math.min(Math.max(rating, 0), 5)
        clampedRating = Math.round(clampedRating)
        const stars = []

        for (let i = 1; i < 6; i++) {
            i <= clampedRating? stars.push(<AiFillStar size={24} key={i}/>) : stars.push(<AiOutlineStar size={24} key={i}/>)
        }

        return stars
    }
    
    return (
        <article className='testimonial'>
            <div className='rating'>
                {
                    drawRatingStars()
                }
                <p>{parseFloat(rating).toFixed(1)} out of 5!</p>
            </div>
            <img src={img} alt="testimonial-profile" />
            <p>"{comment}"</p>
            <p className='profile'>{profileName}</p>
        </article>
    )

}

export default TestimonialsCard