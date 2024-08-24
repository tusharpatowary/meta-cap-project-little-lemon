import "./CustomMessage.css"
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const types = {
    error: {
        icon: <RiErrorWarningLine size={20}/>
    },
    default: {
        icon: undefined
    },
    loading: {
        icon: <AiOutlineLoading3Quarters size={20}/>
    }
}



const CustomMessage = ({type = 'default', children, testId='default'}) =>{ 
    
    const selectedType = types[type] || types.default

    const icon = selectedType.icon

    //console.log(selectedType)

    return (
        <span className={`${type}-message`} data-testid={`${testId}Error`}>
            {icon}
            {children}
        </span>
    )
}

export default CustomMessage
