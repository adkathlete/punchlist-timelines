import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

//A Jiggly Box Annimation
const Jiggle = ()=>{
  const [rotation,setRotation] = useState(0);

  //Upate the state with offset to jiggle the text box
  const jiggle = ()=>{
    console.log('Mouse Over Event');

    let timer1 = setTimeout(()=>setRotation(5),100);

    let timer2 = setTimeout(()=>setRotation(-5),200);

    let timer3 = setTimeout(()=>setRotation(5),300);

    let timer4 = setTimeout(()=>setRotation(0),400);
  }

  return (
    <div className='flex flex-row w-48 h-36 border rounded-2xl shadow-sm bg-blue-500 transition-all duration-50' onMouseOver={()=>jiggle()} style={{transform:`translate(0px,${rotation===0?"0px":"-4px"}) rotate(${rotation}deg)`}}>
    </div>
  );
}

export default Jiggle;
