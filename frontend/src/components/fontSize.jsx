import React from "react";
const FontSize = ({textSize, setTextSize}) =>{
    
    return(  
    <div className = "flex flex-row mt-5 justify-center space-x-[10px]">

        <input type="range" 
        min="10" 
        max={100} 
        value={textSize}
        onChange={(e) => setTextSize(Number(e.target.value))}
        style={{
            width: "300px"
        }}
        />

    </div>
    )
}

export default FontSize;