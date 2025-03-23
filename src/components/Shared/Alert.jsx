import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';


const Alert=(props)=>{
  //---------------------------------STATE--------------------------------------
  const [iconPath,setIconPath] = useState();
  const [fadeOut,setFadeOut] = useState();

  //---------------------------------EFFECTS------------------------------------
  useLayoutEffect(()=>{
    switch(props.variant){
      case 'alert':
        setIconPath("M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z");
        break;

      case 'info':
        setIconPath("M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z");
        break;

      case 'success':
        setIconPath("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z");
        break;

      case 'warning':
        setIconPath("M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01");
        break;

      case 'error':
        setIconPath("M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z");
        break;

      default:
        break;
    }
  },[props]);

  useEffect(()=>{
    if(props.onClose && props.autoCloseDelayMS){
      //Create an interval
      setTimeout(()=>{
        props.onClose()
      },props.autoCloseDelayMS);
    }
  },[props.autoCloseDelayMS]);

  //------------------------------EVENT HANDLERS--------------------------------
  //---------------------------------COMPONENT----------------------------------
  switch(props.variant){
    case 'alert':
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-alert-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center text-alert-border" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-alert-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-alert-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-alert-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
      );

    case 'info':
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-info-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-info-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-info-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-info-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
      );

    case 'success':
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-success-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-success-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-success-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-success-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
    );

    case 'warning':
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-warning-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-warning-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-warning-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-warning-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
    );

    case 'error':
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-error-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-error-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-error-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-error-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
      );

    default:
      return(
        <div className={`absolute top-0 left-0 w-full p-2`} style={{zIndex:100}}>
          <div className="relative flex flex-row mt-2 px-2 pt-2 rounded-l-2xl rounded-r-lg border-l-4 border-r-2 border-alert-border overflow-hidden" style={{zIndex:100}}>
            {/*Alert Icon*/}
            <div className="flex flex-col w-14 h-full items-center justify-center" style={{zIndex:100}}>
              <svg className={`h-8 w-8 text-alert-border`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth="1.5" d={iconPath}/>
              </svg>
            </div>
            {/*Alert Text*/}
            <div className='flex flex-col w-full pb-2 items-start justify-start' style={{zIndex:100}}>
              <div className='text-3xl font-bold text-alert-border'>
                {props.message}
              </div>
              <div className={`text-xl text-white text-light overflow-y-scroll`} style={{maxHeight:"20rem"}}>
                {props.detail}
              </div>
            </div>

            {/*Close button*/}
            <div className="absolute top-2 right-3" style={{zIndex:100}}>
              <button type="button" onClick={props.onClose} className={`inline-flex rounded-md p-0.5 text-alert-border hover:bg-gray-800 focus:outline-none focus:ring-none`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/*Shading*/}
            <div className="absolute top-0 left-0 h-full w-full bg-black" style={{zIndex:99, opacity:"90%"}}>
            </div>
          </div>
        </div>
      );
  }
}
//---------------------------------COMPONENTS-----------------------------------

export default Alert;
