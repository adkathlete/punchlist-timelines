import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

const SecondaryActionButton = (props)=>{
  //props:{variant:[TYPE], onClick:callBack}

  const [click,setClick]=useState(false);

  //Click the button
  useEffect(()=>{
    if(click){
      let timer=setTimeout(()=>setClick(false), 150);

      return ()=>clearInterval(timer);
    }
  },[click]);

  //Share workflow
  if(props.variant==='SHARE'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 w-14 h-14 rounded-full shadow-xl z-40`} style={{backgroundColor:"#a78bfa", borderColor:"#6d28d9"}} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //UnShare workflow
  if(props.variant==='UNSHARE'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 w-14 h-14 rounded-full shadow-xl z-40`} style={{backgroundColor:"#a78bfa", borderColor:"#6d28d9"}} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Save new variant
  if(props.variant==='DELETE'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 bg-red-400 ${props.highlighted?("border-c2"):("border-red-700")} w-14 h-14 rounded-full shadow-xl z-40`} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Create new variant
  if(props.variant==='GROUP'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 ${props.highlighted?("border-c2"):("border-c2-dark")} w-14 h-14 rounded-full shadow-xl z-40`} style={{backgroundColor:"#38bdf8"}} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Create new variant
  if(props.variant==='ZOOM-IN'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
        <button className={`flex flex-col justify-center items-center text-c2-highlight border-2 ${props.highlighted?("border-c2"):("border-gray-800 bg-gray-900")} ${click?"w-12 h-12":"w-14 h-14"} rounded-full shadow-xl z-40  focus:outline-none focus:ring-none transition-all duration-100 ease-in-out`} style={{transform:click?'rotate(-1deg)':""}} onClick={()=>{props.onClick(); setClick(true);}}>
            <svg className={`h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Left Arrow
  if(props.variant==='LEFT'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 ${props.highlighted?("border-c2"):("border-c2-dark")} w-14 h-14 rounded-full shadow-xl z-40`} style={{backgroundColor:"#38bdf8"}} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Save new variant
  if(props.variant==='SAVE'){
    return(
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-white border-4 ${props.highlighted?("border-c2"):("border-green-600")} w-14 h-14 rounded-full shadow-xl z-40`} style={{backgroundColor:"#34d399"}} onClick={()=>props.onClick()}>
            <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  //Cancle new variant
  if(props.variant==='CANCEL'){
    return (
      <div className={`absolute bottom-6 left-0 flex flex-row items-center justify-center w-full h-16 ${props.highlighted?("animate-pulse"):("")}`}>
        <div className={`flex flex-row h-16 items-center justify-start ${props.isMobile?("px-4"):("")}`} style={{width:`${props.isMobile?("100%"):("90%")}`}}>
          <button className={`flex flex-col justify-center items-center text-c2-highlight border-2 ${props.highlighted?("border-c2"):("border-gray-800 bg-gray-900")} ${click?"w-12 h-12":"w-14 h-14"} rounded-full shadow-xl z-40  focus:outline-none focus:ring-none transition-all duration-100 ease-in-out`} style={{transform:click?'rotate(-1deg)':""}} onClick={()=>{props.onClick(); setClick(true);}}>
            <svg className={`h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return(<div/>);
}

export default SecondaryActionButton
