import React from 'react';
import {useState, useEffect, useLayoutEffect} from 'react';

import {
  NavLink,
  useLocation
} from "react-router-dom";

//Import Data Loaders
import XLSX from 'xlsx/xlsx.js';

//Light Project Timeline
const LightProjectTimeline=()=>{

  const ACCESS_CODE=1125;

  const TIMELINE_COLORS = [
    {id:"0",description:"Punchlist Activities", color:"#8b5cf6", colorString:"indigo-600",},
    {id:"1",description:"Site Visits", color:"#1e3a8a", colorString:"blue-900",},
    {id:"2",description:"Client Reviews", color:"#38bdf8", colorString:"sky-400",},
    {id:"3",description:"Municipal Reviews", color:"#6b7280", colorString:"gray-400",},
    {id:"4",description:"Project Work", color:"#3b82f6", colorString:"blue-600" ,},
    {id:"5",description:"Purchase Orders", color:"#5eead4", colorString:"cyan-400",},
  ];

  /* Manual Method -- But now loads from xlsx
  const DATA=[
    {id:"Punchlist Due Diligence",done:true, startDate:"",endDate:"",duration:7,offset:0, initiativeWidth:0,color:0},
    {id:"Initial Site Visit - Architect",done:true, startDate:"",endDate:"",duration:1,offset:7, initiativeWidth:0,color:1},
    {id:"Initial Site Visit - Contractor",done:true, startDate:"",endDate:"",duration:1,offset:7, initiativeWidth:0,color:1},
    {id:"Initial Site Visit - Interior Designer",done:true, startDate:"",endDate:"",duration:1,offset:7, initiativeWidth:0,color:1},
    {id:"Architectural Due Diligence",done:true, startDate:"",endDate:"",duration:14,offset:8, initiativeWidth:0,color:2},
    {id:"Landscaping Due Diligence",done:true, startDate:"",endDate:"",duration:14,offset:8, initiativeWidth:0,color:2},
    {id:"Architectural Plan Revisions",done:true, startDate:"",endDate:"",duration:7,offset:22, initiativeWidth:0,color:2},
    {id:"Landscaping Plan Revisions",done:true, startDate:"",endDate:"",duration:7,offset:22, initiativeWidth:0,color:2},
    {id:"Planning Board Review",done:true, startDate:"",endDate:"",duration:14,offset:29, initiativeWidth:0,color:3},
    {id:"Zoning Board Review",done:true, startDate:"",endDate:"",duration:14,offset:43, initiativeWidth:0,color:3},
    {id:"Engineering Due Diligence",done:true, startDate:"",endDate:"",duration:14,offset:57, initiativeWidth:0,color:2},
    {id:"Engineering Plan Revisions",done:true, startDate:"",endDate:"",duration:7,offset:71, initiativeWidth:0,color:2},
    {id:"Building Department Review",done:true, startDate:"",endDate:"",duration:7,offset:78, initiativeWidth:0,color:3},
    {id:"Site Visit (#2) - Contractor",done:true, startDate:"",endDate:"",duration:1,offset:85, initiativeWidth:0,color:1},
    {id:"Site Visit (#2) - Interior Designer",done:true, startDate:"",endDate:"",duration:1,offset:85, initiativeWidth:0,color:1},
    {id:"Contractor Due Diligence",done:true, startDate:"",endDate:"",duration:14,offset:86, initiativeWidth:0,color:2},
    {id:"Interior Design Due Diligence",done:true, startDate:"",endDate:"",duration:14,offset:86, initiativeWidth:0,color:2},
    {id:"Review Contractor Proposals",done:false, active:true, startDate:"",endDate:"",duration:7,offset:100, initiativeWidth:0,color:2},
    {id:"Review Interior Design Proposals",done:false, startDate:"",endDate:"",duration:7,offset:100, initiativeWidth:0,color:2},
    {id:"Finalize Proposals / Sign Contracts",done:false, startDate:"",endDate:"",duration:1,offset:107, initiativeWidth:0,color:1},
    {id:"Obtain Building Permits (Full)",done:false, startDate:"",endDate:"",duration:1,offset:108, initiativeWidth:0,color:3},
    {id:"Order Kitchen Appliances",done:false, startDate:"",endDate:"",duration:1,offset:109, initiativeWidth:0,color:5},
    {id:"Order Cabinetry (Kitchen & Bath)",done:false, startDate:"",endDate:"",duration:1,offset:110, initiativeWidth:0,color:5},
    {id:"Order Countertops & Tiling",done:false, startDate:"",endDate:"",duration:1,offset:111, initiativeWidth:0,color:5},
    {id:"Order Flooring (Carpet, LVF, Wood)",done:false, startDate:"",endDate:"",duration:1,offset:112, initiativeWidth:0,color:5},
    {id:"Order Bathroom Vanities",done:false, startDate:"",endDate:"",duration:1,offset:113, initiativeWidth:0,color:5},
    {id:"Order Interior Hardware & Fixtures",done:false, startDate:"",endDate:"",duration:1,offset:114, initiativeWidth:0,color:5},
    {id:"Demolition of Existing Structure",done:false, startDate:"",endDate:"",duration:14,offset:115, initiativeWidth:0,color:4},
    {id:"Land Clearing & Site Grading",done:false,startDate:"",endDate:"",duration:21,offset:115, initiativeWidth:0,color:4},
    {id:"Excavation for Foundation & Utilities",done:false,startDate:"",endDate:"",duration:21,offset:115, initiativeWidth:0,color:4},
    {id:"Install Temporary Utilities",done:false,startDate:"",endDate:"",duration:2,offset:136, initiativeWidth:0,color:4},
    {id:"Install Drainage & Stormwater System",done:false,startDate:"",endDate:"",duration:21,offset:136, initiativeWidth:0,color:4},
    {id:"Form & Pour Foundation Footings",done:false,startDate:"",endDate:"",duration:2,offset:136, initiativeWidth:0,color:4},
    {id:"Build Foundation Walls / Slab",done:false,startDate:"",endDate:"",duration:7,offset:138, initiativeWidth:0,color:4},
    {id:"Waterproof Foundation & Backfill",done:false,startDate:"",endDate:"",duration:7,offset:145, initiativeWidth:0,color:4},
    {id:"Full Utility Tie-In",done:false,startDate:"",endDate:"",duration:14,offset:152, initiativeWidth:0,color:4},
    {id:"Foundation Inspection",done:false,startDate:"",endDate:"",duration:1,offset:166, initiativeWidth:0,color:3},
    {id:"Frame Floors & Subfloors",done:false,startDate:"",endDate:"",duration:7,offset:167,initiativeWidth:0,color:4},
    {id:"Frame Exterior & Interior Walls",done:false,startDate:"",endDate:"",duration:7,offset:174, initiativeWidth:0,color:4},
    {id:"Frame Roof & Install Sheathing",done:false,startDate:"",endDate:"",duration:7,offset:181, initiativeWidth:0,color:4},
    {id:"Install Windows & Exterior Doors",done:false,startDate:"",endDate:"",duration:14,offset:188, initiativeWidth:0,color:4},
    {id:"Install Roof Shingles",done:false,startDate:"",endDate:"",duration:7,offset:202,initiativeWidth:0,color:4},
    {id:"Install Rough Plumbing",done:false,startDate:"",endDate:"",duration:21,offset:209,initiativeWidth:0,color:4},
    {id:"Install Rough Electrical",done:false,startDate:"",endDate:"",duration:21,offset:230,initiativeWidth:0,color:4},
    {id:"Install Rough HVAC & Ductwork",done:false,startDate:"",endDate:"",duration:21,offset:251,initiativeWidth:0,color:4},
    {id:"Framing Inspection",done:false,startDate:"",endDate:"",duration:1,offset:272,initiativeWidth:0,color:3},
    {id:"Install Exterior Siding",done:false,startDate:"",endDate:"",duration:14,offset:273,initiativeWidth:0,color:4},
    {id:"Install Interior Drywall",done:false,startDate:"",endDate:"",duration:14,offset:287,initiativeWidth:0,color:4},
    {id:"Prime Walls & Ceilings",done:false,startDate:"",endDate:"",duration:2,offset:287,initiativeWidth:0,color:4},
    {id:"Install Interior Doors",done:false,startDate:"",endDate:"",duration:7,offset:289,initiativeWidth:0,color:4},
    {id:"Install Cabinetry (Kitchen & Bath)",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Countertops & Tiling",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Closet Shelving",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Kitchen Appliances",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Interior Hardware",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Plumbing Fixtures",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install Lighting Fixtures",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Install HVAC Units & Thermostats",done:false,startDate:"",endDate:"",duration:7,offset:294,initiativeWidth:0,color:4},
    {id:"Paint Walls & Ceilings (2nd Coat)",done:false,startDate:"",endDate:"",duration:14,offset:294,initiativeWidth:0,color:4},
    {id:"Stain Hardwood Floors (1st Coat)",done:false,startDate:"",endDate:"",duration:2,offset:308,initiativeWidth:0,color:4},
    {id:"Stain Hardwood Floors (2nd Coat)",done:false,startDate:"",endDate:"",duration:2,offset:310,initiativeWidth:0,color:4},
    {id:"Install Flooring (Carpet & LVF)",done:false,startDate:"",endDate:"",duration:2,offset:312,initiativeWidth:0,color:4},
    {id:"Punchlist Interior Touch-ups & Repairs",done:false,startDate:"",endDate:"",duration:2,offset:312,initiativeWidth:0,color:0},
    {id:"Plumbing & Electrical Inspection",done:false,startDate:"",endDate:"",duration:7,offset:314,initiativeWidth:0,color:3},
    {id:"Pour Driveway & Walkways",done:false,startDate:"",endDate:"",duration:1,offset:321,initiativeWidth:0,color:4},
    {id:"Install Exterior Landscaping",done:false,startDate:"",endDate:"",duration:7,offset:322,initiativeWidth:0,color:4},
    {id:"Install Decks, Patios, & Fences",done:false,startDate:"",endDate:"",duration:14,offset:328,initiativeWidth:0,color:4},
    {id:"Punchlist Exterior Touch-ups & Repairs",done:false,startDate:"",endDate:"",duration:2,offset:342,initiativeWidth:0,color:0},
    {id:"Certificate of Occupancy Inspection",done:false,startDate:"",endDate:"",duration:1,offset:344,initiativeWidth:0,color:3},
    {id:"Obtain Certificate of Occupancy",done:false,startDate:"",endDate:"",duration:1,offset:345,initiativeWidth:0,color:1},
    {id:"Moving Services (1 Week)",done:false,startDate:"",endDate:"",duration:1,offset:346,initiativeWidth:0,color:4},
    {id:"Final Punchlist Touch-ups & Repairs",done:false,startDate:"",endDate:"",duration:5,offset:347,initiativeWidth:0,color:0},
    {id:"Cleanup & Debris Removal",done:false,startDate:"",endDate:"",duration:2,offset:349,initiativeWidth:0,color:4},
    {id:"Final Punchlist Walk-Through",done:false,startDate:"",endDate:"",duration:1,offset:351,initiativeWidth:0,color:0},
  ]
  */

  const [today,setToday]=useState(new Date());
  const [initiatives,setInitiatives]=useState();
  const [months,setMonths]=useState();
  const [projectCost,setProjectCost]=useState(0);
  const [cumulativeCost,setCumulativeCost]=useState(0);
  const [maxInitiativeCost,setMaxInitiativeCost]=useState(null);
  const [activeInitiativeID,setActiveInitiativeID]=useState(null);
  const [showProjectCost ,setShowProjectCost ]=useState(false);
  const [showCostInTitle,setShowCostInTitle]=useState(true);
  const [showCumulativeCost,setShowCumulativeCost]=useState(false);
  const [showProjectCostActuals,setShowProjectCostActuals]=useState(false);
  const [showInitiativeDetails,setShowInitiativeDetails]=useState(false);
  const [showInitiativeOverruns,setShowInitiativeOverruns]=useState(false);
  const [showInitiativeCostChart,setShowInitiativeCostChart]=useState(false);

  const [authenticate,setAuthenticate]=useState(true);
  const [accessGranted,setAccessGranted]=useState(false);
  const [punchlistClientID,setPunchlistClientID]=useState(null);

  const [lightTimelineWidthPX,setLightTimelineWidthPX]=useState(0);

  useEffect(()=>{
    loadPunchlist();
  },[])

  useEffect(()=>{
    if(initiatives){
      initializeMonths(initiatives);
    }
  },[initiatives]);

  useLayoutEffect(()=>{
    let timelineRef=document.getElementById('lightTimeline');
    if(timelineRef){
      setLightTimelineWidthPX(timelineRef.getBoundingClientRect().width);
    }
  },[accessGranted]);

  //Load the Punchlist from ./punchlists/punchlist.xlsx [Data]
  const loadPunchlist=async ()=>{
    //Initialize headders for the csv file
    let HEADERS={
      'key':{id:"key", columnKey:"A", columnIndex:0,},
      'summary':{id:"summary", columnKey:"B", columnIndex:1,},
      'status':{id:"status", columnKey:"C", columnIndex:2,},
      'active':{id:"active", columnKey:"D", columnIndex:3,},
      'currentPhase':{id:"currentPhase", columnKey:"E", columnIndex:3,},
      'startDate':{id:"startDate", columnKey:"F", columnIndex:4,},
      'endDate':{id:"endDate", columnKey:"G", columnIndex:5,},
      'duration':{id:"duration", columnKey:"H", columnIndex:6,},
      'offset':{id:"offset", columnKey:"I", columnIndex:7,},
      'overrun':{id:"overrun", columnKey:"J", columnIndex:6,},
      'initiativeCost':{id:"initiativeCost", columnKey:"K", columnIndex:9,},
      'color':{id:"color", columnKey:"L", columnIndex:10,},
      'colorIndex':{id:"colorIndex", columnKey:"M", columnIndex:11,},
    }

    //Initialize new Zip Codes
    let newInitiatives={};

    //Try to load stuff
    let pathID=`./punchlists/punchlist.xlsx`;

    //Load the xlsx file from the public folder
    const data = await (await fetch(pathID)).arrayBuffer();

    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    let sheet=workbook.Sheets['Data'];

    //Get the column IDs for the target data model property names
    let columns={};

    //Sort the keys
    Object.keys(sheet).forEach(key=>{
      if(!columns[key[0]]){
        columns[key[0]]={columnLetter:key[0], keys:[]};
      }

      //Add all the keys for the column
      columns[key[0]].keys.push(key);
    });
    
    //Log the columns and a sample row
    Object.keys(columns).forEach(columnKey=>{
      console.log(sheet[columns[columnKey].keys[3]]);
    });

    //Log the columns
    console.log(columns);

    //Load the data from the relevant rows
    let totalRows=columns['A'].keys.length;

    //Skip the first row
    let initiative;
    let today=new Date();
    for(let i=1; i<totalRows; i++){
      let startDate=new Date(String(sheet[columns[HEADERS.startDate.columnKey].keys[i]].w));

      //Parse the Row
      initiative={
        id:String(sheet[columns[HEADERS.key.columnKey].keys[i]].v),
        description:String(sheet[columns[HEADERS.summary.columnKey].keys[i]].v),
        status:String(sheet[columns[HEADERS.status.columnKey].keys[i]].v),
        active:Boolean(sheet[columns[HEADERS.active.columnKey].keys[i]].v),
        currentPhase:Boolean(sheet[columns[HEADERS.currentPhase.columnKey].keys[i]].v),
        startDate:String(sheet[columns[HEADERS.startDate.columnKey].keys[i]].w),
        endDate:String(sheet[columns[HEADERS.endDate.columnKey].keys[i]].w),
        duration:Number.parseInt(sheet[columns[HEADERS.duration.columnKey].keys[i]].v),
        offset:Number.parseInt(sheet[columns[HEADERS.offset.columnKey].keys[i]].v),
        overrun:Number.parseInt(sheet[columns[HEADERS.overrun.columnKey].keys[i]].v),
        timeTo:Number.parseInt((startDate.getTime()-today.getTime())/86400000),
        initiativeCost:Number.parseInt(sheet[columns[HEADERS.initiativeCost.columnKey].keys[i]].v),
        colorIndex:Number.parseInt(sheet[columns[HEADERS.colorIndex.columnKey].keys[i]].v),
      }

      //Add the row
      newInitiatives[initiative.id]=initiative;
    }

    //Update the initiatieves 
    Object.values(newInitiatives).forEach(i=>{
      i.initiativeWidth=i.duration/365*100;
      i.overrunWidth=i.overrun/365*100;
      i.offset=(i.offset+2)/365*100
    });

    //Update the state
    console.log({status:"Punchlist: Loaded Initiatives", initiativeCount:Object.keys(newInitiatives).length});
    console.log(Object.values(newInitiatives)[0]);
    console.log(newInitiatives);
    setInitiatives(newInitiatives);
  }

  //Load Months
  const initializeMonths=(currentInitiatives)=>{
    let today = new Date();
    let newMonths={
      0:{month:0, totalCost:0, cumCost:0, active:today.getUTCMonth()===0},
      1:{month:1, totalCost:0, cumCost:0, active:today.getUTCMonth()===1},
      2:{month:2, totalCost:0, cumCost:0, active:today.getUTCMonth()===2},
      3:{month:3, totalCost:0, cumCost:0, active:today.getUTCMonth()===3},
      4:{month:4, totalCost:0, cumCost:0, active:today.getUTCMonth()===4},
      5:{month:5, totalCost:0, cumCost:0, active:today.getUTCMonth()===5},
      6:{month:6, totalCost:0, cumCost:0, active:today.getUTCMonth()===6},
      7:{month:7, totalCost:0, cumCost:0, active:today.getUTCMonth()===7},
      8:{month:8, totalCost:0, cumCost:0, active:today.getUTCMonth()===8},
      9:{month:9, totalCost:0, cumCost:0, active:today.getUTCMonth()===9},
      10:{month:10, totalCost:0, cumCost:0, active:today.getUTCMonth()===10},
      11:{month:11, totalCost:0, cumCost:0, active:today.getUTCMonth()===11},
    };
    let month;
    let newProjectCost=0;
    let currentProjectCost=0;
    let maxICost=0;

    Object.values(currentInitiatives).forEach(i=>{
      i.month=new Date(i.startDate).getUTCMonth();
      newMonths[i.month].totalCost+=i.initiativeCost;
      newProjectCost+=i.initiativeCost;

      if(i.status==="Done"){
        currentProjectCost+=i.initiativeCost;
      }

      if(i.initiativeCost>maxICost){
        maxICost=i.initiativeCost;
      }
    });

    let cumCost=0;
    Object.values(newMonths).forEach(m=>{
      cumCost+=m.totalCost;
      m.cumCost=cumCost;
    })

    console.log(newMonths);
    console.log(newProjectCost);
    console.log(currentProjectCost);
    setMonths(newMonths);
    setProjectCost(newProjectCost);
    setCumulativeCost(currentProjectCost);
    setMaxInitiativeCost(maxICost);
  }

  //Handle Input changes
  const updateAccessCode=(targetValue)=>{
    setPunchlistClientID(targetValue);

    if(Number.parseInt(targetValue)===ACCESS_CODE){
      setAccessGranted(true);
    }
  }

  return(
    <div className='relative flex flex-col h-screen w-full items-center justify-start overflow-y-scroll'>
      {/*Landing Page*/}
      {accessGranted?(
        <div className='relative flex flex-row shrink-0 h-screen w-full items-center justify-start'>
          <div className='flex flex-col h-full w-2/3 items-center justify-center'>
             <img className="inline-block h-full w-full shrink-0" src={"./photos/homePhoto.jpg"} alt="Location Icon"/>
          </div>
          <div className='flex flex-col flex-1 h-full items-center justify-start px-4'>
            <img className="inline-block mt-8 h-64 w-64 flex-shrink-0 rounded-sm" src={"./photos/punchlistLogo.png"} alt="Location Icon"/>
            <div className='relative flex flex-row h-48 w-full items-center justify-start'>
              <div className='absolute top-0 left-0 flex flex-row w-full h-full items-center justify-center text-center font-bold text-6xl'>
                {String("11 Clinton Lane Project Timeline")}
              </div>
              <div className='flex flex-col h-full w-full rounded-lg bg-black shadow-lg' style={{opacity:"0%"}}>
              </div>
            </div>
            <div className='flex flex-col mt-4 mb-12 h-1 w-full rounded-full bg-black'>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Project Start: ")}</span><span className='text-xl font-bold'>{String("3/25/2025")}</span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Current Date: ")}</span><span className='text-xl font-bold'>{String((today.getUTCMonth()+1)+"/"+today.getUTCDate()+"/"+today.getUTCFullYear())}</span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Completion Date: ")}</span><span className='text-xl font-bold'>{String("10/25/2025")}</span>
            </div>
            <div className='flex flex-row w-full mt-8 my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Investment: ")}</span><span className='font-bold text-4xl text-green-800'>{String("+$"+Number.parseFloat(cumulativeCost/1000).toFixed(1)+"K")}</span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Left to Pay: ")}</span><span className='font-bold text-4xl'>{String("$"+Number.parseFloat((projectCost-cumulativeCost)/1000).toFixed(1)+"K")}</span>
            </div>

            <div className='flex flex-col flex-1'>
            </div>

            <div className='flex flex-col text-xs pb-8 italic'> 
              {String("*This application and all data are property of Punchlist Real Estate, LLC. All costs and timelines shown reflect independent contractor projections and are subject to change. ")}
            </div>
          </div>

          {/*Scroll Down*/}
          <div className='absolute bottom-0 left-0 flex flex-col h-48 w-full items-center justify-center'>
            <div className='relative flex flex-col h-24 w-64 items-center justify-center'>
              <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center z-50' style={{transform:"scale(0.1) scaleX(2)"}}>
                <LightIcon iconID={"CHEVRON_DOWN"} rotate={0}/>
              </div>

              <div className='flex flex-col h-20 w-32 rounded-xl bg-white' style={{opacity:"65%"}}>
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Space*/}
      {accessGranted?(
        <div className='flex flex-col w-full h-24 shrink-0 items-center justify-center'>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/***Initiative Core***/}
      {accessGranted?(
        <div className='relative flex flex-col shrink-0 h-screen w-full items-center justify-center'>
          <div id={'lightTimeline'} className='relative flex flex-col items-center justify-start rounded-lg border-2 border-gray-900 z-50' style={{width:"65%", height:"75%"}}>
            {/*Core timeline*/}
            {initiatives&&Object.values(initiatives).filter(i=>i.active).map((entry,index)=>{
              return(
                <div key={index} className={`relative flex flex-row w-full py-0.5 rounded-xl items-center justify-start ${entry.colorIndex===3?" border-black bg-gray-200":""} ${entry.currentPhase?"bg-sky-100":""} ${activeInitiativeID===entry.id?"shrink-0 h-6 bg-green-200":"flex-1"} z-50 transition-all duration-500 ease-in-out`} >
                  {/*Initiative Name*/}
                  <div className={`absolute top-0 left-0 h-full flex flex-row items-center justify-end ${entry.colorIndex===0||entry.colorIndex===3?"font-extrabold":""} ${entry.currentPhase?"text-sky-600 font-extrabold":""} ${entry.status==="Done"?"italic":""} transition-all duration-500 ease-in-out`} onMouseEnter={()=>showInitiativeDetails&&setActiveInitiativeID(entry.id)} style={{transform:"translate(calc(-100% - 1rem),0%)", width:"16rem",fontSize:"0.5rem"}}>
                  {String(entry.description)}
                  </div>
                  {/*Initiative Name*/}
                  <div className={`absolute top-0 right-0 h-full flex flex-col items-end justify-center text-right ${entry.colorIndex===0||entry.colorIndex===3?"font-extrabold":""} ${entry.currentPhase?"text-sky-600 font-extrabold":""} ${entry.status==="Done"?"italic":""} transition-all duration-500 ease-in-out`} onMouseEnter={()=>showInitiativeDetails&&setActiveInitiativeID(entry.id)} style={{transform:"translate(calc(100% + 1rem),0%)",fontSize:"0.5rem"}}>
                  {showInitiativeCostChart?String("$"+Number.parseFloat(entry.initiativeCost/1000).toFixed(1)+"K"):String(entry.startDate+" - "+entry.endDate)}
                  </div>
                  <div className='flex flex-col h-full' style={{width:`${entry.offset}%`}}>
                  </div>
                  <div className={`flex flex-row h-full items-center justify-end rounded-lg border-r-0 border-l-0 border-gray-900 z-50`} style={{width:`${entry.initiativeWidth}%`,minWidth:"10px",backgroundColor:TIMELINE_COLORS[entry.colorIndex].color}}>
                    {entry.overrun&&showInitiativeOverruns?(
                      <div className='flex flex-col shrink-0 h-1/2 bg-red-400 rounded-r-full' style={{transform:"translate(100%,0%)", width:`${entry.overrunWidth/100*lightTimelineWidthPX}px`, maxHeight:"5px"}}>
                      </div>
                    ):(
                      <div className='hidden'/>
                    )}
                    <div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/*Cost Chart*/}
            <div className={`absolute bottom-0 left-0 flex flex-row ${showProjectCost||showInitiativeCostChart?"h-full":"h-0 opacity-0"} w-full items-center rounded-lg justify-center transition-all duration-1000 ease-in-out`} onClick={()=>{if(!showInitiativeCostChart){setShowInitiativeCostChart(true); setShowProjectCost(false)}else{setShowInitiativeCostChart(false); setShowProjectCost(true)}}} style={{zIndex:60}}>
              <div className='relative flex flex-row h-full w-full items-center justify-start rounded-lg' style={{zIndex:60}}>
              {/*Show Monthly Aggregate Costs*/}
              {showProjectCost?(
                <div className='relative flex flex-row h-full w-full pt-24 items-center justify-start rounded-lg' style={{zIndex:60}}>
                  {projectCost&&months&&Object.values(months).map((month,monthIndex)=>{
                    let maxMonthlyCost=Math.max(...Object.values(months).map(m=>m.totalCost));
                    return(
                      <div key={monthIndex} className='flex flex-col h-full flex-1 items-center justify-end' style={{zIndex:60}}>
                        {/*Monthly Bars*/}
                        {!showCumulativeCost?(
                          <div className='flex flex-row h-full w-full px-1 items-end justify-center'>
                            <div className={`relative flex flex-col w-2/3 mx-1 rounded-t-xl ${month.active?"bg-sky-400 border-t-4 border-gray-900":"border-t-4 border-sky-400 bg-gray-900"}`} style={{height:`${month.totalCost/maxMonthlyCost*100}%`}}>
                              <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900 text-xs' style={{transform:"translate(0%,calc(-100% - 1rem)"}}>
                              {!showProjectCostActuals&&String("$"+Number.parseFloat(month.totalCost/1000).toFixed(1)+"K")}
                              </div>
                            </div>
                            <div className={`${showProjectCostActuals?"w-2/3 mx-1":"w-0 opacity-0"} relative flex flex-col rounded-t-xl border-t-4 border-gray-900 bg-gray-400 transition-all duration-500 ease-in-out`} style={{height:`${Math.random()*8+month.totalCost/maxMonthlyCost*100}%`}}>
                              <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900 text-xs' style={{transform:"translate(0%,calc(-100% - 1rem)"}}>
                              {!showProjectCostActuals&&String("$"+Number.parseFloat(month.totalCost/1000).toFixed(1)+"K")}
                              </div>
                            </div>
                          </div>
                        ):(
                          <div className='hidden'/>
                        )}

                        {/*Cumulative Cost*/}
                        {showCumulativeCost?(
                          <div className='relative flex flex-col w-full rounded-t-xl border-t-4 border-sky-400 bg-gray-900' style={{height:`${month.cumCost/projectCost*100}%`}}>
                            <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900 text-sm' style={{transform:"translate(0%,calc(-100% - 1rem)"}}>
                            {String("$"+month.cumCost.toFixed(0))}
                            </div>
                          </div>
                        ):(
                          <div className='hidden'/>
                        )}

                      </div>
                    )
                  })}
                </div>
              ):(
                <div className='hidden'/>
              )}

              {/*Show Costs Per Initiatives as a row bar chart*/}
              {showInitiativeCostChart&&maxInitiativeCost?(
                <div className='relative flex flex-col h-full w-full items-center justify-start' style={{zIndex:60}}>
                  {initiatives&&Object.values(initiatives).map((i,initiativeIndex)=>{

                    return(
                      <div key={initiativeIndex} className={`flex flex-row flex-1 py-0.5 w-full items-center justify-start`} style={{zIndex:60}}>
                        <div className={`flex flex-row h-full items-center justify-end rounded-r-full border-r-4 ${i.currentPhase?"bg-sky-400 border-gray-900":"bg-gray-900 border-sky-400"} transition-all duration-500 ease-in-out`} style={{width:`${i.initiativeCost/maxInitiativeCost*100}%`}}>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ):(
                <div className='hidden'/>
              )}

              {/*Shade*/}
              <div className='absolute top-0 left-0 flex flex-col h-full w-full bg-white rounded-lg' style={{opacity:"75%"}}>
              </div>
              </div>
            </div>

            {/*Initiative Inspection Window*/}
            {showInitiativeDetails && activeInitiativeID && !showProjectCost?(
              <div className='absolute top-1 right-1 flex flex-col items-center justify-center rounded-xl shadow-lg border-gray-400 overflow-hidden' style={{zIndex:70,height:"14rem", width:"22rem"}}>
                <div className='relative flex flex-col h-full w-full items-center justify-center'>
                  <div className='absolute top-0 left-0 flex flex-col p-2 h-full w-full items-center justify-start z-50'>
                    <div className='relative flex flex-col h-full w-full items-center justify-start'>
                      <div className='flex flex-row mt-4 items-center justify-start text-lg font-bold text-gray-900 rounded-lg px-2'>
                        {String(initiatives[activeInitiativeID].description)}
                      </div>
                      <div className='flex flex-col my-1 w-3/4 bg-gray-900 rounded-full' style={{height:"0.2rem"}}>
                      </div>
                       <div className=' flex flex-col w-full flex-1 items-center justify-center text-4xl font-bold text-gray-800'>
                        {String("+$"+Number.parseFloat(initiatives[activeInitiativeID].initiativeCost/1000).toFixed(1)+"K")}
                      </div>
                      <div className='flex flex-row items-center justify-start text-sm font-bold text-gray-900 italic' style={{color:TIMELINE_COLORS[initiatives[activeInitiativeID].colorIndex].color}}>
                        {String(TIMELINE_COLORS[initiatives[activeInitiativeID].colorIndex].description)}
                      </div>
                      <div className='flex flex-col my-2 items-center justify-center text-sm font-bold text-white rounded-full px-8 py-1' style={{backgroundColor:TIMELINE_COLORS[initiatives[activeInitiativeID].colorIndex].color}}>
                        {String(initiatives[activeInitiativeID].duration+" day")}{String(initiatives[activeInitiativeID].duration>1?"s":"")}
                      </div>
                      <div className='flex flex-col text-sm font-normal italic text-gray-600'>
                      {String(initiatives[activeInitiativeID].startDate+" - "+initiatives[activeInitiativeID].endDate)}
                      </div>
                      <div className='absolute bottom-0 left-0 flex flex-col my-2 items-center justify-center text-gray-400' style={{fontSize:"0.7rem"}}>
                        {String(initiatives[activeInitiativeID].timeTo+" days")}
                      </div>
                      <div className='absolute bottom-0 right-0 flex flex-col my-2 items-center justify-center text-gray-400' style={{fontSize:"0.7rem"}}>
                        {String(Number.parseInt(Object.keys(initiatives).findIndex(i=>i===activeInitiativeID)+1))} / {String(Number.parseInt(Object.keys(initiatives).length))}
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex flex-col h-full w-full bg-white transition-all duration-500 ease-in-out' style={{opacity:activeInitiativeID&&initiatives[activeInitiativeID].offset>50?"95%":"65%"}}>
                  </div>
                </div>
              </div>
            ):(
              <div className='hidden'/>
            )}
          
            {/*Timeline Months*/}
            <div className='absolute top-0 left-0 flex flex-row h-12 w-full items-center justify-start' style={{transform:"translate(0%,-100%)"}}>
              <div className='relative flex flex-row h-full w-full items-center justify-start'>
              {!showInitiativeCostChart&&["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((month,monthIndex)=>{
                return(
                  <div key={monthIndex} className={`flex flex-col h-full flex-1 items-center justify-center font-xl font-bold text-black`}>
                  {String(month)}
                  </div>
                )
              })}
              {showInitiativeCostChart&&[0,25,50,75,100].map((percentage,pIndex)=>{
                return(
                  <div key={pIndex} className={`absolute top-0 left-0 flex flex-row h-full items-center justify-end font-bold text-black`} style={{width:`${percentage}%`}}>
                    <div className='relative flex flex-row h-full w-full items-center justify-end'>
                      <div className='flex flex-col text-sm' style={{transform:"translate(50%,0%)"}}>
                      {String("$"+Number.parseFloat(percentage/100*maxInitiativeCost/1000).toFixed(1)+"K")}
                      </div>
                      <div className='absolute bottom-1 right-0 h-3 bg-gray-400 rounded-full' style={{transform:"translate(50%,0%)", width:"0.1rem"}}>
                      </div>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
            {/*Months Indicator*/}
            <div className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-start z-0'>
              {!showInitiativeCostChart&&["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",].map((month,monthIndex)=>{
                return(
                  <div key={monthIndex} className={`relative flex flex-col h-full flex-1 items-center justify-start ${monthIndex!==11?"border-r":""} border-gray-300 font-xl font-bold text-black`}>
                    <div className='flex flex-col h-full w-1 rounded-full border-r border-dotted border-gray-300'>
                    </div>
                    {monthIndex!==11?(
                      <div className='absolute top-0 right-0 flex flex-col items-center justify-center' style={{transform:"translate(50%,-50%)"}}>
                        <div className='flex flex-col h-1 w-1 bg-gray-400 rounded-full' style={{transform:"translate(0%,-1.4rem)"}}>
                        </div>
                      </div>
                    ):(
                      <div className='hidden'/>
                    )}
                  </div>
                )
              })}
            </div>
            {/*Date Indicator*/}
            {!showInitiativeCostChart?(
              <div className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-start z-50'>
                <div className='relative flex flex-row h-full w-full items-center justify-start'>
                  <div className='flex flex-col h-full items-end justify-start' style={{width:`${23}%`,}}>
                    <div className='flex flex-col h-full w-full bg-black rounded-l-sm' style={{opacity:"20%"}}>
                    </div>
                  </div>
                  {[0].map((entry,index)=>{
                    let width=23;

                    if(activeInitiativeID){
                      width=initiatives[activeInitiativeID].offset;
                    }

                    return(
                      <div key={index} className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-start'>
                        <div className='relative flex flex-row h-full transition-all duration-500 ease-in-out' style={{width:`${width}%`}}>
                          <div className='absolute top-0 right-0 flex flex-col h-full border-r-2 border-dashed border-gray-900 z-50' style={{transform:"translate(50%,0%)"}}>
                          </div>
                          <div className='absolute top-0 right-0 flex flex-col h-3 w-3 border-2 border-green-400 bg-green-100 z-50' style={{transform:"translate(50%,calc(-50% - 1px)) rotate(45deg)"}}>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ):(
              <div className='hidden'/>
            )}
            {/*Title*/}
            <div className='absolute top-0 left-0 flex flex-row w-full items-center justify-start text-4xl font-bold' style={{transform:"translate(0%,calc(-100% - 3rem))"}}>
              <div className='flex flex-row items-center justify-between border-black text-left' style={{width:"100%"}}>
              {String("11 Clinton Lane Project Timeline")}

              {showCostInTitle?(
                <div className='flex flex-row items-center justify-end text-left rounded-xl text-black-500 text-4xl'>
                  <span className='text-green-800'>{String("+$"+Number.parseFloat(cumulativeCost/1000).toFixed(1)+"K")}</span> / <span className='text-black'>{String("$"+Number.parseFloat(projectCost/1000).toFixed(1)+"K")}</span>
                </div>
              ):(
                <div className='hidden'/>
              )}
              </div>
            </div>
            {/*Logo*/}
            <div className='absolute top-0 left-0 items-center justify-center' onClick={()=>{if(showInitiativeCostChart){setShowInitiativeCostChart(false); setShowProjectCost(false); setActiveInitiativeID(null); setShowInitiativeDetails(false);}else{setShowProjectCost((showProjectCost)=>!showProjectCost); setActiveInitiativeID(null); setShowInitiativeDetails(false);}}} style={{zIndex:60,transform:"translate(calc(-100% - 1.2rem),calc(-100% - 2.6rem))"}}>
              <img className="inline-block h-14 w-14 flex-shrink-0 rounded-sm" src={"./photos/punchlistLogo.png"} alt="Location Icon"/>
            </div>
            {/*Legend*/}
            <div className='absolute bottom-0 left-0 flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,calc(100% + 1rem))"}}>
              <div className='flex flex-wrap h-16 w-full px-4 items-center justify-center rounded-full'>
                {TIMELINE_COLORS.map((color,colorIndex)=>{
                  return(
                    <div key={colorIndex} className='flex flex-row items-center mx-2 justify-center text-sm font-bold text-white'>
                      <div className='flex flex-col h-3 w-3 mx-2 rounded-full' style={{backgroundColor:color.color}}>
                      </div>
                      <div className='flex flex-col text-xs font-bold text-gray-900'>
                        {String(color.description)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/*Initiative Mesh*/}
            <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-start z-50 bg' onClick={()=>{if(activeInitiativeID){setActiveInitiativeID(null); setShowInitiativeDetails(false)}else{setActiveInitiativeID(Object.keys(initiatives)[0]); setShowInitiativeDetails(true);}}}>
              {initiatives&&Object.values(initiatives).filter(i=>i.active).map((initiative,initiativeIndex)=>{
                return(
                  <div key={initiativeIndex} className={`flex flex-col w-full ${activeInitiativeID===initiative.id?"shrink-0 h-6":"flex-1"} z-50 transition-all duration-500 ease-in-out`} onMouseEnter={()=>showInitiativeDetails&&setActiveInitiativeID(initiative.id)}>
                  </div>
                )
              })}
            </div>
          </div>

          {/*URL*/}
          <div className='absolute bottom-0 left-0 flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,-1rem)"}}>
            <NavLink to="https://www.punchlistRE.com" className="mx-2 my-1 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-dark hover:font-bold">
              www.PunchlistRE.com
            </NavLink>
          </div>

          {/*Gantt Initiative To Do's*/}
          <div className='hidden absolute bottom-0 right-0 flex flex-col h-full rounded-lg border-2 border-gray-900 overflow-hidden' style={{zIndex:100,width:"18rem"}}>
            <div className='relative flex flex-col h-full w-full items-center justify-start p-2' style={{zIndex:100}}>
              <div className='flex flex-col h-1/2 w-full pt-8 items-center justify-start border-b-2 border-gray-800 overflow-y-scroll' style={{zIndex:100}}>
              {false&&[0,0,0,0,0,0,].map((entry,index)=>{

                return(
                  <div key={index} className='flex flex-row my-1 h-16 shrink-0 w-full rounded-xl bg-gray-200 border-r-4 border-l-4 border-gray-800'>
                  </div>
                )
              })}
              </div>

              <div className='absolute top-0 left-0 flex flex-col h-full w-full bg-white' style={{zIndex:99,opacity:"75%"}}>
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*LogIn*/}
      <div className={`absolute top-0 left-0 flex flex-col ${accessGranted||!authenticate?"h-0 opacity-0":"h-full"} w-full items-center justify-center transition-all duration-1000 ease-in-out`} style={{zIndex:100}}>
        <div className='relative flex flex-col h-full w-full items-center justify-center overflow-hidden'>
          <div className='relative flex flex-col h-full w-full bg-white' style={{opacity:"100%"}}>  
            <img className="inline-block h-full w-full flex-shrink-0 rounded-sm transition-all delay-700 duration-1000 ease-in-out opacity-75" src={"./photos/homePhoto.jpg"} alt="Location Icon"/>
          </div>
          {!accessGranted&&authenticate?(
            <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
              <div className='flex flex-col flex-1 w-full items-center justify-center'>
                <div className='relative flex flex-row items-center justify-center xl:text-7xl sm:text-2xl font-bold rounded-full' style={{width:"80rem"}}>
                  <div className='absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center z-50'>
                  {String("11 Clinton Lane Project Timeline")}
                  </div>
                  <div className='rounded-xl bg-white h-32 w-full' style={{opacity:"55%"}}>
                  </div>
                </div>
              </div>
              <div className='relative flex flex-col items-center justify-center rounded-xl shadow-lg bg-white border-2 border-gray-100' style={{height:"20rem", width:"20rem"}}>
                <div className='flex flex-col text-2xl font-bold text-gray-900'>
                {String("Access Code:")}
                </div>
                <div className='flex flex-col mt-2 p-1 h-14 w-1/2 items-center justify-center text-2xl font-bold text-gray-900 border-r-2 border-l-2 rounded-xl border-gray-900'>
                 <input
                  type='text'
                  onChange={(event)=>{updateAccessCode(event.target.value)}}
                  className={`w-full px-0 py-0 text-4xl font-bold text-center rounded-md outline-none border-none placeholder-gray-200 placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                  style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                  placeholder={"####"}
                  value={punchlistClientID}
                  onBlur={()=>{setPunchlistClientID(null)}}
                />
                </div>
              </div>
              <div className='flex flex-col flex-1 w-full items-center justify-center'>
              </div>
            </div>
          ):(
            <div className='hidden'/>
          )}
        </div>
      </div>
    </div>
  )
}

//Some Light Icons and Chevrons
const LightIcon=(props)=>{
  const ICONS={
    "CHEVRON_UP":{id:"CHEVRON_UP", secondRow:false, angle1:33.5, altAngle1:-360, angle2:-33.5, altAngle2:360, width:9},
    "CHEVRON_DOWN":{id:"CHEVRON_DOWN", secondRow:false, angle1:-33.5, altAngle1:360, angle2:33.5, altAngle2:-360, width:9},

    "CHEVRON_UP_WIDE":{id:"CHEVRON_UP_WIDE", secondRow:false, angle1:50, altAngle1:-360, angle2:-50, altAngle2:360, width:12.4},
    "CHEVRON_DOWN_WIDE":{id:"CHEVRON_DOWN_WIDE", secondRow:false, angle1:-50, altAngle1:360, angle2:50, altAngle2:-360, width:12.4},
    
    "DOUBLE_CHEVRON_UP_WIDE":{id:"DOUBLE_CHEVRON_UP_WIDE", secondRow:true, angle1:50, altAngle1:-360, angle2:-50, altAngle2:360, width:12.4},
    "DOUBLE_CHEVRON_DOWN_WIDE":{id:"DOUBLE_CHEVRON_DOWN_WIDE", secondRow:true, angle1:-50, altAngle1:360, angle2:50, altAngle2:-360, width:12.4},

    "DOUBLE_CHEVRON_UP":{id:"DOUBLE_CHEVRON_UP", secondRow:true, angle1:33.5, altAngle1:-360, angle2:-33.5, altAngle2:360, width:9},
    "DOUBLE_CHEVRON_DOWN":{id:"DOUBLE_CHEVRON_DOWN", secondRow:true, angle1:-33.5, altAngle1:360, angle2:33.5, altAngle2:-360, width:9},

    "X":{id:"X", secondRow:false, angle1:33, altAngle1:-360, angle2:-33, altAngle2:360, width:0},
    "+":{id:"+", secondRow:false, angle1:0, altAngle1:-360, angle2:90, altAngle2:450, width:0},
    "EQUAL":{id:"EQUAL", secondRow:true, angle1:90, altAngle1:-360, angle2:90, altAngle2:450, width:0},
  }

  const [activeIcon,setActiveIcon]=useState(props.iconID?ICONS[props.iconID]:ICONS["CHEVRON_UP"]);
  const [animateIcon,setAnimateIcon]=useState(false);
  const [pulse,setPulse]=useState(true);

  return(

    <div className='flex flex-col h-full w-full items-center justify-center'>
      <div className='relative flex flex-col h-96 w-96 items-center justify-center rounded-full transition-all duration-all ease-in-out' style={{transform:`rotate(${props.rotate?props.rotate:animateIcon?Math.random()*1080:0}deg)`}}>
        {activeIcon&&[0].map((entry,index)=>{
          let angle=Math.random()*90;
          return(
            <div key={index} className={`flex flex-row h-0 items-center justify-between transition-all duration-500 ease-in-out`} style={{width:`${pulse?activeIcon.width:12}rem`}}>
              <div className='flex flex-col h-1 w-1 items-center justify-center rounded-full border-0 border-white transition-all duration-500 ease-in-out' style={{transform:`rotate(${pulse?activeIcon.angle1:activeIcon.altAngle1+angle}deg)`}}>
                <div className={`flex flex-col shrink-0 ${pulse?"h-64 w-0 border-8":"h-0 w-0 border-2"} border-gray-900 rounded-full transition-all duration-500 ease-in-out`}>
                </div>
              </div> 
              <div className='flex flex-col h-1 w-1 items-center justify-center rounded-full border-0 border-white transition-all duration-500 ease-in-out' style={{transform:`rotate(${pulse?activeIcon.angle2:activeIcon.altAngle2+angle}deg)`}}>
                <div className={`flex flex-col shrink-0 ${pulse?"h-64 w-0 border-8":"h-0 w-0 border-2"} border-gray-900 rounded-full transition-all duration-500 ease-in-out`}>
                </div>
              </div> 
            </div>
          )
        })}

        <div className={`flex flex-col ${activeIcon.secondRow?pulse?"h-10":"h-10":"h-0"} w-full`}>
        </div>

        {false&&activeIcon&&[0].map((entry,index)=>{
          let angle=Math.random()*90;
          return(
            <div key={index} className={`flex flex-row h-0 items-center justify-between transition-all duration-500 ease-in-out`} style={{width:`${pulse?activeIcon.width:12}rem`}}>
              <div className='flex flex-col h-1 w-1 items-center justify-center rounded-full border-0 border-white transition-all duration-500 ease-in-out' style={{transform:`rotate(${pulse?activeIcon.angle1:activeIcon.altAngle1+angle}deg)`}}>
                <div className={`flex flex-col shrink-0 ${pulse?"h-64 w-0 border-2":"h-0 w-0 border-2 animate-spin"} border-gray-900 rounded-full transition-all duration-500 ease-in-out`}>
                </div>
              </div> 
              <div className='flex flex-col h-1 w-1 items-center justify-center rounded-full border-0 border-white transition-all duration-500 ease-in-out' style={{transform:`rotate(${pulse?activeIcon.angle2:activeIcon.altAngle2+angle}deg)`}}>
                <div className={`flex flex-col shrink-0 ${pulse?"h-64 w-0 border-2":"h-0 w-0 border-2 animate-spin"} border-gray-900 rounded-full transition-all duration-500 ease-in-out`}>
                </div>
              </div> 
            </div>
          )
        })}

        <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center' style={{opacity:animateIcon?"100%":"0"}}>
          <div className={`flex flex-col ${pulse?"border-c2-highlight border-2 h-96 w-0":"border-0 h-0 w-0"} rounded-full transition-all duration-500 ease-in-out`} style={{transform:"translate(0%,18%)"}}>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default LightProjectTimeline;