import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

/* Place the curtain inside a relative container
<div className='relative flex flex-col h-full w-4/5 items-center justify-center'>
  <Curtain direction={"UP"} curtainColor={"#fff"}/>
  <div className='rouned-xl border shadow-md rounded-2xl bg-blue-700 w-full h-36'>
  </div>
</div>
*/

const Curtain = (props) =>{
  const [annimate,setAnnimate] = useState(false);

  //Raise or wipe the curtain
  useEffect(()=>{
    let timer = setTimeout(()=>{
    setAnnimate(true);
    },1000);

  return clearInterval(timer);
  },[]);

  if(props.direction==='LEFT'){
    return(
    <div className='absolute top-0 left-0 flex flex-row items-center justify-end w-full h-full'>
      <div className={`flex flex-row h-full annimate-all duration-1000 ease-in ${annimate?("w-0"):("w-full")}`} style={{backgroundColor:`${props.curtainColor}`}}>
      </div>
    </div>
    );
  }else if(props.direction==='RIGHT'){
    return(
    <div className='absolute top-0 left-0 flex flex-row items-center justify-start w-full h-full'>
      <div className={`flex flex-row h-full annimate-all duration-1000 ease-in ${annimate?("w-0"):("w-full")}`} style={{backgroundColor:`${props.curtainColor}`}}>
      </div>
    </div>
  );
  }else if(props.direction==='UP'){
    return(
    <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full'>
      <div className={`flex flex-row w-full annimate-all duration-1000 ease-in ${annimate?("h-0"):("h-full")}`} style={{backgroundColor:`${props.curtainColor}`}}>
      </div>
    </div>
    );
  }else if(props.direction==='DOWN'){
    return(
    <div className='absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full'>
      <div className={`flex flex-row w-full annimate-all duration-1000 ease-in ${annimate?("h-0"):("h-full")}`} style={{backgroundColor:`${props.curtainColor}`}}>
      </div>
    </div>
    );
  }else{
    return(
    <div className='absolute top-0 left-0 flex flex-row items-center justify-end w-full h-full'>
      <div className={`flex flex-row h-full opacity-100 bg-white ${annimate?("w-0"):("w-full")}`}>
      </div>
    </div>
    );
  }
}

export default Curtain;
