import "./Specials.css"
import images from "../../../assets/images/images"
import CTAButton from "../../CTAButton/CTAButton"
import SpecialsCard from "./SpecialsCard/SpecialsCard"

const specials = [
    {
        name: 'Bruschetta',
        price: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur tortor nec dapibus imperdiet',
        img: images.special1,
    },
    {
        name: 'Greek Salad',
        price: 12,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur tortor nec dapibus imperdiet',
        img: images.special2,
    },
    {
        name: 'Lemon Dessert',
        price: 9,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur tortor nec dapibus imperdiet',
        img: images.special3,
    },
]

const Specials = () =>{
    return (
        <article className='specials-section'>
            <section className='title'>
                <h2>This weeks specials!</h2>
                <CTAButton>Order Online</CTAButton>
            </section>

            <section className='specials'>
                {specials.map((el, id)=>{
                    return (
                        <SpecialsCard 
                        name={el.name} 
                        price={el.price} 
                        description={el.description}
                        img={el.img}
                        key={id}
                        />
                    )
                })}
            </section>
        </article>
    )
}

export default Specials