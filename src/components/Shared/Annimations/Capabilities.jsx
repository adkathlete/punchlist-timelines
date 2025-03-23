import React from "react";
import {useState, useEffect, useRef, useLayoutEffect,} from 'react';
import {getPercentileFromZScore,getValueFromPercentile, getLabelForPercentile} from "../Shared/Stats,jsx"

const ENERGY_COLORS = [
  {id:"0",color:"#0ea5e9", text:"General", emoji:"🎯",active:true, show:true},
  {id:"1",color:"#8b5cf6", text:"Work", emoji:"💻", active:true, show:false},
  {id:"2",color:"#d946ef", text:"Physical Health", emoji:"🤸", active:true, show:false},
  {id:"3",color:"#ec4899", text:"Emotional Health", emoji:"🧘‍♀️", active:true, show:false},
  {id:"4",color:"#f43f5e", text:"My Boo", emoji:"🥰", active:true, show:false},
  {id:"5",color:"#22c55e", text:"Friends", emoji:"🥳", active:true, show:false},
  {id:"6",color:"#22d3ee", text:"Family", emoji:"🏡", active:true, show:false},
  {id:"7",color:"#fde047", text:"Hobbies", emoji:"🏔", active:true, show:false},
  {id:"8",color:"#5eead4", text:"School", emoji:"📚", active:true, show:false},
];

