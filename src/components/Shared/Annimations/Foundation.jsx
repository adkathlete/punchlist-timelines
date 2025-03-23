import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

/*Add State to parent component, and display as such:

const [showFoundation,setShowFoundation]=useState(true);

{showFoundation?(
  <Foundation show={showFoundation} foundationComplete={()=>setShowFoundation(false)}/>
):(
  <div/>
)}

*/


//Foundation Animation
const Foundation = (props)=>{

const [coreSize,setCoreSize]=useState(50);
const [ring1Width,setRing1Width]=useState(110);
const [ring2Height,setRing2Height]=useState(160);
const [ring3Height,setRing3Height]=useState(200);
const [unwind,setUnwind]=useState(false);
const [show,setShow]=useState();

const [flash,setFlash]=useState(false);


//Animate Timer
useEffect(()=>{
  setShow(props.show);
  let timer0=setTimeout(()=>{setUnwind(true)},50);

  let animationTimer=setTimeout(()=>{setShow(false);},2100);

  if(props.flash){
    let animationTimerF=setTimeout(()=>{setFlash(true);},2400);
    let animationTimerEnd=setTimeout(()=>{props.foundationComplete();},3125);
  }else{
    let animationTimerEnd=setTimeout(()=>{props.foundationComplete();},2500);
  }

},[props.show, props.flash]);

//Core timer
useEffect(()=>{
  if(show){
    let timer1=setTimeout(()=>{setCoreSize(10)},100);
    let timer6=setTimeout(()=>{setCoreSize(50)},600);
    let timer11=setTimeout(()=>{setCoreSize(10)},1100);
    let timer16=setTimeout(()=>{setCoreSize(50)},1600);
  }
},[show]);

//Ring 1 timer
useEffect(()=>{
  if(show){
    let timer1=setTimeout(()=>{setRing1Width(0)},100);
    let timer2=setTimeout(()=>{setRing1Width(110)},200);
    let timer3=setTimeout(()=>{setRing1Width(0)},300);
    let timer4=setTimeout(()=>{setRing1Width(110)},400);
    let timer5=setTimeout(()=>{setRing1Width(0)},500);
    let timer6=setTimeout(()=>{setRing1Width(110)},600);
    let timer7=setTimeout(()=>{setRing1Width(0)},700);
    let timer8=setTimeout(()=>{setRing1Width(110)},800);
    let timer9=setTimeout(()=>{setRing1Width(0)},900);
    let timer10=setTimeout(()=>{setRing1Width(110)},1000);

    let timer11=setTimeout(()=>{setRing1Width(0)},1100);
    let timer12=setTimeout(()=>{setRing1Width(110)},1200);
    let timer13=setTimeout(()=>{setRing1Width(0)},1300);
    let timer14=setTimeout(()=>{setRing1Width(110)},1400);
    let timer15=setTimeout(()=>{setRing1Width(0)},1500);
    let timer16=setTimeout(()=>{setRing1Width(110)},1600);
    let timer17=setTimeout(()=>{setRing1Width(0)},1700);
    let timer18=setTimeout(()=>{setRing1Width(110)},1800);
    let timer19=setTimeout(()=>{setRing1Width(0)},1900);
    let timer20=setTimeout(()=>{setRing1Width(110)},2000);
  }
},[show]);

//Ring 2 Timer
useEffect(()=>{
  if(show){
    let timer1=setTimeout(()=>{setRing2Height(0)},150);
    let timer2=setTimeout(()=>{setRing2Height(160)},250);
    let timer3=setTimeout(()=>{setRing2Height(0)},350);
    let timer4=setTimeout(()=>{setRing2Height(160)},450);
    let timer5=setTimeout(()=>{setRing2Height(0)},550);
    let timer6=setTimeout(()=>{setRing2Height(160)},650);
    let timer7=setTimeout(()=>{setRing2Height(0)},750);
    let timer8=setTimeout(()=>{setRing2Height(160)},850);
    let timer9=setTimeout(()=>{setRing2Height(0)},950);
    let timer10=setTimeout(()=>{setRing2Height(160)},1050);

    let timer11=setTimeout(()=>{setRing2Height(0)},1150);
    let timer12=setTimeout(()=>{setRing2Height(160)},1250);
    let timer13=setTimeout(()=>{setRing2Height(0)},1350);
    let timer14=setTimeout(()=>{setRing2Height(160)},1450);
    let timer15=setTimeout(()=>{setRing2Height(0)},1550);
    let timer16=setTimeout(()=>{setRing2Height(160)},1650);
    let timer17=setTimeout(()=>{setRing2Height(0)},1750);
    let timer18=setTimeout(()=>{setRing2Height(160)},1850);
    let timer19=setTimeout(()=>{setRing2Height(0)},1950);
    let timer20=setTimeout(()=>{setRing2Height(160)},2050);
  }
},[show]);

//Ring 3 Timer
useEffect(()=>{
    if(show){
    let timer1=setTimeout(()=>{setRing3Height(0)},125);
    let timer2=setTimeout(()=>{setRing3Height(200)},225);
    let timer3=setTimeout(()=>{setRing3Height(0)},325);
    let timer4=setTimeout(()=>{setRing3Height(200)},425);
    let timer5=setTimeout(()=>{setRing3Height(0)},525);
    let timer6=setTimeout(()=>{setRing3Height(200)},625);
    let timer7=setTimeout(()=>{setRing3Height(0)},725);
    let timer8=setTimeout(()=>{setRing3Height(200)},825);
    let timer9=setTimeout(()=>{setRing3Height(0)},950);
    let timer10=setTimeout(()=>{setRing3Height(200)},1025);

    let timer11=setTimeout(()=>{setRing3Height(0)},1125);
    let timer12=setTimeout(()=>{setRing3Height(200)},1225);
    let timer13=setTimeout(()=>{setRing3Height(0)},1325);
    let timer14=setTimeout(()=>{setRing3Height(200)},1425);
    let timer15=setTimeout(()=>{setRing3Height(0)},1525);
    let timer16=setTimeout(()=>{setRing3Height(200)},1625);
    let timer17=setTimeout(()=>{setRing3Height(0)},1725);
    let timer18=setTimeout(()=>{setRing3Height(200)},1825);
    let timer19=setTimeout(()=>{setRing3Height(0)},1925);
    let timer20=setTimeout(()=>{setRing3Height(200)},2025);
  }
},[show]);

return(
  <div className='flex flex-col w-full h-full items-center justify-center'>
    <div className='relative flex flex-col h-full w-full items-center justify-center transition-all ease-out duration-1000' style={{opacity:`${show?100:0}`}}>
      <div className='p-4 rounded-full'>
        <div className={`bg-c2 flex flex-col items-center justify-center rounded-full z-0 transition-all ease-in-out duration-500`} style={{width:`${coreSize}px`, height:`${coreSize}px`}}>
        </div>
      </div>

      {/*Ring1: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 p-4 transition-all ease-in-out duration-2000' style={{transform:`${!unwind?'rotate(2575deg)':'rotate(0deg)'}`}}>
        <div className='border-8 border-purple-700 rounded-full transition-all ease-out duration-150' style={{width:`${ring1Width}px`, height:"110px"}}>
        </div>
      </div>

      {/*Ring2: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 p-3 transition-all ease-in-out duration-2000' style={{transform:`${!unwind?'rotate(1045deg)':'rotate(0deg)'}`}}>
        <div className='border-8 border-purple-900 rounded-full transition-all ease-out duration-150' style={{width:`160px`, height:`${ring2Height}px`}}>
        </div>
      </div>

      {/*Ring2: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 transition-all ease-in-out duration-3000' style={{transform:`${!unwind?'rotate(585deg)':'rotate(0deg)'}`}}>
        <div className='border-8 border-purple-400 rounded-full transition-all ease-out duration-150' style={{width:`200px`, height:`${ring3Height}px`}}>
        </div>
      </div>
    </div>
    {/*Flash*/}
    <div className={`absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center transition-all delay-100 duraiton-500 ${flash?("opacity-0"):("opacity-100")}`} style={{transform:"translate(0%,-10%)"}}>
      <div className='w-0.5 bg-c2-highlight transition-all duration-50 ease-in' style={{height:`${flash?"85%":"0%"}`}}>
      </div>
    </div>

    {/*Expansion*/}
    <div className={`absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center transition-all delay-700 duraiton-500 ${flash?("opacity-0"):("opacity-100")}`} style={{transform:"translate(0%,-10%)"}}>
      <div className={`rounded-3xl transition-all duration-500 ease-in delay-300 border-4 ${flash?("border-white"):("border-transparent")}`} style={{width:`${flash?"120%":"0%"}`, height:`${flash?"100%":"0%"}`}}>
        <div className='flex flex-col w-full h-full rounded-3xl bg-white' style={{opacity:"5%"}}>
        </div>
      </div>
    </div>
  </div>
)
}

export default Foundation;
