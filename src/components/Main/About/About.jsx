import images from "../../../assets/images/images"
import "./About.css"

const About = () =>{
    return (
        <section className='about-section'>
           <div className='about-content'>
                <section className='description'>
                    <h3>Little Lemon</h3>
                    <h4>Chicago</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur tortor nec dapibus imperdiet. 
                        Fusce vel neque nec magna pharetra ultricies. </p>
                </section>
                <img src={images.marioadrian} alt="profile-pictures"/>
           </div>
        </section>
    )
}


export default About
