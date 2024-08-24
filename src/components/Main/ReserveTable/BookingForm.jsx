//icons
import {BiSolidRightArrow, BiSolidLeftArrow, BiTime} from 'react-icons/bi'
import {MdDateRange, MdOutlinePlace, MdPeopleOutline} from 'react-icons/md'
import {LiaGlassCheersSolid} from 'react-icons/lia'

//components
import CTAButton from '../../CTAButton/CTAButton'
import images from '../../../assets/images/images'
import Table from './Table'
import { useState, useEffect, useRef, useReducer} from 'react'
import { fetchAPI } from '../../../mockAPI'
import { Formik, useFormik } from 'formik'
import CustomMessage from '../../CustomMessage/CustomMessage'
import * as Yup from 'yup'


//constants

const MAX_PLAN_WIDTH = 416;
const today = new Date().toISOString().split('T')[0]

const step1ValidationSchema = Yup.object().shape({
    date: Yup.date()
        .min(today, "Please, choose a date from today onwards")
        .default(today)
        .required('A valid date must be selected'),
    time: Yup.string()
        .required('One of the options must be selected'),
    guests: Yup.number()
        .min(1, "The minimum number of guests is 1")
        .max(4, "The maximum number of guests is 4")
        .required('This field is required'),
    occasion: Yup.string()
        .required('You must select a valid occasion'),
  });

//values for booking reducer
const bookingInitialValues = {
    date: today,
    time: undefined,
    guests: 1,
    occasion: "none",
    table: undefined,
    description: ""
}

const bookingReducer = (state, action) =>{
    const newBookingParams = {...state}
    //console.log(newBookingParams)

    switch (action.type) {
        case "changeDate":
            newBookingParams.date = action.value
            return {...newBookingParams}
            break;
    
        case "changeTime":
            newBookingParams.time = action.value
            return {...newBookingParams}
            break;

        case "changeGuests":
            newBookingParams.guests = action.value
            return {...newBookingParams}
            break;

        case "changeOccasion":
            newBookingParams.occasion = action.value
            return {...newBookingParams}
            break;

        case "changeTable":
            newBookingParams.table = action.value
            newBookingParams.description = action.description
            return {...newBookingParams}
            break;

        default:
            break;
    }
}

const AvailableTimes = ({times}) =>{
   
    return (
        <>
        {times && times.length > 0 &&
            times.map((el, id)=>{
                return <option key={id} value={el}>{el}</option>
            })
        }
        </>
    )
}

