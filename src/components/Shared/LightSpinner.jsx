import React from "react";

const LightSpinner = (props)=>{
  return(
    <div className={`flex flex-col overflow-hidden ${props.variant}`}>
      {/*'Border' Boudary*/}
      <div className={`relative flex flex-col h-24 w-24 items-center justify-start ${props.borderHeight?(String("border-"+props.borderHeight)):("border-4")} border-transparent ${props.variant} overflow-visible`}>
        {/*Spinner*/}
        <div className='flex flex-col w-full h-1/2 top-0 left-0 justify-end items-center overflow-visible'>
          <div className={`flex flex-col items-center justify-end ${props.highlightWidth?(String("h-"+props.highlightWidth)):("h-8")} animate-spin`} style={{width:"200%", backgroundColor:`${props.color}`}}>
          </div>
        </div>

        {/*Center Element In the border*/}
        <div className={`absolute flex flex-col w-full h-full items-center justify-center bg-white shadow-md ${props.variant}`}>
          <span className='text-5xl animate-pulse mb-1'>✨</span>
          <span className='text-md text-shades-light'>Loading</span>
        </div>

      </div>
    </div>
  )
}

export default LightSpinner;
