import { fireEvent, render, screen, waitFor, act} from '@testing-library/react'

import BookingForm from '../BookingForm'
import {updateTimes } from '../ReserveTable.jsx';
import initializeTimes from '../functions/initializeTimes';
import { ChooseOptions } from '../BookingForm';

//mocking the updateTimes function
const availableTimesByDate = {
    '1': ['10:00', '11:00', '12:00']
  };

  
const today = new Date().toISOString().split('T')[0]

describe('Checks if renders are showing the correct elements, and if data fetching is correct', ()=>{

    test('Renders and validates the BookingForm heading', ()=>{
        render(<BookingForm />);
        const headingElement = screen.getByText("Book Now!");
        expect(headingElement).toBeInTheDocument;
    })
    
    test('Checks if the initializeTimes function returns an non empty array', async ()=>{
        const mock = jest.fn((a)=>console.log(a))
        const returnValue = await initializeTimes(mock)
        expect(returnValue).toBeInstanceOf(Array)
        expect(returnValue).not.toHaveLength(0)
    })

    test('Checks if the updateTimes function will return the same state', ()=>{
        const timeArray = updateTimes(null, {value: ['10:00', '11:00', '12:00']})
        expect(timeArray).toMatchObject(availableTimesByDate['1'])
    })
})


describe('Checks for changes in the user form, and form state changes', ()=>{
    
    const mock = jest.fn()
    
    const bookingParams = {
        date: '2030-01-01',
        time: '7:00PM',
        guests: 1,
        occasion: "none",
        table: undefined,
        description: ""
    }

    test('Checks if the inputs have the correct attributes', ()=>{
        const { getByLabelText, getByTestId } = render(<ChooseOptions bookingParams={{date: today, occasion: 'None'}}/>)

        const dateInput = screen.getByTestId('date')
        const timeInput = screen.getByTestId('time')
        const peopleInput = screen.getByTestId('guests')

        expect(dateInput.getAttribute('min')).toBe(today)        //check if minimum date is today
        expect(timeInput.getAttribute('disabled')).toBeFalsy()   //activates timeInput after fetching
        expect(peopleInput.getAttribute('min')).toBe("1")        //checks minimum number of guests
        expect(peopleInput.getAttribute('max')).toBe("4")        //checks maximum number of guests
        expect(screen.getByText('None')).toBeInTheDocument()     //checks if default value for Occasion is "None"
    })

    test('Checks if the user can submit the form, provided all the inputs are correct', async () =>{
        
        const { getByLabelText, getByTestId } = render(<ChooseOptions 
            bookingParams={bookingParams} 
            dispatchBookingParams = {mock} 
            step = {1} 
            nextStep = {mock} 
            availableTimes = {["7:00PM"]}
            dispatchAvailableTimes = {mock}
            />)
        
        const submit = screen.getByRole('button')
        const dateInput = screen.getByTestId('date')
        
        await waitFor(()=>{
            expect(submit.disabled).toBeFalsy()
        })  
    })

    test('Checks if an error is shown when selecting invalid dates. Checks if the user cannot submit form', async () =>{
        
        const { getByLabelText, getByTestId } = render(<ChooseOptions 
            bookingParams={bookingParams} 
            dispatchBookingParams = {mock} 
            step = {1} 
            nextStep = {mock} 
            availableTimes = {["7:00"]}
            dispatchAvailableTimes = {mock}
            />)
        
        const submit = screen.getByRole('button')
        const dateInput = screen.getByTestId('date')
        //At the start, the submit button must be enabled
        //expect(submit.disabled).toBeFalsy();


        act(() => {
            fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
            fireEvent.blur(dateInput);
          });

        await waitFor(()=>{
            expect(getByTestId("dateError")).not.toBe(null);
            expect(submit.disabled).toBeTruthy()
        })
    })

    test('Checks if theres a loading message when fetching available times data. Checks if the user cannot submit form', async () =>{
        
        const { getByLabelText, getByTestId } = render(<ChooseOptions 
            bookingParams={bookingParams} 
            dispatchBookingParams = {mock} 
            step = {1} 
            nextStep = {mock} 
            availableTimes = {["7:00"]}
            dispatchAvailableTimes = {mock}
            />)
        
        const submit = screen.getByRole('button')
        const dateInput = screen.getByTestId('date')

        act(() => {
            fireEvent.change(dateInput, { target: { value: '2025-01-01' } });
            fireEvent.blur(dateInput);
          });
        
        await waitFor(()=>{
            expect(getByTestId("loadingError")).not.toBe(null);
            expect(submit.disabled).toBeTruthy()
        })  
    })

    test('Checks if the user cannot submit form when theres no available times', async () =>{
        
        const { getByLabelText, getByTestId } = render(<ChooseOptions 
            bookingParams={bookingParams} 
            dispatchBookingParams = {mock} 
            step = {1} 
            nextStep = {mock} 
            availableTimes = {[]}
            dispatchAvailableTimes = {mock}
            />)
        
        const submit = screen.getByRole('button')
        const dateInput = screen.getByTestId('date')
        
        await waitFor(()=>{
            expect(getByTestId("loadingError")).not.toBe(null);
            expect(submit.disabled).toBeTruthy()
        })  
    })

    test('Checks if the user cannot submit the form if the number of guests is out of the 1-4 range', async () =>{
        
        const { getByLabelText, getByTestId } = render(<ChooseOptions 
            bookingParams={bookingParams} 
            dispatchBookingParams = {mock} 
            step = {1} 
            nextStep = {mock} 
            availableTimes = {["7:00pm"]}
            dispatchAvailableTimes = {mock}
            />)
        
        const submit = screen.getByRole('button')
        const peopleInput = screen.getByTestId('guests')
        
        act(() => {
            fireEvent.change(peopleInput, { target: { value: '0' } });
            fireEvent.blur(peopleInput);
          });

        await waitFor(()=>{
            expect(getByTestId("guestsError")).not.toBe(null);
            expect(submit.disabled).toBeTruthy()
        })  

        act(() => {
            fireEvent.change(peopleInput, { target: { value: '5' } });
            fireEvent.blur(peopleInput);
          });

        await waitFor(()=>{
            expect(getByTestId("guestsError")).not.toBe(null);
            expect(submit.disabled).toBeTruthy()
        })  

        act(() => {
            fireEvent.change(peopleInput, { target: { value: 3 } });
            fireEvent.blur(peopleInput);
          });

        await waitFor(()=>{
            expect(submit.disabled).toBeFalsy()
        })  



    })
})





 