export const ChooseOptions = ({step, nextStep, bookingParams, dispatchBookingParams, availableTimes = [], dispatchAvailableTimes}) =>{

    const [enableChooseTime, setEnableChooseTime] = useState(false)
    
    const formik = useFormik({
        initialValues: {
            date: bookingParams.date,
            time: bookingParams.time,
            guests: bookingParams.guests,
            occasion: bookingParams.occasion,
        },
        validationSchema: step1ValidationSchema,
        onSubmit: values => {
            //console.log(values)
            nextStep(new Event("mock"), 2)
        },

    })

    async function  handleFetchAPI(date){
            setEnableChooseTime(false)
            const newDate = new Date(date)
            //fetch successfully
            
            await fetchAPI(newDate)
            .then(result => {
                    //console.log(result)
                    dispatchAvailableTimes({value: [...result]})
                    dispatchBookingParams({type: "changeTime", value: result[0]})
                    dispatchBookingParams({type: "changeTable", value: undefined, description: ''})
                })
            //fetch no existent data
            .catch((e)=>{
                    //console.log(e)
                    dispatchAvailableTimes({value: []})
            })
    }

    useEffect(()=>{
        
        if (availableTimes && availableTimes.length > 0)
        {
            setEnableChooseTime(true)

            if (!bookingParams.time)
            {
                dispatchBookingParams({type: "changeTime", value: availableTimes[0]})
                dispatchBookingParams({type: "changeTable", value: undefined, description: ''})
                formik.values.time = availableTimes[0]
            }
        }

    }, [availableTimes])

    return (
        <> 
            <form className="reserve-form" action="" id='optionsForm' onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <h3>How's your reservation?</h3>
                    <p className='step'>step {step}/3</p>
                </div>
                <article className='form-box'>
                    <div className="input-group" role="group">
                        <label htmlFor="date">1. Choose the day of your reservation</label>
                        <input
                        className={`input input-${formik.errors.date && 'error'}`}
                        data-testid={"date"} 
                        type="date" 
                        name="date" 
                        min={today}
                        id="date" 
                        value={bookingParams.date}
                        onChange={(e) => {
                                formik.touched.date = true
                                formik.handleChange(e)
                                handleFetchAPI(e.target.value)
                                dispatchBookingParams({type: "changeDate", value: e.target.value})
                                dispatchBookingParams({type: "changeTable", value: undefined, description: ''}) 
                            }}
                        onBlur={(e)=>{formik.handleBlur(e)}}
                        />
                        {(formik.errors.date && formik.touched.date) && <CustomMessage type='error' testId={'date'}>{formik.errors.date}</CustomMessage>}       
                    </div>
                    
                    <div className="input-group" role="group">
                        <label htmlFor="time">2. Select the time of your reservation</label>
                        <select
                        className={`input input-${formik.errors.time && 'error'}`} 
                        name="" 
                        data-testid={"time"} 
                        id="time"
                        value={bookingParams.time}
                        onChange={
                            (e) => {
                                formik.touched.time = true
                                formik.handleChange(e)
                                dispatchBookingParams({type: "changeTime", value: e.target.value})
                                dispatchBookingParams({type: "changeTable", value: undefined, description: ''})
                            }}
                        onBlur={(e)=>{formik.handleBlur(e)}}
                        disabled={!availableTimes || availableTimes.length == 0 || !enableChooseTime}>
                            <AvailableTimes times={availableTimes}/>
                        </select>
                        {!enableChooseTime && <CustomMessage type='loading' testId={'loading'}>Loading available booking times</CustomMessage>}
                        {(formik.errors.time && formik.touched.time) && <CustomMessage type='error' testId={'time'}>{formik.errors.time}</CustomMessage>}     
                        
                    </div>
                    <div className="input-group" role="group">
                        <label htmlFor="guests">3. How many people will be eating?</label>
                        <input type="number" name="" id="guests" min="1" max="4" placeholder="1"
                        className={`input input-${formik.errors.guests && 'error'}`}
                        data-testid={"guests"} 
                        value={bookingParams.guests}
                        onChange={(e) => {
                            formik.touched.guests = true
                            formik.handleChange(e)
                            dispatchBookingParams({type: "changeGuests", value: e.target.value})
                        }}
                        onBlur={(e)=>{formik.handleBlur(e)}}
                        />
                        {(formik.errors.guests && formik.touched.guests) && <CustomMessage type='error' testId={'guests'}>{formik.errors.guests}</CustomMessage>}   
                    </div>
                    <div className="input-group"  role="group">
                        <label htmlFor="occasion">4. Is there a special occasion?</label>
                        <select 
                        className={`input input-${formik.errors.occasion && 'error'}`}
                        name="" 
                        id="occasion"
                        data-testid={"occasion"} 
                        value={bookingParams.occasion || 'None'}
                        onChange={(e) => {
                            formik.touched.occasion = true
                            formik.handleChange(e)
                            dispatchBookingParams({type: "changeOccasion", value: e.target.value})
                        }}
                        onBlur={(e)=>{formik.handleBlur(e)}}
                        >
                            <option value="None">None</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Anniversary">Anniversary</option>
                        </select>
                        {(formik.errors.occasion && formik.touched.occasion) && <CustomMessage type='error' testId={'occasion'}>{formik.errors.occasion}</CustomMessage>}   
                    </div>
                    
                </article>
            </form>

            <div className="submit-container-right">
                <CTAButton type="submit" form="optionsForm" disabled={!formik.isValid || !enableChooseTime} role="submit">
                    <p>Next Step</p>
                    <BiSolidRightArrow />
                </CTAButton>
            </div>
        </>
    )
}

const tableList = [
    {x: 2, y:1, available: true, variant: "two_table_square", description: "indoors, by the window."},
    {x: 20, y:1, available: false, variant: "two_table_square", description: "indoors, by the window."},
    {x: 37, y:1, available: true, variant: "two_table_square", description: "indoors, by the window."},
    {x: 53, y:1, available: true, variant: "two_table_square", description: "indoors, by the window."},
    
    {x: 10, y:16, available: true, variant: "four_table_square", description: "indoors, at the center."},
    {x: 28, y:16, available: false, variant: "four_table_square", description: "indoors, at the center."},
    {x: 46, y:16, available: true, variant: "four_table_square", description: "indoors, at the center."},
    
    {x: 35, y:45, available: true, variant: "four_table_round", description: "indoors, at the center."},
    {x: 60, y:45, available: true, variant: "four_table_round", description: "indoors, at the center."},
    
    {x: 47, y:62, available: true, variant: "four_table_round", description: "indoors, by the window."},
    {x: 72, y:62, available: false, variant: "four_table_round", description: "indoors, by the window."},
    
    {x: 38, y:82, available: false, variant: "four_table_round", description: "outdoors."},
    {x: 59, y:82, available: false, variant: "four_table_round", description: "outdoors."},
    {x: 80, y:82, available: true, variant: "four_table_round", description: "outdoors"},
]

