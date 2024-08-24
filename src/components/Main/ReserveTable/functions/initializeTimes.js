import { fetchAPI } from "../../../../mockAPI"


export default async function initializeTimes(dispatchAvailableTimes = () => null){
    const today = new Date()
    today.setDate(today.getDate() -1)

    const data = await fetchAPI(today)
    dispatchAvailableTimes({value: [...data]})
    
    return new Promise((resolve, reject) => {
        if(data.length > 0){
            resolve([...data])
        }
        else{
            reject(new Error('No available times for the selected date.'));
        }
    }
    )
}
