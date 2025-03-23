import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

//A Pulsing Left->Right Wipe Annimation
const PulsingShootingStar = (props) =>{
  const [show,setShow] = useState(false);
  const [pulse,setPulse] = useState(false);
  const [move,setMove] = useState(false);
  const [showTail,setShowTail] = useState(false);
  const [animating,setAnimating] = useState(false);

  //Update the annimation state
  const annimate = () =>{
    console.log('Mouse Over Event');
    setAnimating(true);

    //Show the star
    setShow(true);
    setShowTail(false);
    setMove(false);


    //1) Pulse the size of the star
    let timer1 = setTimeout(()=>setPulse(true),100);
    let timer2 = setTimeout(()=>setPulse(false),200);
    let timer3 = setTimeout(()=>setPulse(true),300);
    let timer4 = setTimeout(()=>setPulse(false),400);

    //2) Swipe the dot from side to side
    let timer5 = setTimeout(()=>setShowTail(true),600);
    let timer6 = setTimeout(()=>setMove(true),800);

    let timer11 = setTimeout(()=>setShowTail(false),1700);

    //3) Fade the trail of the dot
    let timer7 = setTimeout(()=>setPulse(true),1700);
    let timer8 = setTimeout(()=>setPulse(false),1800);
    let timer9 = setTimeout(()=>setPulse(true),1900);
    let timer10 = setTimeout(()=>setPulse(false),2000);

    let timer12 = setTimeout(()=>setShow(false),2300);
    let timer13 = setTimeout(()=>setMove(false),2300);

    let timer14 = setTimeout(()=>setAnimating(false),2300);
  };

  return (
    <div className='flex flex-row w-full items-center justify-center border rounded-full h-4' onMouseOver={()=>!animating?annimate():null}>
      <div className={`flex flex-row w-full items-center justify-start ${show?("opacity-100"):("opacity-0")} transition-all duration-100 ease-in`}>
        {/*Buffer L [[<----][*]]*/}
        <div className={`flex flex-row border-2 transition-all duration-800 ${move?("flex-1"):("w-0")} ${showTail?("opacity-100"):("opacity-0")}`} style={{borderColor:`${props.tailColor}`}}>
        </div>
        <div className={`flex flex-shrink-0 rounded-full transition-all ease-in-out duration-100`} style={{backgroundColor:`${props.backgroundColor}`, width:`${pulse?20:10}px`, height:`${pulse?20:10}px`}}>
        </div>
      </div>
    </div>
  );
}


export default PulsingShootingStar;
