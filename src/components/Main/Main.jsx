import './Main.css'
import Hero from './Hero/Hero'
import Specials from './Specials/Specials'
import Testimonials from './Testimonials/Testimonials'
import About from './About/About'

const Main = () =>{
    return (
    <main>
        {/* Hero */}
        < Hero />

        {/* Specials */}
       < Specials />

        {/* testimonials */}
        < Testimonials />

        {/* about */}
        < About />
    </main>
    )
}

export default Main