import { BsCheckCircle } from "react-icons/bs"
import { Link } from "react-router-dom"



const ConfirmedBooking = () =>{
    return (
        <>
            <section className="booking-confirmation">
                <p>Your table has been successfully booked</p>
                <BsCheckCircle size={64}/>
                <p>You should be receiving an email confirmation shortly</p>
                <Link to={'/'} className='link'><b>back to home screen</b></Link>
            </section>
        </>
    )
}

export default ConfirmedBooking

