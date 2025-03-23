import React from "react";
import {useState, useEffect, useRef, useLayoutEffect,} from 'react';

//Elem selector to update the value for the row
const ElemSelector = (props) =>{
  const ELEMS=[
    {id:"4", value:4, text:"Quartiles", scrollOffset:4,},
    {id:"5", value:5, text:"Quintiles", scrollOffset:39,},
    {id:"8", value:8, text:"Octiles",  scrollOffset:76,},
    {id:"10", value:10, text:"Deciles", scrollOffset:112,},
  ]

  const selectorRef = useRef();

  //Scroll the window to the active type
  useLayoutEffect(()=>{
    let scrollOffset = ELEMS.find(entry=>entry.id===props.activeElem).scrollOffset;
    if(selectorRef && selectorRef.current){
      selectorRef.current.scrollTop=scrollOffset;
    }

  },[selectorRef,props.activeElem]);

  return(
    <div ref={selectorRef} className='flex flex-col w-full h-10 p-1 overflow-y-scroll snap-y snap-mandatory'>
      {ELEMS.map(elem=>{
        return(
          <div key={elem.id} className={`flex flex-row flex-shrink-0 w-full my-1 p-1 ${props.activePercentile===elem.id?("border-2 border-c2-highlight rounded-full"):("")} items-center justify-center italic text-white text-sm font-medium snap-always`} onClick={()=>{props.updateActiveElem(elem)}}>
            {elem.id}
          </div>
        )
      })}
    </div>
  )
}

export default ElemSelector;
