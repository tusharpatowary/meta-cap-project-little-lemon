import images from "../../../assets/images/images"

const Table = ({x, y, available, variant, number, scale = 1, handleTableClick, chosen = false, description = ""}) =>{
    
    const availability = variant + `${available?'':'_unavailable'}`


    return (
        <div className="table" style={{left: `${x}%`, top: `${y}%`}} onClick={()=>handleTableClick(number, available, description)} role="radio" id={`${x}-${y}`}>
            {chosen && <img src={images.selected} style={{position: "absolute", zIndex: -1, width: `${60 * scale}px`}}/>}
            <img src={images[availability]} alt="" className='chair' style={{width: `${50 * scale}px`}}/>
            
            <label className="chair_number" htmlFor={`${x}-${y}`}>{number}</label>
        </div>
    )
}


export default Table