//Pick list of ui animations to showcase fun things we can do!
const UICapabilities = (props)=>{

  return(
    <div className='relative flex flex-col h-screen w-full items-center justify-center'>

      {/*Absolutely BEYOND GODLY UNREAL; **pant, pant, pant** so much drip */}
      {/*AMAZING Energy Blob */}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center rounded-2xl bg-black z-50 p-2'>
          <div className='flex flex-col items-center justify-start h-96 w-96 rounded-full border'>
            <EnergyBlob
              animate={true}
              energize={false}
              showRings={false}
              selected={false}
              config={{
                fill:false,
                bordersOnly:false,
                shadeSelection:false,
                showPlatform:false,
                color:"#ffffff",
                selectionBorderColor:"#ffffff",
                selectionBackgroundColor:"#111827", 
                selectionBackgroundOpacity:15,
              }}
            />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*AMAZING Serious Motion: Remember this builds more fun effects!!! Smoke, etc*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 p-2'>
          <div className='relative h-1/2 w-1/2 flex flex-col items-center justify-center border rounded-2xl'>
            <SeriousMotion/>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*AMAZING Force Lightning*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 p-2'>
          <LightWavePattern animate={true} color={ENERGY_COLORS[6].color}/>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*AMAZING Tidal Waves*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 p-2'>
          <FlexPod />
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*LIGHT CUBE*/}
      {false?(
        <div className='absolute top-0 left-0 w-full h-full rounded-2xl border z-50 flex flex-col items-center justify-center bg-black'>
          <div className='w-96 h-96 flex flex-col items-center justify-center border rounded-2xl'>
            <div className='relative flex flex-row h-8 items-center justify-between rounded-3xl bg-black px-1 transition-all duration-1000 ease-in animate-spin' style={{width:'2rem'}}>
              {/*Scroll Caps*/}
              {true?(
                <div className='absolute top-0 left-0 w-8 h-full bg-white border-white border-l-8 rounded-l-full'>
                </div>
              ):(
                <div className='hidden' />
              )}

              {/*Category Value If Selected*/}
              <div className='flex flex-col flex-1 h-full items-center justify-center' style={{zIndex:2}}>
                <div className={`relative flex flex-col w-full h-full rounded-full border-black border-4 bg-gradient-to-r from-violet-500 to-teal-300 py-0.5 items-center justify-center transition-all duration-800 ease-in-out`}>
                </div>
              </div>

              {/*Scroll Caps*/}
              {true?(
                <div className='absolute top-0 right-0 w-8 h-full bg-white border-white border-l-8 rounded-r-full'>
                </div>
              ):(
                <div className='hidden' />
              )}
            </div>
          </div>
        </div>
      ):(
        <div className='hidden' />
      )}

      {/*Slurp*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <Slurp />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Flying Pylons*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-96 w-96 items-center justify-center rounded-2xl border'>
            <div className='relative flex flex-col w-full h-full items-center justify-start rounder-2xl'>
              <div className='flex flex-row w-full flex-1 items-center justify-between' style={{transform:"translate(0px, -0px)"}}>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10 '>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(0deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full flex-1 items-center justify-between' style={{transform:"translate(0px, -0px)"}}>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10 '>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0 border'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center' style={{transform:"rotate(-3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(0deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center  ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
              </div>
              <div className='flex flex-row w-full flex-1 items-center justify-between' style={{transform:"translate(0px, -0px)"}}>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10 '>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0 border'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(-3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(0deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(3deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(5deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
                <div className='flex flex-col w-4 h-full items-center justify-center ' style={{transform:"rotate(8deg)"}}>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2 z-10'>
                  </div>
                  <div className='flex flex-col flex-1 w-full rounded-full bg-c2-extralight -my-2 opacity-25 z-0'>
                  </div>
                </div>
              </div>
            </div>

            <LightMesh />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Light tile*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <LightTile />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Pivot tile*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <PivotTile />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Zoom tile*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <ZoomTile />
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Light string*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-end rounded-2xl border'>
            <LightString showReferences={true} variant={'COLUMN'}/>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Snow Globe*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <SmokeShow/>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Fireflies*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <Fireflies/>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Piano Cubes*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black z-50'>
          <div className='relative flex flex-col h-3/4 w-3/4 items-center justify-center rounded-2xl border'>
            <TileWaterfall/>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Dark Blade*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center rounded-2xl bg-black z-50 p-2'>
          <div className='flex flex-col items-center justify-start h-96 w-96 rounded-full border'>

            {/*Dark Blade*/}
            <div className='flex flex-col w-8 h-full rounded-full border-2 border-black'>
              <div className='flex flex-col w-full h-full rounded-full border overflow-hidden'>
                <div className='relative flex flex-col w-full h-full rounded-full border-2 border-black overflow-hidden'>
                  <div className='absolute top-0 left-0 h-full w-full bg-white' style={{transform:"translate(-50%,0%)"}}>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Cool*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full justify-start items-center overflow-hidden bg-black' style={{zIndex:65,minWidth:"325px",minHeight:"240px"}}>
          <div id={'lightWindow'} className='relative flex flex-col w-full h-4/5 items-center justify-start border-2 border-dotted border-white rounded-3xl'>
            {/*Map the Rows*/}
            {ENERGY_COLORS.map((category,categoryIndex)=>{

              let highlighted=true;

              return(
                <div key={category.id} className={`absolute top-0 left-0 flex flex-row h-full flex-shrink-0 w-full items-center justify-center rounded-2xl`} onClick={()=>{}} style={{opacity:`${highlighted?"100%":"20%"}`}}>
                  {/*Map the value Patterns*/}
                  {[0,0,0,0].map((period,index)=>{
                    return(
                      <div key={String('MAIN-HorizonID:'+index)} className={`relative flex flex-row w-full h-full items-center justify-around ${index>0?("border-l border-dotted"):("")} my-2 text-md`}>
                        <div className={`relative flex flex-row flex-1 h-full items-center justify-center`}>
                          {/*Render the actual values with z-10 index*/}
                          <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center p-0.5 z-10'>
                            <div className={`flex w-full rounded-full ${highlighted?"border-8":"border-2"} bg-transparent mx-2 transition-all duration-1000 ease-in-out`} style={{borderColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`,height:`${Math.random()*100}%`}}>
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
      ):(
        <div className='hidden'/>
      )}

      {/*Cool*/}
      {true?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-4/5 justify-start items-center overflow-hidden bg-black' style={{minWidth:"325px",minHeight:"240px"}}>
          <div id={'lightWindow'} className='relative flex flex-row w-full h-full items-center justify-start border-2 border-dotted border-white rounded-3xl'>
            {/*Map the Rows*/}
            {ENERGY_COLORS.map((category,categoryIndex)=>{

              let highlighted=true;
              let size=Math.random()*100

              return(
                <div key={category.id} className={`flex flex-row h-full flex-1 items-center justify-center rounded-2xl`} onClick={()=>{}} style={{opacity:`${highlighted?"100%":"20%"}`}}>
                  {/*Map the value Patterns*/}
                  {[0,0,0,0,].map((period,index)=>{
                    return(
                      <div key={String('MAIN-HorizonID:'+index)} className={`relative flex flex-row w-full h-full items-center justify-center my-2 text-md`}>
                        {/*Render the actual values with z-10 index*/}
                        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center p-0.5 z-10'>
                          <div className={`flex rounded-xl ${"border-2"} bg-transparent mx-2 transition-all duration-1000 ease-in-out`} style={{width:`${size}%`, height:`${size}%`,borderColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`,height:`${Math.random()*100}%`}}>
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
      ):(
        <div className='hidden'/>
      )}

      {/*LightTemplates to simplify Insight Global State logic*/}
      {false?(
        <div className="absolute top-0 left-0 flex flex-col w-full  h-full items-center justify-center z-50 bg-black px-2">
          <div className='relative flex flex-col w-full sm:w-3/4 h-5/6 sm:h-3/4 items-center justify-center rounded-2xl border p-1'>
            <LightTemplates/>
          </div>
        </div>
      ):(
        <div className='hidden' />
      )}

      {/*LightStore with energy barrier*/}
      {false?(
        <div className="absolute top-0 left-0 flex flex-col w-full  h-full items-center justify-center bg-black px-2" style={{zIndex:100}}>
          <div className='relative flex flex-col w-full sm:w-3/4 h-5/6 sm:h-3/4 items-center justify-center rounded-2xl border p-1'>
            <BaseLightStore energyBarrier={true}/>
          </div>
        </div>
      ):(
        <div className='hidden' />
      )}

      {/*LightStore but better marimeko energy barrier*/}
      {true?(
        <div className="absolute top-0 left-0 flex flex-col w-full  h-full items-center justify-center bg-black px-2" style={{zIndex:100}}>
          <div className='relative flex flex-col w-full sm:w-3/4 h-5/6 sm:h-3/4 items-center justify-center rounded-2xl border p-1'>
            <LightStore energyBarrier={true}/>
          </div>
        </div>
      ):(
        <div className='hidden' />
      )}
    </div>
  )
}

//**********************************COMPONENTS**********************************

//Animate dime-series waves
const LightPhotonWave=()=>{

  const [points,setPoints]=useState([0]);
  const [pointSet,setPointSet]=useState();
  const [activeIndex,setActiveIndex]=useState(0);
  const [direction,setDirection]=useState('UP');

  useEffect(()=>{
    let newPointSet={};
    let newPoint;
    let currentDirection='UP';

    newPointSet['0']=0;

    for(let i=1; i<85; i++){
      newPoint=currentDirection==='UP'?(Object.values(newPointSet)[i-1]+0.1)*1.2:(Object.values(newPointSet)[i-1]-0.1)*.8;

      if(newPoint>98){
        currentDirection='DOWN';
      }else if (newPoint<2){
        currentDirection='UP';
      }

      newPointSet[String(i)]=newPoint;
    }

    console.log(newPointSet);

    setPointSet(newPointSet);
  },[]);

  useEffect(()=>{

    let timer=setTimeout(()=>{

      let newPointSet={...pointSet};

      //Swap the first and last values the last value to the first value
      newPointSet[String(Object.values(pointSet).length-1)]=newPointSet['0'];

      //Shift all the other values
      for(let i=0; i<Object.values(pointSet).length-1; i++){
        newPointSet[String(i)]=pointSet[String(i+1)];
      }

      setPointSet(newPointSet);

    },350);

    return ()=>clearInterval(timer);

  },[pointSet]);

  useEffect(()=>{

    let timer=setTimeout(()=>{

      let newPoints=[...points];
      let newPoint=direction==='UP'?(0.1+points[0])*1.2:(points[0]-0.1)*.8;
      newPoints.unshift(Math.min(100,Math.max(0,newPoint)));

      //Toggle direction
      if(newPoint>98){
        setDirection('DOWN');
      }else if (newPoint<2){
        setDirection('UP');
      }

      setPoints(newPoints);

    },50);

    return ()=>clearInterval(timer);

  },[points]);

  return(
    <div className='relative flex flex-row h-full w-full items-end justify-start overflow-hidden py-4 px-3'>
      {false&&points.map((point,index)=>{
        return(
          <div key={index}className='flex flex-col items-center justify-start' style={{height:`${point}%`}}>
            <div className='rounded-full bg-c2-highlight h-1 w-1 flex-shrink-0'>
            </div>
          </div>
        )
      })}

      {pointSet&&Object.values(pointSet).map((point,index)=>{
        return(
          <div key={index} className='flex flex-col items-center flex-1 justify-start transition-all duration-500 ease-in-out' style={{height:`${point}%`}}>
            <div className='rounded-full bg-c2-highlight h-1 w-1 flex-shrink-0'>
            </div>
          </div>
        )
      })}

      <div className='absolute top-0 left-0 flex flex-col h-full items-center justify-start w-0 py-2 pl-2'>
        <div className='relative flex flex-col h-full w-0'>
          {[100,95,80,50,20,5,0].map((bar,barIndex)=>{


            return(
              <div key={barIndex} className='absolute bottom-0 left-0 flex flex-col items-start justify-start' style={{height:`${bar}%`}}>
                <div className='relative flex flex-row items-center justify-start text-min text-shades font-light italic bg-black'>
                  {String(bar)+"%"}

                  <div className='absolute top-0 left-0 flex flex-col h-full items-center justify-center' style={{transform:"translate(-100%,0%)"}}>
                    <div className='h-0.5 w-2 bg-gray-900 rounded-r-xl'>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

//Cartesian Points
const GridsAndCartesianPoints=(props)=>{

  const POINTS=[
    {from:{x:50,y:70}, to:{x:10,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:90,y:20}, to:{x:30,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:30,y:80}, to:{x:50,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:70,y:80}, to:{x:70,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:50,y:10}, to:{x:90,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:20,y:60}, to:{x:35,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:80,y:60}, to:{x:65,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:10,y:20}, to:{x:50,y:85}, fromColor:"#22d3ee", toColor:"#34d399"},
  ];

  const MOBILE_POINTS=[
    {from:{x:50,y:70}, to:{x:10,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:90,y:20}, to:{x:30,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:18,y:85}, to:{x:50,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:82,y:85}, to:{x:70,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:50,y:10}, to:{x:90,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:20,y:60}, to:{x:35,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:80,y:60}, to:{x:65,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:10,y:20}, to:{x:50,y:85}, fromColor:"#22d3ee", toColor:"#34d399"},
  ];

  const EDGES=[
    {rotate:0, x:50, y:20, widthMX:0.8, borderString:"border-t-2"},
    {rotate:0, x:50, y:60, widthMX:0.6, borderString:"border-t-2"},
    {rotate:0, x:50, y:80, widthMX:0.4, borderString:"border-t-2"},

    {rotate:25, x:55, y:40, widthMX:0.8, borderString:"border-t-2"},
    {rotate:-25, x:45, y:40, widthMX:0.8, borderString:"border-t-2"},
    {rotate:90, x:50, y:40, widthMX:0.5, borderString:"border-t-2"},
    {rotate:-75, x:15, y:40, widthMX:0.35, borderString:"border-t-2"},
    {rotate:75, x:85, y:40, widthMX:0.35, borderString:"border-t-2"},
    {rotate:70, x:40, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:-70, x:60, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:-45, x:30, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:45, x:70, y:45, widthMX:0.65, borderString:"border-t-2"},
  ];

  const MOBILE_EDGES=[
    {rotate:0, x:50, y:20, widthMX:0.3, borderString:"border-t-2"},
    {rotate:0, x:50, y:60, widthMX:0.2, borderString:"border-t-2"},
    {rotate:0, x:50, y:85, widthMX:0.15, borderString:"border-t-2"},

    {rotate:50, x:55, y:40, widthMX:0.4, borderString:"border-t-2"},
    {rotate:-50, x:45, y:40, widthMX:0.4, borderString:"border-t-2"},

    {rotate:90, x:50, y:40, widthMX:0.4, borderString:"border-t-2"},
    {rotate:-82, x:15, y:40, widthMX:0.30, borderString:"border-t-2"},
    {rotate:82, x:85, y:40, widthMX:0.30, borderString:"border-t-2"},

    {rotate:60, x:50, y:55, widthMX:0.5, borderString:"border-t-2"},
    {rotate:-60, x:50, y:55, widthMX:0.5, borderString:"border-t-2"},
    {rotate:-70, x:30, y:45, widthMX:0.35, borderString:"border-t-2"},
    {rotate:70, x:70, y:45, widthMX:0.35, borderString:"border-t-2"},
  ];

  const GRID_LINES={

    '4-9':{id:"4-9", borderString:"border-r-2", borderColor:"#34d399"},
    '5-9':{id:"5-9", borderString:"border-r-2", borderColor:"#34d399"},

    '6-7':{id:"6-7", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-8':{id:"6-8", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-9':{id:"6-9", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-10':{id:"6-10", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-11':{id:"6-11", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-12':{id:"6-12", borderString:"border-t-2 border-r-2", borderColor:"#5eead4"},

    '6-6':{id:"6-6", borderString:"border-r-2", borderColor:"#5eead4"},
    '7-6':{id:"7-6", borderString:"border-r-2", borderColor:"#5eead4"},
    '8-6':{id:"8-6", borderString:"border-r-2", borderColor:"#5eead4"},

    '7-12':{id:"7-12", borderString:"border-r-2", borderColor:"#5eead4"},
    '8-12':{id:"8-12", borderString:"border-r-2", borderColor:"#5eead4"},

    "10-6":{id:"10-6", borderString:"border-r-2", borderColor:"#22d3ee"},
    "11-6":{id:"11-6", borderString:"border-r-2", borderColor:"#22d3ee"},

    "10-12":{id:"10-12", borderString:"border-r-2", borderColor:"#22d3ee"},
    "11-12":{id:"11-12", borderString:"border-r-2", borderColor:"#22d3ee"},

    '12-2':{id:"12-2", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-3':{id:"12-3", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-4':{id:"12-4", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-5':{id:"12-5", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-6':{id:"12-6", borderString:"border-b-2 border-r-2", borderColor:"#22d3ee"},
    '12-7':{id:"12-7", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-8':{id:"12-8", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-9':{id:"12-9", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-10':{id:"12-10", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-11':{id:"12-11", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-12':{id:"12-12", borderString:"border-b-2 border-r-2", borderColor:"#22d3ee"},
    '12-13':{id:"12-13", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-14':{id:"12-14", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-15':{id:"12-15", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-16':{id:"12-16", borderString:"border-b-2", borderColor:"#22d3ee"},
    '12-17':{id:"12-17", borderString:"border-b-2", borderColor:"#22d3ee"},

    "13-1":{id:"13-1",borderString:"border-r-2", borderColor:"#22d3ee" },
    "14-1":{id:"14-1",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-1":{id:"15-1",borderString:"border-r-2", borderColor:"#22d3ee" },

    "13-5":{id:"13-5",borderString:"border-r-2", borderColor:"#22d3ee" },
    "14-5":{id:"14-5",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-5":{id:"15-5",borderString:"border-r-2", borderColor:"#22d3ee" },

    "13-9":{id:"13-9",borderString:"border-r-2", borderColor:"#22d3ee" },
    "14-9":{id:"14-9",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-9":{id:"15-9",borderString:"border-r-2", borderColor:"#22d3ee" },

    "13-13":{id:"13-13",borderString:"border-r-2", borderColor:"#22d3ee" },
    "14-13":{id:"14-13",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-13":{id:"15-13",borderString:"border-r-2", borderColor:"#22d3ee" },

    "13-17":{id:"13-17",borderString:"border-r-2", borderColor:"#22d3ee" },
    "14-17":{id:"14-17",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-17":{id:"15-17",borderString:"border-r-2", borderColor:"#22d3ee" },
  }

  const MOBILE_GRID_LINES={
    '3-9':{id:"3-9", borderString:"border-r-2", borderColor:"#34d399"},
    '4-9':{id:"4-9", borderString:"border-r-2", borderColor:"#34d399"},
    '5-9':{id:"5-9", borderString:"border-r-2", borderColor:"#34d399"},

    '6-7':{id:"6-7", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-8':{id:"6-8", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-9':{id:"6-9", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-10':{id:"6-10", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-11':{id:"6-11", borderString:"border-t-2", borderColor:"#5eead4"},
    '6-12':{id:"6-12", borderString:"border-t-2 border-r-2", borderColor:"#5eead4"},

    '6-6':{id:"6-6", borderString:"border-r-2", borderColor:"#5eead4"},
    '7-6':{id:"7-6", borderString:"border-r-2", borderColor:"#5eead4"},
    '8-6':{id:"8-6", borderString:"border-r-2", borderColor:"#5eead4"},

    '7-12':{id:"7-12", borderString:"border-r-2", borderColor:"#5eead4"},
    '8-12':{id:"8-12", borderString:"border-r-2", borderColor:"#5eead4"},

    "9-6":{id:"9-6", borderString:"border-r-2", borderColor:"#22d3ee"},
    "10-6":{id:"10-6", borderString:"border-r-2", borderColor:"#22d3ee"},

    "9-12":{id:"9-12", borderString:"border-r-2", borderColor:"#22d3ee"},
    "10-12":{id:"10-12", borderString:"border-r-2", borderColor:"#22d3ee"},

    '11-2':{id:"11-2", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-3':{id:"11-3", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-4':{id:"11-4", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-5':{id:"11-5", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-6':{id:"11-6", borderString:"border-b-2 border-r-2", borderColor:"#22d3ee"},
    '11-7':{id:"11-7", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-8':{id:"11-8", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-9':{id:"11-9", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-10':{id:"11-10", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-11':{id:"11-11", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-12':{id:"11-12", borderString:"border-b-2 border-r-2", borderColor:"#22d3ee"},
    '11-13':{id:"11-13", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-14':{id:"11-14", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-15':{id:"11-15", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-16':{id:"11-16", borderString:"border-b-2", borderColor:"#22d3ee"},
    '11-17':{id:"11-17", borderString:"border-b-2", borderColor:"#22d3ee"},

    "12-1":{id:"12-1",borderString:"border-r-2", borderColor:"#22d3ee" },
    "13-1":{id:"13-1",borderString:"border-r-2", borderColor:"#22d3ee" },

    "14-1":{id:"14-1",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-1":{id:"15-1",borderString:"border-r-2", borderColor:"#22d3ee" },

    "12-5":{id:"12-5",borderString:"border-r-2", borderColor:"#22d3ee" },
    "13-5":{id:"13-5",borderString:"border-r-2", borderColor:"#22d3ee" },

    "14-5":{id:"14-5",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-5":{id:"15-5",borderString:"border-r-2", borderColor:"#22d3ee" },

    "12-9":{id:"12-9",borderString:"border-r-2", borderColor:"#22d3ee" },
    "13-9":{id:"13-9",borderString:"border-r-2", borderColor:"#22d3ee" },

    "14-9":{id:"14-9",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-9":{id:"15-9",borderString:"border-r-2", borderColor:"#22d3ee" },

    "12-13":{id:"24-13",borderString:"border-r-2", borderColor:"#22d3ee" },
    "13-13":{id:"34-13",borderString:"border-r-2", borderColor:"#22d3ee" },

    "14-13":{id:"14-13",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-13":{id:"15-13",borderString:"border-r-2", borderColor:"#22d3ee" },

    "12-17":{id:"24-17",borderString:"border-r-2", borderColor:"#22d3ee" },
    "13-17":{id:"34-17",borderString:"border-r-2", borderColor:"#22d3ee" },

    "14-17":{id:"14-17",borderString:"border-r-2", borderColor:"#22d3ee" },
    "15-17":{id:"15-17",borderString:"border-r-2", borderColor:"#22d3ee" },
  }

  const [pulse,setPulse]=useState(true);
  const [maxWidthREM,setMaxWidthREM]=useState(60);

  useEffect(()=>{
    let timer=setTimeout(()=>setPulse((pulse)=>!pulse),1800);

    return ()=>clearInterval(timer);

  },[pulse]);

  return(
    <div className='flex flex-col py-2 xl:flex-row w-full items-center justify-start xl:justify-around'>

      {/*Center Tile*/}
      <div className='relative hidden xl:flex flex-col items-center justify-center rounded-2xl border-2 border-gray-900' style={{zIndex:5, width:"60rem", height:"50rem"}}>

        {POINTS.map((entry,index)=>{
          return(
            <div key={index} className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end' style={{zIndex:5}}>
              <div className='flex flex-col items-end justify-start transition-all duration-2000 ease-in-out' style={{height:!pulse?`${entry.from.y}%`:`${entry.to.y}%`, width:!pulse?`${entry.from.x}%`:`${entry.to.x}%`}}>
                <div className='flex flex-row rounded-full h-20 w-20 border-4 bg-gray-900 transition-all duration-2000 ease-in-out' style={{transform:"translate(50%,-50%)", borderColor:pulse?entry.toColor:entry.fromColor}}>
                </div>
              </div>
            </div>
          )
        })}

        {/*Messy connections*/}
        {EDGES.map((entry,index)=>{
          return(
            <div className='absolute top-0 left-1 h-full w-full flex flex-col items-start justify-end transition-all duration-2000 ease-in-out' style={{zIndex:pulse?-50:1, opacity:pulse?"0%":"100%",}}>
              <div className={`flex flex-col items-end justify-start`} style={{width:`${entry.x}%`, height:`${entry.y}%`}}>
                {/*Place the origin*/}
                <div className='relative rounded-full h-2 w-2'>
                  {/*Rotate the line*/}
                  <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                    <div className={`border-t-2 border-gray-800 transition-all duration-2000 ease-in-out`} style={{width:`${pulse?0:entry.widthMX*maxWidthREM}rem`, transform:`rotate(${entry.rotate}deg)`}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/*Reference Frame so we can easily figure out the origin coordinates*/}
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-start'>
          {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,rowIndex)=>{

          return(
            <div key={rowIndex} className='flex flex-row flex-1 w-full items-center justify-start'>
              {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,colIndex)=>{
                let active=GRID_LINES[String(rowIndex+"-"+colIndex)];
                let borderString=active?GRID_LINES[String(rowIndex+"-"+colIndex)].borderString:"";
                return(
                  <div key={colIndex} className={`flex flex-col flex-1 h-full items-center justify-start`}>
                    <div className={`flex flex-col ${pulse?"h-full w-full":"h-0 w-0"} ${borderString} transition-all duration-2000 ease-in-out`} style={{opacity:pulse?"100%":"0%", borderColor:active?GRID_LINES[String(rowIndex+"-"+colIndex)].borderColor:""}}>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        </div>

        {/*Position things rapidly*/}
        <div className='hidden absolute top-0 left-0 h-full w-full flex flex-col items-start justify-end'>
          <div className={`flex flex-col items-end justify-start`} style={{width:`${70}%`, height:`${60}%`}}>
            {/*Place the origin*/}
            <div className='relative rounded-full h-2 w-2 bg-c2-highlight'>
              {/*Rotate the line*/}
              <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                <div className={`border-t-2 border-gray-900`} style={{width:`${0.65*maxWidthREM}rem`, transform:`rotate(${90}deg)`}}>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/*Center Tile*/}
      <div className='xl:hidden relative flex flex-col items-center justify-center rounded-2xl border-2 border-gray-900' style={{zIndex:5, width:"20rem", height:"40rem"}}>

        {MOBILE_POINTS.map((entry,index)=>{
          return(
            <div key={index} className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end' style={{zIndex:5}}>
              <div className='flex flex-col items-end justify-start transition-all duration-2000 ease-in-out' style={{height:!pulse?`${entry.from.y}%`:`${entry.to.y}%`, width:!pulse?`${entry.from.x}%`:`${entry.to.x}%`}}>
                <div className='flex flex-row rounded-full h-14 w-14 border-4 bg-gray-900 transition-all duration-2000 ease-in-out' style={{transform:"translate(50%,-50%)", borderColor:pulse?entry.toColor:entry.fromColor}}>
                </div>
              </div>
            </div>
          )
        })}

        {/*Messy connections*/}
        {MOBILE_EDGES.map((entry,index)=>{
          return(
            <div className='absolute top-0 left-1 h-full w-full flex flex-col items-start justify-end transition-all duration-2000 ease-in-out' style={{zIndex:pulse?-50:1, opacity:pulse?"0%":"100%",}}>
              <div className={`flex flex-col items-end justify-start`} style={{width:`${entry.x}%`, height:`${entry.y}%`}}>
                {/*Place the origin*/}
                <div className='relative rounded-full h-2 w-2'>
                  {/*Rotate the line*/}
                  <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                    <div className={`border-t-2 border-gray-800 transition-all duration-2000 ease-in-out`} style={{width:`${pulse?0:entry.widthMX*maxWidthREM}rem`, transform:`rotate(${entry.rotate}deg)`}}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/*Reference Frame so we can easily figure out the origin coordinates*/}
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-start'>
          {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,rowIndex)=>{
            return(
              <div key={rowIndex} className='flex flex-row flex-1 w-full items-center justify-start'>
                {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,colIndex)=>{
                  let active=MOBILE_GRID_LINES[String(rowIndex+"-"+colIndex)];
                  let borderString=active?MOBILE_GRID_LINES[String(rowIndex+"-"+colIndex)].borderString:"";
                  return(
                    <div key={colIndex} className={`flex flex-col flex-1 h-full items-center justify-start`}>
                      <div className={`flex flex-col ${true||pulse?"h-full w-full":"h-0 w-0"} ${borderString} transition-all duration-2000 ease-in-out`} style={{opacity:pulse?"100%":"0%", borderColor:active?MOBILE_GRID_LINES[String(rowIndex+"-"+colIndex)].borderColor:""}}>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/*Position things rapidly*/}
        <div className='hidden absolute top-0 left-0 h-full w-full flex flex-col items-start justify-end'>
          <div className={`flex flex-col items-end justify-start`} style={{width:`${70}%`, height:`${60}%`}}>
            {/*Place the origin*/}
            <div className='relative rounded-full h-2 w-2 bg-c2-highlight'>
              {/*Rotate the line*/}
              <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                <div className={`border-t-2 border-gray-900`} style={{width:`${0.65*maxWidthREM}rem`, transform:`rotate(${90}deg)`}}>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

//Light Containers (A|B comparison)
const BaseLightStore = (props) =>{

  let WHOLES=[
    {id:"0", color:"#111827", scale:30, parts:[
      {id:"1", color:"#5eead4", coverage:10 ,selected:true, pieces:[{id:"0", coverage:20},{id:"1", coverage:60},{id:"2", coverage:10},{id:"3", coverage:10}]},
      {id:"0", color:"#22d3ee", coverage:80, selected:true, pieces:[{id:"0", coverage:30},{id:"1", coverage:20},{id:"2", coverage:10},{id:"3", coverage:40}]},
      {id:"3", color:"#4f46e5", coverage:10, selected:true, pieces:[{id:"0", coverage:15},{id:"1", coverage:10},{id:"2", coverage:40},{id:"3", coverage:45}]}
    ],},
    {id:"1", color:"#111827", scale:95, parts:[
      {id:"1", color:"#5eead4", coverage:10, selected:true, pieces:[{id:"0", coverage:25},{id:"1", coverage:60},{id:"2", coverage:5},{id:"3", coverage:10}]},
      {id:"0", color:"#22d3ee", coverage:65, selected:true, pieces:[{id:"0", coverage:40},{id:"1", coverage:10},{id:"2", coverage:5},{id:"3", coverage:80}]},
      {id:"3", color:"#4f46e5", coverage:25, selected:true, pieces:[{id:"0", coverage:30},{id:"1", coverage:5},{id:"2", coverage:40},{id:"3", coverage:50}]}
    ]},
  ];

  let activePiece={id:"3134244552341",  coverage:85, selectionID:"1-0"};

  useEffect(()=>{
    let energyTimer = setInterval(()=>{
      let newRotation=Math.floor(Math.random()*3);

      let signedRotation=newRotation%2===0?-newRotation:newRotation;

      let newEnergyMultipleIndex=segmentEnergyMultipleIndex===SEGMENT_ENERGY_MULTIPLES.length-1?0:segmentEnergyMultipleIndex+1;

      setSegmentEnergyMultipleIndex(newEnergyMultipleIndex);
      setSegmentEnergyRotation(signedRotation);
    },2300);

    return ()=>clearInterval (energyTimer);
  },[])

  const [segmentEnergyRotation, setSegmentEnergyRotation] = useState(0);
  const [segmentEnergyMultipleIndex, setSegmentEnergyMultipleIndex] = useState(0);
  let SEGMENT_ENERGY_MULTIPLES=[1.1, 0.9, 0.75, 0.85];

  useEffect(()=>{
    let energyTimer = setInterval(()=>{
      let newRotation=Math.min(500,Math.floor(Math.random()*300)+350);

      let signedRotation=newRotation%2===0?-newRotation:newRotation;

      let newEnergyMultipleIndex=energyMultipleIndex===ENERGY_MULTIPLES.length-1?0:energyMultipleIndex+1;

      setEnergyMultipleIndex(newEnergyMultipleIndex);
      setEnergyRotation(signedRotation);
    },2800);

    setEnergy(true);

    return ()=>clearInterval (energyTimer);
  },[])

  //If animate energy barrier
  useEffect(()=>{
    if(props.energyBarrier){
      //These seem to work well
      let OPACITY_MASK=[
        [4,3],
        [6,0],
        [5,3],
        [4,0],
        [7,5],
      ]

      //Create a new energy barrier
      let newEnergyBarrier = [];
      for(let i=0; i<20; i++){
        let newEnergyRow = {id:i, cells:[]};
        for (let j=0; j<10; j++){
          //Create cool opaity masks here, then just rotate though them;
          let opacity=OPACITY_MASK.map((entry,index)=>(i+j)%OPACITY_MASK[index][0]===0||(i+j*2)%OPACITY_MASK[index][0]===0?87:38);
          let whiteOpacity=OPACITY_MASK.map((entry,index)=>j%OPACITY_MASK[index][1]===0&&i%OPACITY_MASK[index][0]!==0?40:0);
          let blackOpacity=OPACITY_MASK.map((entry,index)=>i%OPACITY_MASK[index][1]===0&&j%OPACITY_MASK[index][0]!==0?15:0);

          let newEnergyCell = {id:String(i+"-"+j), row:i, col:j, opacity:opacity, whiteOpacity:whiteOpacity, blackOpacity:blackOpacity};
          newEnergyRow.cells.push(newEnergyCell);
        }
        newEnergyBarrier.push(newEnergyRow);
      }

      console.log(newEnergyBarrier);

      setEnergyBarrier(newEnergyBarrier);

      //Rotate between the pre-set 'cool looking masks'
      let opacityTimer=setInterval(()=>{
        setEnergyBarrierIndex((energyBarrierIndex)=>energyBarrierIndex===OPACITY_MASK.length-1?0:energyBarrierIndex+1);
      },2300);

      return ()=>clearInterval(opacityTimer);
    }

  },[props.energyBarrier])

  const [energyBarrier, setEnergyBarrier] = useState([]);
  const [energyBarrierIndex, setEnergyBarrierIndex]= useState(0);

  const [energy, setEnergy] = useState(false);
  const [energyRotation, setEnergyRotation] = useState(100);
  const [energyMultipleIndex, setEnergyMultipleIndex] = useState(0);
  let ENERGY_MULTIPLES=[1.1, 0.8, 0.7, 0.6, 0.9, 0.8];
  let COLORS=["#22c55e","#ffffff","#22d3ee","#ffffff","#f43f5e","#ffffff"];


  return(
    <div className='relative flex flex-col w-full items-center justify-center' style={{height:"28rem"}}>

      {/*Show the partition maps*/}
      <div className='flex flex-row w-full h-full items-center justify-start'>
        {WHOLES.map((whole, wholeIndex)=>{
          return(
            <div key={wholeIndex} className='flex flex-col flex-1 h-full items-center justify-center m-1'>
              <div className={`flex flex-row items-center h-full w-full justify-start p-2 border-gray-900 border-t-4 rounded-3xl`}>
                {whole.parts.map((part,partIndex)=>{
                  return(
                    <div key={partIndex} className='relative flex flex-col rounded-md items-center justfiy-start py-2 px-1.5 mx-1 my-0.5 transition-all duration-1000 delay-300 ease-in' style={{height:`${energy?"100%":'20px'}`, width:`${part.coverage}%`, opacity:`${part.selected?"100%":"45%"}`}}>
                      {!props.energyBarrier&&part.pieces.map((piece,pieceIndex)=>{
                        return(
                          <div key={pieceIndex} className='relative flex flex-row w-full items-center justify-center m-0.5' style={{borderColor:part.color, height:`${piece.coverage}%`}}>

                            {/*Light container*/}
                            {piece.coverage>0?(
                              <div className={`relative flex flex-col h-full w-5/6 items-center justify-center`}>
                                {/*Light*/}
                                <div className={`flex flex-col flex-shrink-0 rounded-full transition-all duration-3000`} style={{backgroundColor:part.color, height:`${Math.min(95,segmentEnergyRotation%2===0?SEGMENT_ENERGY_MULTIPLES[segmentEnergyMultipleIndex]*piece.coverage:piece.coverage)}%`, width:`${piece.coverage}%`, transform:`translate(0%,${segmentEnergyRotation%3===0?"-4px":"0px"}),rotate(${segmentEnergyRotation}deg)`, minHeight:"6px", minWidth:"6px"}}>
                                </div>
                              </div>
                            ):(
                              <div className='rounded-full w-full h-full bg-gray-900 flex-shrink-0' style={{height:"2px"}}/>
                            )}

                            {/*Volumetric Cell Borders*/}
                            <div className='hidden absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-0.5 rounded-md border-2 rounded-3xl' style={{zIndex:"1", borderColor:part.color}}>
                            </div>

                            {/*Stick the piece in the active piece + part*/}
                            {String(partIndex+"-"+pieceIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full rounded-3xl border-2 z-0 overflow-hidden' style={{borderColor:part.color}}>
                                {/*100% Bar 'We want to show the '% full for the category, so we use 100% stacked bars like a water level''*/}
                                <div className='relative flex flex-col w-full h-full items-center justify-center border-t-4 border-white rounded-2xl overflow-hidden'style={{zIndex:5, width:`${100}%`, height:`${activePiece.coverage}%`}}>
                                  <div className='flex flex-row items-center justify-start w-full h-full bg-white' style={{zIndex:3, opacity:"75%"}}>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}

                            {/*Stick the label over the top as an overlay*/}
                            {String(partIndex+"-"+pieceIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full rounded-3xl z-20 overflow-visible'>
                                <div className='relative flex flex-col items-center justify-start' style={{zIndex:5, width:`${100}%`, height:`${100}%`}}>
                                  {/*Label*/}
                                  <div className='flex flex-col w-full h-full items-center justify-center z-20'>
                                    <div className='flex flex-col items-center justify-center rounded-2xl bg-black rounded-xl text-md font-bold px-2.5 py-1 flex-shrink-0 border-r-4 border-l-4' style={{borderColor:part.color, color:part.color}}>
                                      <LightNumber
                                        value={activePiece.coverage}
                                        config={{
                                          size:"sm",
                                          prefix:"",
                                          suffix:"%",
                                          standardColor:"#fffff",
                                          decimals:0,
                                          bold:true,
                                          centerText:true,
                                          signed:false,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}
                          </div>
                        )
                      })}

                      {/*Borders  (+ Shading) */}
                      <div className='absolute top-0 left-0 flex flex-row w-full h-full rounded-3xl border-b-4 border-t-4 items-center justify-center' style={{borderColor:part.color, opacity:`${"100%"}`}}>
                        {/*If you want to shade the 'background of the bars' */}
                        <div className='hidden h-full w-full rounded-3xl' style={{opacity:"10%", backgroundColor:part.color}}>
                        </div>

                        {/*New Energy Barrier*/}
                        {props.energyBarrier?(
                          <div className='flex flex-col h-full w-full rounded-3xl items-center justify-start overflow-hidden border-t-4 border-b-4 border-transparent'>
                            {energyBarrier.map((row,rowIndex)=>{
                              return(
                                <div key={rowIndex} className='flex flex-row w-full flex-1 items-center justify-start'>
                                  {row.cells.map((energyCell,colIndex)=>{
                                    //Have the  middle blue alternate patterns from the green and red
                                    let opacityindex=partIndex===1?(energyCell.opacity.length-1-energyBarrierIndex):energyBarrierIndex;
                                    return(
                                      <div key={colIndex} className='relative flex flex-col h-full flex-1 rounded-sm overflow-hidden'>
                                        {/*Borders and border opacity*/}
                                        <div className='absolute top-0 left-0 flex flex-col h-full w-full' style={{borderColor:part.color, borderWidth:"1px", opacity:`${50}%`}}>
                                        </div>

                                        {/*Background and fill opacity*/}
                                        <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:part.color, opacity:`${energyCell.opacity[opacityindex]}%`}}>
                                        </div>

                                        {/*Background and fill opacity*/}
                                        <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:"#ffffff", opacity:`${energyCell.whiteOpacity[opacityindex]}%`}}>
                                        </div>

                                        {/*Background and fill opacity*/}
                                        <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:"#000000", opacity:`${energyCell.blackOpacity[opacityindex]}%`}}>
                                        </div>
                                      </div>
                                    )
                                })}
                              </div>
                            )
                          })}
                          </div>
                        ):(
                          <div className='hidden' />
                        )}
                      </div>

                      {/*Borders -- If you want to 'overlay tiles' Center Tiles*/}
                      <div className='absolute top-0 left-0 flex flex-row w-full h-full rounded-3xl items-center justify-center' style={{borderColor:part.color, opacity:`${"100%"}`}}>
                        <div className='hidden h-1/2 w-1/2 rounded-3xl border-2 bg-gray-900' style={{opacity:"100%", borderColor:part.color}}>
                        </div>
                      </div>

                      {/*Midpoints -- if you want to add mid lines*/}
                      <div className='hidden absolute top-0 left-0 flex flex-row w-1/2 border-r' style={{height:"500%",borderColor:part.color, zIndex:-1}}>
                      </div>

                      {/*Percentage Icons*/}
                      {false?(
                        <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center' style={{zIndex:30}}>
                          <div className='flex flex-col h-5/6 w-5/6 items-center justify-center rounded-3xl bg-black rounded-full text-2xl font-bold' style={{color:part.color}}>
                            <LightNumber
                              value={part.coverage}
                              config={{
                                size:"sm",
                                prefix:"",
                                suffix:"%",
                                standardColor:"#fffff",
                                decimals:0,
                                bold:true,
                                centerText:true,
                                signed:false,
                              }}
                            />
                          </div>
                        </div>
                      ):(
                        <div className='hidden' />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/*Mid-Point Overlays */}
      <div className='absolute top-0 left-0 flex flex-row w-1/2 h-full items-center justify-end py-2' style={{zIndex:-1}}>
        <div className='flex flex-col h-3/4 rounded-full bg-shades-dark' style={{width:"1px",transform:"translate(50%,0%)"}}>
        </div>
      </div>

      {/*Bring them to life*/}
      <div className='absolute top-0 left-0 flex flex-row w-full h-36 items-center justify-center' style={{transform:"translate(0%, calc(-100% - 4px)"}}>
        <div className='relative flex flex-row w-full h-full items-center justify-center'>
          {WHOLES.map((whole,wholeIndex)=>{
            return(
            <div key={wholeIndex} className='relative flex flex-col flex-1 h-full items-center justify-center'>

              {/*Light container*/}
              <div className={`flex flex-col h-16 w-16 sm:h-20 :w-20 items-center justify-center`}>
                {/*Light*/}
                <div className={`flex flex-col ${energyRotation%3===0?('rounded-sm'):"rounded-xl"} transition-all duration-3000 bg-white`} style={{height:`${energyRotation%3===0?ENERGY_MULTIPLES[energyMultipleIndex]*whole.scale:whole.scale}%`, width:`${energyRotation%4===0?ENERGY_MULTIPLES[energyMultipleIndex]*whole.scale:whole.scale}%`, transform:`rotate(${energyRotation}deg)`}}>
                </div>
              </div>

              {/*Light Pedestal*/}
              <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-end'>
                <div className='flex flex-col w-10 h-10 overflow-hidden items-center justify-end'>
                  <div className='rounded-full w-6 h-6 bg-white opacity-75' style={{transform:"translate(0%,50%)"}}>
                  </div>
                </div>
              </div>

            </div>
          )
          })}

          {/*Metric*/}
          <div className='absolute top-0 left-0 w-1/2 h-full flex flex-row items-center justify-end'>
            <div className='flex flex-col rounded-2xl bg-gray-900 items-center justify-center px-2 py-1' style={{transform:"translate(50%,0%)"}}>
              <div className='flex flex-col items-center justify-center text-c2-highlight font-bold text-2xl'>
                <LightNumber
                  value={WHOLES[1].scale/WHOLES[0].scale}
                  config={{
                    size:"xs",
                    prefix:"",
                    suffix:"X",
                    standardColor:"#fffff",
                    decimals:1,
                    bold:true,
                    centerText:true,
                    signed:false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Bar Labels*/}
      <div className='absolute bottom-0 left-0 flex flex-row w-full items-center justify-between'>
        <div className='relative flex flex-row w-full h-8 items-center px-4' style={{transform:"translate(0%, calc(100% + 8px))"}}>
          {/*Label Tile Tray*/}
          <div className='hidden flex flex-row w-full h-full items-center justify-between rounded-3xl bg-gray-900'>
          </div>

          {/*The Labels*/}
          {/*Count be icons*/}
          <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-between'>
            {WHOLES.map((whole,wholeIndex)=>{
              return(
                <div key={wholeIndex} className='relative flex flex-row flex-1 items-center justify-center text-xs sm:text-xl text-white font-bold m-1 px-2'>
                  {whole.parts.map((part,partIndex)=>{
                    let text = partIndex===0?'-':partIndex===1?'~':'+'
                    return(
                      <div key={partIndex} className='flex flex-col h-6 items-center justify-center mx-1' style={{width:`${part.coverage}%`}}>
                        <div className='flex flex-col h-full items-center justify-center bg-gray-900 px-4 pt-1 pb-2 rounded-2xl' style={{color:part.color, transform:"translate(-0.5px, 0%)"}}>
                          {text}
                        </div>
                      </div>
                    )
                  })}

                  {/*Q tile tray*/}
                  <div className='absolute top-0 bottom-0 flex flex-col w-full h-full items-center justify-center px-8' style={{transform:"translate(0%, calc(100% + 10px)"}}>
                    <div className='flex flex-col h-6 rounded-full w-full bg-gray-900 items-center justify-center mx-1'>
                      <div className='flex flex-col h-full items-center justify-center text-sm text-gray-600' style={{transform:"translate(-0.5px, 0%)"}}>
                        {whole.id}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/*Chart Type*/}
          <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-center' style={{transform:"translate(0%,calc(100% + 40px))"}}>
            <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
              {WHOLES[0].parts.map((part,partIndex)=>{
                return(
                  <div key={partIndex} className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                    <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:part.color}}>
                    </div>
                    <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                      {part.id}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

//Extended Light Containers (A|B comparison) Whole From To
const LightStore= (props) =>{

  let WHOLES=[
    {id:"0", color:"#111827", scale:30, parts:[
      {id:"1", color:"#5eead4", coverage:10 ,selected:true, pieces:[{id:"0", coverage:20},{id:"1", coverage:60},{id:"2", coverage:10},{id:"3", coverage:10}]},
      {id:"0", color:"#22d3ee", coverage:80, selected:true, pieces:[{id:"0", coverage:30},{id:"1", coverage:20},{id:"2", coverage:10},{id:"3", coverage:40}]},
      {id:"3", color:"#4f46e5", coverage:10, selected:true, pieces:[{id:"0", coverage:15},{id:"1", coverage:10},{id:"2", coverage:40},{id:"3", coverage:45}]}
    ],},
    {id:"1", color:"#111827", scale:95, parts:[
      {id:"1", color:"#5eead4", coverage:10, selected:true, pieces:[{id:"0", coverage:25},{id:"1", coverage:60},{id:"2", coverage:5},{id:"3", coverage:10}]},
      {id:"0", color:"#22d3ee", coverage:65, selected:true, pieces:[{id:"0", coverage:40},{id:"1", coverage:10},{id:"2", coverage:5},{id:"3", coverage:80}]},
      {id:"3", color:"#4f46e5", coverage:25, selected:true, pieces:[{id:"0", coverage:30},{id:"1", coverage:5},{id:"2", coverage:40},{id:"3", coverage:50}]}
    ]},
  ];
  let ENERGY_MULTIPLES=[1.1, 0.8, 0.7, 0.6, 0.9, 0.8];
  let SEGMENT_ENERGY_MULTIPLES=[1.1, 0.9, 0.75, 0.85];
  let COLORS=["#22c55e","#ffffff","#22d3ee","#ffffff","#f43f5e","#ffffff"];

  //Timers for the segment and energy views
  useEffect(()=>{
    if(true){
      let energyTimer = setInterval(()=>{
        let newRotation=Math.floor(Math.random()*3);

        let signedRotation=newRotation%2===0?-newRotation:newRotation;

        let newEnergyMultipleIndex=segmentEnergyMultipleIndex===SEGMENT_ENERGY_MULTIPLES.length-1?0:segmentEnergyMultipleIndex+1;

        setSegmentEnergyMultipleIndex(newEnergyMultipleIndex);
        setSegmentEnergyRotation(signedRotation);
      },2300);

      return ()=>clearInterval (energyTimer);
    }
  },[])
  useEffect(()=>{
    if(true){
      let energyTimer = setInterval(()=>{
        let newRotation=Math.min(500,Math.floor(Math.random()*300)+250);

        let signedRotation=newRotation%2===0?-newRotation:newRotation;

        let newEnergyMultipleIndex=energyMultipleIndex===ENERGY_MULTIPLES.length-1?0:energyMultipleIndex+1;

        setEnergyMultipleIndex(newEnergyMultipleIndex);
        setEnergyRotation(signedRotation);
      },2800);

      setEnergy(true);

      return ()=>clearInterval (energyTimer);
    }
  },[])

  //If animate energy barrier
  useEffect(()=>{
    if(props.showEnergyBarrier){
      //These seem to work well
      let OPACITY_MASK=[
        [4,3],
        [6,0],
        [5,3],
        [4,0],
        [7,5],
      ]

      //Create a new energy barrier
      let newEnergyBarrier = [];
      for(let i=0; i<20; i++){
        let newEnergyRow = {id:i, cells:[]};
        for (let j=0; j<10; j++){
          //Create cool opaity masks here, then just rotate though them;
          let opacity=OPACITY_MASK.map((entry,index)=>(i+j)%OPACITY_MASK[index][0]===0||(i+j*2)%OPACITY_MASK[index][0]===0?87:38);
          let whiteOpacity=OPACITY_MASK.map((entry,index)=>j%OPACITY_MASK[index][1]===0&&i%OPACITY_MASK[index][0]!==0?40:0);
          let blackOpacity=OPACITY_MASK.map((entry,index)=>i%OPACITY_MASK[index][1]===0&&j%OPACITY_MASK[index][0]!==0?15:0);

          let newEnergyCell = {id:String(i+"-"+j), row:i, col:j, opacity:opacity, whiteOpacity:whiteOpacity, blackOpacity:blackOpacity};
          newEnergyRow.cells.push(newEnergyCell);
        }
        newEnergyBarrier.push(newEnergyRow);
      }

      setEnergyBarrier(newEnergyBarrier);

      //Rotate between the pre-set 'cool looking masks'
      let opacityTimer=setInterval(()=>{
        setEnergyBarrierIndex((energyBarrierIndex)=>energyBarrierIndex===OPACITY_MASK.length-1?0:energyBarrierIndex+1);
      },2300);

      return ()=>clearInterval(opacityTimer);
    }

  },[props.showEnergyBarrier]);

  const [segmentEnergyRotation, setSegmentEnergyRotation] = useState(0);
  const [segmentEnergyMultipleIndex, setSegmentEnergyMultipleIndex] = useState(0);

  const [energy, setEnergy] = useState(true);
  const [energyRotation, setEnergyRotation] = useState(100);
  const [energyMultipleIndex, setEnergyMultipleIndex] = useState(0);
  const [energyBarrier, setEnergyBarrier] = useState([]);
  const [energyBarrierIndex, setEnergyBarrierIndex]= useState(0);
  const [energyViewIndex,setEnergyViewIndex]=useState(0)

  const [wholes,setWholes]=useState(WHOLES);
  const [activeCategoryIndex,setActiveCategoryIndex]=useState(0);
  const [activePiece,setActivePiece]=useState({id:"3134244552341",  coverage:20, selectionID:"0-0"});

  return(
    <div className='relative flex flex-col w-full items-center justify-center' style={{height:"28rem"}}>
      {/*Show the partition maps*/}
      <div className='flex flex-row w-full h-full items-center justify-start'>
        {wholes.map((whole, wholeIndex)=>{
          return(
            <div key={wholeIndex} className='flex flex-col flex-1 h-full items-center justify-center m-1'>
              <div className={`flex flex-row items-center h-full w-full justify-start p-2 border-gray-900 border-t-4 rounded-3xl`}>
                {whole.parts.map((part,partIndex)=>{
                  return(
                    <div key={partIndex} className={`relative flex flex-col rounded-md items-center justify-center ${true?("pt-28 pb-4"):("py-2")} px-1.5 mx-1 my-0.5 transition-all duration-1000 delay-300 ease-in`} style={{height:`${energy?"100%":'20px'}`, width:`${part.coverage}%`, minWidth:"20px", opacity:`${part.selected?"100%":"45%"}`}}>
                      {(true||props.lightGranularityID==='AVERAGE-UPLIFT')&&part.pieces.map((piece,pieceIndex)=>{
                        return(
                          <div key={pieceIndex} className='relative flex flex-row w-full items-center justify-center m-0.5' style={{borderColor:part.color, height:`${piece.coverage}%`, minHeight:"2px"}}>

                            {/*Light container*/}
                            {piece.coverage>0?(
                              <div className={`relative flex flex-col h-full w-5/6 items-center justify-center`}>
                                {/*Light*/}
                                <div className={`flex flex-col flex-shrink-0 rounded-full transition-all duration-3000`} style={{backgroundColor:part.color, height:`${Math.min(95,segmentEnergyRotation%2===0?SEGMENT_ENERGY_MULTIPLES[segmentEnergyMultipleIndex]*piece.coverage:piece.coverage)}%`, width:`${piece.coverage}%`, transform:`translate(0%,${segmentEnergyRotation%3===0?"-4px":"0px"}),rotate(${segmentEnergyRotation}deg)`, minHeight:"6px", minWidth:"6px"}}>
                                </div>
                              </div>
                            ):(
                              <div className='hidden rounded-full w-full h-full bg-gray-900 flex-shrink-0' style={{height:"2px"}}/>
                            )}

                            {/*Bin dividers*/}
                            {pieceIndex>0?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full'>
                                <div className='rounded-full w-1/4' style={{height:"1px", opacity:"75%", backgroundColor:part.color, transform:"translate(0%,-50%)"}}>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}

                            {/*Volumetric Cell Borders*/}
                            <div className='hidden absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-0.5 rounded-md border-2 rounded-3xl' style={{zIndex:"1", borderColor:part.color}}>
                            </div>

                            {/*Stick the piece in the active piece + part*/}
                            {activePiece&&String(partIndex+"-"+pieceIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full rounded-3xl border-2 z-0 overflow-hidden' style={{borderColor:part.color}}>
                                {/*100% Bar 'We want to show the '% full for the category, so we use 100% stacked bars like a water level''*/}
                                <div className='relative flex flex-col w-full h-full items-center justify-center border-t-4 border-white rounded-2xl overflow-hidden'style={{zIndex:5, width:`${100}%`, height:`${activePiece.coverage[wholeIndex]}%`}}>
                                  <div className='flex flex-row items-center justify-start w-full h-full bg-white' style={{zIndex:3, opacity:"75%"}}>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}

                            {/*Stick the label over the top as an overlay*/}
                            {activePiece&&String(partIndex+"-"+pieceIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full rounded-3xl z-20 overflow-visible'>
                                <div className='relative flex flex-col items-center justify-start' style={{zIndex:5, width:`${100}%`, height:`${100}%`}}>
                                  {/*Label*/}
                                  <div className='flex flex-col w-full h-full items-center justify-center z-20'>
                                    <div className='flex flex-col items-center justify-center rounded-2xl bg-black rounded-xl text-md font-bold px-2.5 py-1 flex-shrink-0 border-r-4 border-l-4' style={{borderColor:part.color, color:part.color}}>
                                      <LightNumber
                                        value={activePiece.coverage[wholeIndex]}
                                        config={{
                                          size:"sm",
                                          prefix:"",
                                          suffix:"%",
                                          standardColor:"#fffff",
                                          decimals:0,
                                          bold:true,
                                          centerText:true,
                                          signed:false,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}
                          </div>
                        )
                      })}

                      {/*WIP segments*/}
                      {false && part.segments.map((segment,segmentIndex)=>{
                        return(
                          <div key={segmentIndex} className='relative flex flex-row w-full items-center justify-center m-0.5' style={{borderColor:segment.color, height:`${segment.coverage}%`, minHeight:"2px"}}>

                            {/*Light container*/}
                            {segment.coverage>0?(
                              <div className={`relative flex flex-col h-full w-5/6 items-center justify-center`}>
                                {/*Light*/}
                                <div className={`flex flex-col items-center justify-center flex-shrink-0 rounded-full transition-all duration-3000 text-white font-bold` } style={{backgroundColor:segment.color, height:`${Math.min(95,segmentEnergyRotation%2===0?SEGMENT_ENERGY_MULTIPLES[segmentEnergyMultipleIndex]*segment.coverage:segment.coverage)}%`, width:`${segment.coverage}%`, transform:`translate(0%,${segmentEnergyRotation%3===0?"-4px":"0px"}),rotate(${segmentEnergyRotation}deg)`, minHeight:"6px", minWidth:"6px"}}>
                                  <div className={`hidden relative flex flex-shrink-0 text-xs font-bold px-1 py-0.5 bg-gray-900 rounded-md z-20`} style={{color:segment.color}}>
                                    <LightNumber
                                      value={segment.value}
                                      config={{
                                        size:"xs",
                                        prefix:wholeIndex===0?"$":"$$",
                                        suffix:"",
                                        standardColor:"#fffff",
                                        decimals:1,
                                        bold:true,
                                        centerText:true,
                                        signed:false,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden rounded-full w-full h-full bg-gray-900 flex-shrink-0' style={{height:"2px"}}/>
                            )}

                            {/*Bin dividers: Not needed for segment POP comparisons*/}
                            {false && segmentIndex>0?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full'>
                                <div className='rounded-full w-1/4' style={{height:"1px", opacity:"75%", backgroundColor:'#ffffff', transform:"translate(0%,-50%)"}}>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}

                            {/*Volumetric Cell Borders*/}
                            <div className='hidden absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-0.5 rounded-md border-2 rounded-3xl' style={{zIndex:"1", borderColor:segment.color}}>
                            </div>

                            {/*Stick the piece in the active piece + part*/}
                            {false && activePiece&&String(partIndex+"-"+segmentIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full rounded-3xl border-2 z-0 overflow-hidden' style={{borderColor:segment.color}}>
                                {/*100% Bar 'We want to show the '% full for the category, so we use 100% stacked bars like a water level''*/}
                                <div className='relative flex flex-col w-full h-full items-center justify-center border-t-4 border-white rounded-2xl overflow-hidden'style={{zIndex:5, width:`${100}%`, height:`${activePiece.coverage[wholeIndex]}%`}}>
                                  <div className='flex flex-row items-center justify-start w-full h-full bg-white' style={{zIndex:3, opacity:"75%"}}>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}

                            {/*Stick the label over the top as an overlay*/}
                            {false && activePiece&&String(partIndex+"-"+segmentIndex)===activePiece.selectionID?(
                              <div className='absolute top-0 left-0 flex flex-col items-center justify-start w-full h-full rounded-3xl z-20 overflow-visible'>
                                <div className='relative flex flex-col items-center justify-start' style={{zIndex:5, width:`${100}%`, height:`${100}%`}}>
                                  {/*Label*/}
                                  <div className='flex flex-col w-full h-full items-center justify-center z-20'>
                                    <div className='flex flex-col items-center justify-center rounded-2xl bg-black rounded-xl text-md font-bold px-2.5 py-1 flex-shrink-0 border-r-4 border-l-4' style={{borderColor:part.color, color:part.color}}>
                                      <LightNumber
                                        value={activePiece.coverage[wholeIndex]}
                                        config={{
                                          size:"sm",
                                          prefix:"",
                                          suffix:"%",
                                          standardColor:"#fffff",
                                          decimals:0,
                                          bold:true,
                                          centerText:true,
                                          signed:false,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div className='hidden' />
                            )}
                          </div>
                        )
                      })}

                      {/*Borders  (+ Shading) + Energy Barrier background */}
                      <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center' style={{opacity:`${"100%"}`}}>
                        <div className='relative flex flex-col w-full h-full items-center justify-center'>
                          {/*Top Bracket*/}
                          <div className='absolute top-0 left-0 w-full h-12 rounded-3xl border-t-4' style={{borderColor:part.color,}}>
                          </div>
                          {/*Bottom Bracket*/}
                          <div className='absolute bottom-0 left-0 w-full h-12 rounded-3xl border-b-4' style={{borderColor:part.color,}}>
                          </div>

                          {/*If you want to shade the 'background of the bars' */}
                          <div className='hidden h-full w-full rounded-3xl' style={{opacity:"10%", backgroundColor:part.color}}>
                          </div>

                          {/*New Energy Barrier*/}
                          {props.energyBarrier?(
                            <div className='flex flex-col h-full w-full rounded-3xl items-center justify-start overflow-hidden border-t-4 border-b-4 border-transparent'>
                              {energyBarrier.map((row,rowIndex)=>{
                                return(
                                  <div className='flex flex-row w-full flex-1 items-center justify-start'>
                                    {row.cells.map((energyCell,colIndex)=>{
                                      //Have the  middle blue alternate patterns from the green and red
                                      let opacityindex=partIndex===1?(energyCell.opacity.length-1-energyBarrierIndex):energyBarrierIndex;
                                      return(
                                        <div className='relative flex flex-col h-full flex-1 rounded-sm overflow-hidden'>
                                          {/*Borders and border opacity*/}
                                          <div className='absolute top-0 left-0 flex flex-col h-full w-full' style={{borderColor:part.color, borderWidth:"1px", opacity:`${50}%`}}>
                                          </div>

                                          {/*Background and fill opacity*/}
                                          <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:part.color, opacity:`${energyCell.opacity[opacityindex]}%`}}>
                                          </div>

                                          {/*Background and fill opacity*/}
                                          <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:"#ffffff", opacity:`${energyCell.whiteOpacity[opacityindex]}%`}}>
                                          </div>

                                          {/*Background and fill opacity*/}
                                          <div className='absolute top-0 left-0 flex flex-col h-full w-full transition-all duration-5000' style={{backgroundColor:"#000000", opacity:`${energyCell.blackOpacity[opacityindex]}%`}}>
                                          </div>
                                        </div>
                                      )
                                  })}
                                </div>
                              )
                            })}
                            </div>
                          ):(
                            <div className='hidden' />
                          )}
                        </div>
                      </div>

                      {/*Borders -- If you want to 'overlay tiles' Center Tiles*/}
                      <div className='hidden absolute top-0 left-0 flex flex-row w-full h-full rounded-3xl items-center justify-center' style={{borderColor:part.color, opacity:`${"100%"}`}}>
                        <div className='h-1/2 w-1/2 rounded-3xl border-2 bg-gray-900' style={{opacity:"100%", borderColor:part.color}}>
                        </div>
                      </div>

                      {/*Midpoints -- if you want to add mid lines*/}
                      {part.totalValue===0?(
                        <div className='absolute top-0 left-0 flex flex-row w-1/2 border-r' style={{height:"100%", borderColor:part.color, zIndex:-1}}>
                        </div>
                      ):(
                        <div className=''/>
                      )}

                      {/*Percentage Icons Show when the view id is set*/}
                      {!props.energyStore?(
                        <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center transition-all' style={{zIndex:30}}>
                          <div className='flex flex-col w-5/6 items-center justify-center rounded-3xl bg-black'>
                            <div className='flex flex-col items-center justify-center rounded-3xl bg-black'>
                              {part.totalValue>0?(
                                <div className='relative flex flex-col items-center justify-center text-2xl font-bold my-1' style={{color:part.color}}>
                                  <LightNumber
                                    value={part.totalValue}
                                    config={{
                                      size:"sm",
                                      prefix:"$",
                                      suffix:"",
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />

                                  <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-center text-sm font-medium' style={{color:part.color, transform:"translate(0%,100%)"}}>
                                    <LightNumber
                                      value={wholeIndex===0?(wholes[1].parts[partIndex].totalValue-part.totalValue):(wholes[0].parts[partIndex].totalValue>0?(part.totalValue-wholes[0].parts[partIndex].totalValue)/wholes[0].parts[partIndex].totalValue*100:0)}
                                      config={{
                                        size:"sm",
                                        prefix:wholeIndex===0?"$$":"",
                                        suffix:wholeIndex===0?"":"%%",
                                        standardColor:"#fffff",
                                        decimals:0,
                                        bold:true,
                                        centerText:true,
                                        signed:false,
                                      }}
                                    />
                                    <div className='flex flex-col w-full items-center justify-center font-light italic text-shades' style={{fontSize:"0.55rem"}}>
                                      {(<LightNumber
                                        value={part.coverage}
                                        config={{
                                          size:"sm",
                                          prefix:"",
                                          suffix:"%",
                                          standardColor:"#fffff",
                                          decimals:0,
                                          bold:true,
                                          centerText:true,
                                          signed:false,
                                        }}
                                      />)}
                                    </div>
                                  </div>
                                </div>
                              ):(
                                <div className='hidden'/>
                              )}
                            </div>
                          </div>
                        </div>
                      ):(
                        <div className='hidden'/>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/*Mid-Point Overlays */}
      <div className='absolute top-0 left-0 flex flex-row w-1/2 h-full items-center justify-end py-2' style={{zIndex:-1}}>
        <div className='flex flex-col h-3/4 rounded-full bg-shades-dark' style={{width:"1px", transform:"translate(50%,0%)"}}>
        </div>
      </div>

      {/*Bring them to life*/}
      <div className='absolute top-0 left-0 flex flex-row w-full h-36 items-center justify-center' style={{transform:"translate(0%, calc(-100% - 4px)"}}>
        <div className='relative flex flex-row w-full h-full items-center justify-center'>
          {wholes.map((whole,wholeIndex)=>{
            return(
            <div key={wholeIndex} className='relative flex flex-col flex-1 h-full items-center justify-center'>

              {/*Light container*/}
              <div className={`flex flex-col h-16 w-16 sm:h-20 :w-20 items-center justify-center`}>
                {/*Light*/}
                <div className={`flex flex-col ${energyRotation%3===0?('rounded-sm'):"rounded-xl"} transition-all duration-3000 bg-white`} style={{height:`${energyRotation%3===0?ENERGY_MULTIPLES[energyMultipleIndex]*whole.scale:whole.scale}%`, width:`${energyRotation%4===0?ENERGY_MULTIPLES[energyMultipleIndex]*whole.scale:whole.scale}%`, transform:`rotate(${energyRotation}deg)`}}>
                </div>
              </div>

              {/*Light Pedestal*/}
              <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-end'>
                <div className='flex flex-col w-10 h-10 overflow-hidden items-center justify-end'>
                  <div className='rounded-full w-6 h-6 bg-white opacity-75' style={{transform:"translate(0%,50%)"}}>
                  </div>
                </div>
              </div>

            </div>
          )
          })}

          {/*Metric*/}
          <div className='absolute top-0 left-0 w-1/2 h-full flex flex-row items-center justify-end'>
            <div className='relative flex flex-col rounded-2xl bg-gray-900 items-center justify-center px-2 py-1' style={{transform:"translate(50%,0%)"}}>
              <div className='flex flex-col items-center justify-center text-c2-highlight font-bold text-2xl'>
                <LightNumber
                  value={wholes[1].scale/wholes[0].scale}
                  config={{
                    size:"xs",
                    prefix:"",
                    suffix:"X",
                    standardColor:"#fffff",
                    decimals:1,
                    bold:true,
                    centerText:true,
                    signed:false,
                  }}
                />
              </div>

              <div className='hidden absolute bottom-0 left-0 w-full flex flex-col items-center justify-center text-c2-highlight font-bold italic' style={{fontSize:"0.5rem",transform:"translate(0%,100%)"}}>
                <LightNumber
                  value={wholes[1].totalValue-wholes[0].totalValue}
                  config={{
                    size:"xs",
                    prefix:"$$",
                    suffix:"",
                    standardColor:"#fffff",
                    decimals:1,
                    bold:true,
                    centerText:true,
                    signed:false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Bar Labels*/}
      <div className='absolute bottom-0 left-0 flex flex-row w-full items-center justify-between'>
        <div className='relative flex flex-row w-full h-8 items-center px-4' style={{transform:"translate(0%, calc(100% + 8px))"}}>
          {/*Label Tile Tray*/}
          <div className='hidden flex flex-row w-full h-full items-center justify-between rounded-3xl bg-gray-900'>
          </div>

          {/*The Labels*/}
          {/*Count be icons*/}
          <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-between'>
            {wholes.map((whole,wholeIndex)=>{
              return(
                <div key={wholeIndex} className='relative flex flex-row flex-wrap flex-1 justify-center items-center'>
                  {/*Q tile tray*/}
                  <div className='absolute top-0 bottom-0 flex flex-col w-full h-full items-center justify-center px-8'>
                    <div className='flex flex-col rounded-full w-1/2 bg-gray-900 items-center justify-center p-2'>
                      <div className='flex flex-col h-full items-center justify-center text-sm font-bold text-gray-400'>
                        {whole.id}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/*Chart Type*/}
          <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-center' style={{transform:"translate(0%,calc(100% + 12px))"}}>
            <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
              {wholes[0].parts.map((part,partIndex)=>{
                return(
                  <div key={partIndex} className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                    <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:part.color}}>
                    </div>
                    <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                      {part.id}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//Nice extendy light window for if we want to position things in a super sexy futureistic window like thing from consistent apple watch like base
const LightTile = ()=>{

  const [tiltLeft,setTiltLeft]=useState(false);
  const [tiltRight,setTiltRight]=useState(false);

  const [flow,setFlow]=useState(false);
  const [shineOffset,setShineOffset]=useState(85);
  const [showPill,setShowPill]=useState(false);

  const [flash,setFlash]=useState(false);
  const [flourish,setFlourish]=useState(false);
  const [extendSaber,setExtendSaber]=useState(false);

  useEffect(()=>{

    /*
    let shineTimer=setInterval(()=>{
      setTilt(Math.random()*100);
    },3000)
    */

    //return ()=>clearInterval(shineTimer);

    initLightTile();
  },[]);

  const handleMouseEnter=(event)=>{

    console.log(event);
    let dimensions=event.target.getBoundingClientRect();

    console.log({status:"Event Entered From", dims:dimensions, clientX:event.clientX});

    if(Math.abs(dimensions.left-event.clientX)<Math.abs(dimensions.right-event.clientX)){
      setTiltLeft(true);
      setTimeout(()=>setFlow(true),100);
      setTimeout(()=>setFlow(false),1000);
    }else{
      setTiltRight(true);
      setTimeout(()=>setFlow(true),100);
      setTimeout(()=>setFlow(false),800);
    }


  }

  const handleMouseExit=(event)=>{
    console.log(event);

    setTiltLeft(false);
    setTiltRight(false);

    setTimeout(()=>setFlow(true),100);
    setTimeout(()=>setFlow(false),700);
  }

  const initLightTile = ()=>{
    setTimeout(()=>setFlash(true),30);

    setTimeout(()=>setFlourish(true),500);

    setTimeout(()=>setExtendSaber(true),1500);
  }

  return(
    <div className='flex flex-col w-full h-full items-center justify-start pt-8'>

      {/*Background Image for Tile Shading*/}
      <div className='relative flex flex-col items-center justify-end w-3/4 h-3/4'>
        {/*Background Light Orb*/}
        <div className='hidden relative flex flex-col items-center justify-center w-96 h-96 bg-gradient-to-r from-fuchsia-500 to-violet-500 via-cyan-500 rounded-3xl transition-all duration-1500 mb-4' style={{height:`${flash?"20rem":"0%"}`, width:`${flourish?"14rem":"0%"}`,}}>
        </div>

        {/*Light Tile*/}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end'>
          <div className='flex flex-col items-center justify-center transtion-all duration-500 rounded-full' style={{height:`${flash?"100%":"0%"}`, width:`${flourish?"100%":"0%"}`,}}>
            <div className={`flex flex-col items-center justify-end h-full transition-all duration-500 ease-in ${!extendSaber?("border-r border-l border-b-2"):flourish?("border-b-2"):""} w-96`} style={{width:`${flourish?"28rem":"0%"}`,}}>
              <div className={`relative flex flex-col items-center justify-end rounded-3xl ${tiltRight || tiltLeft?'shadow-2xl w-48':"shadow-sm w-full"} ${extendSaber?("border"):""} overflow-hidden transition-all duration-1000 ease-in-out mb-4`} style={{height:`${extendSaber?"20rem":"0%"}`,transform:`translate(${tiltLeft?('-3px, 0px'):tiltRight?"2px,0px":"0px,0px"})`}}>
                {/*Shading Tile*/}
                <div className='flex flex-col items-center justify-end rounded-3xl h-full bg-white'style={{opacity:"35%", width:"28rem"}}>
                </div>

                {/*Liquid Animation Pill*/}
                {showPill?(
                  <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end' style={{zIndex:10}}>
                    <div className={`relative flex flex-row items-end justify-start rounded-full w-4/5 h-8 my-2 shadow-md transition-all duration-1000 ease-in`}>
                      <div className={`flex flex-row h-full transition-all duration-1500 ease-in-out`} style={{width:`${tiltRight?"85%":tiltLeft?"0%":"42%"}` }}>
                      </div>
                      <div className={`rounded-full bg-white flex-shrink-0 transition-all duration-1500 ease-in-out ${flow?"w-10":tiltLeft||tiltRight?"w-6":"w-8"} ${flow?"h-2/5":"h-full"}`}>
                      </div>

                      <div className='hidden absolute top-0 left-0 w-full h-full flex flex-col items-center jusfiy-end'>
                        <div className='w-8 h-full border-b-2 rounded-3xl'>
                        </div>
                      </div>
                    </div>
                  </div>
                ):(
                  <div />
                )}

                {/*Light Source Animation Shining*/}
                <div className='hidden absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start' style={{zIndex:5}}>

                  {/*Create a layer mask*/}
                  <div className='relative w-full h-full flex flex-col items-center justify-start' style={{zIndex:4, opacity:"100%"}}>

                    {/*Light Source */}
                    <div className='flex flex-row flex-1 items-start justify-end transition-all duration-2000 ease-in-out pt-4' style={{zIndex:2, width:`${65}%`,transform:`translate(${tiltLeft?('-12px'):tiltRight?"12px":"0px"})`}}>
                      <div className='flex flex-row rounded-full w-4 h-4 bg-white animate-pulse transition-all duration-800 ease-in-out' style={{opacity:"100%", transform:`translate(calc(50%),0%)`}}>
                      </div>
                    </div>

                    {/*Soace the layer mask on top of the pedastal*/}
                    <div className='flex flex-row w-full h-5/6'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Light Tile Pedastal*/}
        <div className='absolute bottom-0 left-0 w-full h-28 flex flex-col items-center justify-end' style={{transform:"translate(0%,100%)"}}>

          <div className='h-8 flex flex-col w-full items-center justify-around mb-1'>
            <div className='rounded-full w-24 h-0.5 bg-gray-700'>
            </div>
            <div className='rounded-full w-12 h-0.5 bg-gray-700'>
            </div>
            <div className='rounded-full w-8 h-0.5  bg-gray-700'>
            </div>
          </div>

          <div className='rounded-3xl bg-gray-900 w-16 h-16 flex flex-col items-center justify-center' style={{transform:"rotate(45deg)"}}>
            <div className='rounded-full w-3 h-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 animate-spin'>
            </div>
          </div>

        </div>
      </div>

      {/*Event detection layer*/}
      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center' style={{zIndex:30}}>
        <div className='flex flex-col items-center justify-center w-96 h-96'>
          <div className='flex flex-col items-center justify-center w-48 h-72' onMouseEnter={(event)=>handleMouseEnter(event)} onMouseLeave={()=>handleMouseExit()}>
          </div>
        </div>
      </div>
    </div>
  )
}

//Zoom tile to show additional magnifiacions if needed
const ZoomTile = ()=>{

  const COUNT=100;

  const [pointer,setPointer]=useState(null);
  const [traceGrid,setTraceGrid] = useState([]);

  useEffect(()=>{
    initializeTraceGrid();
  },[]);

  const initializeTraceGrid = () =>{
    let newTraceGrid=[];

    for(let i=0; i<COUNT; i++){
      let newRow = [];
      for(let j=0; j<COUNT; j++){
        let newCell = {id:String(i+"-"+j), row:i, column:j, height:100-i, width:j}
        newRow.push(newCell);
      }
      newTraceGrid.push(newRow);
    }
    setTraceGrid(newTraceGrid);

    console.log({status:"Initialized Trace Grid", grid:traceGrid});
  }

  return(
    <div className='relative flex flex-col items-center justify-start w-full h-full rounded-3xl'>
      {traceGrid.map((row,rowIndex)=>{
        return(
          <div className='flex flex-row w-full flex-1 items-center justify-start'>
            {row.map((cell,colIndex)=>{
              return(
                <div key={cell.id} className='flex flex-col h-full flex-1  ease-in-out' onMouseEnter={()=>setPointer(cell)} >
                </div>
              )
            })}
          </div>
        )
      })}

      <div id={'zoomLightView'} className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-end border rounded-3xl' style={{zIndex:-5}}>
        <div className='flex flex-row w-full border-2 border-dotted'>
          <div className='flex flex-1'>
          </div>
          {/*Window*/}
          <div className='flex flex-col w-96 h-96 rounded-3xl border flex-shrink-0 border'>
            <div className='flex flex-row w-full h-full rounded-3xl bg-white opacity-25'>
            </div>
          </div>
          <div className='relative flex flex-col h-full items-end justify-start' style={{width:`${pointer?100-pointer.width:0}%`}}>
          </div>
        </div>
        <div className='flex flex-row w-full' style={{height:`${pointer?pointer.height:0}%`}}>
        </div>
      </div>
    </div>
  )
}

//Animate [<||>] push pull on mouse enter
//Liquid pill effect
const PivotTile = ()=>{

  const [tiltLeft,setTiltLeft]=useState(false);
  const [tiltRight,setTiltRight]=useState(false);

  const [flow,setFlow]=useState(false);
  const [shineOffset,setShineOffset]=useState(85);
  const [showPill,setShowPill]=useState(false);

  const [flash,setFlash]=useState(false);
  const [flourish,setFlourish]=useState(false);
  const [extendSaber,setExtendSaber]=useState(false);

  useEffect(()=>{

    /*
    let shineTimer=setInterval(()=>{
      setTilt(Math.random()*100);
    },3000)
    */

    //return ()=>clearInterval(shineTimer);

    initLightTile();
  },[]);

  const handleMouseEnter=(event)=>{

    console.log(event);
    let dimensions=event.target.getBoundingClientRect();

    console.log({status:"Event Entered From", dims:dimensions, clientX:event.clientX});

    if(Math.abs(dimensions.left-event.clientX)<Math.abs(dimensions.right-event.clientX)){
      setTiltLeft(true);
      setTimeout(()=>setFlow(true),100);
      setTimeout(()=>setFlow(false),1000);
    }else{
      setTiltRight(true);
      setTimeout(()=>setFlow(true),100);
      setTimeout(()=>setFlow(false),800);
    }


  }

  const handleMouseExit=(event)=>{
    console.log(event);

    setTiltLeft(false);
    setTiltRight(false);

    setTimeout(()=>setFlow(true),100);
    setTimeout(()=>setFlow(false),700);
  }

  const initLightTile = ()=>{
    setTimeout(()=>setExtendSaber(true),1500);
  }

  return(
    <div className='flex flex-col w-full h-full items-center justify-start pt-8'>

      {/*Background Image for Tile Shading*/}
      <div className='relative flex flex-col items-center justify-center w-3/4 h-3/4'>
        {/*Background Light Orb*/}
        <div className='relative flex flex-col items-center justify-center w-96 h-96 bg-gradient-to-r from-fuchsia-500 to-violet-500 via-cyan-500 rounded-full'>
        </div>

        {/*Light Tile*/}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
          <div className={`relative flex flex-col items-center justify-end rounded-3xl ${tiltRight || tiltLeft?'shadow-2xl w-48':"shadow-sm w-56"} ${extendSaber?("border"):""} overflow-hidden transition-all duration-1000 ease-in-out`} style={{height:`${extendSaber?"20rem":"0%"}`,transform:`translate(${tiltLeft?('-3px, 0px'):tiltRight?"2px,0px":"0px,0px"})`}}>
                {/*Shading Tile*/}
                <div className='flex flex-col items-center justify-end rounded-3xl h-full bg-white w-56'style={{opacity:"35%"}}>
                </div>

                {/*Liquid Animation Pill*/}
                {true?(
                  <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end' style={{zIndex:10}}>
                    <div className={`relative flex flex-row items-end justify-start rounded-full w-4/5 h-8 my-2 shadow-md transition-all duration-1000 ease-in`}>
                      <div className={`flex flex-row h-full transition-all duration-1500 ease-in-out`} style={{width:`${tiltRight?"85%":tiltLeft?"0%":"42%"}` }}>
                      </div>
                      <div className={`rounded-full bg-white flex-shrink-0 transition-all duration-1500 ease-in-out ${flow?"w-10":tiltLeft||tiltRight?"w-6":"w-8"} ${flow?"h-2/5":"h-full"}`}>
                      </div>

                      <div className='hidden absolute top-0 left-0 w-full h-full flex flex-col items-center jusfiy-end'>
                        <div className='w-8 h-full border-b-2 rounded-3xl'>
                        </div>
                      </div>
                    </div>
                  </div>
                ):(
                  <div />
                )}

                {/*Light Source Animation Shining*/}
                <div className='hidden absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start' style={{zIndex:5}}>

                  {/*Create a layer mask*/}
                  <div className='relative w-full h-full flex flex-col items-center justify-start' style={{zIndex:4, opacity:"100%"}}>

                    {/*Light Source */}
                    <div className='flex flex-row flex-1 items-start justify-end transition-all duration-2000 ease-in-out pt-4' style={{zIndex:2, width:`${65}%`,transform:`translate(${tiltLeft?('-12px'):tiltRight?"12px":"0px"})`}}>
                      <div className='flex flex-row rounded-full w-4 h-4 bg-white animate-pulse transition-all duration-800 ease-in-out' style={{opacity:"100%", transform:`translate(calc(50%),0%)`}}>
                      </div>
                    </div>

                    {/*Soace the layer mask on top of the pedastal*/}
                    <div className='flex flex-row w-full h-5/6'>
                    </div>
                  </div>
                </div>
          </div>
        </div>

        {/*Light Tile Pedastal*/}
        <div className='absolute bottom-0 left-0 w-full h-28 flex flex-col items-center justify-end' style={{transform:"translate(0%,100%)"}}>

          <div className='h-8 flex flex-col w-full items-center justify-around mb-1'>
            <div className='rounded-full w-24 h-0.5 bg-gray-700'>
            </div>
            <div className='rounded-full w-12 h-0.5 bg-gray-700'>
            </div>
            <div className='rounded-full w-8 h-0.5  bg-gray-700'>
            </div>
          </div>

          <div className='rounded-3xl bg-gray-900 w-16 h-16 flex flex-col items-center justify-center' style={{transform:"rotate(45deg)"}}>
            <div className='rounded-full w-3 h-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 animate-spin'>
            </div>
          </div>

        </div>
      </div>

      {/*Event detection layer*/}
      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center' style={{zIndex:30}}>
        <div className='flex flex-col items-center justify-center w-96 h-96'>
          <div className='flex flex-col items-center justify-center w-48 h-72' onMouseEnter={(event)=>handleMouseEnter(event)} onMouseLeave={()=>handleMouseExit()}>
          </div>
        </div>
      </div>
    </div>
  )
}

//WIP Playground for template types
const LightTemplates = (props) =>{

  //Segment Comparison types
  const PART_TO_WHOLE_TYPES = {
    'FLEX':{id:'FLEX', text:'Blob', description:"Dynamic Flex box to show case relative sizes",scrollOffset:0},
    '100%':{id:'100%', text:'100% Bar',description:"100% stacked bar",scrollOffset:2+35},
    'Aa|Bb':{id:'Aa|Bb', text:'Grouped Ratio', description:"Bars are grouped in Whole|Part pairs, to compare the difference in contribution margins from the part to the whole",scrollOffset:2+2*35,},
    'AB|ab':{id:'AB|ab', text:'Grouped Value', description:"Bars are grouped by value type to compare like to like",scrollOffset:2+3*35.5,},
  };

  //****TEMPLATES: FLEX_BOX PARTS AND WHOLES START
  const [valueA0,setValueA0]=useState(1000);
  const [valueB0,setValueB0]=useState(300);

  const [rate,setRate]=useState(30);
  const [wA0,setWA0]=useState(0);
  const [hA0,setHA0]=useState(0);

  const [wB0,setWB0]=useState(0);
  const [hB0,setHB0]=useState(0);

  const [wA1,setWA1]=useState(0);
  const [hA1,setHA1]=useState(0);

  const [wB1,setWB1]=useState(0);
  const [hB1,setHB1]=useState(0);

  const [heightIndex,setHeightIndex]=useState(0);

  let MAX_WIDTH_PERCENTAGE=0.95;
  let MAX_HEIGHT_PERCENTAGE=0.95;
  let HEIGHT_PERCENTAGES=['90','80','70','60','50','40','30','20','10'];

  //Grab the coordinates for the two referene columns
  useLayoutEffect(()=>{
    let refA = document.getElementById('A0');
    if(refA){
      let w = refA.getBoundingClientRect().width;
      let h = refA.getBoundingClientRect().height;

      setWA0(w);
      setHA0(h);

      setWB0(w);
      setHB0(h*valueB0/valueA0);
    }

  },[]);

  //Calculate random heights for the blobs, and then maintain their 'aereometric ratio'
  useEffect(()=>{

    if(wA0>0 && hA0>0 && wB0>0 && hB0>0){

      console.log({status:"Updateing the Size Timer", wA0:wA0, hA0:hA0, wB0:wB0, hB0:hB0,});

      let sizeTimer=setInterval(()=>{

        let areaA0 = wA0*hA0;
        let areaA1=areaA0*rate/100;
        let maxHeightA = hA0*MAX_HEIGHT_PERCENTAGE;
        let minHeightA = areaA1/(MAX_WIDTH_PERCENTAGE*wA0);

        let heightPercentA=Math.random();

        let randHeightA=Math.max(minHeightA,Math.min(heightPercentA*hA0,maxHeightA));
        setHA1(randHeightA);
        setWA1(areaA0*(rate/100)/randHeightA);

        let areaB0 = wB0*hB0;
        let areaB1=areaB0*rate/100;
        let maxHeightB = hB0*MAX_HEIGHT_PERCENTAGE;
        let minHeightB = areaB1/(MAX_WIDTH_PERCENTAGE*wB0);

        let heightPercentB=Math.random();

        let randHeightB=Math.max(minHeightB,Math.min(heightPercentB*hB0,maxHeightB));
        setHB1(randHeightB);
        setWB1(areaB0*(rate/100)/randHeightB);

        //console.log({status:"tick", areaA:areaA0, heightA:randHeightA, randWidthA:areaA0*(rate/100)/randHeightA, heightPA:heightPercent, wPA:(areaA0*(rate/100)/randHeightA)/wA0*100, randHeightB:randHeightB, randWidthtB:areaB0*(rate/100)/randHeightB})
        //console.log({status:"tick", wA:wA0, hA:hA0, minHeightA:minHeightA, maxHeightA:maxHeightA, areaA:areaA0, areaA1:areaA1, heightA:randHeightA, randWidthA:areaA0*(rate/100)/randHeightA, heightPA:heightPercentA, wPA:(areaA0*(rate/100)/randHeightA)/wA0*100,})
        //console.log({status:"tick", wB:wB0, hB:hB0, minHeightB:minHeightB, maxHeightB:maxHeightB, areaB:areaB0, areaB1:areaB1, heightB:randHeightB, randWidthB:areaB0*(rate/100)/randHeightB, heightPB:heightPercentB, wPB:(areaB0*(rate/100)/randHeightB)/wB0*100,})


      },3000);

      return ()=>clearInterval(sizeTimer);
    }

  },[wA0, hA0, wB0, hB0]);

  return(
    <div className='flex flex-col w-full h-full items-center justify-center'>
      {/******TEMPLATES START (idk....might just be better to make things fresh based on the view you want)******/}
      {/**Templates are 'pre-defined' light frameworks to make storytelling better **/}
      {/**Linked to **/}

      {/*AMAZING Light Parts & Wholes:(4) Template*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 px-2 pb-8'>
          {props.isMobile?(
            <div className='relative flex flex-col items-center justify-start px-2 overflow-y-scroll'>
              {/*Title*/}
              <div className='flex flex-col w-full items-end justify-center text-white font-bold text-xl mt-4 mb-2 px-2'>
                <span className='w-full text-left border-b-2 font-bold text-2xl' >'Death Rate'--A scary term for 'the ratio of a part to its whole, regardless of whether the whole is big or small...'</span>
                <span className='w-full text-left font-medium text-md'>Death Rate vs. Total Deaths, The Full Picture</span>
              </div>

              {/*Legend*/}
              <div id={'legend'} className={`flex flex-row flex-wrap w-full justify-center items-center p-2`}>
                <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
                  {[{id:'Total Deaths', color:"#7C3AED"}, {id:'COVID Deaths', color:"#38BDF8"}].map((entry,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${entry.color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {entry.id}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/*1) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                  <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:rate}%`, height:`${hA0>0?hA1/hA0*100:rate}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>

                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:rate}%`, height:`${hB0>0?hB1/hB0*100:rate}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap w-full items-start justify-start text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className='mb-4'>Visually comparing parts to wholes can be tricky.</span>
                <span className='mb-4'>Sometimes, the best answer is just let people see the whole picture!</span>
                <span className=''>With Light, you can easily view things from multiple perspectives at the same time.</span>
              </div>

              {/*2) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap w-full items-start justify-start text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                100% Bars are useful ways of visually comparing parts to wholes.
                <span className='font-light mb-2'>Because the widths are the same, you can visually compare parts to whole with just their heights.</span>
                <span className='font-light italic text-xs'>* Remember: Area's wont perfectly scale if you use rounded corners, but the tops of the bars still convey the information effectively =D!</span>
              </div>

              {/*4) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap items-start justify-start flex flex-row flex-wrap text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className='mb-4'>Grouped Bars where you can do 'A|B' comparisons are also good. Assume you scan 'left to right' this is 'PEMDAS' for data vis. </span>
                <span className='font-light'>1) The range from A to 30% A (700) is ~3X larger than the range of B to 30% B (210)</span>
                <span className='font-light'>2) A value base is bigger than B value base </span>
                <span className='font-light'>3) Rate*A is bigger than Rate*B</span>
              </div>

              {/*3) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap items-start justify-start flex flex-row flex-wrap text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className=''>Sorting Grouped Bars by type, allows for simple 'like to like' value comparisons.</span>
              </div>
            </div>
          ):(
            <div className='relative flex flex-col items-center justify-center'>

              <div className='relative flex flex-row flex-1 items-center justify-between'>
                {/*2) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                  {/*Chart*/}
                  <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                    <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                      {String(Number.parseInt(valueA0*rate/100))}
                    </div>
                  </div>
                  <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                    <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                      {String(Number.parseInt(valueB0*rate/100))}
                    </div>
                  </div>
                </div>

                {/*3) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                  {/*Chart*/}
                  <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                    {String(Number.parseInt(valueA0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                    {String(Number.parseInt(valueB0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>

                {/*4) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                  {/*Chart*/}
                  <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                    {String(Number.parseInt(valueA0))}
                  </div>
                  <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                    {String(Number.parseInt(valueB0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>

                {/*Title*/}
                <div className='absolute top-0 left-0 flex flex-col w-full items-end justify-center text-white font-bold text-xl px-2' style={{transform:"translate(0%,calc(-100% - 20px))"}}>
                  <span className='w-full text-left border-b-2 font-bold text-3xl' >'Main title here'</span>
                  <span className='w-full text-left font-medium text-md'>Subtitle here</span>
                </div>
              </div>

              {/*Legend*/}
              <div id={'legend'} className={`absolute bottom-0 left-0 flex flex-row flex-wrap w-full justify-center items-center p-2`} style={{transform:"translate(0%,calc(100%))"}}>
                <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
                  {false && [{id:'A'}, {id:'B'}].map((category,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {category.id}
                        </div>
                      </div>
                    )
                  })}
                  {[{id:'Total Deaths', color:"#7C3AED"}, {id:'COVID Deaths', color:"#38BDF8"}].map((entry,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${entry.color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {entry.id}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*AMAZING ('UI Corect') Light Parts & Wholes:(4) Template*/}
      {false?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 px-2 pb-8'>
          {props.isMobile?(
            <div className='relative flex flex-col items-center justify-start px-2 overflow-y-scroll'>
              {/*Title*/}
              <div className='flex flex-col w-full items-end justify-center text-white font-bold text-xl mt-4 mb-2 px-2'>
                <span className='w-full text-left border-b-2 font-bold text-2xl' >'Death Rate'--A scary term for 'the ratio of a part to its whole, regardless of whether the whole is big or small...'</span>
                <span className='w-full text-left font-medium text-md'>Death Rate vs. Total Deaths, The Full Picture</span>
              </div>

              {/*Legend*/}
              <div id={'legend'} className={`flex flex-row flex-wrap w-full justify-center items-center p-2`}>
                <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
                  {[{id:'Total Deaths', color:"#7C3AED"}, {id:'COVID Deaths', color:"#38BDF8"}].map((entry,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${entry.color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {entry.id}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/*1) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                  <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:rate}%`, height:`${hA0>0?hA1/hA0*100:rate}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>

                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:rate}%`, height:`${hB0>0?hB1/hB0*100:rate}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap w-full items-start justify-start text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className='mb-4'>Visually comparing parts to wholes can be tricky.</span>
                <span className='mb-4'>Sometimes, the best answer is just let people see the whole picture!</span>
                <span className=''>With Light, you can easily view things from multiple perspectives at the same time.</span>
              </div>

              {/*2) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap w-full items-start justify-start text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                100% Bars are useful ways of visually comparing parts to wholes.
                <span className='font-light mb-2'>Because the widths are the same, you can visually compare parts to whole with just their heights.</span>
                <span className='font-light italic text-xs'>* Remember: Area's wont perfectly scale if you use rounded corners, but the tops of the bars still convey the information effectively =D!</span>
              </div>

              {/*4) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap items-start justify-start flex flex-row flex-wrap text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className='mb-4'>Grouped Bars where you can do 'A|B' comparisons are also good. Assume you scan 'left to right' this is 'PEMDAS' for data vis. </span>
                <span className='font-light'>1) The range from A to 30% A (700) is ~3X larger than the range of B to 30% B (210)</span>
                <span className='font-light'>2) A value base is bigger than B value base </span>
                <span className='font-light'>3) Rate*A is bigger than Rate*B</span>
              </div>

              {/*3) */}
              <div className='relative w-80 h-80 flex flex-row flex-shrink-0 items-end justify-between bg-black p-2 rounded-3xl'>
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

              {/*Text message*/}
              <div className='flex flex-row flex-wrap items-start justify-start flex flex-row flex-wrap text-white font-bold text-left rounded-3xl bg-gray-900 p-2'>
                <span className=''>Sorting Grouped Bars by type, allows for simple 'like to like' value comparisons.</span>
              </div>
            </div>
          ):(
            <div className='relative flex flex-col items-center justify-center'>
              {/*Row 1*/}
              <div className='relative flex flex-row w-full flex-1 items-end justify-center'>
                {/*1) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                  {/*Chart*/}
                  <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                    <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:0}%`, height:`${hA0>0?hA1/hA0*100:0}%`}}>
                      {String(rate+"%")}
                    </div>

                    <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                      <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                      </div>
                    </div>

                    <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                      <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                      </div>
                    </div>

                  </div>
                  <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                    <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:0}%`, height:`${hB0>0?hB1/hB0*100:0}%`}}>
                      {String(rate+"%")}
                    </div>

                    <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                      <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                      </div>
                    </div>

                    <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                      <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                      </div>
                    </div>
                  </div>

                  {/*Text*/}
                  <div className='absolute top-0 left-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(-100% - 20px),0%)"}}>
                    <span className='mb-4'>Visually comparing parts to wholes can be tricky.</span>
                    <span className='mb-4'>Sometimes, the best answer is just let people see the whole picture!</span>
                    <span className=''>With Light, you can easily view things from multiple perspectives at the same time.</span>
                  </div>
                </div>

                {/*2) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-c2 bg-gray-800'>
                  {/*Chart*/}
                  <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                    <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                      {String(Number.parseInt(valueA0*rate/100))}
                    </div>
                  </div>
                  <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                    <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                      {String(Number.parseInt(valueB0*rate/100))}
                    </div>
                  </div>

                  {/*Text*/}
                  <div className='absolute top-0 right-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(100% + 20px),0%)"}}>
                    100% Bars are useful ways of visually comparing parts to wholes.
                    <span className='font-light mb-2'>Because the widths are the same, you can visually compare parts to whole with just their heights.</span>
                    <span className='font-light italic text-xs'>* Remember: Area's wont perfectly scale if you use rounded corners, but the tops of the bars still convey the information effectively =D!</span>
                  </div>
                </div>

                {/*Title*/}
                <div className='absolute top-0 left-0 flex flex-col w-full items-end justify-center text-white font-bold text-xl mb-2 px-2' style={{transform:"translate(0%, -120%)"}}>
                  <span className='w-full text-left border-b-2 font-bold text-2xl' >'Death Rate'--A scary term for 'the ratio of a part to its whole, regardless of whether the whole is big or small...'</span>
                  <span className='w-full text-left font-medium text-md'>Death Rate vs. Total Deaths, The Full(er) Picture - could always add more lights / or go to 8...</span>
                </div>

              </div>

              {/*Row 2*/}
              <div className='flex flex-row w-full flex-1 items-start justify-center mt-2'>
                {/*3) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                  {/*Chart*/}
                  <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                    {String(Number.parseInt(valueA0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                    {String(Number.parseInt(valueB0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>

                  {/*Text*/}
                  <div className='absolute top-0 left-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(-100% - 20px),0%)"}}>
                    <span className=''>Sorting Grouped Bars by type, allows for simple 'like to like' value comparisons.</span>
                  </div>
                </div>

                {/*4) */}
                <div className='relative w-96 h-96 flex flex-row items-end justify-between bg-black p-2 rounded-3xl border-4 border-c2 bg-gray-800'>
                  {/*Chart*/}
                  <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                    {String(Number.parseInt(valueA0))}
                  </div>
                  <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                    {String(Number.parseInt(valueB0))}
                  </div>
                  <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>

                  {/*Text*/}
                  <div className='absolute top-0 right-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(100% + 20px),0%)"}}>
                    <span className='mb-4'>Grouped Bars where you can do 'A|B' comparisons are also good. Assume you scan 'left to right' this is 'PEMDAS' for data vis. </span>
                    <span className='font-light'>1) The range from A to 30% A (700) is ~3X larger than the range of B to 30% B (210)</span>
                    <span className='font-light'>2) A value base is bigger than B value base </span>
                    <span className='font-light'>3) Rate*A is bigger than Rate*B</span>
                  </div>
                </div>
              </div>

              {/*Legend*/}
              <div id={'legend'} className={`absolute bottom-0 left-0 flex flex-row flex-wrap w-full justify-center items-center p-2`} style={{transform:"translate(0%,calc(100%))"}}>
                <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
                  {false && [{id:'A'}, {id:'B'}].map((category,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {category.id}
                        </div>
                      </div>
                    )
                  })}
                  {[{id:'Total Deaths', color:"#7C3AED"}, {id:'COVID Deaths', color:"#38BDF8"}].map((entry,categoryIndex)=>{
                    return(
                      <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                        <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${entry.color}`}}>
                        </div>
                        <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                          {entry.id}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*D1, D2, D3 Granularity Template for parts & wholes*/}
      {true?(
        <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-center rounded-2xl bg-black border-2 z-50 px-2 pb-8'>
          <div className='relative flex flex-col items-center justify-center'>
            {/*Row 1*/}
            <div className='relative flex flex-row w-full flex-1 items-end justify-center'>
              {/*1) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                  <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:0}%`, height:`${hA0>0?hA1/hA0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>

                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:0}%`, height:`${hB0>0?hB1/hB0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>
              </div>
              {/*2) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
              </div>
              {/*3) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>
              {/*4) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

              {/*Text*/}
              <div className='absolute top-0 left-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(-100% - 20px),0%)"}}>
                <span className='mb-4'>Data Granularity 1</span>
                <span className='mb-4 font-light text-md'>Zoom in to see the picture at more detail</span>
                <span className='font-light text-md'>Add more granularities</span>
              </div>


              {/*Title*/}
              <div className='absolute top-0 left-0 flex flex-col w-full items-end justify-center text-white font-bold text-xl mb-2 px-2' style={{transform:"translate(0%, -120%)"}}>
                <span className='w-full text-left border-b-2 font-bold text-2xl' >'Death Rate'--A scary term for 'the ratio of a part to its whole, regardless of whether the whole is big or small...'</span>
                <span className='w-full text-left font-medium text-md'>Death Rate vs. Total Deaths, The Full(er) Picture - could always add more lights / or go to 8...</span>
              </div>

            </div>

            {/*Row 2*/}
            <div className='flex flex-row w-full flex-1 items-start justify-center mt-2'>

              {/*1) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                  <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:0}%`, height:`${hA0>0?hA1/hA0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>

                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:0}%`, height:`${hB0>0?hB1/hB0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:0}%`, height:`${hB0>0?hB1/hB0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>

                {/*Text*/}
                <div className='absolute top-0 left-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(-100% - 20px),0%)"}}>
                  <span className='mb-4'>Data Granularity 2</span>
                  <span className='mb-4 font-light text-md'>Zoom in to see the picture at more detail</span>
                  <span className='font-light text-md'>Add more granularities</span>
                </div>
              </div>
              {/*2) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
              </div>
              {/*3) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>
              {/*4) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

            </div>

            {/*Row 3*/}
            <div className='flex flex-row w-full flex-1 items-start justify-center mt-2'>

              {/*1) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div id={'A0'} className={`relative flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-md mx-1 transition-all`}>
                  <div id={'A1'}className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wA0>0?wA1/wA0*100:0}%`, height:`${hA0>0?hA1/hA0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>

                </div>
                <div id={'B0'} className={`relative flex flex-col flex-1 items-start justify-end bg-c1 rounded-md mx-1 transition-all`} style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  <div id={'B1'} className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 rounded-md transition-all duration-1000' style={{width:`${wB0>0?wB1/wB0*100:0}%`, height:`${hB0>0?hB1/hB0*100:0}%`}}>
                    {String(rate+"%")}
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full justify-start items-end'>
                    <div className='flex flex-row h-full border-r' style={{width:`${rate}%`}}>
                    </div>
                  </div>

                  <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end'>
                    <div className='flex flex-row w-full border-t' style={{height:`${rate}%`}}>
                    </div>
                  </div>
                </div>

                {/*Text*/}
                <div className='absolute top-0 left-0 flex flex-col flex-wrap w-56 h-full items-center justify-start text-white font-bold text-left rounded-3xl bg-gray-900 px-3 py-2' style={{transform:"translate(calc(-100% - 20px),0%)"}}>
                  <span className='mb-4'>Data Granularity 3</span>
                  <span className='mb-4 font-light text-md'>Zoom in to see the picture at more detail</span>
                  <span className='font-light text-md'>Add more granularities</span>
                </div>
              </div>
              {/*2) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col flex-1 h-full items-start justify-end bg-c1 rounded-3xl mx-1'>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2  bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueA0*rate/100))}
                  </div>
                </div>
                <div className='flex flex-col flex-1 items-start justify-end bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?hA0*valueB0/valueA0:0}px`}}>
                  <div className='flex flex-col items-center justify-center font-bold text-white text-sm bg-c2 bg-c2 rounded-3xl' style={{width:`${100}%`, height:`${rate}%`}}>
                    {String(Number.parseInt(valueB0*rate/100))}
                  </div>
                </div>
              </div>
              {/*3) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1'style={{height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2  rounded-3xl mx-1' style={{height:`${rate*valueB0/valueA0}%`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>
              {/*4) */}
              <div className='relative flex flex-row w-64 h-64 items-end justify-between bg-black p-2 rounded-3xl border-4 border-transparent'>
                {/*Chart*/}
                <div className='flex flex-col w-1/4 h-full items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1'>
                  {String(Number.parseInt(valueA0))}
                </div>
                <div className='relative flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{ height:`${rate}%`}}>
                  {String(Number.parseInt(valueA0*rate/100))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c1 rounded-3xl mx-1' style={{height:`${valueA0>0?valueB0/valueA0*100:0}%`}}>
                  {String(Number.parseInt(valueB0))}
                </div>
                <div className='flex flex-col w-1/4 items-center justify-center font-bold text-white text-sm bg-c2 rounded-3xl mx-1' style={{height:`${(rate/100)*hB0}px`}}>
                  {String(Number.parseInt(valueB0*rate/100))}
                </div>
              </div>

            </div>


            {/*Legend*/}
            <div id={'legend'} className={`absolute bottom-0 left-0 flex flex-row flex-wrap w-full justify-center items-center p-2`} style={{transform:"translate(0%,calc(100%))"}}>
              <div className='flex flex-row flex-wrap w-full justify-center items-center rounded-2xl p-2 bg-gray-900' style={{maxWidth:"400px"}}>
                {false && [{id:'A'}, {id:'B'}].map((category,categoryIndex)=>{
                  return(
                    <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                      <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${ENERGY_COLORS[categoryIndex<=ENERGY_COLORS.length-1?categoryIndex:categoryIndex%ENERGY_COLORS.length].color}`}}>
                      </div>
                      <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                        {category.id}
                      </div>
                    </div>
                  )
                })}
                {[{id:'Total Deaths', color:"#7C3AED"}, {id:'COVID Deaths', color:"#38BDF8"}].map((entry,categoryIndex)=>{
                  return(
                    <div className='flex flex-row flex-shrink-0 justify-start items-center mx-1'>
                      <div className='flex flex-shrink-0 w-2 h-2 rounded-full' style={{backgroundColor:`${entry.color}`}}>
                      </div>
                      <div className='flex flex-shrink-0 font-semibold text-xs text-gray-400 ml-1'>
                        {entry.id}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}
      {/******TEMPLATES END******/}
    </div>
  )

}

//Just be careful with this cause you wont be able to 'click' things below the event mesh layer -- use as designed for scroll view tracking (when you need to know where the mouse is, vs. whether an elem was clicked or not)
const LightMesh=(props)=>{
  let ROWS=100;
  let COLS=100;

  const [lightMeshRows, setLightMeshRows]=useState([]);
  const [lightMeshWidthPX,setLightMeshWidthPX]=useState(0);
  const [lightMeshHeightPX,setLightMeshHeightPX]=useState(0);

  const [selectedBins,setSelectedBins]=useState({});
  const [binCoordinates,setBinCoordinates]=useState({x:50,y:50});
  const [heroStatus, setHeroStatus]=useState(true);

  //Initialize the event mesh and configure custom bins
  useEffect(()=>{
    initializeEventMesh();
  },[]);

  //Initialize a new event mesh for mouse event detection
  const initializeEventMesh=(column)=>{
    //Divide the insight window's timespan into even bins (so we can quickly and easily slice the events with start / end dates)
    //These need to be ints cause timestamps are always ints.
    //Create custom bins here if you need props related to each bin index (otherwise just regular ole bins will do

    //Initialize bins
    let newLightMeshRows = [];
    for(let row=0; row<ROWS; row++){
      let newRow=[];
      for(let col=0; col<COLS; col++){
      //EXTEND HERE WITH CUSTOM PROPS IF NEEDED FOR ONCLICK / ON SELECT
      let newBin={id:String(row+"-"+col), row:row, col:col, toggle:false, fire:function(){console.log({status:"Fire!", y:this.row, x:this.col}); this.toggle=true;}};
      //lightMesh[row][col]=newBin;
      newRow.push(newBin);

      //EXTEND HERE WITH CUSTOM PROPS IF NEEDED FOR ONCLICK / ON SELECT
      }
      newLightMeshRows.push(newRow);
    }

    console.log({status:"Initialized New Threhold Bins", bins:newLightMeshRows});
    setLightMeshRows(newLightMeshRows);
  }

  //Toggle Bin On Click
  const selectLightBin=(rowIndex,colIndex)=>{
    //Figure out what to do here

    let newSelectedBins={...selectedBins};

    if(newSelectedBins[String(rowIndex+"-"+colIndex)]){
      delete newSelectedBins[String(rowIndex+"-"+colIndex)]
    }else{
      newSelectedBins[String(rowIndex +"-"+colIndex)]=true;
    }

    setSelectedBins(newSelectedBins);
  }

  //Set a resize observer for the lightstream insight ref (re-grab the ref when you change the insight view)
  useLayoutEffect(()=>{
    let lightRef=document.getElementById('lightMesh');
    if(lightRef){
      let lightBoundingRect=lightRef.getBoundingClientRect();
      setLightMeshWidthPX(lightBoundingRect.width);
      setLightMeshHeightPX(lightBoundingRect.height);
      lightMeshObserver.observe(lightRef);
    }
  },[]);

  //Resize observer to refresh light string widths on resize
  const lightMeshObserver = new ResizeObserver((entries)=>{
    //console.log({status:"Cell Segment Comparison Resize", entries:entries, target:entries[0].target.getBoundingClientRect()});

    if(entries.length>0){
      setLightMeshWidthPX(entries[0].target.getBoundingClientRect().width);
      setLightMeshHeightPX(entries[0].target.getBoundingClientRect().height);
    }
  });

  return(
    <div className='absolute top-0 left-0 flex flex-col items-end justify-start' onClick={()=>{if(binCoordinates && props.active){props.onClick(binCoordinates.x/(ROWS-1)*100,(1-binCoordinates.y/(COLS-1))*100)}}} style={{zIndex:props.active?50:0, width:'calc(100% + 8px)', height:"calc(100% + 8px)", transform:"translate(-4px, -4px)"}}>
      <div id={'lightMesh'} className='relative flex flex-col h-full w-full items-start justify-start transition-all duration-500 ease-in-out'>
        {/*Z:100) Mouse event layer for [<-----|----->] event detection*/}
        <div className={`absolute top-0 right-0 flex flex-col h-full w-full items-center justify-start bg-black opacity-50 rounded-2xl transition-all duration-500 ease-in-out`}>
          <div className='flex flex-col w-full h-full items-center justify-start'>
            {lightMeshRows.map((lightRow,rowIndex)=>{
              return(
                <div key={rowIndex} className='relative flex flex-row w-full flex-1 items-center justify-start'>
                  {lightRow.map((bin,colIndex)=>{
                    return(
                      <div key={colIndex} className={`flex flex-col h-full flex-1`} style={{backgroundColor:bin.toggle?"#22d3ee":"#000000"}} onMouseEnter={()=>setBinCoordinates({x:colIndex, y:rowIndex})}>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/*Labels: [X|Y]*/}
        {/*Make a nice top center label for X|Y*/}
        <div className='absolute top-0 left-0 w-full h-0 flex flex-row items-center justify-center'>
          <div className={`relative flex flex-row items-center justify-center text-xs font-bold text-c2 px-2 py-0.5 border-l-2 border-r-2 bg-black rounded-xl`} style={{transform:"translate(0%,-6px"}}>
            {/*X-Axis Label*/}
            <LightNumber
              value={props.range&&props.range.minX+(props.range.maxX-props.range.minX)*binCoordinates.x/(COLS-1)}
              config={{
                size:"xs",
                prefix:props.xAxisPrefix,
                suffix:props.xAxisSuffix,
                standardColor:"#fffff",
                decimals:1,
                bold:true,
                centerText:true,
                signed:false,
              }}
            />
            <div className='flex mx-0.5'>
              {String("|")}
            </div>
            {/*Y-Axis Label*/}
            <LightNumber
              value={props.range&&props.range.minY+(props.range.maxY-props.range.minY)*(1-binCoordinates.y/(COLS-1))}
              config={{
                size:"xs",
                prefix:props.yAxisPrefix,
                suffix:props.yAxisSuffix,
                standardColor:"#fffff",
                decimals:1,
                bold:true,
                centerText:true,
                signed:false,
              }}
            />
          </div>
        </div>

        {/*Z:49) Stick the bin overlay over the top of things, but dont block the view with the div -- just have it be a 1px wide bar that moves along the top border [-----<<<-----|---->>>-----]*/}
        <div className='absolute top-0 left-0 flex flex-row items-start justfiy-start w-full' style={{zIndex:49}}>
          <div className='relative flex flex-row items-start justify-end h-0 transition-all duration-300 delay-100 ease-in-out' style={{width:`${binCoordinates.x/(ROWS-1)*100}%`}}>
            {/*Staff*/}
            {heroStatus?(
              <div className='absolute flex flex-col w-4 rounded-3xl transition-all duration-500 ease-in' style={{height:`${lightMeshHeightPX+12}px`,transform:"translate(100%,-12px)"}}>
                <LiquidBlade variant={'COLUMN'}/>
              </div>
            ):(
              <div className='absolute flex flex-col w-2 bg-white opacity-50 rounded-3xl transition-all duration-50 ease-in' style={{height:`${lightMeshHeightPX+12}px`,transform:"translate(100%,-12px)"}}>
              </div>
            )}
          </div>
        </div>

        {/*Z:49) Stick the bin overlay over the top of things, but dont block the view with the div -- just have it be a 1px wide bar that moves along the top border [-----<<<-----|---->>>-----]*/}
        <div className='absolute top-0 right-0 flex flex-col items-start justfiy-end h-full' style={{zIndex:49}}>
          <div className='relative flex flex-col items-start justify-end w-0 transition-all duration-300 delay-100 ease-in-out' style={{height:`${binCoordinates.y/(COLS-1)*100}%`}}>
            {/*Staff*/}
            {heroStatus?(
              <div className='absolute bottom-0 left-0 flex flex-row items-start justify-start h-4 rounded-3xl transition-all duration-500 ease-in ease-in' style={{width:`${lightMeshWidthPX+12}px`,transform:"translate(calc(-100% + 4px),100%)"}}>
                <LiquidBlade variant={'ROW'}/>
              </div>
            ):(
              <div className='absolute bottom-0 left-0 flex flex-col items-start justify-start h-2 bg-white opacity-50 rounded-3xl transition-all duration-50 ease-in' style={{width:`${lightMeshWidthPX+12}px`,transform:"translate(calc(-100% + 4px),100%)"}}>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

//Trace the grid and update the positions / locations of things (render once, only update the coloring with state changes vs. re-map the cells)
const Trackpad=(props)=>{

  const ELEMS=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  const [cells,setCells]=useState();

  useEffect(()=>{
    initializeCells();
  },[]);

  const initializeCells=()=>{
    let newCells={};

    for(let i=0; i<ELEMS.length; i++){
      for(let j=0; j<ELEMS.length; j++){
        //Create the new cell
        let newCell={id:String(i+"-"+j), active:false};

        //Add the cell
        newCells[newCell.id]=newCell;
      }
    }

    setCells(newCells);
  }

  return(
    <div className='flex flex-col w-96 h-96 items-center justify-start border-2 border-gray-900 p-2 rounded-2xl'>

      {/*Rows*/}
      {cells&&ELEMS.map((row,rowIndex)=>{
        return(
          <div key={rowIndex} className='flex flex-row w-full flex-1 items-center justify-start'>
            {/*Cells*/}
            {ELEMS.map((cell,cellIndex)=>{
              return(
                <div key={cellIndex} className='flex flex-col h-full flex-1 items-center justify-center transition-all delay-50' onMouseEnter={()=>{let newCells={...cells}; newCells[String(rowIndex+"-"+cellIndex)].active=true; setCells(newCells);}} onMouseLeave={()=>{let newCells={...cells}; newCells[String(rowIndex+"-"+cellIndex)].active=false; setCells(newCells);}} style={{backgroundColor:cells[String(rowIndex+"-"+cellIndex)].active?"#2dd4bf":"#000000"}}>
                </div>
              )
            })}
          </div>
        )
      })}

    </div>
  )
}

//Demo the rank capability
const RankDemo=(props)=>{
  const [lightstream,setLightstream]=useState(null);

  const [rankInput,setRankInput]=useState("");
  const [editRankInput,setEditRankInput]=useState(null);

  //Initialize the lightstream for Rank View
  useEffect(()=>{
    createLightstream();
  },[]);

  //Initialize a lightstream with entries and stats
  const createLightstream=()=>{
    let newLightstream={
      id:"Lightstream",
      stats:{
        min:Infinity,
        max:-Infinity,
        mean:0,
        median:0,
        stdDev:0,
        aggregate:0,
        count:0,
      },
      entries:[],
      sortedValues:[],
      getPercentileForValue:function(value){
        let zScore = (value-this.stats.mean)/this.stats.stdDev
        let entryPercentile = getPercentileFromZScore(zScore);

        console.log({percentile:entryPercentile, zScore:zScore});

        return entryPercentile;
      },
      getRankForValue:function(value){
        //Sorted entries are sorted biggest to smallest
        let rank=this.sortedValues.findIndex(entry=>entry<=value);

        //If there was no value smaller than the provided value, it is the smallest of all the entries
        if(rank===-1){
          return this.sortedValues.length
        }

        //If there was a value that is smaller than the value, that is its rank
        return rank;
      }
    }

    let entryCount=200;
    let valueBasis=1000000;

    //Initialize some test entries
    for(let i=0; i<entryCount; i++){
      //Create the value
      let newValue=Math.random()*valueBasis;

      let newEntry={id:i, index:i, value:newValue};

      //Update the stats
      newLightstream.stats.min=Math.min(newValue,newLightstream.stats.min);
      newLightstream.stats.max=Math.max(newValue,newLightstream.stats.max);
      newLightstream.stats.aggregate=newLightstream.stats.aggregate+newValue;
      newLightstream.stats.count++;

      //Add it to the entries array
      newLightstream.entries.push(newEntry);
      newLightstream.sortedValues.push(newValue);
    }

    //Sort the entries from max to min
    newLightstream.sortedValues.sort((a,b)=>{if(a>b){return -1}else if(a<b){return 1}else{return 0}});

    //Update the lightstream mean
    newLightstream.stats.mean=newLightstream.stats.aggregate/newLightstream.stats.count;

    //Calculate the median
    newLightstream.stats.median=newLightstream.sortedValues[Number.parseInt(newLightstream.sortedValues.length/2)];

    //Calculate the stdDev
    newLightstream.stats.stdDev=newLightstream.sortedValues.length>1?Math.pow(newLightstream.sortedValues.reduceRight((agg,cum)=>agg+Math.pow(cum-newLightstream.stats.mean,2),0)/newLightstream.sortedValues.length,0.5):1;

    console.log(newLightstream);

    //Update the state
    setLightstream(newLightstream);
  }

  return(
    <div className='flex flex-col h-full w-full items-center justify-start p-4'>
      {/*Create the Views for each stage*/}
      {lightstream?(
        <div id='stage' className='relative flex flex-col flex-1 w-5/6 items-center justify-center border-2 border-gray-900 rounded-2xl'>
          {/*Add The ability to rank input values*/}
          <div className='flex flex-col w-full h-full items-center justify-center px-4 pt-2'>

            {/*Add the Distribution Again*/}
            <div className='relative flex flex-row-reverse h-64 w-full items-center justify-around px-2 border-l-4 border-r-4 border-gray-400 rounded-xl py-2'>

              {/*Map the entries*/}
              {lightstream&&lightstream.sortedValues.map((value,index)=>{
                let maxHeight=lightstream.stats.max;
                return(
                  <div key={index} className='flex flex-col flex-1 border-gray-300 rounded-full bg-black' style={{maxWidth:"4px",borderWidth:"2px",height:`${Math.max(3,value/maxHeight*100)}%`}}>
                  </div>
                )

              })}

              {/*Add the rank overlay*/}
              {rankInput&&!Number.isNaN(rankInput)?(
                <div className='absolute top-0 left-0 h-full w-full px-2 flex flex-row items-center justify-start'>
                  {/*Render the Rank Overlay, icon*/}
                  <div className='flex flex-row h-full items-center justify-end' style={{width:`${100-lightstream.getRankForValue(Number.parseFloat(rankInput))/lightstream.sortedValues.length*100}%`}}>
                    {/*Add a rank bar*/}
                    <div className='h-full w-0.5 rounded-full bg-c2-highlight animate-pulse' style={{transform:"translate(50%,0%)"}}>
                    </div>
                  </div>
                </div>
              ):(
                <div className='hidden' />
              )}

            </div>

            {/*Rank and Percentile*/}
            {rankInput&&!Number.isNaN(rankInput)?(
              <div className='flex flex-row w-full h-28 border items-center justify-around text-xl text-white mt-8'>

                {/*Rank*/}
                <div className='flex flex-col w-40 h-full items-center justify-center'>
                  <div className='flex flex-row w-28 h-full items-center justify-center px-0 py-0 text-c2 text-xl font-bold text-center'>
                    <LightNumber
                      value={lightstream.getRankForValue(Number.parseFloat(rankInput))}
                      config={{
                        size:"sm",
                        prefix:"",
                        suffix:"",
                        standardColor:"#fffff",
                        decimals:0,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false
                      }}
                    />
                    {String(" / " +lightstream.entries.length)}
                  </div>
                  <div className='flex flex-row items-center justify-center w-28 font-medium text-gray-300 text-sm'>
                    Rank
                  </div>
                </div>

                {/*Percentile*/}
                <div className='flex flex-col w-40 h-full items-center justify-center'>
                  <div className='flex flex-row w-28 h-full items-center justify-center px-0 py-0 text-c2 text-xl font-bold text-center'>
                    <LightNumber
                      value={lightstream.getPercentileForValue(Number.parseFloat(rankInput))}
                      config={{
                        size:"sm",
                        prefix:"",
                        suffix:"%",
                        standardColor:"#fffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false
                      }}
                    />
                  </div>
                  <div className='flex flex-row items-center justify-center w-28 font-medium text-gray-300 text-sm'>
                    Percentile
                  </div>
                </div>

              </div>
            ):(
              <div className='hidden' />
            )}

            {/*Rank Input*/}
            <div className='flex flex-row w-64 h-20 items-center justify-center text-xl text-white mt-8 mb-2'>
              <div className='flex flex-row w-full h-full items-center justify-center text-white text-center font-bold text-xl rounded-2xl border-2 border-gray-900' onClick={()=>setEditRankInput(true)}>
                {/*Decrtiption Input Input*/}
                {editRankInput?(
                  <input
                    type='text'
                    onChange={(event)=>{setRankInput(event.target.value)}}
                    className={`w-full px-0 py-0 text-xl font-bold text-left rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                    style={{resize:'vertical', backgroundColor:`#000000`,}}
                    placeholder={'Enter a value to calculate its rank and percentile'}
                    value={rankInput}
                    onBlur={()=>{setEditRankInput(false)}}
                  />
                ):(
                  <div className='flex flex-row w-full h-full items-center justify-center px-0 py-0 text-xl font-bold text-center'>
                    <LightNumber
                      value={rankInput}
                      config={{
                        size:"sm",
                        prefix:"",
                        suffix:"",
                        standardColor:"#fffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      ):(
        <div className='hidden' />
      )}
    </div>
  )
}

//Create a string of lights
//The Seto Fucking Kaiba way. Is so much simpler
const LightString = (props)=>{
  const [lightStringLabels,setLightStringLabels]=useState({});

  //Illuminate the labels
  useEffect(()=>{
    if(props.illuminateLabels && props.values){
      let newLightStringLabels={};

      props.values.forEach((valueEntry,index)=>{
        newLightStringLabels[valueEntry.id]={active:true, justification:index%2===0?"justify-start":'justify-end'};
      });

      setLightStringLabels(newLightStringLabels);

    }else if(!props.illuminateLabels && props.values && Object.keys(lightStringLabels).length>0){
      //Clear the state
      setLightStringLabels({});
    }

  },[props.illuminateLabels,props.values]);

  //Toggle Segment Label
  const toggleLightStringLabel=(referenceID)=>{
    let newLightStringLabels={...lightStringLabels};

    if(!newLightStringLabels[referenceID]){
      newLightStringLabels[referenceID]={active:true, justification:'justify-start'};
    }else if(newLightStringLabels[referenceID].justification==='justify-start'){
      newLightStringLabels[referenceID]={active:true, justification:'justify-center'};
    }else if(newLightStringLabels[referenceID].justification==='justify-center'){
      newLightStringLabels[referenceID]={active:true, justification:'justify-end'};
    }else if(newLightStringLabels[referenceID].justification==='justify-end'){
      delete newLightStringLabels[referenceID];
    }

    //Update the state
    setLightStringLabels(newLightStringLabels);
  }

  return(
    <div className='flex flex-col w-full h-full items-center justify-center'>
      {!props.variant||props.variant==='ROW'?(
        <div className={`relative flex flex-row h-2 w-full items-center justify-start`}>
          {/*Shading*/}
          <div className='absolute top-0 left-0 w-full h-full rounded-2xl bg-gray-800' style={{zIndex:-1,}}>
          </div>

          {/*Seto Fucking Kaiba.*/}
          {!props.showReferences && props.values?(
            <div className={`absolute bottom-0 left-0 flex flex-row h-0 w-full items-center justify-center`}>
              <div className='relative h-full w-full'>
                {props.values.map((value,valueIndex)=>{
                  return(
                    <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-row items-center justify-end h-2' style={{zIndex:35, width:`${value.offsetPercentage}%`}}>
                      <div className={`flex flex-col rounded-full h-2 w-2 flex-shrink-0 ${value.border}`} style={{backgroundColor:`${value.fill?value.color:""}`, transform:"translate(50%,0%)"}}>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ):(
            <div className='hidden'/>
          )}

          {/*Children can only be as high as their parents, so set the lightstring index to 50+ and then figure out where to put all the other stuff*/}
          {/*BARS: 40, LABELS:45*/}
          {props.showReferences && props.values?(
            <div className={`absolute bottom-0 left-0 flex flex-col h-0 w-full items-center justify-center`} style={{zIndex:50}}>
              <div className='relative h-full w-full'>
                {/*Render the bars in a Z-40 layer*/}
                <div className='absolute top-0 left-0 h-full w-full' style={{zIndex:40}}>
                  {props.values.map((value,valueIndex)=>{
                    return(
                      <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-row items-start justify-start h-2' style={{width:`${value.offsetPercentage}%`}}>
                        {/*Create a clickable target for the bar labels*/}
                        <div className='relative flex flex-col items-center w-4 justify-center' style={{height:`${props.referenceBarLength?props.referenceBarLength:"8rem"}`, transform:"translate(100%,0%)"}}>
                          {/*Render the bar*/}
                          <div className={`flex flex-col flex-shrink-0 h-full ${value.border}`} style={{backgroundColor:`${value.fill?value.color:""}`,opacity:"50%"}}>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/*Render the labels and click events in a Z-45 layer*/}
                <div className='absolute top-0 left-0 h-full w-full' style={{zIndex:45}}>
                  {props.values.map((value,valueIndex)=>{
                    return(
                      <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-row items-start justify-start h-2' style={{width:`${value.offsetPercentage}%`}}>
                        {/*Create a clickable target for the bar labels (heights here have to be the same as the bar heights for the labels to line ip perfectly)*/}
                        <div id={'LIGHTSTRING-'+value.id} className='relative flex flex-col w-4 items-center justify-center' onClick={()=>toggleLightStringLabel(value.id)} style={{height:`${props.referenceBarLength?props.referenceBarLength:"8rem"}`, transform:"translate(0%,-100%)"}}>
                          {/*Render the labels Z-index-45*/}
                          <div className={`relative flex flex-col flex-shrink-0 h-full items-center justify-center`}>
                            {/*Render the bar*/}
                            <div className={`flex flex-col flex-shrink-0 h-full ${value.border}`} style={{opacity:"0%"}}>
                            </div>

                            {/*Stick a label on it (Gray Flag Labels) (__)*/}
                            <div className={`absolute top-0 left-0 flex flex-col h-full w-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{}}>
                              <div className={`flex flex-col items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold ${value.offsetPercentage>95?"rounded-b-mb":"rounded-t-md"} text-min sm:text-sm py-0.5 px-2 bg-gray-700`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{opacity:"100%", transform:`translate(${value.offsetPercentage>95?("0%"):("-50%")},0%)`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>

                            {/*Nice Segment Labels [..$$..]*/}
                            <div className={`hidden absolute top-0 left-0 flex flex-col h-full w-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{zIndex:45,}}>
                              <div className={`flex flex-col items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold rounded-md border py-0.5 px-2 bg-gray-700 text-min sm:text-sm`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{zIndex:45, backgroundColor:`${value.fill?value.color:""}`, opacity:"100%", transform:`translate(${value.offsetPercentage<5?"-50":value.offsetPercentage>95?("50%"):("0%")},0%)`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>

                            {/*Nice POP Segment Labels {..$..}*/}
                            <div className={`hidden absolute top-0 left-0 flex flex-col h-full w-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{zIndex:45,}}>
                              <div className={`flex flex-col items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold rounded-md border-l-2 border-r-2 border-dashed border-white py-0.5 px-2 bg-gray-700 text-min sm:text-sm`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{zIndex:45, backgroundColor:`${value.fill?value.color:""}`, opacity:"100%", transform:`translate(${value.offsetPercentage<5?"-50":value.offsetPercentage>95?("50%"):("0%")},0%)`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ):(
            <div className='hidden'/>
          )}
        </div>
      ):(
        <div className='hidden'/>
      )}

      {props.variant==='COLUMN'?(
        <div className={`relative flex flex-col-reverse w-2 h-full items-center justify-start`}>
          {/*Shading*/}
          <div className='absolute top-0 left-0 w-full h-full rounded-2xl bg-gray-800' style={{zIndex:-1,}}>
          </div>

          {/*Seto Fucking Kaiba.*/}
          {!props.showReferences && props.values?(
            <div className={`absolute bottom-0 left-0 flex flex-col w-0 h-full items-start justify-end`}>
              <div className='relative h-full w-full'>
                {props.values.map((value,valueIndex)=>{
                  return(
                    <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-col items-start justify-start w-2' style={{zIndex:35, height:`${value.offsetPercentage}%`}}>
                      <div className={`flex flex-col rounded-full h-2 w-2 flex-shrink-0 ${value.border}`} style={{backgroundColor:`${value.fill?value.color:""}`, transform:"translate(0%,-50%)"}}>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ):(
            <div className='hidden'/>
          )}

          {/*Children can only be as high as their parents, so set the lightstring index to 50+ and then figure out where to put all the other stuff*/}
          {/*BARS: 40, LABELS:45*/}
          {props.showReferences && props.values?(
            <div className={`absolute bottom-0 left-0 flex flex-col w-0 h-full items-start justify-end`} style={{zIndex:50}}>
              <div className='relative h-full w-full'>
                {/*Render the bars in a Z-40 layer*/}
                <div className='absolute top-0 left-0 h-full w-full' style={{zIndex:40}}>
                  {props.values.map((value,valueIndex)=>{
                    return(
                      <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-col items-start justify-start w-2' style={{height:`${value.offsetPercentage}%`}}>
                        {/*Create a clickable target for the bar labels*/}
                        <div className='relative flex flex-row items-center h-4 justify-center' style={{width:`${props.referenceBarLength?props.referenceBarLength:"8rem"}`, transform:"translate(0%,-100%)"}}>
                          {/*Render the bar*/}
                          <div className={`flex flex-col flex-shrink-0 w-full ${value.border}`} style={{backgroundColor:`${value.fill?value.color:""}`,opacity:"50%"}}>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/*Render the labels and click events in a Z-45 layer*/}
                <div className='absolute top-0 left-0 h-full w-full' style={{zIndex:45}}>
                  {props.values.map((value,valueIndex)=>{
                    return(
                      <div key={valueIndex} className='absolute bottom-0 left-0 flex flex-col items-start justify-start w-2' style={{height:`${value.offsetPercentage}%`}}>
                        {/*Create a clickable target for the bar labels (heights here have to be the same as the bar heights for the labels to line ip perfectly)*/}
                        <div id={'LIGHTSTRING-'+value.id} className='relative flex flex-row h-4 items-center justify-center' onClick={()=>toggleLightStringLabel(value.id)} style={{width:`${props.referenceBarLength?props.referenceBarLength:"8rem"}`, transform:"translate(0%,-100%)"}}>
                          {/*Render the labels Z-index-45*/}
                          <div className={`relative flex flex-col flex-shrink-0 w-full items-center justify-center`}>
                            {/*Render the bar*/}
                            <div className={`flex flex-col flex-shrink-0 w-full ${value.border}`} style={{opacity:"0%"}}>
                            </div>

                            {/*Stick a label on it (Gray Flag Labels) (__)*/}
                            <div className={`absolute top-0 left-0 flex flex-row w-full h-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{}}>
                              <div className={`flex flex-row items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold ${value.offsetPercentage>95?"rounded-b-mb":"rounded-t-md"} text-min sm:text-sm py-0.5 px-2 bg-gray-700`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{opacity:"100%", transform:`translate(0%,${value.offsetPercentage>95?("0%"):("-50%")})`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>

                            {/*Nice Segment Labels [..$$..]*/}
                            <div className={`hidden absolute top-0 left-0 flex flex-row w-full h-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{zIndex:45,}}>
                              <div className={`flex flex-row items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold rounded-md border py-0.5 px-2 bg-gray-700 text-min sm:text-sm`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{zIndex:45, backgroundColor:`${value.fill?value.color:""}`, opacity:"100%", transform:`translate(0%,${value.offsetPercentage<5?"-50":value.offsetPercentage>95?("50%"):("0%")})`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>

                            {/*Nice POP Segment Labels {..$..}*/}
                            <div className={`hidden absolute top-0 left-0 flex flex-row w-full h-0 ${lightStringLabels[value.id]?lightStringLabels[value.id].justification:"justify-start"} items-center pl-2.5 transition-all duration-500 ease-in-out`} style={{zIndex:45,}}>
                              <div className={`flex flex-row items-center justify-center ${lightStringLabels[value.id]?`text-white font-bold rounded-md border-l-2 border-r-2 border-dashed border-white py-0.5 px-2 bg-gray-700 text-min sm:text-sm`:"h-0 w-0 bg-transparent text-transparent opacity-0"} transition-all duration-500 ease-in`} style={{zIndex:45, backgroundColor:`${value.fill?value.color:""}`, opacity:"100%", transform:`translate(0%,${value.offsetPercentage<5?"-50":value.offsetPercentage>95?("50%"):("0%")})`,}}>
                                {lightStringLabels[value.id]?(
                                  <LightNumber
                                    value={value.value}
                                    config={{
                                      size:"xs",
                                      prefix:value.prefix,
                                      suffix:value.suffix,
                                      standardColor:"#fffff",
                                      decimals:0,
                                      bold:true,
                                      centerText:true,
                                      signed:false,
                                    }}
                                  />
                                ):(
                                  <div className='hidden' />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ):(
            <div className='hidden'/>
          )}
        </div>
      ):(
        <div className='hidden'/>
      )}
    </div>
  )
}

//String value
const LightNumber= (props) => {
  const MONTH_NAMES = {
    "0":"January",
    "1":"February",
    "2":"March",
    "3":"April",
    "4":"May",
    "5":"June",
    "6":"July",
    "7":"August",
    "8":"September",
    "9":"October",
    "10":"November",
    "11":"December",
  }

  if(props.config.isTimestamp){
    let newDate = new Date(Number.parseInt(props.value));
    let dateString;
    if(props.config.includeDateNum){
      dateString=String(MONTH_NAMES[newDate.getUTCMonth()].slice(0,3)+" "+newDate.getUTCDate()+", "+newDate.getUTCFullYear());
    }else{
      dateString=String(MONTH_NAMES[newDate.getUTCMonth()].slice(0,3)+", "+newDate.getUTCFullYear());
    }

    let textColor;

    if(props.config.signed){
      textColor = props.value>=0?props.config.positiveColor:props.config.negativeColor;
    }else{
      textColor = props.config.standardColor?props.config.standardColor:'#000000';
    }
    return (
      <div>
        <div className={`${props.config.bold?('font-bold'):('font-medium')}`} style={{color:textColor}}>
          {dateString}
        </div>
      </div>
    )
  }else{
    let value=(props.value!==null && props.value!==undefined)?props.value:"";

    //Convert percentiles
    if(props.config.suffix==='%'){
      //value=value*100;
    }

    let suffix=props.config.suffix;
    let decimals = props.config.decimals;

    //Adjust for spacing to center
    let prefix;

    //If it is a percentage point change or a percent change, then add a plus in front of positive values
    if((suffix==='p.p.'||suffix==='%%') && value>=0){
      prefix = '+'
    }else{
      prefix=props.config.prefix===''&&!props.config.centerText?'\u00A0\u00A0\u00A0':props.config.prefix
    }

    //If its a $ gain / loss then update accordingly
    if(prefix==='$$' && value>=0){
      prefix='+$';
    }else if(prefix==='$$' && value<0){
      prefix='-$';
    }

    //If its a ++ gain / loss then update accordingly
    if(prefix==='++' && value>=0){
      prefix='+';
    }else if(prefix==='++' && value<0){
      prefix='';
    }

    //Convert the metric to units if it is not a percent
    if(suffix!=='%' && suffix!=='%%' && suffix!=='p.p.' && suffix!=='X' && suffix!=='percentile' && value!==0){
    let power = Math.max(Math.floor(Math.log10(Math.abs(value))),0);

    //Calculate the units
    switch(power){
      case 0:
        suffix=''
        break;
      case 1:
        suffix='';
        power=0;
        break;
      case 2:
        suffix='';
        power=0;
        break;
      case 3:
        suffix='K'
        break;
      case 4:
        suffix='K'
        power=3;
        break;
      case 5:
        suffix='K';
        power=3;
        break;
      case 6:
        suffix='M'
        break;
      case 7:
        suffix='M'
        power=6;
        break;
      case 8:
        suffix='M'
        power=6;
        break;
      case 9:
        suffix='B'
        break;
      case 10:
        suffix='B'
        power=9;
        break;
      case 11:
        suffix='B'
        power=9;
        break;
      case 12:
        suffix='T'
        break;
      case 13:
        suffix='T'
        power=12;
        break;
      case 14:
        suffix='T'
        power=3;
        break;
      default:
        suffix=`^${power}`
        break;
    }

    //Convert the value
    value=props.value/Math.pow(10,power);
    }

    //Add a space to the p.p. suffix if there is one
    if(suffix==='p.p.'){
      suffix='\u00A0p.p.'
    }

    //Convert % change suffix back to percent
    if(suffix==='%%'){
      suffix='%'
    }

    //Update the suffix with a percentile if its a percentile
    if(suffix==='percentile'){
      //Set decimals to zero since its a percentile
      decimals=0;

      let roundedValue=value.toLocaleString('en-US',{minimumFractionDigits:0, maximumFractionDigits:0});
      let lastDigit=roundedValue[roundedValue.length-1];

      if(lastDigit==='0'){
        suffix='th %'
      }else if(lastDigit==='1'){
        suffix='st %'
      }else if(lastDigit==='2'){
        suffix='nd %'
      }else if(lastDigit==='3'){
        suffix='rd %'
      }else if(lastDigit==='4'){
        suffix='th %'
      }else if(lastDigit==='5'){
        suffix='th %'
      }else if(lastDigit==='6'){
        suffix='th %'
      }else if(lastDigit==='7'){
        suffix='th %'
      }else if(lastDigit==='8'){
        suffix='th %'
      }else if(lastDigit==='9'){
        suffix='th %'
      }
    }

    //Convert the value to a positive value if prefix = $$
    if(prefix==='-$'){
      value = Math.abs(value);
    }

    if(Math.abs(value)<0.000){
      value=0;
    }

    return String(prefix+value.toLocaleString('en-US',{minimumFractionDigits:decimals, maximumFractionDigits:decimals})+suffix);
  }
}
//----------------------------------ANIMATIONS----------------------------------

//Tracks path (coy fish darting in pond) #Saitama
const SeriousMotion=(props)=>{

  const TAP_BUFFER=27;

  //Event mesh and grid
  const [grid,setGrid]=useState([]);
  const [eventMesh,setEventMesh]=useState();
  const [coreCoordinates,setCoreCoordinates]=useState({x:0,y:0});

  //Autoplay coordinates
  const [width,setWidth]=useState(100);
  const [height,setHeight]=useState(100);

  //Other state
  const [shields,setShields]=useState(false);
  const [autoPlay,setAutoPlay]=useState(false);
  const [autoPlayLock,setAutoPlayLock]=useState(null);
  const [autoPlayTimer,setAutoPlayTimer]=useState(false);

  //Auto play timer
  useEffect(()=>{
    if(props.autoPlay && autoPlayLock===null){
      //Create a new energy timers
      let energyTimer=setInterval(()=>{
        let newHeight = Math.min(98,Math.max(2,Math.random()*100));
        let newWidth =  Math.min(98,Math.max(2,Math.random()*100));

        setHeight(newHeight);
        setWidth(newWidth);

        console.log("energyTick");

      },1600);

      //Set it
      setAutoPlayTimer(energyTimer);

      //Clear it
      return ()=>clearInterval(energyTimer);

    }

    //If there is a lock, remember to check for unlock after 1 second
    if(autoPlayLock){
      let timer=setTimeout(()=>{
        if(Date.now()-autoPlayLock.timestamp>1000){
          setAutoPlayLock(null);
        }
      },1500);

      return ()=>clearInterval(timer);
    }

  },[props,autoPlayLock]);

  //Initialize the tile map of coordinates (delay the init for screen blinks)
  useLayoutEffect(()=>{
    let timer=setTimeout(()=>{
      let eventMeshRef = document.getElementById('eventMesh');
      if(eventMeshRef){
        console.log("Initializing Tile Map");
        initializeEventMesh(eventMeshRef,10);
      }
    },500)

    return ()=>clearInterval(timer);
  },[]);

  //Observe the grid for resize events
  useLayoutEffect(()=>{
    myResizeObserver.observe(document.getElementById('core'));
  });

  const initializeEventMesh=(eventMeshRef,numBins)=>{
    let newEventMesh=[];
    let newGrid={
      left:eventMeshRef.getBoundingClientRect().left,
      right:eventMeshRef.getBoundingClientRect().right,
      top:eventMeshRef.getBoundingClientRect().top,
      bottom:eventMeshRef.getBoundingClientRect().bottom,
      width:eventMeshRef.getBoundingClientRect().width,
      height:eventMeshRef.getBoundingClientRect().height,
    };

    let gridLeft = eventMeshRef.getBoundingClientRect().left;
    let gridWidth = eventMeshRef.getBoundingClientRect().width;
    let gridHeight = eventMeshRef.getBoundingClientRect().height;

    let x=eventMeshRef.getBoundingClientRect().left;
    let y=eventMeshRef.getBoundingClientRect().top;

    let widthStep=gridWidth/numBins;
    let heightStep=gridHeight/numBins;

    let newRow=[];

    //Initialize self-actualized / self-aware bins
    for(let i=0; i<numBins; i++){
      ///x----->maxX
      for(let j=0; j<numBins; j++){
        let newBin = {
          id:String("ROW"+i+"-COL"+j),
          rowIndex:i,
          columnIndex:j,
          active:false,
          minX:x,
          maxX:j===numBins-1?eventMeshRef.getBoundingClientRect().right:x+widthStep,
          minY:y,
          maxY:i===numBins-1?eventMeshRef.getBoundingClientRect().bottom:y+heightStep,
        }
        newRow.push(newBin);
        x=x+widthStep;
      }

      newEventMesh.push([...newRow]);
      newRow=[];

      x=gridLeft;
      y=y+heightStep;
    }

    //console.log("Initialized Tile Map ")
    //console.log({gridHeight:gridHeight, gridWidth:gridWidth, grid:newGrid, eventMesh:newEventMesh});

    setGrid(newGrid);
    setEventMesh(newEventMesh);
  }

  const pulseShields=()=>{
    setShields(true);
    setTimeout(()=>setShields(false),500);
  }

  //Trace mouse movements
  const updateCoordinatesForTile=(tile,grid)=>{

    let newCoreCoordinates = {x:(tile.maxX+tile.minX)/2, y:(tile.maxY+tile.minY)/2};

    let width = (newCoreCoordinates.x-grid.left)/grid.width*100;
    let height = 100-(newCoreCoordinates.y-grid.top)/grid.height*100;

    setWidth(width);
    setHeight(height);
    setCoreCoordinates(newCoreCoordinates);

    //If there is a current auto play timer, clear it and null it
    if(autoPlayTimer){
      clearInterval(autoPlayTimer);
      setAutoPlayTimer(null);
    }

    //Update the auto play timer to resume control
    setAutoPlayTimer({id:"AUTOPLAY-LOCK", timestamp:Date.now()});
  }

  const myResizeObserver = new ResizeObserver((entries)=>{
    //console.log(entries);

    if(entries.length>0){
      let newCoordinates={x:entries[0].target.getBoundingClientRect().x, y:entries[0].target.getBoundingClientRect().y,}
      //Update the state on change
      if(Math.abs(newCoordinates.x-coreCoordinates.x)>1.29 || Math.abs(newCoordinates.y-coreCoordinates.y)>1.29){
        setCoreCoordinates(newCoordinates);

        if(Number.parseInt(newCoordinates.x)%17===0&&Number.parseInt(newCoordinates.x)%3===0&&Number.parseInt(newCoordinates.y)%11===0){
          pulseShields()
        }
      }
    }
  });

  return(
    <div className={`relative flex flex-row ${props.scale?('h-full w-full'):'w-96, h-96'} rounded-3xl items-center justify-center overflow-hidden`} style={{zIndex:99}}>

      {/*Blob Core*/}
      <div className={`relative flex flex-col h-full w-full items-start justify-start rounded-3xl p-2 z-30 ${props.frame?('border'):''}`}>

        {/*Blob Core+ Padding*/}
        <div className={`relative flex flex-col h-full w-full z-30`}>
          {/*Core Coordinate*/}
          <div className='absolute bottom-0 left-0 flex flex-row h-full items-start justify-end transition-all duration-2000 ease-out z-30' style={{opacity:"85%", width:`${width}%`, height:`${height}%`}}>
            <div id={'core'} className={`flex flex-shrink-0 flex-col rounded-full bg-c2-highlight border-2 border-c2 w-6 h-6 shadow-xl animate-pulse`} style={{transform:"translate(50%,-50%)"}}>
              {/*String(Number.parseInt(coreCoordinates.x)+", "+Number.parseInt(coreCoordinates.y))*/}
            </div>
          </div>
        </div>

        {/*Position Grid -- 'ABOVE the padding'*/}
        {true?(
          <div id={'grid'} className={`absolute top-0 left-0 flex flex-col w-full h-full rounded-3xl items-center justify-start z-20 overflow-hidden`}>
            {grid && coreCoordinates && eventMesh && eventMesh.map((row,rowIndex)=>{
              //The point here is you 'map a static 'grid' that then pulls state from the coordinates state object, so you only render the grid once, but then pull state continuously
              return(
                <div key={rowIndex} className='flex flex-row w-full flex-1'>
                  {row.map((tile,tileIndex)=>{
                    return(
                      <div key={tile.id} className={`flex flex-row h-full flex-1 border-transparent`} style={{borderWidth:"1px"}}>
                        <div className={`flex flex-col h-full w-full items-center justify-center rounded-2xl ${shields || (tile.maxX+TAP_BUFFER>=coreCoordinates.x&&coreCoordinates.x>=tile.minX-TAP_BUFFER&&tile.maxY+TAP_BUFFER>=coreCoordinates.y&&coreCoordinates.y>=tile.minY-1.5*TAP_BUFFER)?("bg-c2-highlight shadow-xl border-2 border-green-200"):("bg-black")} transition-all duration-300`} style={{opacity:`${shields?85:65}%`}}>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ):(
          <div className='hidden' />
        )}

        {/*Shields Padding*/}
        {true?(
          <div id={'grid'} className={`absolute top-0 left-0 flex flex-col w-full h-full rounded-3xl items-center justify-start z-10 overflow-hidden`}>
            {coreCoordinates && eventMesh && eventMesh.map((row,rowIndex)=>{
              //The point here is you 'map a static 'grid' that then pulls state from the coordinates state object, so you only render the grid once, but then pull state continuously
              return(
                <div key={rowIndex} className='flex flex-row w-full flex-1 transition-all duration-700' style={{opacity:`${shields?85:0}%`}}>
                  {row.map((tile,tileIndex)=>{
                    return(
                      <div key={tile.id} className={`${rowIndex===eventMesh.length-1?("opacity-0"):("opacity-100")} relative flex flex-row h-full flex-1 z-10`} style={{transform:"translate(0px,0px)"}}>
                        {tileIndex<row.length-1?(
                          <div className='absolute top-0 left-0 flex flex-row w-full h-full items-end justify-end z-10' style={{}}>
                            <div className='flex flex-col items-center justify-center flex flex-shrink-0 rounded-full w-2.5 h-2.5 z-30 border-2 border-green-300 bg-c2-highlight' style={{transform:"translate(50%,50%)",}}>
                            </div>
                          </div>
                        ):(
                          <div className='hidden'/>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ):(
          <div className='hidden' />
        )}
      </div>

      {/*EventMesh*/}
      {/*Position Grid -- 'ABOVE the padding'*/}
      <div id={'eventMesh'} className={`absolute top-0 left-0 flex flex-col w-full h-full rounded-3xl items-center justify-start overflow-hidden`} style={{zIndex:99}}>
        {grid && eventMesh && eventMesh.map((row,rowIndex)=>{
          //The point here is you 'map a static 'grid' that then pulls state from the coordinates state object, so you only render the grid once, but then pull state continuously
          return(
            <div key={rowIndex} className='flex flex-row w-full flex-1' style={{zIndex:50}}>
              {row.map((tile,tileIndex)=>{
                return(
                  <div key={tile.id} className={`flex flex-row h-full flex-1`} onMouseEnter={()=>{updateCoordinatesForTile(tile,grid)}} style={{zIndex:50}}>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

//Tracks tap controls (Pre-cursor to Serious Motion)
const AdvancedMotion=()=>{

  const ENERGY_COLORS = [
    {id:"0",color:"#0ea5e9", text:"General", emoji:"🎯",active:true, show:true},
    {id:"1",color:"#8b5cf6", text:"Work", emoji:"💻", active:true, show:false},
    {id:"2",color:"#d946ef", text:"Physical Health", emoji:"🤸", active:true, show:false},
    {id:"3",color:"#ec4899", text:"Emotional Health", emoji:"🧘‍♀️", active:true, show:false},
    {id:"4",color:"#f43f5e", text:"My Boo", emoji:"🥰", active:true, show:false},
    {id:"5",color:"#22c55e", text:"Friends", emoji:"🥳", active:true, show:false},
    {id:"6",color:"#22d3ee", text:"Family", emoji:"🏡", active:true, show:false},
    {id:"7",color:"#fde047", text:"Hobbies", emoji:"🏔", active:true, show:false},
    {id:"8",color:"#5eead4", text:"School", emoji:"📚", active:true, show:false},
  ]

  const ROUNDING = [
    {id:"0",format:"rounded-full"},
    {id:"1",format:"rounded-3xl"},
    {id:"2",format:"rounded-xl"},
  ]

  const JUSTIFICATIONS = [
    {id:"0",format:"justify-left"},
    {id:"1",format:"justify-center"},
    {id:"2",format:"justify-right"},
    {id:"2",format:"justify-between"},
    {id:"2",format:"justify-around"},
  ]

  const ALIGNMENTS = [
    {id:"0",format:"items-start"},
    {id:"1",format:"items-center"},
    {id:"2",format:"items-center"},
  ]

  const TAP_BUFFER=8;


  const [height,setHeight]=useState(100);
  const [width,setWidth]=useState(100);
  const [rotation,setRotation]=useState(0);
  const [opacity, setOpacity]=useState(100);
  const [color,setColor]=useState("")
  const [formatString,setFormatString]=useState("");

  const [grid,setGrid]=useState();
  const [tileMap,setTileMap]=useState([]);
  const [gridWidth,setGridWidth]=useState(0);
  const [gridHeight,setGridHeight]=useState(0);
  const [coreCoordinates,setCoreCoordinates]=useState({x:0,y:0});

  useEffect(()=>{
    let energyTimer=setInterval(()=>{
      let newHeight = Math.min(95,Math.max(5,Math.random()*100));
      let newWidth =  Math.min(95,Math.max(5,Math.random()*100));

      setHeight(newHeight);
      setWidth(newWidth);

      console.log("energyTick");

    },1000);

    return ()=>clearInterval(energyTimer);

  },[]);

  useLayoutEffect(()=>{
    let gridRef = document.getElementById('grid');
    if(gridRef){
      console.log("Initializing Tile Map");
      initializeTileMap(gridRef,10);
    }
  },[]);

  useLayoutEffect(()=>{
    let ref = document.getElementById('core');

    if(ref){
      let newCoordinates={
        x:ref.getBoundingClientRect().x,
        y:ref.getBoundingClientRect().y,
      }

      //Update the state on change
      if(newCoordinates.x!==coreCoordinates.x || newCoordinates.y!==coreCoordinates.y){
        setCoreCoordinates(newCoordinates);
      }
    }
  });

  const initializeTileMap=(gridRef,numBins)=>{
    let newTileMap=[];
    let newGrid={
      left:gridRef.getBoundingClientRect().left,
      right:gridRef.getBoundingClientRect().right,
      top:gridRef.getBoundingClientRect().top,
      bottom: gridRef.getBoundingClientRect().bottom,
      coordinatesInBound:function(x,y){
        if(x>=this.left && x<=this.right && y>=this.bottom && y<=this.top){
          console.log('Coordinate In Bound!');
        }else{
          console.log('Coordinate Off the grid!');
        }
      }
    };
    setGrid(grid);

    console.log({status:"Initializing Grid With ref", ref:gridRef.getBoundingClientRect()});

    let gridWidth = gridRef.getBoundingClientRect().width;
    let gridHeight = gridRef.getBoundingClientRect().height;

    let x=gridRef.getBoundingClientRect().left;
    let y=gridRef.getBoundingClientRect().top;

    let widthStep=gridWidth/numBins;
    let heightStep=gridHeight/numBins;

    let newRow=[];

    //Initialize self-actualized / self-aware bins
    for(let i=0; i<numBins; i++){
      ///x----->maxX
      for(let j=0; j<numBins; j++){
        let newBin = {
          id:String("ROW"+i+"-COL"+j),
          rowIndex:i,
          columnIndex:j,
          active:false,
          minX:x,
          maxX:j===numBins-1?gridRef.getBoundingClientRect().right:x+widthStep,
          minY:y,
          maxY:i===numBins-1?gridRef.getBoundingClientRect().bottom:y+heightStep,
          activateWithPosition:function(x,y){
            if(x>=this.minX && x<=this.maxX && y>=this.minY && y<=this.maxY){
              this.active=true;
              console.log({status:"Bin Activated", coordinates:{x:x, y:y}, bin:this});
            }else{
              this.active=false;
            }
          }
        }
        newRow.push(newBin);
        console.log({status:"Adding New Bin", bin:newBin, newRow:newRow});

        x=x+widthStep;
      }

      newTileMap.push([...newRow]);
      newRow=[];

      x=0;
      y=y+heightStep;
    }

    console.log("Initialized Tile Map ")
    console.log({gridHeight:gridHeight, gridWidth:gridWidth, grid:newGrid, tileMap:newTileMap});

    setTileMap(newTileMap);
    setGridWidth(gridWidth);
    setGridHeight(gridHeight);
  }

  return(
    <div className='relative flex flex-row w-96 h-96 rounded-2xl items-center justify-center overflow-hidden border'>

      {/*Blob Core*/}
      <div className={`relativeflex flex-col h-full w-full bg-c2 items-start justify-start rounded-3xl p-1 z-30`}>
        {/*Blob Core+ Padding*/}
        <div className={`relative flex flex-col h-full w-full z-30`}>
          {/*Core Coordinate*/}
          <div className='absolute top-0 left-0 flex flex-row h-full items-start justify-end transition-all duration-2000 ease-in-out z-30' style={{width:`${width}%`}}>
            <div className='flex flex-col items-end justify-end transition-all duration-2000 ease-in-out' style={{height:`${height}%`}}>
              <div id={'core'} className={`flex flex-shrink-0 flex-col rounded-full bg-black opacity-75 w-6 h-6 shadow-xl`}>
                {String(Number.parseInt(coreCoordinates.x)+", "+Number.parseInt(coreCoordinates.y))}
              </div>
            </div>
          </div>
        </div>

        {/*Position Grid -- 'ABOVE the padding'*/}
        <div id={'grid'} className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-start z-10'>
          {coreCoordinates && tileMap && tileMap.map((tileRow,rowIndex)=>{
            //The point here is you 'map a static 'grid' that then pulls state from the coordinates state object, so you only render the grid once, but then pull state continuously
            return(
              <div key={rowIndex} className='flex flex-row w-full flex-1'>
                {tileRow.map((tile,tileIndex)=>{
                  return(
                    <div key={tile.id} className={`flex flex-row h-full flex-1 rounded-2xl border`}>
                      <div className={`flex flex-col flex-wrap h-full w-full items-center justify-center rounded-3xl ${tile.maxX+TAP_BUFFER>=coreCoordinates.x&&coreCoordinates.x>=tile.minX-TAP_BUFFER&&tile.maxY+TAP_BUFFER>=coreCoordinates.y&&coreCoordinates.y>=tile.minY-TAP_BUFFER?("bg-black"):("bg-white")} transition-all duration-100 ease-in text-black opacity-50`} style={{fontSize:"0.5rem",}}>
                        {/*String("X:"+String(tile.maxX>=coreCoordinates.x&&coreCoordinates.x>=tile.minX)+", Y:"+String(tile.maxY>=coreCoordinates.y&&coreCoordinates.y>=tile.minY))*/}
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
  )
}

//BE VERY CAREFUL WITH THIS. LOADING screen only. Fun!! but not useful really for data vis
//It looks cool, but is literally not useful for data vis... acknowledge the difference between 'catches eyeballs, and 'generates insights''
const LightWavePattern=(props)=>{
  //Tension MX to 'tighten or slacken' curvature of the lines
  const TENSION_MX=16;
  // Each point has this box around it -- the numbers define and help determine the entry and exit angles and positioning of the c1 & c2 values for the bezier curves based on inbound and outbound slopes
  // Used to create the pathstring from the set of points
  //     1
  //  8  _  2
  // 7 | * | 3
  //  6  -  4
  //     5

  const SLOPE_MAP={
    'VERCIAL_POSITIVE':{id:'VERTICAL_POSITIVE', inboundCoordinate:'5', outboundCoordinate:'1', appliesToSlope:(slope)=>{return slope>=10}},
    'STEEP_POSITIVE':{id:'STEEP_POSITIVE', inboundCoordinate:'6', outboundCoordinate:'2', appliesToSlope:(slope)=>{return slope>2 && slope<10}},
    'FLAT':{id:'FLAT', inboundCoordinate:'7', outboundCoordinate:'3', appliesToSlope:(slope)=>{return slope>=-2 && slope <=2}},
    'STEEP_NEGATIVE':{id:'STEEP_NEGATIVE', inboundCoordinate:'8', outboundCoordinate:'4', appliesToSlope:(slope)=>{return slope<-2 && slope>-10}},
    'VERTICAL_NEGATIVE':{id:'VERTICAL_NEGATIVE', inboundCoordinate:'5', outboundCoordinate:'1', appliesToSlope:(slope)=>{return slope<=-10}},
  }
  const COORDINATE_MAP={
    '1':{id:'1', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x, y:point.y-coordinateOffset}}},
    '2':{id:'2', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y-coordinateOffset}}},
    '3':{id:'3', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y}}},
    '4':{id:'4', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y+coordinateOffset}}},
    '5':{id:'5', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x, y:point.y+coordinateOffset}}},
    '6':{id:'6', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y+coordinateOffset}}},
    '7':{id:'7', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y}}},
    '8':{id:'8', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y-coordinateOffset}}},
  }
  //100 steps up, 100 steps down
  const POINT_COUNT=200;

  //Calculate coordiante offsets to curve the path
  const getCoordinatesForPoint=(currentPoint,previousPoint,nextPoint)=>{
    //Calculate the inbound and outbound slopes for the point
    let inboundSlope = ((currentPoint.y)-(previousPoint.y))/(currentPoint.x-previousPoint.x);
    let outboundSlope = 0;

    if(nextPoint.x!==currentPoint.x){
      outboundSlope = ((nextPoint.y)-(currentPoint.y))/(nextPoint.x-currentPoint.x);
    }

    //Calculate the coordinate entry and exit path based on the slopes

    let inboundCoordinateType = Object.values(SLOPE_MAP).find(entry=>{return entry.appliesToSlope(inboundSlope)});
    let outboundCoordinateType = Object.values(SLOPE_MAP).find(entry=>entry.appliesToSlope(outboundSlope));

    let inboundCoordinate = inboundCoordinateType?inboundCoordinateType.inboundCoordinate:7;
    let outboundCoordinate = outboundCoordinateType?outboundCoordinateType.outboundCoordinate:3;

    //Calcualte the coordinate offsets
    let inboundOffset = COORDINATE_MAP[inboundCoordinate].calculateCoordinateOffset(currentPoint,coordinateOffset);
    let outboundOffset = COORDINATE_MAP[outboundCoordinate].calculateCoordinateOffset(currentPoint,coordinateOffset);

    return {c1:inboundOffset,c2:outboundOffset, slopes:{inboundSlope:inboundSlope,outboundSlope:outboundSlope}};
  };

  //Calculate the path theough the plotted points based on the provided data
  const calculatePath=(pathData,zeroHeightOffset,smoothCurves)=>{

    let points=[{x:0,y:lightViewHeight-zeroHeightOffset},...pathData.points]

    let coordinates = [];

    let pathString = String("M " + points[0].x + " " + (lightViewHeight-points[0].y) +" C " + points[0].x + " " + (lightViewHeight-points[0].y) +" ");

    points.forEach((point,index)=>{
      if(index>0){
        let previousPoint = points[index-1];
        let nextPoint;

        if(index<points.length-1){
          nextPoint=points[index+1];
        }else{
          nextPoint = point
        }

        let coordinateOffsets = getCoordinatesForPoint(point,previousPoint,nextPoint);
        coordinates.push(coordinateOffsets);

        if(index<points.length-1){
          pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y)+ " C "+coordinateOffsets['c2'].x+" "+(lightViewHeight-coordinateOffsets['c2'].y) + " ");
        }else{
          pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y));
        }
      }
    });

    let newSlopes = {...slopes};
    newSlopes[pathData.key]=coordinates
    setSlopes(newSlopes);

    return pathString;
  }

  const lightRef = useRef();
  const [lightViewHeight,setLightViewHeight]=useState(null);
  const [lightViewWidth,setLightViewWidth]=useState(200);
  const [zeroHeightOffset,setZeroHeightOffset] = useState(200);
  const [coordinateOffset,setCoordinateOffset] = useState((200/POINT_COUNT)/TENSION_MX);
  const [pathStrings,setPathStrings] = useState([]);
  const [slopes,setSlopes] = useState({});

  const [newWaves,setNewWaves]=useState([]);
  const [animate,setAnimate]=useState(true);
  const [strokeDashArray,setStrokeDashArray]=useState(['0 0']);

  //Initialize the light view
  useLayoutEffect(()=>{
    let ref = document.getElementById("lightView");
    if(ref && ref.getBoundingClientRect().height!==lightViewHeight){
      console.log("Updating Light View height")
      setLightViewWidth(ref.getBoundingClientRect().width);
      setLightViewHeight(ref.getBoundingClientRect().height);
      setZeroHeightOffset(ref.getBoundingClientRect().height);
      setCoordinateOffset((ref.getBoundingClientRect().height/POINT_COUNT)/TENSION_MX);
    }

  },[lightRef]);

  //Initialize the wave once the height is initialized
  useEffect(()=>{
    if(lightViewHeight){
      console.log("Reset data");
      if(animate){
        //Set the interval && Churn the Ocean
        let interval = setInterval(()=>{
          let newWaveForms=[];

          for(let i=18; i>=1; i--){
            newWaveForms.push(generateWave());
          }

          //Adjust the heights to 'layer the paths'
          let newPointSets = {};
          newWaveForms.forEach((dataSet,index)=>{
            newPointSets[String(index)]=dataSet.map(entry=>entry-4.5*index);
          });

          //Generate Paths for each wave form
          parseHeightData(newPointSets,lightViewWidth/POINT_COUNT,true);

          setNewWaves(newWaveForms);
        },8000);

        return ()=>clearInterval(interval);
      }else{
        //Genreate waveform data
        let newWaveForms=[];
        for(let i=18; i>=1; i--){
          newWaveForms.push(generateWave());
        }

        //Adjust the heights to 'layer the paths'
        let newPointSets = {};
        newWaveForms.forEach((dataSet,index)=>{
          newPointSets[String(index)]=dataSet.map(entry=>entry-4.5*index);
        });

        //Generate Paths for each wave form
        parseHeightData(newPointSets,lightViewWidth/POINT_COUNT,true);
        setNewWaves(newWaveForms);
      }
    }
  },[lightViewHeight,animate]);

  useEffect(()=>{
    animateWaves();
  },[newWaves]);

  //Callback function to generat wave pattern
  const generateWave = (init) =>{
    let newWaveData = [];

    let basis=80;
    let yIntercept=basis;
    let wavePeakOffset=null;

    newWaveData.push(yIntercept);

    //'Step the data forward a bit just to make things look reasonable'
    for(let i=0; i<POINT_COUNT; i++){

      //Normalize the start and end of the wave
      if(i<0.18*POINT_COUNT || i>0.9*POINT_COUNT){
        newWaveData.push(basis);
      }else{

        //Build up the wave form
        if(i<=POINT_COUNT/2){
          let step = Math.random();
          let drift=0.15;

          let direction='POSITIVE';
          if(i%3===0 || step>0.85){
            direction='NEGATIVE';
          }

          if(direction==='POSITIVE'){
            yIntercept=yIntercept+step+drift;
          }else{
            yIntercept=yIntercept-step+drift;
          }

          newWaveData.push(Math.max(Math.min(98,yIntercept),0));
        }

        //Step back to the initial basis
        //Assume there are 100 steps, step a random amount but fiddle with things until the waves look great!
        if(i>POINT_COUNT/2){
          if(!wavePeakOffset){
            wavePeakOffset=Math.max(...newWaveData)-basis;
          }

          let step = Math.random();

          let direction='NEGATIVE';

          if(i%6===0 || step>0.9){
            direction='POSITIVE';
          }

          if(direction==='NEGATIVE'){
            //The plan here is to 'step by 0.5-1.5'% of the Peak offset each of the 100 steps
            //so if you have 100% height, you hack 0.5-1.5% of that initial height 100 times you should be close to the basis at the end
            if(i<0.8*POINT_COUNT){
              let percentDrift = 2.84;

              let percentStep = (step+percentDrift)/100;

              yIntercept=yIntercept-percentStep*wavePeakOffset;
            }else{
              //If you are in the last 10% then close the gap more aggressively in the final few steps
              if(i<0.85*POINT_COUNT){
                yIntercept=yIntercept-Math.abs(yIntercept-basis)/7;
              }else{
                yIntercept=yIntercept-Math.abs(yIntercept-basis)/2;
              }
            }
          }else{
            yIntercept=yIntercept+step;
          }

          newWaveData.push(Math.max(Math.min(98,yIntercept),basis));
        }
      }
    }



    return (newWaveData);
  }

  //Parse the heights for the data based on the provided data
  const parseHeightData=(pointSets,barWidth,smoothLines,)=>{
    let Paths = {};

    let maxHeight = 0;
    let minHeight = 0;

    //Get the max and min heights for all the pathstrings
    Object.keys(pointSets).forEach(key=>{
        let data = pointSets[key];

        let maxSetHeight = Math.max(...data);

        if(maxSetHeight>maxHeight){
          maxHeight=maxSetHeight;
        }

        let minSetHeight = Math.min(...data);

        if(minSetHeight<minHeight){
          minHeight = minSetHeight;
        }

      });

    //Calcualte the total basis
    let totalBasis=maxHeight+Math.abs(minHeight);
    let zeroHeightOffset=lightViewHeight*maxHeight/totalBasis
    setZeroHeightOffset(zeroHeightOffset);

    //Calculate the heights and path data
    Object.keys(pointSets).forEach(key=>{
      let data = pointSets[key];

      let newHeights = data.map(point=>point>=0?point/maxHeight*maxHeight/totalBasis*100+Math.abs(minHeight)/totalBasis*100:(Math.abs(minHeight)-Math.abs(point))/Math.abs(minHeight)*Math.abs(minHeight)/totalBasis*100);

      let pathData = {key:key, points:data.map((point,index)=>{return {x:index*barWidth+barWidth/2, y:newHeights[index]/100*lightViewHeight}})};

      Paths[key]=calculatePath(pathData,zeroHeightOffset,smoothLines);
    });

    setPathStrings(Paths);
  }

  const animateWaves=()=>{
    //setStrokeDashArray(['8 1000']);
    //setTimeout(()=>setStrokeDashArray(['0 0']),1000);

    setStrokeDashArray(['8 1000']);
    setTimeout(()=>setStrokeDashArray(['0 0']),1000);
  }

  return(
    <div className='flex flex-col w-full h-full items-center justify-center'>
      <div className='hidden relative flex flex-col w-64 h-64 items-center justify-center border-l border-b'>
        {newWaves.map((waveData,index)=>{
          return(
            <div key={index} className='absolute top-0 left-0 flex flex-row h-full w-full justify-around items-end overflow-hidden rounded-3xl py-1'>
              {waveData.map((entry,dataIndex)=>{
                return(
                  <div key={String(index+":"+dataIndex)} className='relative flex flex-col items-center justify-start transition-all duration-2000 ease-in-out' style={{height:`${entry-index*9}%`}}>
                    {/*Render the point at the mid point of the height of its bounding rect*/}
                    <div className={`${index%2===0?("bg-c2-highlight"):("bg-green-500")} rounded-full`} style={{height:"0.1rem",width:"0.1rem",transform:"(0%,-50%)"}}>
                    </div>

                    {/*Shade the background*/}
                    <div className='absolute top-0 left-0 flex flex-col w-full h-full bg-c2-highlight' style={{opacity:"0.05"}}>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div ref={lightRef} id="lightView" className='relative flex flex-col w-64 h-72 my-4 items-center justify-center p-2'>
        {Object.values(pathStrings).length>0&&Object.values(pathStrings).map((pathString,pointSetIndex)=>{
        let lineWidth=2;
        return(
          <div key={pointSetIndex} className='absolute top-0 left-0 flex flex-col w-full h-full'>
            {/*Draw the line*/}
            <div className={`flex flex-row flex-1 h-full z-0`}>
              <svg height={`${lightViewHeight-8}`} width={`${lightViewWidth}`} xmlns="http://www.w3.org/2000/svg" style={{color:`${pointSetIndex%3===0?props.color:"#67E8F9"}`}}>
                <path className='transition-all duration-1000'  d={pathString} stroke="currentColor" strokeWidth={lineWidth} strokeDasharray={strokeDashArray} strokeLinejoin='round' strokeLinecap='round' fill="transparent"/>
              </svg>
            </div>
          </div>
        )
        })}
        {/*Shading*/}
        <div className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-between z-50 border-l border-b'>
          <div className="flex flex-col w-1/6 h-full bg-black" style={{opacity:"0.45"}}>
          </div>
          <div className="flex flex-col h-full bg-black" style={{width:"12%",opacity:"0.35"}}>
          </div>
          <div className="flex flex-1 h-full">
          </div>
          <div className="flex flex-col h-full bg-black" style={{width:"12%",opacity:"0.35"}}>
          </div>
        </div>
      </div>
    </div>
  )
}

//Annimate Lightbeams
const Lightbeam=(props)=>{

  let POINTS={
    '1':{id:'1', nextID:'2', x:5, y:10},
    '2':{id:'2', nextID:'1', x:48, y:90},
    /*
    '3':{id:'3', nextID:'4', x:40, y:35},
    '4':{id:'4', nextID:'5', x:50, y:45},
    '5':{id:'5', nextID:'6', x:60, y:55},
    '6':{id:'6', nextID:'7', x:50, y:45},
    '7':{id:'7', nextID:'8', x:40, y:35},
    '8':{id:'8', nextID:'1', x:30, y:25},
    */
  }

  let POINTS_2={
    '1':{id:'1', nextID:'2', x:95, y:10},
    '2':{id:'2', nextID:'1', x:52, y:90},
    /*
    '3':{id:'3', nextID:'4', x:40, y:35},
    '4':{id:'4', nextID:'5', x:50, y:45},
    '5':{id:'5', nextID:'6', x:60, y:55},
    '6':{id:'6', nextID:'7', x:50, y:45},
    '7':{id:'7', nextID:'8', x:40, y:35},
    '8':{id:'8', nextID:'1', x:30, y:25},
    */
  }

  let POINTS_3={
    '1':{id:'1', nextID:'2', x:50, y:10},
    '2':{id:'2', nextID:'1', x:50, y:90},
    /*
    '3':{id:'3', nextID:'4', x:40, y:35},
    '4':{id:'4', nextID:'5', x:50, y:45},
    '5':{id:'5', nextID:'6', x:60, y:55},
    '6':{id:'6', nextID:'7', x:50, y:45},
    '7':{id:'7', nextID:'8', x:40, y:35},
    '8':{id:'8', nextID:'1', x:30, y:25},
    */
  }

  const [point,setPoint]=useState(POINTS['1']);
  const [point2,setPoint2]=useState(POINTS_2['1']);
  const [point3,setPoint3]=useState(POINTS_2['1']);


  useEffect(()=>{
    setTimeout(()=>setPoint(POINTS[point.nextID]),props.delay);
  },[point])

  useEffect(()=>{
    setTimeout(()=>setPoint2(POINTS_2[point.nextID]),props.delay);
  },[point2])

  useEffect(()=>{
    setTimeout(()=>setPoint3(POINTS_3[point.nextID]),props.delay);
  },[point3])


  //INSERT
  /*
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
    <Lightbeam color={'#2dd4bf'} delay={150}/>
  </div>
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
    <Lightbeam color={'#60a5fa'} delay={100}/>
  </div>

  //CARTESIAN GRID
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{zIndex:0, opacity:"15%"}}>
    <div className='w-1/4 border-b'>
    </div>
  </div>
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{zIndex:0, opacity:"15%"}}>
    <div className='h-1/3 border-r'>
    </div>
  </div>
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{zIndex:0, opacity:"15%"}}>
    <div className='h-1/3 border-r' style={{rotate:"65deg"}}>
    </div>
  </div>
  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{zIndex:0, opacity:"15%"}}>
    <div className='h-1/3 border-r' style={{rotate:"-65deg"}}>
    </div>
  </div>
  */
  //INSERT

  return (
    <div className='relative flex flex-col w-1/2 h-2/3 items-start justify-end rounded-3xl border-shades-dark animate-spin'>

      {/*Transition the Points*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end'>
        <div className='flex flex-col w-full items-start justify-start transition-all duration-50 ease-in-out' style={{height:`${point.y}%`}}>
          <div className='flex flex-row items-center justify-end transition-all duration-50 ease-in-out' style={{width:`${point.x}%`}}>
            <div className='flex flex-row rounded-full h-2 w-2' style={{backgroundColor:props.color}}>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end'>
        <div className='flex flex-col w-full items-start justify-start transition-all duration-50 ease-in-out' style={{height:`${point2.y}%`}}>
          <div className='flex flex-row items-center justify-end transition-all duration-50 ease-in-out' style={{width:`${point2.x}%`}}>
            <div className='flex flex-row rounded-full h-2 w-2' style={{backgroundColor:props.color}}>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end'>
        <div className='flex flex-col w-full items-start justify-start transition-all duration-50 ease-in-out' style={{height:`${point3.y}%`}}>
          <div className='flex flex-row items-center justify-end transition-all duration-50 ease-in-out' style={{width:`${point3.x}%`}}>
            <div className='flex flex-row rounded-sm h-6 w-1' style={{backgroundColor:props.color}}>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

//Rasengan
const Rasengan = ()=>{

  return(
    <div className='relative flex flex-col w-full h-full bg-black'>


    <div className='absolute top-0 left-0 flex flex-col h-screen w-full items-center justify-center bg-black z-50'>
      <div className='relative rounded-full border-2 border-gray-900 p-2' style={{height:"40rem", width:"40rem"}}>
        {/*Ring*/}
        <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black animate-spin'>
            <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-yellow-600 animate-spin'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black animate-spin'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className='absolute top-0 left-0 flex flex-col h-screen w-full items-center justify-center z-50'>
      <div className='rounded-full border-2 border-gray-900 p-2' style={{height:"20rem", width:"35rem"}}>
        <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black animate-spin'>
            <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-c2-highlight animate-spin'>
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-yellow-600 animate-spin'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black animate-spin'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )

}

//Saturn
const Saturn=()=>{

  return(
    <div className='relative flex flex-col h-screen w-full items-center justify-center'>
      {/*Ring*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center bg-black z-50'>
        <div className='relative flex flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-gray-900 p-2' style={{height:"50rem", width:"50rem"}}>
          {/*Ring*/}
          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
            <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black bg-gradient-to-r from-gray-800 to-black p-0.5 animate-spin'>
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 border-yellow-600'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 bg-gradient-to-r from-cyan-800 to-violet-900 p-0.5 border-violet-900'>
                    <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black bg-black animate-spin'>
                      <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Loop*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center z-50'>
        <div className='relative rounded-full border-2 border-gray-900 p-2' style={{height:"70rem", width:"70rem", transform:"scaleY(0.3)"}}>
          {/*Ring*/}
          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
            <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black p-0.5 animate-spin'>
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 border-yellow-600 animate-spin'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black bg-black animate-spin'>
                    <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Ring Top Overlap*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center z-50'>
        <div className='flex flex-col items-center justify-start' style={{height:"50rem", width:"50rem"}}>
          <div className='flex flex-col items-center justify-start overflow-y-hidden' style={{height:"40rem", width:"50rem"}}>
            <div className='relative flex flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-gray-900 p-2' style={{height:"50rem", width:"50rem"}}>
              {/*Ring*/}
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black bg-gradient-to-r from-gray-800 to-black p-0.5 animate-spin'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white'>
                    <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 border-yellow-600'>
                      <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 bg-gradient-to-r from-cyan-800 to-violet-900 p-0.5 border-violet-900'>
                        <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black bg-black animate-spin'>
                          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Core*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center z-50'>
        <div className='relative flex flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-transparent p-2' style={{height:"50rem", width:"50rem"}}>
          {/*Ring*/}
          <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-transparent'>
            <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-transparent'>
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-transparent'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2  p-0.5 border-transparent'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 p-0.5 border-transparent'>
                    <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-transparent'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Ring Front Top Overlap*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{zIndex:60}}>
        <div className='flex flex-col items-center justify-end' style={{height:"70rem", width:"70rem", transform:"scaleY(0.3)"}}>
          <div className='flex flex-col items-center justify-end overflow-y-hidden' style={{height:"35rem", width:"70rem"}}>
            <div className='relative flex flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-gray-900 p-2' style={{height:"70rem", width:"70rem"}}>
              {/*Ring*/}
              <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black p-0.5 animate-spin'>
                  <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                    <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 p-0.5 border-yellow-600 animate-spin'>
                      <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-black animate-spin'>
                        <div className='flex flex-col items-center justify-center h-full w-full rounded-full border-2 border-white animate-spin'>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//Arrival Flashbang * stars // kind of like rain drops
const Arrival =(props)=>{

  const WORDS={
    "HELLO":{id:"HELLO",
      points:{
        "1-1":{rowIndex:1, colIndex:1, size:"h-8 w-12"},
        "2-2":{rowIndex:2, colIndex:2, size:"h-8 w-8"},
        "3-5":{rowIndex:3, colIndex:5, size:"h-8 w-12"},
        "4-1":{rowIndex:4, colIndex:1, size:"h-28 w-28"},
        "5-5":{rowIndex:5, colIndex:5, size:"h-10 w-10"},
        "6-7":{rowIndex:6, colIndex:7, size:"h-40 w-40"},
        "6-2":{rowIndex:6, colIndex:2, size:"h-12 w-12"},
      }
    },
    "TECHNOLOGY":{id:"TECHNOLOGY",
      points:{
        "1-1":{rowIndex:1, colIndex:1, size:"h-8 w-12"},
        "2-2":{rowIndex:2, colIndex:2, size:"h-8 w-8"},
        "3-5":{rowIndex:3, colIndex:5, size:"h-8 w-12"},
        "4-8":{rowIndex:4, colIndex:1, size:"h-8 w-8"},
        "5-2":{rowIndex:5, colIndex:5, size:"h-10 w-10"},
        "6-0":{rowIndex:6, colIndex:0, size:"h-8 w-8"},
        "6-1":{rowIndex:6, colIndex:1, size:"h-8 w-8"},
        "6-2":{rowIndex:6, colIndex:2, size:"h-8 w-8"},
        "6-3":{rowIndex:6, colIndex:3, size:"h-8 w-8"},
        "6-4":{rowIndex:6, colIndex:4, size:"h-8 w-8"},
        "6-5":{rowIndex:6, colIndex:5, size:"h-8 w-8"},
        "6-6":{rowIndex:6, colIndex:6, size:"h-12 w-12"},
      }
    }
  }

  const [rows,setRows]=useState();
  const [activeCellsL0,setActiveCellsL0]=useState();
  const [activeCellsL1,setActiveCellsL1]=useState();
  const [activeCellsL2,setActiveCellsL2]=useState();
  const [cycles,setCycles]=useState(0);
  const [activeWord,setActiveWord]=useState(WORDS['HELLO']);

  //Initialize the grid
  useEffect(()=>{
    initializeGrid();
  },[]);

  //Cycle the active cells
  useEffect(()=>{

    let activeStateTimer=setTimeout(()=>{

      //L1
      let newActiveCells=[];

      //Flip the lights on
      for(let i=0; i<10; i++){
        let newRow=[];

        for (let j=0; j<10; j++){

          let active = Math.random()<0.24;
          //let active=activeWord.points[String(i+"-"+j)];
          newRow.push(active);
        }

        newActiveCells.push(newRow);
      }

      //Update the state
      setActiveCellsL1(newActiveCells);

      //L2
      let newActiveCellsL2=[];

      //Flip the lights on
      for(let i=0; i<50; i++){
        let newRow=[];

        for (let j=0; j<50; j++){

          let active = Math.random()<0.34;
          //let active=activeWord.points[String(i+"-"+j)];
          newRow.push(active);
        }

        newActiveCellsL2.push(newRow);
      }

      //Update the state
      setActiveCellsL2(newActiveCellsL2);



      setCycles((cycles)=>cycles+1);
    },400);

    return ()=>clearInterval(activeStateTimer);

  },[activeCellsL1,activeWord]);

  const initializeGrid=()=>{

    //Initilize rows / cells
    let newRows=[];

    for(let i=0; i<10; i++){
      //Create a new row
      let newRow=[];
      for(let j=0; j<10; j++){

        let newCell = {
          id:String(i+"-"+j),
          rowIndex:i,
          colIndex:j,
        }

        //Add the cell to the row
        newRow.push(newCell);
      }

      //Add the new row to the rows
      newRows.push(newRow);
    }

    //Update the state
    setRows(newRows);
  }


  return(
    <div className='relative flex flex-col h-full w-full p-8 overflow-hidden rounded-3xl'>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col w-full h-full items-center justify-center'>
        <div className='flex flex-col rounded-full h-3/4 w-3/4 border-8 border-gray-800 transition-all duration-300 ease-in-out' style={{opacity:"100%"}}>
        </div>
      </div>

      {/*Layer 1*/}
      {activeCellsL1&&rows&&rows.map((row,index)=>{
        return(
          <div key={index} className='flex flex-row flex-1 w-full items-center justify-start'>
            {row.map((cells,colIndex)=>{
              let active=activeCellsL1[index][colIndex];
              return(
                <div className='flex flex-col h-full flex-1 items-center justify-center'>
                  <RainDrop active={active} type={props.type} size={"h-20 w-20"}/>
                </div>
              )
            })}
          </div>
        )
      })}

      {/*Layer 2*/}
      <div className='absolute top-0 left-0 h-full w-full flex flex-col w-full h-full items-center justify-start'>
        {activeCellsL2&&rows&&rows.map((row,index)=>{
        return(
          <div key={index} className='flex flex-row flex-1 w-full items-center justify-start'>
            {row.map((cells,colIndex)=>{
              let active=activeCellsL2[index][colIndex];
              return(
                <div className='flex flex-col h-full flex-1 items-center justify-center'>
                  <RainDrop active={active} type={props.type} size={"h-8 w-8"}/>
                </div>
              )
            })}
          </div>
        )
      })}
      </div>


      {/*Segments*/}
      <div className='absolute top-0 left-0 h-full w-1/2 border-r border-shades-dark'>
      </div>
      <div className='absolute top-0 left-0 h-1/2 w-full border-b border-shades-dark'>
      </div>

      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(15deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(30deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(45deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(60deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(75deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>

      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(-15deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(-30deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(-45deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(-60deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>
      <div className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-start' style={{transform:"rotate(-75deg)"}}>
        <div className='flex flex-col h-full w-1/2 border-r border-shades-dark'>
        </div>
      </div>

    </div>
  )
}

//Light Fabrics
const LightFabric=(props)=>{

  const PATH={
    "1-0":"rounded-2xl border-transparent border-b-4",
    "1-1":"rounded-2xl border-transparent border-b-4 border-r-4",
    "2-1":"rounded-2xl border-transparent border-r-4",
    "3-1":"rounded-2xl border-transparent border-r-4",
    "3-2":"rounded-2xl border-transparent border-b-4",
    "3-3":"rounded-2xl border-transparent border-b-4",
    "3-4":"rounded-2xl border-transparent border-b-4 border-r-4",
    "4-4":"rounded-2xl border-transparent border-r-4",
  }

  const [pulse,setPulse]=useState(false);
  const [rows,setRows]=useState(null);

  useEffect(()=>{
    initializeGrid();
  },[])

  useEffect(()=>{
    let pulseTimer=setTimeout(()=>setPulse((pulse)=>!pulse),2400);

    return ()=>clearInterval(pulseTimer);
  },[pulse]);

  const initializeGrid=()=>{
    let newRows=[];

    for(let i=0; i<10; i++){
      let newRow=[];
      for(let j=0; j<10; j++){
        let newCell ={id:String(i+"-"+j), rowIndex:i, colIndex:j};
        newRow.push(newCell);
      }

      newRows.push(newRow);
    }

    setRows(newRows);
  }

  return(

    <div className='flex flex-row h-full w-full items-center justify-center'>

      <div className='relative flex flex-col rounded-2xl border-2 border-gray-900' style={{height:"50rem", width:"50rem"}}>
        {/*Overlay*/}
        <div className='flex flex-col h-full w-full items-center justify-start' style={{zIndex:5}}>
          {rows&&rows.map((row,rowIndex)=>{
            return(
              <div key={rowIndex} className='flex flex-row flex-1 w-full items-center justify-start' style={{zIndex:5}}>
                {row.map((cells,cellIndex)=>{
                  //let pathString=PATH[String(rowIndex+"-"+cellIndex)]?PATH[String(rowIndex+"-"+cellIndex)]:"";

                  return(
                    <div key={cellIndex} className={`flex flex-col h-full flex-1 rounded-2xl`} style={{zIndex:5,}}>
                      <div className='h-full w-full border-r-4 border-t-4 border-transparent'>
                        <div className={`${pulse?"rounded-3xl":"rounded-r-2xl rounded-b-2xl"} h-full w-full bg-black transition-all duration-2000 ease-in-out`} style={{transform:`rotate(${pulse?8:-104}deg)`}}>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/*Multi-color slider (|====>|)*/}
        <div className='absolute top-0 left-0 flex flex-row items-center justify-center h-full w-full rounded-2xl overflow-hidden' style={{zIndex:1}}>
          <div className={`flex flex-row h-full ${true?"w-0":"w-full"} transition-all duration-2000 ease-in-out`}>
          </div>
          <div className={`flex flex-col h-full w-full bg-gradient-to-r from-blue-400 to-green-400 via-fuchsia-400 transition-all duration-2000 ease-in-out`}>
          </div>
        </div>
      </div>

    </div>
  )
}

//Permet Score 9
const CartesianPlane=(props)=>{

  const POINTS=[
    {from:{x:50,y:70}, to:{x:10,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:90,y:20}, to:{x:30,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:30,y:80}, to:{x:50,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:70,y:80}, to:{x:70,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:50,y:10}, to:{x:90,y:20}, fromColor:"#22d3ee", toColor:"#22d3ee"},
    {from:{x:20,y:60}, to:{x:35,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:80,y:60}, to:{x:65,y:55}, fromColor:"#22d3ee", toColor:"#5eead4"},
    {from:{x:10,y:20}, to:{x:50,y:85}, fromColor:"#22d3ee", toColor:"#34d399"},
  ];

  const EDGES=[
    {rotate:0, x:50, y:20, widthMX:0.8, borderString:"border-t-2"},
    {rotate:0, x:50, y:60, widthMX:0.6, borderString:"border-t-2"},
    {rotate:0, x:50, y:80, widthMX:0.4, borderString:"border-t-2"},

    {rotate:25, x:55, y:40, widthMX:0.8, borderString:"border-t-2"},
    {rotate:-25, x:45, y:40, widthMX:0.8, borderString:"border-t-2"},
    {rotate:90, x:50, y:40, widthMX:0.5, borderString:"border-t-2"},
    {rotate:-75, x:15, y:40, widthMX:0.35, borderString:"border-t-2"},
    {rotate:75, x:85, y:40, widthMX:0.35, borderString:"border-t-2"},
    {rotate:70, x:40, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:-70, x:60, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:-45, x:30, y:45, widthMX:0.65, borderString:"border-t-2"},
    {rotate:45, x:70, y:45, widthMX:0.65, borderString:"border-t-2"},
  ];

  const [pulse,setPulse]=useState(true);
  const [edges,setEdges]=useState([]);
  const [showNodes,setShowNodes]=useState(true);
  const [maxWidthREM,setMaxWidthREM]=useState(20);

  useEffect(()=>{
    let timer=setTimeout(()=>refreshEdges(),6500);

    return ()=>clearInterval(timer);

  },[edges]);

  const refreshEdges=()=>{
    let newEdges=[];

    let EDGE_COUNT=80;

    //Generate new edges
    for(let i=0; i<EDGE_COUNT; i++){
      let newEdge={originX:Math.random()*100, originY:Math.random()*100, widthScale:Math.random(), rotation:Math.random()*500};
      newEdges.push(newEdge);
    }

    setEdges(newEdges);
  }

  return(
    <div className='relative flex flex-col items-center justify-center rounded-2xl border-2 border-gray-900 overflow-hidden' style={{zIndex:5, width:"50rem", height:"50rem"}}>
      {false && POINTS.map((entry,index)=>{
        return(
          <div key={index} className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-end' style={{zIndex:5}}>
            <div className='flex flex-col items-end justify-start transition-all duration-2000 ease-in-out' style={{height:!pulse?`${entry.from.y}%`:`${entry.to.y}%`, width:!pulse?`${entry.from.x}%`:`${entry.to.x}%`}}>
              <div className='flex flex-row rounded-full h-20 w-20 border-4 bg-gray-900 transition-all duration-2000 ease-in-out' style={{transform:"translate(50%,-50%)", borderColor:pulse?entry.toColor:entry.fromColor}}>
              </div>
            </div>
          </div>
        )
      })}
      {false && EDGES.map((entry,index)=>{
        return(
          <div className='absolute top-0 left-1 h-full w-full flex flex-col items-start justify-end transition-all duration-2000 ease-in-out' style={{zIndex:pulse?-50:1, opacity:pulse?"0%":"100%",}}>
            <div className={`flex flex-col items-end justify-start`} style={{width:`${entry.x}%`, height:`${entry.y}%`}}>
              {/*Place the origin*/}
              <div className='relative rounded-full h-2 w-2'>
                {/*Rotate the line*/}
                <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                  <div className={`border-t-2 border-gray-800 transition-all duration-2000 ease-in-out`} style={{width:`${pulse?0:entry.widthMX*maxWidthREM}rem`, transform:`rotate(${entry.rotate}deg)`}}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/*Position things rapidly*/}
      {edges&&edges.map((edge,index)=>{

        return(
          <div key={index} className='absolute top-0 left-0 h-full w-full flex flex-col items-start justify-end'>
            <div className={`flex flex-col items-end justify-start transition-all duration-7000 ease-in-out`} style={{width:`${edge.originX}%`, height:`${edge.originY}%`}}>
              {/*Place the origin*/}
              <div className='relative rounded-full h-2 w-2'>
                {/*Rotate the line*/}
                <div className='absolute top-0 right-0 flex flex-col items-center justify-center rounded-full w-2 h-2'>
                  <div className={`relative flex flex-row items-center justify-between h-0.5 bg-gray-600 transition-all duration-7000 ease-in-out`} style={{width:`${edge.widthScale*maxWidthREM}rem`, transform:`rotate(${edge.rotation}deg)`}}>
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

//Rotations and Animations
const CommandAnnimation=(props)=>{

  const [maxDegreeOffset,setMaxDegreeOffset]=useState(60);
  const [degree,setDegree]=useState(0);
  const [spin,setSping]=useState(true);
  const [showBorders,setShowBorders]=useState(false);

  useEffect(()=>{

    let timer=setTimeout(()=>setDegree((degree)=>degree===-maxDegreeOffset?maxDegreeOffset:-maxDegreeOffset), 1800);

    return ()=>clearInterval(timer);

  },[degree]);

  return(
    <div className={`relative flex flex-col w-full h-full items-center justify-center ${spin?"animate-spin":""}`}>
      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(0%,-50%)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-center justify-end transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(0%,100%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(0%,50%)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-center justify-start transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(0%,-100%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(-50%,0%)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-end justify-center transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(100%,0%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(50%,0%)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-start justify-center transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(-100%,0%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(0%,-50%) rotate(45deg)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-center justify-end transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(0%,100%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(0%,50%) rotate(45deg)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-center justify-start transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(0%,-100%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(-50%,0%) rotate(45deg)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-end justify-center transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(100%,0%)"}}>
          </div>
        </div>
      </div>

      <div className='absolute top-0 -left-1 flex flex-col items-center justify-center p-2' style={{height:"45rem", width:"45rem",transform:"translate(50%,0%) rotate(45deg)"}}>
        <div className={`h-full w-full rounded-full ${showBorders?"border-4":"border-0"} border-gray-800 flex flex-col items-start justify-center transform-all duration-2000 ease-in-out`} style={{transform:`rotate(${degree}deg)`}}>
          <div className={`flex flex-col rounded-full ${degree<0?"h-20 w-20":"h-20 w-20"} bg-gray-900 border-c2-highlight border-2 transition-all duration-1000 ease-in-out`} style={{transform:"translate(-100%,0%)"}}>
          </div>
        </div>
      </div>
    </div>
  )
}

//VERY cool
const TileWaterfall = () =>{

  const TILES = [0,0,0,0,0,0,0,0,0,0];
  const ELEVATORS = [1,1,1,1,1,1,1,1,1,1];
  const TILE_OFFSETS=[25,10,36,73,41,2,8,54,29,10];
  const OPACITY_TIMERS=[300,500,200,200,300,800,100,200,800,300];
  const OPACITY_TIMERS_2=[200,300,800,200,100,300,200,500,300,100];


  const [tiles,setTiles] = useState(TILES);
  const [elevators,setElevators]=useState(ELEVATORS);

  const [tiles2,setTiles2] = useState(TILES);
  const [elevators2,setElevators2]=useState(ELEVATORS);

  const [tileOffsets,setTileOffsets] = useState(TILE_OFFSETS);

  //Init tile animations
  useEffect(()=>{
    //Start the elevators
    setTiles([1,1,1,1,1,1,1,1,1,1]);

    let tileTimer=setInterval(()=>{
      refreshTiles();
    },6300);


    return ()=>clearInterval(tileTimer);
  },[]);

  //Init wave 2 tile animations
  useEffect(()=>{
    let wave2Timer;

    setTimeout(()=>{
      setTiles2([1,1,1,1,1,1,1,1,1,1]);
      wave2Timer=setInterval(()=>{
        refreshTiles(true);
      },6300);
    },3100);

    return ()=>clearInterval(wave2Timer);
  },[]);

  const refreshTiles=(wave2)=>{

    if(wave2){
      //Reset the elevators & tiles
      //Hide the tiles on the way down
      setTiles2([0,0,0,0,0,0,0,0,0,0]);

      //Reset the elevators to the ground floor
      setTimeout(()=>setElevators2([0,0,0,0,0,0,0,0,0,0]),700);

      //Reopen the elevator doors
      setTimeout(()=>setElevators2([1,1,1,1,1,1,1,1,1,1]),750);

      //Re-animate the tiles
      setTimeout(()=>setTiles2([1,1,1,1,1,1,1,1,1,1]),800);
    }else{
      //Reset the elevators & tiles
      //Hide the tiles on the way down
      setTiles([0,0,0,0,0,0,0,0,0,0]);

      //Reset the elevators to the ground floor
      setTimeout(()=>setElevators([0,0,0,0,0,0,0,0,0,0]),700);

      //Reopen the elevator doors
      setTimeout(()=>setElevators([1,1,1,1,1,1,1,1,1,1]),750);

      //Re-animate the tiles
      setTimeout(()=>setTiles([1,1,1,1,1,1,1,1,1,1]),800);
    }

    let newTileOffsets=[];
    for (let i=0; i<TILES.length; i++){
      newTileOffsets.push(5+Math.random()*70);
    }

    setTileOffsets(newTileOffsets);
  }

  return (
    <div className='relative flex flex-col w-96 h-full items-center justify-end z-10'>
      {/*Wave 1*/}
      <div className='absolute top-0 left-0 flex flex-row w-full justify-between h-full overflow-y-hidden z-0'>
        {tiles.map((tile,tileIndex)=>{
          let opacity = tiles[tileIndex]?100:0;
          return(
            <div key={tileIndex} className='relative flex flex-col flex-1 h-full items-center justify-end' style={{height:`${100+tileOffsets[tileIndex]}%`}}>
              <div className={`flex flex-col flex-shrink-0 rounded-xl border-2 border-c2-highlight w-12 h-12 transition-all duration-300 ease-in-out`} style={{opacity:`${opacity}%`}}>
              </div>
              {elevators[tileIndex]?(
                <div className='flex flex-col w-full transition-all duration-7000 ease-in' style={{height:`${tiles[tileIndex]?100:0}%`,}}>
                </div>
              ):(
                <div className='hidden' />
              )}
            </div>
          )
        })}
      </div>

      {/*Wave 2*/}
      <div className='absolute top-0 left-0 flex flex-row w-full justify-between h-full overflow-y-hidden z-0'>
        {tiles2.map((tile,tileIndex)=>{
          let opacity = tiles2[tileIndex]?100:0;
          return(
            <div key={tileIndex} className='relative flex flex-col flex-1 h-full items-center justify-end' style={{height:`${100+tileOffsets[tileIndex]}%`}}>
              <div className={`flex flex-col flex-shrink-0 rounded-xl border-2 border-c2-highlight w-12 h-12 transition-all duration-300 ease-in-out`} style={{opacity:`${opacity}%`}}>
              </div>
              {elevators2[tileIndex]?(
                <div className='flex flex-col w-full transition-all duration-7000 ease-in' style={{height:`${tiles2[tileIndex]?100:0}%`,}}>
                </div>
              ):(
                <div className='hidden' />
              )}
            </div>
          )
        })}
      </div>

      {/*Threshold*/}
      <div className='absolute bottom-0 left-0 flex flex-col h-1/5 w-full items-center justify-start bg-black z-10'>
        <LiquidBlade variant={'ROW'} />
      </div>

    </div>
  )
}

const Rain=(props)=>{

  const [rows,setRows]=useState();
  const [activeCells,setActiveCells]=useState();
  const [cycles,setCycles]=useState(0);

  //Initialize the grid
  useEffect(()=>{
    initializeGrid();
  },[]);

  //Cycle the active cells
  useEffect(()=>{

    let activeStateTimer=setTimeout(()=>{

      let newActiveCells=[];

      //Flip the lights on
      for(let i=0; i<10; i++){
        let newRow=[];

        for (let j=0; j<10; j++){

          let active = Math.random()<0.24;
          newRow.push(active);
        }

        newActiveCells.push(newRow);
      }

      //Update the state
      setActiveCells(newActiveCells);
      setCycles((cycles)=>cycles+1);
    },400);

    return ()=>clearInterval(activeStateTimer);

  },[activeCells]);

  const initializeGrid=()=>{

    //Initilize rows / cells
    let newRows=[];

    for(let i=0; i<10; i++){
      //Create a new row
      let newRow=[];
      for(let j=0; j<10; j++){

        let newCell = {
          id:String(i+"-"+j),
          rowIndex:i,
          colIndex:j,
        }

        //Add the cell to the row
        newRow.push(newCell);
      }

      //Add the new row to the rows
      newRows.push(newRow);
    }

    //Update the state
    setRows(newRows);
  }

  return(
    <div className='flex flex-col h-full w-full items-center justify-start rounded-2xl border-2 border-gray-900 overflow-hidden' style={{transform:"scaleY(1)"}}>
      {activeCells&&rows&&rows.map((row,index)=>{
        return(
          <div key={index} className='flex flex-row flex-1 w-full items-center justify-start'>
            {row.map((cells,colIndex)=>{
              let active=activeCells[index][colIndex];
              return(
                <div className='flex flex-col h-full flex-1 items-center justify-center'>
                  <RainDrop active={active} type={props.type} />
                </div>
              )
            })}
          </div>
        )
      })}

      {props.puddle?(
        <div className='absolute top-0 left-0 h-full w-full items-center flex flex-col justify-end' style={{zIndex:0}}>
          <div className='flex flex-col w-full transition-all duration-1000 ease-in-out bg-teal-400 rounded-t-md' style={{height:`${cycles*1}px`}}>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}
    </div>
  )
}
const RainDrop=(props)=>{

  const [rain,setRain]=useState(false);

  useEffect(()=>{
    if(!rain && props.active){

      setRain(true);

      let rainTimer = setTimeout(()=>setRain(false),1200);

      return ()=>clearInterval(rainTimer);
    }

    if(!props.active){
      setRain(false);
    }
  },[props.active]);


  return(
    <div className={`relative flex flex-col h-full ${props.type==='LINE'?"w-0.5":"w-full"} items-center justify-center rounded-full transition-all duration-1000 ease-in-out`} style={{translate:"transform(30deg)",backgroundColor:props.active?"":""}}>
      {/*Rain Drop*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
        <div className={`${rain?"h-full w-full border-2 border-gray-600":"h-0 w-0"} rounded-full transition-all duration-1000 ease-in-out`} style={{opacity:rain?"100%":"0%"}}>
        </div>
      </div>

      {/*Rain Line*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
        <div className={`${rain&&props.type==='LINE'?"h-full w-0.5 border-2 border-gray-600":rain&&props.type==='DROP'?"h-full w-full border-2 border-gray-300":"h-0 w-0"} rounded-full transition-all duration-1000 ease-in-out`} style={{opacity:rain?"100%":"0%"}}>
        </div>
      </div>

    </div>
  )
}

//Snow globe
const SmokeShow = ()=>{

  const ELEM_COUNT=200;

  const [elems,setElems] = useState(new Array(ELEM_COUNT));
  const [size,setSize] = useState(1);
  const [offset,setOffset] = useState(100);
  const [type,setType] = useState('GLOBE')

  const [rotate,setRotate] = useState(35)


  useEffect(()=>{
    let newElems=[];

    for (let i=0; i<ELEM_COUNT; i++){
      newElems.push(0);
    }

    setElems(newElems);
  },[]);

  //Init timers
  useEffect(()=>{
    let offsetInterval = setInterval(()=>{
      console.log('New offsets');
      setOffset((offset)=>offset===100?99:100);
    },1800);

    return ()=>clearInterval(offsetInterval);
  },[]);

  useEffect(()=>{
    let sizeInterval = setInterval(()=>{
      setSize((size)=>size===1?1.4:0.8);
    },3000);

    return ()=>clearInterval(sizeInterval);
  },[]);

  return (
    <div className={`relative ${type==='BLADE'?('w-96 h-1.5'):('w-64 h-64')} rounded-full p-1 overflow-hidden`} style={{}}>
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-start rounded-full'>
        {elems.map((elem,i)=>{
          return(
            <div className='flex flex-row flex-1 w-full items-center justify-start'>
              <div className='relative flex flex-row transition-all duration-2000 ease-in-out' style={{width:`${Math.random()*offset}%`}}>
                <div className='absolute top-0 right-0 flex flex-row rounded-3xl h-full flex-shrink-0 bg-white transition-all duration-1000 ease-in-out'style={{opacity:"65%", height:`${size*Math.random()*45}px`, width:`${size*Math.random()*51}px`, transform:`translate(0%,${offset>35?Math.random()*35:-Math.random()*20}px)`}}>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-start rounded-full'>
        {elems.map((elem,i)=>{
          return(
            <div className='flex flex-col flex-1 h-full items-center justify-end'>
              <div className='relative flex flex-row transition-all duration-2000 ease-in-out' style={{height:`${Math.random()*offset}%`}}>
                <div className='absolute top-0 right-0 flex flex-row rounded-3xl h-full flex-shrink-0 bg-white transition-all duration-1000 ease-in-out'style={{opacity:"65%", height:`${size*Math.random()*25}px`, width:`${size*Math.random()*31}px`,}}>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

//Fireflies <3
const Fireflies=(props)=>{
  const ENERGY_COLORS = [
    {id:"0",color:"#0ea5e9", text:"General", emoji:"🎯",active:true, show:true},
    {id:"1",color:"#8b5cf6", text:"Work", emoji:"💻", active:true, show:false},
    {id:"2",color:"#d946ef", text:"Physical Health", emoji:"🤸", active:true, show:false},
    {id:"3",color:"#ec4899", text:"Emotional Health", emoji:"🧘‍♀️", active:true, show:false},
    {id:"4",color:"#f43f5e", text:"My Boo", emoji:"🥰", active:true, show:false},
    {id:"5",color:"#22c55e", text:"Friends", emoji:"🥳", active:true, show:false},
    {id:"6",color:"#22d3ee", text:"Family", emoji:"🏡", active:true, show:false},
    {id:"7",color:"#fde047", text:"Hobbies", emoji:"🏔", active:true, show:false},
    {id:"8",color:"#5eead4", text:"School", emoji:"📚", active:true, show:false},
  ];

  const [fireflies, setFireflies] = useState([]);
  const [lite,setLite] = useState (false);

  useEffect(()=>{
    initializeFireflies();

    //Toggle the firefly state
    setInterval(()=>{
      setLite(false);
      initializeFireflies();
    },6200);
  },[]);

  const initializeFireflies=()=>{

    //Create the fireflies
    let newFireflies = new Array(20);
    for(let i=0; i<20; i++){
      let colorIndex=Math.min(Math.floor(Math.random()*ENERGY_COLORS.length), ENERGY_COLORS.length);
      let firefly={id:i, startWidth:Math.random()*100, endWidth:Math.random()*100, startHeight:Math.random()*100, endHeight:Math.random()*100, color:fireflies[i]?fireflies[i].color:ENERGY_COLORS[colorIndex].color}

      newFireflies.push(firefly);
    }

    //Update the state
    setFireflies(newFireflies);

    //Send them on their way
    setTimeout(()=>setLite(true),800);
  }

  return(
    <div className='relative flex flex-col w-full h-full items-center justify-center'>
      {fireflies.map((firefly,index)=>{
        return(
          <div key={index} className='absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end'>
            <div className='flex flex-row h-full items-end justfiy-end transition-all duration-5000 ease-in-out' style={{width:`${lite?firefly.endWidth:firefly.startWidth}%`}}>
              <div className='flex flex-col w-full items-end justify-start transition-all duration-5000 ease-in-out' style={{height:`${lite?firefly.endHeight:firefly.startHeight}%`}}>
                <div className='rounded-full h-2 w-2 bg-white border-2 transition-all duration-800 ease-in-out' style={{opacity:`${lite?100:0}%`, borderColor:firefly.color}}>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

//Tides & portals
const FlexPod = ()=>{

  const [index,setIndex]=useState(0);
  const [blobs,setBlobs]=useState([]);
  const [portal,setPortal]=useState(false);


  useEffect(()=>{
    let newBlobs=[];

    for(let i=0; i<40; i++){
      let blob={id:String(i), index:i};

      newBlobs.push(blob);
    }

    console.log(newBlobs);
    setBlobs(newBlobs);
  },[]);

  useEffect(()=>{
    let tides = setTimeout(()=>{
      if(index===12){
        setPortal(true);
      }

      if(index===35){
        setPortal(false);
      }

      if(index===39){
        setIndex(0);
      }else{
        setIndex((index)=>index+1);
      }


    },300)

    return ()=>clearInterval(tides);
  },[index]);

  return(
    <div className='relative flex flex-row items-center justify-center w-96 h-96 rounded-2xl border'>
      <div className='flex flex-col h-full items-center justify-between rounded-full'>
        {blobs.map(blob=>{
          return(
            <div className={`rounded-full w-2 h-2 shadow-xl ${index===blob.index?("bg-c2-highlight"):("bg-c2")} transition-all duration-300 ease-in-out`} style={{transform:`translate${index===blob.index?"(3px, -4px)":"(0px, 0px)"}`}}>
            </div>
          )
        })}
      </div>

      {index<25?(
        <div className='absolute top-0 left-0 w-full h-full flex flex-row items-center justify-start'>
          <div className='flex flex-col h-full transition-all duration-5000' style={{width:`${!portal?("0%"):("100%")}`}}>
          </div>
          <div className='flex flex-col w-4 bg-white opacity-75 border-4 border-c1-highlight rounded-full transition-all duration-3000' style={{height:`${!portal?("4px"):("80px")}`}}>
          </div>
        </div>
      ):(
        <div className='hidden' />
      )}

    </div>
  )
}

//Slurp Effect to 'save lights'
const Slurp = ()=>{

  const [slurp,setSlurp]=useState(false);
  const [rows,setRows]=useState([true,true,true,true,true,true,true,true]);

  useEffect(()=>{
    setTimeout(()=>setSlurp(true),1000);
  },[]);

  const toggleRow=(index)=>{
    let newRows=[...rows];
    newRows[index]=!newRows[index];

    setRows(newRows);
  }

  return(
    <div className='relative flex flex-col items-center justify-start w-full h-full rounded-3xl'>

      {rows.map((row,rowIndex)=>{
        return(
          <div key={rowIndex} className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start'>
            <div className={`flex flex-col w-full ${slurp && rows[rowIndex]?(`h-full`):"h-1/5"} transition-all duration-1500 ease-in`}>
            </div>
            <div className='flex flex-row h-24 items-center justify-around transition-all duration-1000 ease-in delay-300' style={{width:`${slurp && rows[rowIndex]?0:80}%`}}>
              {rows.map((cell,cellIndex)=>{
                return (
                  <div key={cellIndex} className={`flex flex-row rounded-full flex-1 border-4 ${slurp && rows[rowIndex]?("border-transparent h-0"):rowIndex===cellIndex?"border-green-500 h-full mx-2 my-2 bg-gradient-to-r from-cyan-500 to-fucshia-500 via-purple-500 animate-spin":"border-transparent h-full mx-2 my-2"} transition-all duration-1000 delay-300 ease-in`} onClick={()=>toggleRow(rowIndex)}>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className='absolute bottom-4 left-0 w-full h-12 flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-between transition-all duration-300 ease-in h-6 pb-2' style={{opacity:`${slurp?"100%":"0%"}`}}>
          <div className='bg-c2 rounded-full w-12 h-0.5'>
          </div>
          <div className='bg-c2 rounded-full w-8 h-0.5'>
          </div>
          <div className='bg-c2 rounded-full w-4 h-0.5'>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-3xl ${slurp?("bg-green-500 animate-pulse"):"bg-gray-800"} transition-all duration-500 delay-1000`} onClick={()=>setSlurp((slurp)=>!slurp)}>
        </div>
      </div>
    </div>
  )
}

//Horizontal Scroll Bar
const LightRiver=()=>{

  const PIECES=[
    {id:"PIECE-0", height:"14rem", width:"12rem"},
    {id:"PIECE-1", height:"14rem", width:"14rem"},
    {id:"PIECE-2", height:"14rem", width:"10rem"},
    {id:"PIECE-3", height:"14rem", width:"16rem"},
  ]
  const [viewWidthPX,setViewWidthPX]=useState(100);
  const [scrollWidth,setScrollWidth]=useState(0);
  const [scrollOffset,setScrollOffset]=useState(0);
  const [pieceOffsetPX,setPieceOffsetPX]=useState(0);
  const [pieceWidthPX,setPieceWidthPX]=useState(0);
  const [pieceCoverage,setPieceCoverage]=useState(0);
  const [stars,setStars]=useState([0,0,0,0,0]);
  const [bufferWidth,setBufferWidth]=useState(50);

  useEffect(()=>{
    initializeStars();
    setBufferWidth(20);
  },[]);

  const initializeStars=()=>{
    let newStars=[];
    for (let i=0; i<400; i++){
      newStars.push(0);
    }
    setStars(newStars);
  }

  const handleScroll=(event)=>{
    console.log(event)
    setScrollOffset(event.target.scrollLeft);
    setScrollWidth(event.target.scrollWidth);

    console.log(document.getElementById('PIECE-0').getBoundingClientRect());

    setPieceOffsetPX(document.getElementById('PIECE-0').getBoundingClientRect().left);
    setPieceWidthPX(document.getElementById('PIECE-0').getBoundingClientRect().width);
    setPieceCoverage((512-document.getElementById('PIECE-0').getBoundingClientRect().left)/document.getElementById('PIECE-0').getBoundingClientRect().width*100);
    console.log(document.getElementById('PIECE-0'));
  }

  //Initilize the cell comparison light string widths, and add a resize observer to update the widths
  useLayoutEffect(()=>{
    //Initialize the state once on layout
    let viewRef = document.getElementById('riverView');
    if(viewRef){
      //Grab the dimensions of the cell
      let dimensions=viewRef.getBoundingClientRect();
      setViewWidthPX(dimensions.width);

      //Add a resize observer for resize changes
      resizeObserver.observe(document.getElementById('riverView'));
    }
  },[]);

  //Resize observer to refresh light string widths on resize
  const resizeObserver = new ResizeObserver((entries)=>{
    console.log({status:"Cell Segment Comparison Resize", entries:entries, target:entries[0].target.getBoundingClientRect()});
    if(entries.length>0){
      setViewWidthPX(entries[0].target.getBoundingClientRect().width)
    }
  });

  return(
    <div id={'riverView'} className='relative flex flex-col h-full w-full items-center justify-center px-2 border-2 border-gray-900 rounded-2xl bg-gradient-to-t from-blue-900 via-gray-900 to-black'>

      {/*Meta Details*/}
      <div className='absolute top-0 left-0 w-full h-96 items-center justify-center'>
        {/*Position*/}
        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-400%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {viewWidthPX}
          </div>
        </div>

        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-400%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {viewWidthPX/2}
          </div>
        </div>

        {/*Position*/}
        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-350%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {scrollWidth}
          </div>
        </div>

        {/*Position*/}
        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-300%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {scrollOffset}
          </div>
        </div>

        {/*Position*/}
        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-275%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {pieceOffsetPX}
          </div>
        </div>

        {/*Position*/}
        <div className='flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-205%)"}}>
          <div className='text-xl font-bold text-c2-highlight'>
            {pieceWidthPX}
          </div>
        </div>
      </div>

      {/*Star River*/}
      <div className='flex flex-row flex-wrap h-1/2 w-full items-center justify-end'>
        <div className='flex flex-row flex-wrap w-1/4 h-full overflow-hidden opacity-75'>
          {stars.map((entry,index)=>{

          let padding=index%2===0?"m-1.5":index%5===0?"m-0.5":index%7===0?"m-0":"m-3"
          let color=index%5===0?"bg-yellow-200 animate-pulse":index%9===0?"bg-cyan-300 animate-pulse":"bg-white"
          return(
            <div index={index} className={`flex ${padding} text-c2-highlight font-light text-c2-highlight`}>
              <div className={`flex flex-row h-1 w-1 ${color} rounded-full`}>
              </div>
            </div>
          )
        })}
        </div>
        <div className='flex flex-row flex-wrap w-1/4 h-full overflow-hidden opacity-75'>
          {stars.map((entry,index)=>{

          let padding=index%2===0?"m-1.5":index%5===0?"m-0.5":index%7===0?"m-0":"m-3"
          let color=index%5===0?"bg-yellow-200 animate-pulse":index%9===0?"bg-cyan-300 animate-pulse":"bg-white"
          return(
            <div index={index} className={`flex ${padding} text-c2-highlight font-light text-c2-highlight`}>
              <div className={`flex flex-row h-1 w-1 ${color} rounded-full`}>
              </div>
            </div>
          )
        })}
        </div>
        <div className='flex flex-row flex-wrap w-1/4 h-full overflow-hidden opacity-75'>
          {stars.map((entry,index)=>{

          let padding=index%2===0?"m-1.5":index%5===0?"m-0.5":index%7===0?"m-0":"m-3"
          let color=index%5===0?"bg-yellow-200 animate-pulse":index%9===0?"bg-cyan-300 animate-pulse":"bg-white"
          return(
            <div index={index} className={`flex ${padding} text-c2-highlight font-light text-c2-highlight`}>
              <div className={`flex flex-row h-1 w-1 ${color} rounded-full`}>
              </div>
            </div>
          )
        })}
        </div>
        <div className='flex flex-row flex-wrap w-1/4 h-full overflow-hidden opacity-75'>
          {stars.map((entry,index)=>{

          let padding=index%2===0?"m-1.5":index%5===0?"m-0.5":index%7===0?"m-0":"m-3"
          let color=index%5===0?"bg-yellow-200 animate-pulse":index%9===0?"bg-cyan-300 animate-pulse":"bg-white"
          return(
            <div index={index} className={`flex ${padding} text-c2-highlight font-light text-c2-highlight`}>
              <div className={`flex flex-row h-1 w-1 ${color} rounded-full`}>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      {/*Easy Peasy lemon squeezy*/}
      <div className='absolute top-0 left-0 flex flex-col h-full w-full items-start justify-center overflow-x-scroll' onScroll={(event)=>{handleScroll(event)}}>
        <div className='flex flex-row flex-shink-0 items-center justify-start border ' style={{width:"200rem", height:"20rem"}}>
          <div className='flex flex-row translate-all duration-7000 ease-in-out border-2' style={{width:`${bufferWidth}%`}}>
          </div>
          <div className='flex flex-row h-full w-1/2 items-center justify-between border'>
          {PIECES.map((piece,index)=>{

            return(
              <div key={index} id={piece.id} className='relative border-2 border-gray-900 rounded-2xl' style={{width:piece.width, height:piece.height}}>

                {/*Background*/}
                <div className='flex flex-row h-full w-full bg-gray-800 opacity-75'>
                </div>

                {/*Style*/}
                <div className='absolute top-0 left-0 h-full bg-black rounded-r-xl border-2 border-black' style={{zIndex:5, width:`${Math.min(100,pieceCoverage)}%`, opacity:pieceCoverage>0?"100%":"0%"}}>
                  <div className='flex flex-row flex-wrap h-full pl-2 pr-4 overflow-hidden'>
                    {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,index)=>{

                      let bold=index%8===0
                      return(
                        <div index={index} className={`m-1 text-c2-highlight ${bold?"font-extrabold text-lg animate-pulse":"font-light text-md"} text-c2-highlight`}>
                          {Math.floor(Math.random()*100)}
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )
          })}
          </div>
        </div>
      </div>

      {/*Blade*/}
      <div className='absolute top-0 left-0 flex flex-row h-full w-1/2 items-center justify-end z-10'>
        <div className='relative flex flex-row w-4 flex-wrap overflow-hidden transition-all duration-500 ease-in-out' style={{zIndex:10, height:PIECES[0].height, opacity:pieceCoverage>0?'100%':'0%'}}>
          {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((entry,index)=>{
            return(
              <div key={index} className='flex bg-yellow-400 w-1 h-1 rounded-full animate-pulse' style={{zIndex:10}}>
              </div>
            )
          })}
        </div>
        <div className='flex flex-col items-center justify-center h-2/5 transition-all duration-500 ease-in-out' style={{transform:"translate(50%,0%)"}}>
          <LiquidBlade variant={'COLUMN'}/>
        </div>
      </div>
    </div>
  )
}

//Liquid Blade
const LiquidBlade = (props)=>{

  const ELEM_COUNT=100;

  const [elems,setElems] = useState(new Array(ELEM_COUNT));
  const [size,setSize] = useState(1);
  const [offset,setOffset] = useState(100);
  const [type,setType] = useState('GLOBE')

  useEffect(()=>{
    let newElems=[];

    for (let i=0; i<ELEM_COUNT; i++){
      newElems.push(0);
    }

    setElems(newElems);
  },[]);

  //Init timers
  useEffect(()=>{
    let offsetInterval = setInterval(()=>{
      console.log('New offsets');
      setOffset((offset)=>offset===100?99:100);
    },1800);

    return ()=>clearInterval(offsetInterval);
  },[]);

  useEffect(()=>{
    let sizeInterval = setInterval(()=>{
      setSize((size)=>size===1?1.4:0.8);
    },3000);

    return ()=>clearInterval(sizeInterval);
  },[]);

  return (
    <div className={`relative ${props.variant==='COLUMN'?('w-1.5 h-full'):("h-1.5 w-full")} rounded-full p-1 overflow-hidden`}>
      <div className='absolute top-0 left-0 flex flex-col w-full h-full items-center justify-start rounded-full'>
        {elems.map((elem,i)=>{
          return(
            <div key={i} className='flex flex-row flex-1 w-full items-center justify-start'>
              <div className='relative flex flex-row transition-all duration-2000 ease-in-out' style={{width:`${Math.random()*offset}%`}}>
                <div className='absolute top-0 right-0 flex flex-row rounded-3xl h-full flex-shrink-0 bg-white transition-all duration-1000 ease-in-out'style={{opacity:"65%", height:`${size*Math.random()*45}px`, width:`${size*Math.random()*51}px`, transform:`translate(0%,${offset>35?Math.random()*35:-Math.random()*20}px)`}}>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-start rounded-full'>
        {elems.map((elem,i)=>{
          return(
            <div key={i} className='flex flex-col flex-1 h-full items-center justify-end'>
              <div className='relative flex flex-row transition-all duration-2000 ease-in-out' style={{height:`${Math.random()*offset}%`}}>
                <div className='absolute top-0 right-0 flex flex-row rounded-3xl h-full flex-shrink-0 bg-white transition-all duration-1000 ease-in-out'style={{opacity:"65%", height:`${size*Math.random()*25}px`, width:`${size*Math.random()*31}px`,}}>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

//Lightsaber Eliptical Portal
const LightPortal = (props)=>{
  return(
    <div className={`relative flex flex-col w-full h-2/5 items-center justify-center ${props.variant} overflow-hidden`}>
      <div className={`flex flex-col w-full h-full items-center justify-center overflow-hidden z-20 ${props.variant}`}>
        {/*'Border' Boudary*/}
        <div className={`relative flex flex-col h-full w-full items-center justify-start ${props.borderHeight?(String("border-"+props.borderHeight)):("border-4")} border-transparent ${props.variant} overflow-visible`} style={{transform:"scaleY(0.2)"}}>
          {/*Spinner*/}
          <div className='flex flex-col w-3/5 h-1/2 top-0 left-0 justify-end items-center overflow-visible'>
            <div className={`flex flex-col items-center justify-end ${props.highlightWidth?(String("h-"+props.highlightWidth)):("h-8")} animate-spin`} style={{width:"200%", backgroundColor:`${props.color}`}}>
            </div>
          </div>

          {/*Center Element In the border*/}
          <div className={`absolute flex flex-col h-full items-center justify-center bg-black ${props.variant}`} style={{width:"90%", transform:"translate(0%,-15%)"}}>
          </div>

          {/*Axis*/}
          <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center flex-shrink-0'>
            <div className='flex flex-row items-center justify-center rounded-full border-4 animate-pulse opacity-75' style={{borderColor:`${props.color}`, width:"60%",height:"100%",transform:"scaleY(0.8)"}}>
              <div className='w-full h-full rounded-full opacity-75' style={{backgroundColor:`${props.color}`}}>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

//Square Spinner
const LightSpinner = (props)=>{
  return(
    <div className={`relative flex flex-col w-full h-full items-center justify-center ${props.variant} overflow-hidden transition-all duration-500 ease-in-out`} style={{borderWidth:"1px",borderColor:`${"#000000"}`}}>
      <div className={`flex flex-col w-full h-full items-center justify-center overflow-hidden z-20 ${props.variant}`} style={{borderWidth:"2px",borderColor:`${"#000000"}`,minWidth:"100px", minHeight:`${props.showText?("100px"):("18px")}`}}>
        {/*'Border' Boudary*/}
        <div className={`relative flex flex-col h-full w-full items-center justify-start ${props.borderHeight?(String("border-"+props.borderHeight)):("border-4")} border-transparent ${props.variant} overflow-visible`}>

          {/*Spinner*/}
          <div className='flex flex-col w-full h-1/2 top-0 left-0 justify-end items-center overflow-visible'>
            <div className={`flex flex-col items-center justify-end ${props.highlightWidth?(String("h-"+props.highlightWidth)):("h-8")} animate-spin`} style={{width:"200%", backgroundColor:`${props.color}`}}>
            </div>
          </div>

          {/*Center Element In the border*/}
          {props.showText===false?(
            <div className={`absolute flex flex-col w-full h-full items-center justify-center ${props.variant} p-0.5`} style={{backgroundColor:`${props.backgroundColor?props.backgroundColor:"#ffffff"}`, opacity:`${props.opacity?props.opacity:"100"}%`}}>
            </div>
          ):(
            <div className={`absolute flex flex-col w-full h-full items-center justify-center shadow-md ${props.variant}`} style={{backgroundColor:`${props.backgroundColor?props.backgroundColor:"#ffffff"}`, opacity:`${props.opacity?props.opacity:"100"}%`}}>
              <span className='text-5xl animate-pulse mb-1'>✨</span>
              <span className='text-md text-shades-light'>Loading</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

const SiriSpin=()=>{

  const [pulse,setPulse]=useState(false);
  const [count,setCount]=useState(0);


  useEffect(()=>{
    let pulseTimer=setTimeout(()=>{
      setPulse((pulse)=>!pulse);
      setCount((count)=>count+1);
    },1800);

    return ()=>clearInterval(pulseTimer);
  },[pulse])

  return(
    <div className={`relative flex flex-col rounded-full ${pulse?"h-40 w-40":"h-56 w-56"} border bg-gray-900 items-center justify-center transiition-all duration-2000 ease-in-out`}>

      {/*Spiny core*/}
      <div className={`relative flex flex-col ${pulse?"h-40 w-40":"h-56 w-56"} items-center justify-around p-4 transition-all duration-2000 ease-in-out`} style={{zIndex:5, transform:`rotate(${count*80}deg)`}}>
        {[[0],[0,0,],[0,0,],[0,0,],[0]].map((entry,index)=>{
          let justificationString=index===0||index===4?"justify-center":index===2?"justify-between":"justify-around";

          return(
            <div key={index} className={`flex flex-row w-full flex-1 items-center ${justificationString}`} style={{zIndex:5}}>
            {entry.map((ring,ringIndex)=>{

              return(
                <div key={ringIndex} className={`${!pulse?"h-5 w-5":"h-5 w-0.5"} rounded-full bg-white transition-all duration-2000 ease-in-out`} style={{zIndex:5, transform:`rotate(${count%3===1?"-360":"0"}deg)`}}>
                </div>
              )
            })}
            </div>
          )
        })}
      </div>

      {/*Shading*/}
      <div className='absolute top-0 left-0 h-full w-full items-center justify-center rounded-full bg-black opacity-50'>
      </div>
    </div>
  )
}

//Light Core Energy Annimation
const EnergyBlob=(props)=>{

  const ENERGY_COLORS = [
    {id:"0",color:"#0ea5e9", text:"General", emoji:"🎯",active:true, show:true},
    {id:"1",color:"#8b5cf6", text:"Work", emoji:"💻", active:true, show:false},
    {id:"2",color:"#d946ef", text:"Physical Health", emoji:"🤸", active:true, show:false},
    {id:"3",color:"#ec4899", text:"Emotional Health", emoji:"🧘‍♀️", active:true, show:false},
    {id:"4",color:"#f43f5e", text:"My Boo", emoji:"🥰", active:true, show:false},
    {id:"5",color:"#22c55e", text:"Friends", emoji:"🥳", active:true, show:false},
    {id:"6",color:"#22d3ee", text:"Family", emoji:"🏡", active:true, show:false},
    {id:"7",color:"#fde047", text:"Hobbies", emoji:"🏔", active:true, show:false},
    {id:"8",color:"#5eead4", text:"School", emoji:"📚", active:true, show:false},
  ]

  const ROUNDING = [
    {id:"0",format:"rounded-full"},
    {id:"1",format:"rounded-3xl"},
    {id:"2",format:"rounded-xl"},
    {id:"4",format:"rounded-md"},
  ]

  const JUSTIFICATIONS = [
    {id:"0",format:"justify-left"},
    {id:"1",format:"justify-center"},
    {id:"2",format:"justify-right"},
    {id:"2",format:"justify-between"},
    {id:"2",format:"justify-around"},
  ]

  const ALIGNMENTS = [
    {id:"0",format:"items-start"},
    {id:"1",format:"items-center"},
    {id:"2",format:"items-center"},
  ]

  const PADDING_R = [
    {id:"0",format:"pr-0"},
    {id:"1",format:"pr-2"},
    {id:"2",format:"pr-4"},
    {id:"3",format:"pr-8"},
    {id:"4",format:"pr-12"},
    {id:"5",format:"pr-16"},
  ]

  const PADDING_L = [
    {id:"0",format:"pl-0"},
    {id:"1",format:"pl-2"},
    {id:"2",format:"pl-4"},
    {id:"3",format:"pl-8"},
    {id:"4",format:"pl-12"},
    {id:"5",format:"pl-16"},
  ]

  const PADDING_T = [
    {id:"0",format:"pt-0"},
    {id:"1",format:"pt-2"},
    {id:"2",format:"pt-4"},
    {id:"3",format:"pt-8"},
    {id:"4",format:"pt-12"},
    {id:"5",format:"pt-16"},
  ]

  const PADDING_B = [
    {id:"0",format:"pb-0"},
    {id:"1",format:"pb-2"},
    {id:"2",format:"pb-4"},
    {id:"3",format:"pb-8"},
    {id:"4",format:"pb-12"},
    {id:"5",format:"pb-16"},
  ]

  const [height,setHeight]=useState(100);
  const [width,setWidth]=useState(100);
  const [rotation,setRotation]=useState(0);
  const [opacity, setOpacity]=useState(100);
  const [color,setColor]=useState("")
  const [formatString,setFormatString]=useState("");

  useEffect(()=>{
    let energyTimer=setInterval(()=>{
      let newHeight = Math.random()*185+20;
      let newWidth = Math.random()*210+20;

      let newRotation = Math.random()*905;
      if(newRotation%7===0){
        newRotation=-newRotation
      }

      let newColorIndex = Number.parseInt(Math.min(Math.floor(Math.random()*ENERGY_COLORS.length),ENERGY_COLORS.length-1));

      let justificationIndex = Number.parseInt(Math.min(Math.floor(Math.random()*JUSTIFICATIONS.length),JUSTIFICATIONS.length-1));
      let alignmentIndex = Number.parseInt(Math.min(Math.floor(Math.random()*ALIGNMENTS.length),ALIGNMENTS.length-1));
      let roundingIndex = Number.parseInt(Math.min(Math.floor(Math.random()*ROUNDING.length),ROUNDING.length-1));
      let prIndex = Number.parseInt(Math.min(Math.floor(Math.random()*PADDING_R.length),PADDING_R.length-1));
      let plIndex = Number.parseInt(Math.min(Math.floor(Math.random()*PADDING_L.length),PADDING_L.length-1));
      let ptIndex = Number.parseInt(Math.min(Math.floor(Math.random()*PADDING_T.length),PADDING_T.length-1));
      let pbIndex = Number.parseInt(Math.min(Math.floor(Math.random()*PADDING_B.length),PADDING_B.length-1));

      //let formatString=String(JUSTIFICATIONS[justificationIndex].format+" "+ALIGNMENTS[alignmentIndex].format+" "+ROUNDING[roundingIndex].format+" "+PADDING_R[prIndex].format+" "+PADDING_L[plIndex].format+" "+PADDING_T[ptIndex].format+" "+PADDING_B[pbIndex].format);
      let formatString=String(ROUNDING[roundingIndex].format);


      setHeight(newHeight);
      setWidth(newWidth);
      setRotation(newRotation);
      setColor(ENERGY_COLORS[newColorIndex].color);
      setFormatString(formatString);

      //console.log("energyTick");

    },1400);

    return ()=>clearInterval(energyTimer);

  },[]);

  return(
    <div className='flex flex-col w-full h-full items-center justify-end'>
      {/*View Window'*/}
      <div className='relative flex flex-row rounded-3xl items-center justify-center overflow-hidden py-4' style={{height:"100%", width:"100%"}}>
        {/***Light Core***/}
        <div className='flex flex-row w-full h-full rounded-3xl items-center justify-center overflow-hidden' style={{zIndex:1}}>
          <div className={`relative flex flex-col ${formatString} justify-center border-4 flex-center transition-all duration-3000 ease-in-out`} style={{width:`${width}px`, height:`${height}px`, transform:`rotate(${rotation}deg)`, backgroundColor:`${props.config.bordersOnly?"#000000":props.config.fill?color:"#111827"}`, borderColor:`${(props.showRings && props.config.bordersOnly)?"#ffffff":color}`}}>

            {/*Center Point*/}
            <div className='hidden absolute top-0 left-0 flex flex-col w-full items-center justify-center z-50'>
              <div className='flex flex-col rounded-full transition-all duration-300 z-50' style={{minWidth:"20px",minHeight:"20px", opacity:`${80}%`, backgroundColor:`${'#fff'}`}}>
              </div>
            </div>

            {props.showRings?(
              <div className='absolute top-0 left-0 w-full h-full' style={{opacity:`${props.showRings?'100%':'0%'}`}}>
                <div className='relative flex flex-col w-full h-full transition-all duration-500 ease-in-out'>

                  <div className={`absolute top-0 left-0 border-8 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${2*width}px`, height:`${2*height}px`, transform:`rotate(${-2*rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                  <div className={`absolute top-0 left-0 border-4 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${1.3*width}px`, height:`${1.2*height}px`, transform:`rotate(${1.3*rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                  <div className={`absolute bottom-0 right-0 border-4 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${2.5*width}px`, height:`${3.2*height}px`, transform:`rotate(${2*rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                  <div className={`absolute top-0 right-0 border-4 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${1.6*width}px`, height:`${1.4*height}px`, transform:`rotate(${1.7*rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                  <div className={`absolute top-0 left-0 border-4 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${1.1*width}px`, height:`${1.9*height}px`, transform:`rotate(${rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                  <div className={`absolute bottom-0 left-0 border-4 flex flex-col flex-wrap rounded-3xl transition-all duration-1000`} style={{width:`${1.8*width}px`, height:`${1.2*height}px`, transform:`rotate(${-0.8*rotation}deg)`, borderColor:`${color}`}}>
                  </div>

                </div>
              </div>
            ):(
              <div className='hidden'/>
            )}

          </div>
        </div>

        {/*Selection*/}
        <div className='absolute top-0 left-0 flex flex-col items-center justify-end rounded-3xl h-full transition-all duration-1000 ease-in-out py-3' style={{opacity:`${props.selected?"100%":"0%"}`, width:"100%"}}>
          <div className='relative flex flex-col h-full items-center justify-end rounded-3xl border-t-4 border-b-4 transition-all duration-1000 ease-in-out overflow-hidden' style={{height:`${props.selected?"100%":"0%"}`,width:`${props.selected?props.showRings?"100%":"80%":"0%"}`, borderColor:`${props.config.selectionBorderColor}`}}>
            <div className='flex flex-col w-full transition-all duration-1000' style={{height:`${props.config.shadeSelection?"100%":"0%"}`,opacity:`${props.config.shadeSelection?`${props.config.selectionBackgroundOpacity}%`:"0%"}`, backgroundColor:`${props.config.shadeSelection?props.config.selectionBackgroundColor:""}`}}>
            </div>
          </div>
        </div>

        {/*Platform*/}
        <div className='absolute bottom-0 left-0 flex flex-col w-full items-center justify-center z-50 transition-all duration-500 ease-in-out' style={{opacity:`${props.showPlatform?"100%":"0%"}`,transform:"translate(0%,50%)"}}>
          <div className='flex flex-col rounded-full transition-all duration-300' style={{minWidth:"30px",minHeight:"30px", opacity:`${80}%`, backgroundColor:`${'#fff'}`}}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UICapabilities;
