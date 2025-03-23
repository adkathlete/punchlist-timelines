import React from "react";
import {useState,useEffect} from 'react';
import iosInstall from "./iosInstall.png";
import chromeInstall from "./chromeInstall.png";


const Installation = (props)=>{
  //---------------------------------STATE--------------------------------------
  const ENERGY_COLORS = [
    {id:"0",color:"#0ea5e9", text:"General", emoji:"🎯",active:true, show:true},
    {id:"1",color:"#8b5cf6", text:"Work", emoji:"💻", active:true, show:false},
    {id:"3",color:"#ec4899", text:"Emotional Health", emoji:"🧘‍♀️", active:true, show:false},
    {id:"5",color:"#22c55e", text:"Friends", emoji:"🥳", active:true, show:false},
    {id:"6",color:"#22d3ee", text:"Family", emoji:"🏡", active:true, show:false},
    {id:"7",color:"#fde047", text:"Hobbies", emoji:"🏔", active:true, show:false},
    {id:"8",color:"#5eead4", text:"School", emoji:"📚", active:true, show:false},
  ];

  const [loop,setLoop] =useState(null);

  useEffect(()=>{
    let loopTimer=setTimeout(()=>{
      setLoop({timestamp:Date.now()});
    },4800);

    return ()=>clearInterval(loopTimer);
  },[loop]);

  //------------------------------Session State---------------------------------
  //Session: Update the routes, entry path, and append Add / Channel redirect params if present
  useEffect(()=>{
    let updateRoutes=props.session&&(props.session.routes.length===0 || props.session.routes[props.session.routes.length-1]!=='INSTALLATION');
    if(updateRoutes){
      //Modify the session
      let newSession={...props.session};
      newSession.routes.push('INSTALLATION');

      //Update the entry path if it is null
      if(newSession.entryPath===''){
        newSession.entryPath='INSTALLATION';
      }

      //Save the session
      props.onUpdateSession(newSession);
    }


  },[props.session]);

  //---------------------------------EFFECTS------------------------------------
  //------------------------------EVENT HANDLERS--------------------------------

  //---------------------------------STYLES-------------------------------------

  //---------------------------------COMPONENT----------------------------------
  return(
    <div className="flex flex-col h-screen w-full items-center justify-start bg-black rounded-md overflow-hidden">
      <div className="relative flex flex-col h-full w-full items-center justify-start py-2 px-2">
        {/*Titles*/}
        <div className="text-center mt-4" style={{zIndex:5}}>
          <div className="text-3xl sm:text-5xl font-extrabold text-white">
            Installing Light
          </div>
          <div className="mt-2 sm:mt-4 text-md sm:text-xl leading-6 text-shades">
            Add Light to your phone and desktop
          </div>
        </div>

        {/*Animation*/}
        <div className='relative flex flex-col flex-shrink-0 w-full h-40 items-center justify-center px-2 my-4' style={{zIndex:5}}>
          <div className='flex flex-col w-full sm:w-4/5 xl:w-1/2 h-full justify-start items-center overflow-hidden'>
            <div id={'lightWindow'} className='relative flex flex-row w-full h-full items-center justify-start border-2 border-gray-900 rounded-3xl bg-black'>
              {/*Map the Rows*/}
              {ENERGY_COLORS.map((category,categoryIndex)=>{

                let highlighted=true;
                let size=Math.max(50,Math.random()*100);

                return(
                  <div key={category.id} className={`flex flex-row h-full flex-1 items-center justify-center rounded-2xl`} onClick={()=>{}} style={{opacity:`${highlighted?"100%":"20%"}`}}>
                    {/*Map the value Patterns*/}
                    {[0,0,0,].map((period,index)=>{
                      return(
                        <div key={String('MAIN-HorizonID:'+index)} className={`relative flex flex-row w-full h-full items-center justify-center my-2 text-md`}>
                          {/*Render the actual values with z-10 index*/}
                          <div className={`flex rounded-xl items-center justify-center border-2 transition-all duration-1000 ease-in-out`} style={{width:`${size}%`, height:`${Math.max(35,Math.random()*100)}%`,borderColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`}}>
                            <div className={`flex rounded-xl items-center justify-center border-2 transition-all duration-1000 ease-in-out`} style={{width:`${size}%`, height:`${Math.max(35,Math.random()*100)}%`,borderColor:`${ENERGY_COLORS[(categoryIndex+1)<=ENERGY_COLORS.length-1?(categoryIndex+1):(categoryIndex+1)%ENERGY_COLORS.length].color}`}}>
                              <div className={`flex rounded-xl items-center justify-center border-2 transition-all duration-1000 ease-in-out`} style={{width:`${size}%`, height:`${Math.max(35,Math.random()*100)}%`,borderColor:`${ENERGY_COLORS[(categoryIndex+2)<=ENERGY_COLORS.length-1?(categoryIndex+2):(categoryIndex+2)%ENERGY_COLORS.length].color}`}}>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                )
              })}
           </div>
          </div>
        </div>

        {/*Installation Guide*/}
        <div className='flex flex-col w-full xl:w-3/5 flex-1 items-center justify-start p-2 border-2 border-gray-900 bg-black rounded-3xl overflow-y-scroll' style={{zIndex:5}}>
          {/*Desktop*/}
          <div className='flex flex-col w-full flex-1 md:h-block my-2 items-center justify-start'>
            {/*Guide*/}
            <div className='flex flex-col sm:flex-row w-full h-full items-center justify-start px-4'>
              {/*Description*/}
              <div className='flex flex-col h-full items-start'>
                {/*Title*/}
                <div className='flex flex-row w-full font-bold text-2xl text-c2-highlight'>
                  Light Desktop Installation Guide
                </div>

                <div className='rounded-full w-full bg-c2-highlight mb-2' style={{height:"0.2rem"}}>
                </div>

                <div className='font-light text-white text-sm'>
                  Installing Light for Desktop is a simple, easy process to improve your user experience and launch Light with a tap.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  To get started, open Google Chrome and visit 'https://www.starlightvi.com', or 'https://www.usestarlight.com'.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Make sure to include the 's' in 'https' so data stays safe and secure.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Look for and tap the 'install chrome app' icon in the URL address bar to add Light to your desktop as a Chrome App.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Right click on the Light App Icon and select 'Keep In Dock', for fast easy access.
                </div>

                <div className='flex flex-row w-full items-center justify-center text-center font-bold text-c2-highlight text-sm mt-2'>
                  Its that simple!
                </div>
              </div>

              {/*Images*/}
              <div className="flex flex-col flex-1 h-full items-center justify-center" style={{minWidth:"55%",maxWidth:'80%'}}>
                <div className="flex flex-col my-2 h-48 w-36 sm:h-64 w-96 rounded-xl shadow-xl overflow-hidden">
                  <img className="object-cover h-full w-full" src={chromeInstall} alt=""/>
                </div>
              </div>
            </div>
          </div>
          {/*Divider*/}
          <div className='flex flex-row w-full h-4 items-center justify-center'>
            <div className='flex flex-row border-b-2 border-gray-900' style={{width:"90%"}}>
            </div>
          </div>
          {/*Mobile*/}
          <div className='flex flex-col w-full flex-1 md:h-block mt-4 items-center justify-start'>
            {/*Guide*/}
            <div className='flex flex-col sm:flex-row w-full md:h-full items-center md:items-start justify-start px-4'>
              {/*Description*/}
              <div className='flex flex-col h-full items-start'>
                {/*Title*/}
                <div className='flex flex-row w-full font-bold text-2xl text-c2-highlight'>
                  Light iOS Installation Guide
                </div>

                <div className='rounded-full w-full bg-c2-highlight mb-2' style={{height:"0.2rem"}}>
                </div>

                <div className='font-light text-white text-sm'>
                  Installing Light for iOS is a simple, easy process to improve your user experience and launch Light with a tap.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  To get started, open Mobile Safari and visit 'https://www.starlightvi.com', or 'https://www.usestarlight.com'.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Make sure to include the 's' in 'https' so data stays safe and secure.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Click the 'share' icon, scroll down, and tap the 'Add to Home Screen (+)' button.
                </div>

                <div className='font-light text-white text-sm mt-4'>
                  Give your new mobile web app a title -- 'Light' -- or what ever you prefer, and tap add to save Light to your home screen for fast, easy access.
                </div>

                <div className='flex flex-row w-full items-center justify-center text-center font-bold text-c2-highlight text-sm mt-2'>
                  Its that simple!
                </div>
              </div>

              {/*Images*/}
              <div className="flex flex-col flex-1 mb-2 h-full items-center justify-center" style={{minWidth:"55%",maxWidth:'80%'}}>
                <div className="flex flex-col items-center justify-center rounded-xl shadow-xl overflow-hidden" style={{height:"22rem", width:"11rem"}}>
                  <img className="object-cover h-full w-full" src={iosInstall} alt=""/>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/*Permet backgoround*/}
        <div className='hidden absolute top-0 left-0 h-full w-full xl:flex flex-col items-center justify-center' style={{zIndex:0}}>
          <div className='relative flex flex-col h-full w-full items-center justify-center'>
            <div className='flex flex-col w-full h-full items-center justify-center' style={{zIndex:1,}}>
              <Permet/>
            </div>

            {/*Shading*/}
            <div className='absolute top-0 left-0 h-full w-full bg-black' style={{zIndex:2, opacity:"65%"}}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//---------------------------------COMPONENTS-----------------------------------

//Permet Score
const Permet=(props)=>{

  const [edges,setEdges]=useState(null);
  const [showNodes,setShowNodes]=useState(true);
  const [maxWidthREM,setMaxWidthREM]=useState(20);

  useEffect(()=>{
    if(!edges){
      refreshEdges();
    }else{
      let timer=setTimeout(()=>refreshEdges(),10500);

      return ()=>clearInterval(timer);
    }
  },[edges]);

  const refreshEdges=()=>{
    let newEdges=[];

    let EDGE_COUNT=70;

    //Generate new edges
    for(let i=0; i<EDGE_COUNT; i++){
      let newEdge={originX:Math.random()*100, originY:Math.random()*100, widthScale:Math.random(), rotation:Math.random()*500};
      newEdges.push(newEdge);
    }

    setEdges(newEdges);
  }

  return(
    <div className='relative flex flex-col items-center justify-center rounded-2xl overflow-hidden' style={{zIndex:5, width:"100%", height:"100%"}}>
      {/*Position things rapidly*/}
      {edges&&edges.map((edge,index)=>{
        return(
          <div key={index} className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-end'>
            <div className={`flex flex-col items-end justify-start transition-all duration-11000 ease-in-out`} style={{width:`${edge.originX}%`, height:`${edge.originY}%`}}>
              {/*Place the origin*/}
              <div className='relative rounded-full h-2 w-2'>
                {/*Rotate the line*/}
                <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                  <div className={`relative flex flex-row items-center justify-between h-0.5 bg-gray-600 transition-all duration-11000 ease-in-out`} style={{width:`${edge.widthScale*maxWidthREM}rem`, transform:`rotate(${edge.rotation}deg)`}}>
                    {/*Add Points*/}
                    {showNodes?(
                      <div className='flex flex-col h-2 w-2 bg-gray-200 border-gray-600 rounded-full'>
                      </div>
                    ):(
                      <div className='hidden'/>
                    )}
                    {/*Add Points*/}
                    {showNodes?(
                      <div className=' flex flex-col h-2 w-2 bg-gray-200 border-gray-600 rounded-full'>
                      </div>
                    ):(
                      <div className='hidden'/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Installation;
