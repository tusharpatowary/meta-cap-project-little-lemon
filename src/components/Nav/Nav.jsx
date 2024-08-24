import './Nav.css'
import useMediaQuery from '../../Hooks/UseMediaQuery'
import {HiMenu} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'



const navItems = 
<ul>
    
    <li><a href={''}>Home</a></li>
    <li><a href={''}>About</a></li>
    <li><a href={''}>Menu</a></li>
    <li><a href={''}>Reservations</a></li>
    <li><a href={''}>Order Online</a></li>
    <li><a href={''}>Login</a></li>
</ul>

const Nav = () =>{
    const isMobile = useMediaQuery('(max-width: 1279px)');
    const [menuOpen, setMenuOpen] = useState(false)

    return(
    <nav>
            {
            isMobile?   
                <>
                    {menuOpen && <div className='background' onClick={(e)=>setMenuOpen(false)}></div>}
                    <article className='modal-box'>       
                        { menuOpen && <NavItems /> }
                        {menuOpen? 
                        <AiOutlineClose size={36} onClick={(e)=>setMenuOpen(false)}/>
                        :<HiMenu size={36} onClick={(e)=>setMenuOpen(true)}/>}
                    </article>
                </>
            : <NavItems />
        }   
    </nav>
    )
}

const NavItems = () =>{
    return (
        <ul className='nav-items'>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>About</Link>
            <Link to={'/'}>Menu</Link>
            <Link to={'/'}>Reservations</Link>
            <Link to={'/'}>Order Online</Link>
            <Link to={'/'}>Login</Link>
        </ul>
    )
}

export default Nav