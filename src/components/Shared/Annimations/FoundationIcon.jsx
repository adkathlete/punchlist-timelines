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
const FoundationIcon = (props)=>{

const [coreSize,setCoreSize]=useState(10);
const [ring1Width,setRing1Width]=useState(20);
const [ring2Height,setRing2Height]=useState(10);
const [ring3Height,setRing3Height]=useState(0);
const [unwind,setUnwind]=useState(false);
const [show,setShow]=useState(true);

useEffect(()=>{
  if(props.size==='xs'){
    setCoreSize(9)
    setRing1Width(16)
    setRing2Height(7);
    setRing3Height(20);
  }
},[props.size]);

return(
  <div className='flex flex-col w-full h-full items-center justify-center'>
    <div className='relative flex flex-col h-full w-full items-center justify-center transition-all ease-out duration-1000' style={{opacity:`${show?100:0}`}}>
      <div className='p-4 rounded-full'>
        <div className={`bg-c2 rounded-full z-0 transition-all ease-in-out duration-500`} style={{width:`${coreSize}px`, height:`${coreSize}px`}}>
        </div>
      </div>

      {/*Ring1: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 transition-all ease-in-out duration-2000' style={{transform:`${!unwind?'rotate(2575deg)':'rotate(0deg)'}`}}>
        <div className='border-purple-600 rounded-full transition-all ease-out duration-50' style={{width:`${ring1Width}px`, height:`${ring1Width}px,`,borderWidth:`${props.size==='xs'?("0.1rem"):("0.1rem")}`}}>
        </div>
      </div>

      {/*Ring2: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 transition-all ease-in-out duration-2000' style={{transform:`${!unwind?'rotate(0deg)':'rotate(0deg)'}`}}>
        <div className='border-purple-900 rounded-full transition-all ease-out duration-50' style={{width:`${3*ring2Height}px`, height:`${ring2Height}px`, borderWidth:`${props.size==='xs'?("0.1rem"):("0.1rem")}`}}>
        </div>
      </div>

      {/*Ring2: Spin around the axis*/}
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center z-30 transition-all ease-in-out duration-3000' style={{transform:`${!unwind?'rotate(90deg)':'rotate(0deg)'}`}}>
        <div className='border-purple-300 rounded-full transition-all ease-out duration-50' style={{width:`${ring3Height}px`, height:`${0}px`, borderWidth:`${props.size==='xs'?("0.08rem"):("0.1rem")}`}}>
        </div>
      </div>
    </div>
  </div>
)
}

export default FoundationIcon;
