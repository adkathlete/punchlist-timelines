import React from "react";

//Icon for Percentiles so that we dont use %'s (since %'s are the source of basically all the confusion')
const PercentileIcon =(props)=>{
  return(
    <div className={`flex flex-col flex-shink-0 items-center justify-center w-4 h-4`} style={{color:`${props.textColor?props.textColor:"#ffffff"}`}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" strokeWidth={`${props.strokeWidth?String(props.strokeWidth):"1"}`} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M1 10 V5.5 M3 10 V3 M5 10 V1.25 M7 10 V3 M9 10 V5" />
      </svg>
    </div>
  )
}

export default PercentileIcon;
