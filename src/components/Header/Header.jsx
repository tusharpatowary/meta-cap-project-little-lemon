import Nav from "../Nav/Nav";
import './Header.css'
import images from "../../assets/images/images";

const Header = () =>{
    return (
        <header className="header-top">
            <img src={images.logo} alt="logo" />
            <Nav />
        </header>
    )
}


export default Header
