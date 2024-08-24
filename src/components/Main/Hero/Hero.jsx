import images from "../../../assets/images/images";
import './Hero.css'
import CTAButton from "../../CTAButton/CTAButton";
import { Link } from "react-router-dom";


const Hero = () =>{
    return (
        <article className='hero-section'>
           <section className='hero-description'>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur tortor nec dapibus imperdiet. Fusce vel neque nec magna pharetra ultricies. </p>
                <Link to={'/reservation'}> <CTAButton>Reserve a Table</CTAButton> </Link>
           </section>
            <img className='hero-img' src={images.restaurant} alt="Little Lemon Hero Image" />
        </article>
    )
}


export default Hero;
