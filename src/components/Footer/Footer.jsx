import './Footer.css'

import {AiFillFacebook, AiFillInstagram, AiFillTwitterSquare} from 'react-icons/ai'
import images from '../../assets/images/images'
import { Link } from 'react-router-dom'

const Footer = () =>{
    return (
    <footer>
        <img src={images.logo} alt="" className="logo"/>
        <section className='links'>
            <nav className='nav-section'>
                <h4>Navigation</h4>
                <ul>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/'}>About</Link>
                    <Link to={'/'}>Menu</Link>
                    <Link to={'/'}>Reservations</Link>
                    <Link to={'/'}>Order Online</Link>
                    <Link to={'/'}>Login</Link>
                </ul>
            </nav>
            <section className='contact-section'>
                <h4>Contact</h4>
                <ul>
                    <li>Address</li>
                    <li>Phone Number</li>
                    <li>Email</li>
                </ul>
            </section>
            <section className='socials-section'>
                <h4>Social Media</h4>
                <ul>
                    <Link to={'/'}><AiFillFacebook size={24}/>Facebook</Link>
                    <Link to={'/'}><AiFillInstagram size={24}/>Instagram</Link>
                    <Link to={'/'}><AiFillTwitterSquare size={24}/>Twitter</Link>
                </ul>
            </section>  
            
        </section>
    </footer>)
}



export default Footer

