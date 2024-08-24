import "./Testimonials.css"
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import images from "../../../assets/images/images"
import TestimonialsCard from "./TestimonialsCard/TestimonialsCard"

const testimonials = [
    {
        rating: 4.8,
        img: images.client1,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileName: 'Karen' 
    },
    {
        rating: 4.9,
        img: images.client2,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileName: 'Joel' 
    },
    {
        rating: 5,
        img: images.client3,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileName: 'Teresa' 
    },
    {
        rating: 5,
        img: images.client4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileName: 'Mark' 
    }
]

const Testimonials = () =>{
    return (
        <section className='testimonials-section'>
            <h2>Testimonials</h2>
            <br />
            <section className='testimonials'>
               {testimonials.map((el, id)=>{
                    return <TestimonialsCard rating={el.rating} img={el.img} comment={el.comment} profileName={el.profileName} key={id}/>
               })}

            </section>
        </section>
    )
}

export default Testimonials