const ChooseTable = ({step, nextStep, previousStep, bookingParams, dispatchBookingParams}) =>{
    
    const bgRef = useRef()

    const [dimensions, setDimensions] = useState({width: window.innerHeight, height: window.innerHeight})
    const [curTable, setCurTable] = useState({table: undefined, available: false})

        useEffect(()=>{
            if (bookingParams.table != undefined)
            {
                setCurTable({table: bookingParams.table, available: tableList[bookingParams.table-1].available})
            }
        }, [])


      useEffect(() => {
        function handleResize() {
            setDimensions({width: bgRef.current.scrollWidth, height: bgRef.current.scrollHeight})
        }
    
        handleResize()
        window.addEventListener('resize', handleResize)
        return _ => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])
    
      useEffect(()=>{
        if (bgRef)
        {
            const timer = setTimeout(()=>{
                setDimensions({width: bgRef.current.scrollWidth, height: bgRef.current.scrollHeight})
            }, 10)
        
        return () => clearTimeout(timer);
        }
      }, [bgRef])

    const handleTableClick = (number, available, description = "") =>{
        setCurTable({table: number, available: available})
        dispatchBookingParams({type: "changeTable", value: number, description: description})
    }

    return (
        <>
            <form className="reserve-form" action="">
                <div className='row'>
                    <h3>Choose Your table!</h3>
                    <p className='step'>step {step}/3</p>
                </div>
                    <article className='restaurant-form-box' role="group">
                        <fieldset className='table-legend'>
                            <legend>Legend</legend>
                            <b><span>Click on a table to select it</span></b>
                            <br />
                            <br />
                            <ul className='legend-list'>
                                <li>
                                    <img src={images.four_table_square_unavailable} alt="" />
                                    Not Available
                                </li>
                                <li>
                                    <img src={images.four_table_square} alt="" />
                                    Available
                                </li>
                            </ul>
                        </fieldset>
                        <div className='restaurant-plan' style={{background: `url(${images.restaurantPlan}) no-repeat `, backgroundSize: 'contain', height: `${dimensions.width}px`}} ref={bgRef} role="radiogroup">
                            
                            {tableList.map((el, id)=>{
                                return <Table {...el} number={id+1} key={id} scale={dimensions.width/MAX_PLAN_WIDTH} handleTableClick = {handleTableClick} chosen = {id + 1 == curTable.table}/>
                            })}
                        </div>
                </article>
            </form>
            {curTable.table != undefined 
            && (curTable.available? 
                <><b><p>Table No {curTable.table} is available! </p> </b><p> You may proceed with your reservation!</p></>
            : <><b> <p>Table No {curTable.table} is unavailable at this date!</p> </b> <p>Please, choose another table</p></>
            )
            
            }
            <div className="submit-container">
                <CTAButton onClick={previousStep} >
                    <BiSolidLeftArrow />
                    <p>Previous Step</p>
                </CTAButton>
                
                <CTAButton onClick={nextStep} disabled = {!curTable.available}>
                    <p>Next Step</p>
                    <BiSolidRightArrow />
                </CTAButton>
            </div>
        </>
    )
}

const BookingSummary = ({step, nextStep, previousStep, bookingParams, submitForm}) =>{
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(bookingParams.date).toLocaleDateString('en-US', dateOptions)
    const [submittingForm, setSubmittingForm] = useState(false)
    
    return (
        <>  
            <article className="reserve-confirmation" action="">
                <div className='row'>
                    <h3>Reservation Summary</h3>
                    <p className='step'>step {step}/3</p>
                </div>
                <ul className='summary-list'>
                    <li className='summary-item'><MdDateRange /> <b>Date: </b>{date} </li>
                    <li className='summary-item'><BiTime /><b>Time:</b> {bookingParams.time}</li>
                    <li className='summary-item'><MdOutlinePlace /><b>Table:</b> number {bookingParams.table} - {bookingParams.description}</li>
                    <li className='summary-item'><MdPeopleOutline /><b>Number of people:</b> {bookingParams.guests}</li> 
                    <li className='summary-item'><LiaGlassCheersSolid /><b>Occasion:</b> {bookingParams.occasion}</li> 
                </ul>
            </article>

            <p><b>Is everything correct?</b></p>
            <div className="submit-container">  
                <CTAButton onClick={previousStep}>
                    <BiSolidLeftArrow />
                    <p>No! take me back!</p>
                </CTAButton>
                
                <CTAButton onClick={() => {
                    submitForm(bookingParams)
                    setSubmittingForm(true)
                    }} 
                    disabled={submittingForm}>
                    <p>Yes! Confirm Booking!</p>
                    <BiSolidRightArrow />
                </CTAButton>
            </div>

            {submittingForm && <div className='confirmation-message'>
                <CustomMessage type='loading'>Sending your confirmation...</CustomMessage>
            </div>}

           {/*  {submittingForm &&  <CustomMessage type='loading'>Sending your confirmation...</CustomMessage>} */}
        </>
    )
}

const BookingForm = ({step, nextStep, previousStep, availableTimes, dispatchAvailableTimes, submitForm}) =>{

    const [bookingParams, dispatchBookingParams] = useReducer(bookingReducer, bookingInitialValues)
    
    const childProps = {
        step, 
        nextStep, 
        previousStep, 
        bookingParams, 
        dispatchBookingParams, 
        availableTimes, 
        dispatchAvailableTimes
    }
    
    return (
       <>
            
            <article className="reserve-step">
                {step != 4 && <h2>Book Now!</h2>}
                {
                step == 1 
                    ? <ChooseOptions {...childProps}/>
                : step == 2
                    ? <ChooseTable {...childProps}/>
                : step == 3
                    ? <BookingSummary {...childProps} submitForm={submitForm}/>:<></>
                }    
            </article>
       </>
    )
}

export default BookingForm