import React from "react";
const FontSize = ({textSize}) =>{
    return(  
    <div className = "flex flex-row mt-5 justify-center space-x-[10px]">
        <button 
        className="bg-background-gray text-beak-orange rounded-lg py-2 px-4"
        onClick={()=>{
            if(textSize<100){
                textSize = textSize + 1;
                console.log(textSize)
            }
            }
        }>    
        +   
        </button>
        <button
        className="bg-background-gray text-beak-orange rounded-lg py-2 px-4"
        onClick={()=>{
            if(textSize>1){
                textSize = textSize - 1;
                console.log(textSize)
            }
            }
        }>    
        -   
        </button>
    </div>
    )
}

export default FontSize;