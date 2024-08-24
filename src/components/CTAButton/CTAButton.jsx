import "./CTAButton.css"
import { Link } from "react-router-dom"


const CTAButton = ({children, onClick, disabled = false, form, type="button"}) =>{
    return (
            <button className="cta-button" onClick={onClick} disabled={disabled} form={form} type={type}>
                {children}
            </button>
        )
}

export default CTAButton
