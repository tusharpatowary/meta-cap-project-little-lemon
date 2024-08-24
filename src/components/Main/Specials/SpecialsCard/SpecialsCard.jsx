import {MdDeliveryDining} from 'react-icons/md'
import "./SpecialsCard.css"

const SpecialsCard = ({img, name, price, description}) =>{
    return (
        <article className='special-card'>
            <img src={img} alt="" />
            <div className='description'>
                <div className='description-row-spaced'>
                    <h4>{name}</h4>
                    <span className='secondary'>{parseFloat(price).toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span>
                </div>
                <p>{description}</p>
                <div className='description-row'>
                    <h4>Order for delivery</h4>
                    <MdDeliveryDining size={24}/>
                </div>
            </div>
        </article>
    )
}

export default SpecialsCard
