import { useState, useReducer, useEffect} from "react"
import "./ReserveTable.css"
import BookingForm from "./BookingForm"
import { fetchAPI, submitAPI } from "../../../mockAPI"
import { useNavigate } from "react-router-dom"
import initializeTimes from "./functions/initializeTimes"

export const updateTimes = (state, action) =>{
    //get times from dates
    return [...action.value]
}


const ReserveTable = () =>{

    const navigate = useNavigate()
    const [curStep, setCurStep] = useState(1)
    const [availableTimes, dispatchAvailableTimes] = useReducer(updateTimes)
    
    const nextStepHandler = (e, step) =>{
        e.preventDefault()
        setCurStep(step)
    }

    async function submitForm(formData){
        console.log(formData)
        await submitAPI(formData)
        .then(result => {
            
            navigate('/confirmation')
        })
        //get non existent data
        .catch((e)=>{
            console.log(e)
        })
    }

    //initialize times based on new Date
    useEffect(()=>{
        initializeTimes(dispatchAvailableTimes)
    }, [])

    return (
        <section className="reserve-container">
            {
                <BookingForm 
                step={curStep} 
                nextStep = {(e) => nextStepHandler(e, curStep+1)}
                previousStep = {
                    curStep > 1?
                        (e) => nextStepHandler(e, curStep-1)
                        :undefined
                }
    
                availableTimes={availableTimes}
                dispatchAvailableTimes={dispatchAvailableTimes}
                submitForm={submitForm}
            />
            }  
        </section>
    )
}

export default ReserveTable