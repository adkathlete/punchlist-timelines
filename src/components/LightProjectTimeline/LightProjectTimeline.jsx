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
  const ADMIN_CODE=8757;
  const MILLISECONDS_PER_DAY=86400000;

  const TIMELINE_COLORS = [
    {id:"0",description:"Punchlist Activities", color:"#8b5cf6", colorString:"indigo-600",},
    {id:"1",description:"Professional Reviews", color:"#1e3a8a", colorString:"blue-900",},
    {id:"2",description:"Client Due Dilligence", color:"#38bdf8", colorString:"sky-400",},
    {id:"3",description:"Municipal Reviews", color:"#6b7280", colorString:"gray-400",},
    {id:"4",description:"Construction", color:"#3b82f6", colorString:"blue-600" ,},
    {id:"5",description:"Purchase Orders", color:"#5eead4", colorString:"cyan-400",},
  ];

  const COST_CHART_COLORS = [
    {id:"0",description:"Accepted Bid", color:"#111827",},
    {id:"1",description:"Market Bid", color:"#9ca3af",},
    {id:"2",description:"Realized Cost", color:"#4ade80",},
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

  const [activeInitiative,setActiveInitiative]=useState(null)
  const [activeInitiativeID,setActiveInitiativeID]=useState(null);
  const [editActiveInitiativeDescription,setEditActiveInitiativeDescription]=useState(false);
  const [editActiveInitiativeStartDate,setEditActiveInitiativeStartDate]=useState(false);
  const [editActiveInitiativeEndDate,setEditActiveInitiativeEndDate]=useState(false);
  const [editActiveInitiativeAcceptedCost,setEditActiveInitiativeAcceptedCost]=useState(false);
  const [editActiveInitiativeMarketCost,setEditActiveInitiativeMarketCost]=useState(false);
  const [editActiveInitiativeRealizedCost,setEditActiveInitiativeRealizedCost]=useState(false);

  const [showProjectCost ,setShowProjectCost ]=useState(false);
  const [showCostInTitle,setShowCostInTitle]=useState(true);
  const [showCumulativeCost,setShowCumulativeCost]=useState(false);
  const [showProjectCostActuals,setShowProjectCostActuals]=useState(false);
  const [showInitiativeDetails,setShowInitiativeDetails]=useState(false);
  const [showInitiativeOverruns,setShowInitiativeOverruns]=useState(false);
  const [showInitiativeCostChart,setShowInitiativeCostChart]=useState(false);
  const [showDeleteInitiatives,setShowDeleteInitiatives]=useState(false);

  const [authenticate,setAuthenticate]=useState(true);
  const [accessGranted,setAccessGranted]=useState(false);
  const [adminAccess,setAdminAccess]=useState(false);
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
      'description':{id:"description", columnKey:"B", columnIndex:1,},
      'acceptedCost':{id:"acceptedCost", columnKey:"C", columnIndex:2,},
      'marketCost':{id:"marketCost", columnKey:"D", columnIndex:3,},
      'realizedCost':{id:"realizedCost", columnKey:"E", columnIndex:4,},
      'realizedDifference':{id:"realizedDifference", columnKey:"F", columnIndex:5,},
      'realizedPercentDifference':{id:"realizedPercentDifference", columnKey:"G", columnIndex:6,},
      'status':{id:"status", columnKey:"H", columnIndex:7,},
      'active':{id:"active", columnKey:"I", columnIndex:8,},
      'currentPhase':{id:"currentPhase", columnKey:"J", columnIndex:9,},
      'startDate':{id:"startDate", columnKey:"K", columnIndex:10,},
      'endDate':{id:"endDate", columnKey:"L", columnIndex:11,},
      'duration':{id:"duration", columnKey:"M", columnIndex:12,},
      'offset':{id:"offset", columnKey:"N", columnIndex:13,},
      'color':{id:"color", columnKey:"O", columnIndex:14,},
      'colorIndex':{id:"colorIndex", columnKey:"P", columnIndex:15,},
      'notes':{id:"notes", columnKey:"Q", columnIndex:16,},
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
        description:String(sheet[columns[HEADERS.description.columnKey].keys[i]].v),
        acceptedCost:Number.parseFloat(sheet[columns[HEADERS.acceptedCost.columnKey].keys[i]].v),
        marketCost:Number.parseFloat(sheet[columns[HEADERS.marketCost.columnKey].keys[i]].v),
        realizedCost:Number.parseFloat(sheet[columns[HEADERS.realizedCost.columnKey].keys[i]].v),
        realizedDifference:Number.parseFloat(sheet[columns[HEADERS.realizedDifference.columnKey].keys[i]].v),
        realizedPercentDifference:Number.parseFloat(sheet[columns[HEADERS.realizedPercentDifference.columnKey].keys[i]].v),
        status:String(sheet[columns[HEADERS.status.columnKey].keys[i]].v),
        active:Boolean(sheet[columns[HEADERS.active.columnKey].keys[i]].v),
        currentPhase:Boolean(sheet[columns[HEADERS.currentPhase.columnKey].keys[i]].v),
        startDate:String(sheet[columns[HEADERS.startDate.columnKey].keys[i]].w),
        endDate:String(sheet[columns[HEADERS.endDate.columnKey].keys[i]].w),
        duration:Number.parseInt(sheet[columns[HEADERS.duration.columnKey].keys[i]].v),
        offset:Number.parseInt(sheet[columns[HEADERS.offset.columnKey].keys[i]].v),
        timeTo:Number.parseInt((startDate.getTime()-today.getTime())/86400000),
        colorIndex:Number.parseInt(sheet[columns[HEADERS.colorIndex.columnKey].keys[i]].v),
        //notes:Number.parseInt(sheet[columns[HEADERS.notes.columnKey].keys[i]].v),
      }

      //Add the row
      newInitiatives[initiative.id]=initiative;
    }

    //Update the initiatieves 
    Object.values(newInitiatives).forEach(i=>{
      i.initiativeWidth=i.duration/365*100;
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
      0:{month:0, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===0},
      1:{month:1, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===1},
      2:{month:2, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===2},
      3:{month:3, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===3},
      4:{month:4, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===4},
      5:{month:5, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===5},
      6:{month:6, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===6},
      7:{month:7, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===7},
      8:{month:8, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===8},
      9:{month:9, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===9},
      10:{month:10, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===10},
      11:{month:11, realizedCost:0, marketCost:0, acceptedCost:0, cumRealizedCost:0, cumMarketCost:0, cumAcceptedCost:0, active:today.getUTCMonth()===11},
    };
    let month;
    let newProjectCost=0;
    let currentProjectCost=0;
    let maxICost=0;

    Object.values(currentInitiatives).forEach(i=>{
      i.month=new Date(i.startDate).getUTCMonth();
      newMonths[i.month].realizedCost+=i.realizedCost;
      newMonths[i.month].marketCost+=i.marketCost;
      newMonths[i.month].acceptedCost+=i.acceptedCost;

      newProjectCost+=i.acceptedCost;

      if(i.status==="Done"){
        currentProjectCost+=i.realizedCost;
      }

      if(i.acceptedCost>maxICost){
        maxICost=i.acceptedCost;
      }
    });

    let cumRealizedCost=0;
    let cumMarketCost=0;
    let cumAcceptedCost=0;

    Object.values(newMonths).forEach(m=>{
      cumRealizedCost+=m.realizedCost;
      cumMarketCost+=m.marketCost;
      cumAcceptedCost+=m.acceptedCost

      m.cumRealizedCost=cumRealizedCost;
      m.cumMarketCost=cumMarketCost;
      m.cumRealizedCost=cumRealizedCost;
    });

    console.log(newMonths);
    console.log(newProjectCost);
    console.log(currentProjectCost);
    console.log(maxICost);
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

    if(Number.parseInt(targetValue)===ADMIN_CODE){
      setAccessGranted(true);
      setAdminAccess(true);
    }
  }

  //Scroll Window
  const scrollToTimeline=()=>{
    console.log("Scrolling");
    let ref=document.getElementById("punchlistScroll");
    console.log(ref);
    ref.scrollTo(0,ref.getBoundingClientRect().height);
  }

  //Update Initiative
  const updateInitiative=(currentInitiatives,initiativeID,type,updateValue)=>{
    let newInitiatives={...currentInitiatives};

    console.log("Refreshing Initiatives")
    console.log(newInitiatives[initiativeID]);
    console.log(updateValue);

    if(type==='DESCRIPTION'){
      newInitiatives[initiativeID].description=updateValue;
    }

    if(type==='START_DATE'){
      if(new Date(updateValue)){
        newInitiatives[initiativeID].startDate=updateValue;
        newInitiatives[initiativeID].duration=(new Date(newInitiatives[initiativeID].endDate) - new Date(newInitiatives[initiativeID].startDate))/MILLISECONDS_PER_DAY;
        newInitiatives[initiativeID].initiativeWidth=newInitiatives[initiativeID].duration/365*100;
        
        let offsetDays=(new Date(newInitiatives[initiativeID].startDate) - new Date("01/01/2025"))/MILLISECONDS_PER_DAY;
        newInitiatives[initiativeID].offset=(offsetDays+2)/365*100
      }

    }

    if(type==='END_DATE'){
      newInitiatives[initiativeID].endDate=updateValue;

      newInitiatives[initiativeID].duration=(new Date(newInitiatives[initiativeID].endDate) - new Date(newInitiatives[initiativeID].startDate))/MILLISECONDS_PER_DAY;
      newInitiatives[initiativeID].initiativeWidth=newInitiatives[initiativeID].duration/365*100;      
    }

    if(type==='ACCEPTED_COST'){
      if(!Number.isNaN(Number.parseFloat(updateValue))){
        newInitiatives[initiativeID].acceptedCost=Number.parseFloat(updateValue);
      }else{
        newInitiatives[initiativeID].acceptedCost=0;
      }
    }

    if(type==='MARKET_COST'){
      if(!Number.isNaN(Number.parseFloat(updateValue))){
        newInitiatives[initiativeID].marketCost=Number.parseFloat(updateValue);
      }else{
        newInitiatives[initiativeID].marketCost=0;
      }
    }

    if(type==='REALIZED_COST'){
      if(!Number.isNaN(Number.parseFloat(updateValue))){
        newInitiatives[initiativeID].realizedCost=Number.parseFloat(updateValue);
      }else{
        newInitiatives[initiativeID].realizedCost=0;
      }
    }


    console.log(newInitiatives[initiativeID]);
    setInitiatives(newInitiatives);
    setActiveInitiative(newInitiatives[initiativeID]);
  }

  //Delete Initiative
  const deleteInitiative=(currentInitiatives,initiativeID)=>{
    let newInitiatives={...currentInitiatives};

    delete newInitiatives[initiativeID];

    setInitiatives(newInitiatives)
  }

  return(
    <div id={"punchlistScroll"} className='relative flex flex-col h-screen w-full items-center justify-start overflow-y-scroll'>
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
              <span className='text-black flex-1 font-bold '>{String("Project Start: ")}</span><span className='text-xl font-bold'>{String("01/01/2025")}</span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Current Date: ")}</span><span className='text-xl font-bold'>{String("0"+(today.getUTCMonth()+1)+"/"+today.getUTCDate()+"/"+today.getUTCFullYear())}</span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Completion Date: ")}</span><span className='text-xl font-bold'>{String("10/17/2025")}</span>
            </div>
            <div className='flex flex-row w-full mt-8 my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Investment: ")}</span>
              <span className='font-bold text-4xl text-green-800'>
                <div className='flex flex-col h-full items-center justify-center text-4xl font-bold text-green-800 px-2'>
                    <LightNumber
                      value={(cumulativeCost)}
                      config={{
                        size:"xl",
                        prefix:"$$",
                        suffix:"",
                        standardColor:"#ffffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false,
                        includeDateNum:false,
                      }}
                    />
                  </div>
              </span>
            </div>
            <div className='flex flex-row w-full my-1 items-center justify-start text-left rounded-xl text-black text-3xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
              <span className='text-black flex-1 font-bold '>{String("Left to Pay: ")}</span>
                <span className='font-bold text-4xl'>
                  <div className='flex flex-col h-full items-center justify-center text-4xl font-bold text-black px-2'>
                    <LightNumber
                      value={(projectCost-cumulativeCost)}
                      config={{
                        size:"xl",
                        prefix:"$",
                        suffix:"",
                        standardColor:"#ffffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false,
                        includeDateNum:false,
                      }}
                    />
                  </div>
                </span>
            </div>

            <div className='flex flex-col flex-1'>
            </div>

            <div className='flex flex-col text-xs pb-8 italic'> 
              {String("*This application and all data are property of Punchlist Real Estate, LLC. All costs and timelines shown reflect independent contractor projections and are subject to change. ")}
            </div>
          </div>

          {/*Scroll Down*/}
          <div className='absolute bottom-0 left-0 flex flex-col h-48 w-full items-center justify-center'>
            <div className='relative flex flex-col h-24 w-64 items-center justify-center' onClick={()=>scrollToTimeline()}>
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
                  {showInitiativeCostChart?String("$"+Number.parseFloat(entry.acceptedCost/1000).toFixed(1)+"K"):String("Date: "+entry.startDate+" - "+entry.endDate)}
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
            <div className={`absolute bottom-0 left-0 flex flex-row ${showProjectCost||showInitiativeCostChart?"h-full":"h-0 opacity-0"} w-full items-center rounded-lg justify-center transition-all duration-1000 ease-in-out`} onClick={()=>{if(!showInitiativeCostChart){setShowInitiativeCostChart(false); setShowProjectCost(true)}else{setShowInitiativeCostChart(false); setShowProjectCost(true)}}} style={{zIndex:60}}>
              <div className='relative flex flex-row h-full w-full items-center justify-start rounded-lg' style={{zIndex:60}}>
              {/*Show Monthly Aggregate Costs*/}
              {showProjectCost?(
                <div className='relative flex flex-row h-full w-full pt-24 items-center justify-start rounded-lg' style={{zIndex:60}}>
                  {projectCost&&months&&Object.values(months).map((month,monthIndex)=>{
                    let maxMonthlyCost=Math.max(...Object.values(months).map(m=>m.acceptedCost));
                    return(
                      <div key={monthIndex} className='flex flex-col h-full flex-1 items-center justify-end' style={{zIndex:60}}>
                        {/*Monthly Bars*/}
                        {!showCumulativeCost?(
                          <div className='flex flex-row h-full w-full px-1 items-end justify-center'>
                            <div className={`relative flex flex-col w-2/3 mx-1 rounded-t-xl border-t-4 border-sky-400 bg-gray-900`} style={{height:`${month.acceptedCost/maxMonthlyCost*100}%`}}>
                              <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900 transition-all duration-500 ease-in-out' style={{transform:"translate(0%,calc(-100% - 1rem)", fontSize:showProjectCostActuals?"0.4rem":"0.7rem"}}>
                              {String("$"+Number.parseFloat(month.acceptedCost/1000).toFixed(1)+"K")}
                              </div>
                            </div>
                            <div className={`${showProjectCostActuals?"w-2/3 mx-1":"w-0 opacity-0"} relative flex flex-col rounded-t-xl border-t-4 border-gray-900 bg-gray-400 transition-all duration-500 ease-in-out`} style={{height:`${month.marketCost/maxMonthlyCost*100}%`}}>
                              <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900' style={{transform:"translate(0%,calc(-100% - 1rem)", fontSize:"0.4rem"}}>
                              {showProjectCostActuals&&String("$"+Number.parseFloat(month.acceptedCost/1000).toFixed(1)+"K")}
                              </div>
                            </div>
                            <div className={`${showProjectCostActuals?"w-2/3 mx-1":"w-0 opacity-0"} relative flex flex-col rounded-t-xl border-t-4 border-gray-900 bg-green-400 transition-all duration-500 ease-in-out`} style={{height:`${month.marketCost/maxMonthlyCost*100}%`}}>
                              <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900' style={{transform:"translate(0%,calc(-100% - 1rem)", fontSize:"0.4rem"}}>
                              {showProjectCostActuals&&String("$"+Number.parseFloat(month.realizedCost/1000).toFixed(1)+"K")}
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
              {false && showInitiativeCostChart&&maxInitiativeCost?(
                <div className='relative flex flex-col h-full w-full items-center justify-start' style={{zIndex:60}}>
                  {initiatives&&Object.values(initiatives).map((i,initiativeIndex)=>{

                    return(
                      <div key={initiativeIndex} className={`flex flex-row flex-1 py-1 w-full items-center justify-start`} style={{zIndex:60}}>
                        <div className={`flex flex-row h-full items-center justify-end rounded-r-full border-r-4 ${i.currentPhase?"bg-sky-400 border-gray-900":"bg-gray-900 border-sky-400"} transition-all duration-500 ease-in-out`} style={{width:`${30}%`}}>
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
                        {String("+$"+Number.parseFloat(initiatives[activeInitiativeID].acceptedCost/1000).toFixed(1)+"K")}
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
                  <div className='flex flex-col h-full items-end justify-start' style={{width:`${27.5}%`,}}>
                    <div className='flex flex-col h-full w-full bg-black rounded-l-sm' style={{opacity:"20%"}}>
                    </div>
                  </div>
                  {[0].map((entry,index)=>{
                    let width=27.5;

                    if(activeInitiativeID){
                      width=initiatives[activeInitiativeID].offset;
                    }

                    return(
                      <div key={index} className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-start'>
                        <div className='relative flex flex-row h-full transition-all duration-3000 ease-in-out' style={{width:`${width}%`}}>
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
              <div className='flex flex-row items-center justify-between border-white text-left' style={{width:"100%"}}>
              {String("11 Clinton Lane Project Timeline")}

              {showCostInTitle?(
                <div className='flex flex-row items-center justify-end text-left rounded-xl text-black text-4xl' onClick={()=>setShowProjectCostActuals((showProjectCostActuals)=>!showProjectCostActuals)}>
                  <span className='text-green-800'>
                  <LightNumber
                      value={(cumulativeCost)}
                      config={{
                        size:"xl",
                        prefix:"$$",
                        suffix:"",
                        standardColor:"#ffffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false,
                        includeDateNum:false,
                      }}
                    />
                  </span> 
                  / 
                  <span className='text-black'>
                  <LightNumber
                      value={(projectCost)}
                      config={{
                        size:"xl",
                        prefix:"$",
                        suffix:"",
                        standardColor:"#ffffff",
                        decimals:1,
                        bold:true,
                        centerText:true,
                        signed:false,
                        isTimestamp:false,
                        includeDateNum:false,
                      }}
                    />
                  </span>
                </div>
              ):(
                <div className='hidden'/>
              )}
              </div>
            </div>
            {/*Logo*/}
            <div className='absolute top-0 left-0 items-center justify-center' onClick={()=>{if(showInitiativeCostChart){setShowInitiativeCostChart(false); setShowProjectCost(false); setActiveInitiativeID(null); setShowInitiativeDetails(false);}else{setShowProjectCost((showProjectCost)=>!showProjectCost); setActiveInitiativeID(null); setShowInitiativeDetails(false);}}} style={{zIndex:60,transform:"translate(calc(-100% - 1.2rem),calc(-100% - 2.0rem))"}}>
              <img className="inline-block h-20 w-20 flex-shrink-0 rounded-sm" src={"./photos/punchlistLogo.png"} alt="Location Icon"/>
            </div>
            {/*Legend*/}
            <div className='absolute bottom-0 left-0 flex flex-row w-full items-center justify-center' style={{transform:"translate(0%,calc(100% + 1rem))"}}>
              <div className='flex flex-wrap h-16 w-full px-4 items-center justify-center rounded-full'>
                {!showProjectCostActuals&&TIMELINE_COLORS.map((color,colorIndex)=>{
                  return(
                    <div key={colorIndex} className='flex flex-row items-center mx-2 justify-center text-sm font-bold text-white'>
                      <div className='flex flex-col h-3 w-3 mx-2 rounded-full' style={{backgroundColor:color.color}}>
                      </div>
                      <div className='flex flex-col text-xs font-bold text-gray-800'>
                        {String(color.description)}
                      </div>
                    </div>
                  )
                })}
                {showProjectCostActuals&&COST_CHART_COLORS.map((color,colorIndex)=>{
                  return(
                    <div key={colorIndex} className='flex flex-row items-center mx-2 justify-center text-sm font-bold text-white'>
                      <div className='flex flex-col h-3 w-3 mx-2 rounded-full' style={{backgroundColor:color.color}}>
                      </div>
                      <div className='flex flex-col text-xs font-bold text-gray-800'>
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
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Bens Manual Uploader*/}
      {accessGranted&&adminAccess?(
        <div className='flex flex-col shrink-0 h-screen w-full items-center justify-start'>
          <div className='relative flex flex-col h-4/5 w-4/5'>
            <div className='flex flex-col h-full w-full px-2 py-4 border-b-2 border-black overflow-y-scroll'>
            {initiatives&&Object.values(initiatives).map((initiative,initiativeIndex)=>{
              return(
                <div key={initiativeIndex} className={`relative flex flex-row p-2 w-full items-center justify-start rounded-sm ${initiativeIndex%2===0?"bg-gray-300":""} ${showDeleteInitiatives?"my-1":"my-0"} transition-all duration-500-ease-in-out`} onClick={()=>{if(event.target.id!=="deleteButton"){setActiveInitiative(initiative)}}}>
                  <div className='flex flex-row w-3/5 items-center justify-start text-xs xl:text-xl font-bold text-gray-800'>
                  {String(initiative.description)}
                  </div>

                  <div className='flex flex-row w-20 xl:w-36 items-center justify-start text-xs xl:text-xl font-bold text-gray-800'>
                  {String(initiative.startDate)}
                  </div>

                  <div className='flex flex-row w-20 xl:w-36 items-center justify-start text-xs xl:text-xl font-bold text-gray-800'>
                   {String(initiative.endDate)}
                  </div>

                  <div className='flex flex-row h-full w-16 xl:flex-1 items-center justify-end text-xs xl:text-xl font-bold text-gray-800'>
                  {String("$"+Number.parseFloat(initiative.acceptedCost/1000).toFixed(1)+"K")}
                  </div>

                  {/*Delete Button*/}
                  <div id={"deleteButtonParent"} className='absolute top-0 right-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out' style={{opacity:showDeleteInitiatives?"100%":"0%",transform:"translate(25%,-25%)"}}>
                    <div id={"deleteButton"} className={`flex flex-col ${showDeleteInitiatives?"h-4 w-4":"h-0 w-0"} items-center justify-center text-sm text-gray-200 font-normal rounded-full bg-gray-500 hover:bg-gray-300 transtion-all duration-500 ease-in-out`} onClick={()=>deleteInitiative(initiatives,initiative.id)}>
                    {showDeleteInitiatives&&String("x")}
                    </div>
                  </div>

                </div>
              )
            })}
            </div>

            {/*Show Edit Initiative*/}
            <div className={`absolute bottom-0 left-0 flex flex-col items-center justify-center w-full ${activeInitiative?"h-full":"h-0"} transition-all duration-500 ease-in-out`}>
              {activeInitiative?(
                <div className='relative flex flex-col h-full w-full items-center justify-center'>
                  <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
                    <div className='flex flex-col p-2 items-center justify-start rounded-xl border-4 border-c2 bg-white z-50' style={{height:"36rem", width:"23rem"}}>
                      {/*Description*/}
                      <div className='flex flex-col w-full pt-8 items-center justify-center text-lg font-bold' onClick={()=>setEditActiveInitiativeDescription(true)}> 
                        {editActiveInitiativeDescription?(
                          <input
                            type='text'
                            onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"DESCRIPTION",event.target.value,)}}
                            className={`w-full px-0 py-0 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                            style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                            placeholder={"Initiative Description"}
                            value={activeInitiative.description}
                            onBlur={()=>setEditActiveInitiativeDescription(false)}
                          />
                        ):(
                          <div className='w-full px-0 py-0 text-xl font-bold text-center'>
                            {String(activeInitiative.description)}
                          </div>
                        )}
                      </div>

                      {/*Space*/}
                      <div className='flex flex-col w-full mt-4 items-center justify-center'>
                        <div className='rounded-full bg-gray-900 w-1/2' style={{height:"0.15rem"}}>
                        </div>
                      </div>

                      {/*Dates*/}
                      <div className='flex flex-row h-48 w-full items-center justify-between'>
                        <div className='flex flex-col w-full items-center justify-between text-lg font-bold'> 
                          <div className='flex flex-row h-full items-center justify-start text-xl'>
                          {String("Start Date")}
                          </div>
                          <div className='flex flex-col h-full mt-2 items-center justify-end'  onClick={()=>setEditActiveInitiativeStartDate(true)}>
                            {editActiveInitiativeStartDate?(
                              <input
                                autoFocus
                                type='text'
                                onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"START_DATE",event.target.value,)}}
                                className={`w-full px-0 py-4 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                                style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                                placeholder={"100000.00"}
                                value={activeInitiative.startDate}
                                onBlur={()=>setEditActiveInitiativeStartDate(false)}
                              />
                            ):(
                              <div className='w-full px-4 py-4 text-xl font-bold text-center bg-gray-200 rounded-lg'>
                                {String(activeInitiative.startDate)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='flex flex-col w-full items-center justify-between text-lg font-bold'> 
                          <div className='flex flex-row h-full items-center justify-start text-xl'>
                          {String("End Date")}
                          </div>
                          <div className='flex flex-col h-full mt-2 items-center justify-end'  onClick={()=>setEditActiveInitiativeEndDate(true)}>
                            {editActiveInitiativeEndDate?(
                              <input
                                autoFocus
                                type='text'
                                onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"END_DATE",event.target.value,)}}
                                className={`w-full px-0 py-4 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                                style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                                placeholder={"100000.00"}
                                value={activeInitiative.endDate}
                                onBlur={()=>setEditActiveInitiativeEndDate(false)}
                              />
                            ):(
                              <div className='w-full px-4 py-4 text-xl font-bold text-center bg-gray-200 rounded-lg'>
                                {String(activeInitiative.endDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-col w-full my-4 items-center justify-center'>
                        <div className='rounded-full bg-gray-900 w-full' style={{height:"0.05rem"}}>
                        </div>
                      </div>

                      {/*Costs*/}
                      <div className='flex flex-col px-4 h-72 w-full items-center justify-between'>
                        <div className='flex flex-row w-full my-1 items-center justify-between text-lg font-bold'> 
                          <div className='flex flex-row text-xl h-full items-center justify-start'>
                          {String("Accepted Cost")}
                          </div>
                          <div className='flex flex-col h-full pt-2 items-center justify-end' onClick={()=>setEditActiveInitiativeAcceptedCost(true)}>
                            {editActiveInitiativeAcceptedCost?(
                              <input
                                autoFocus
                                type='text'
                                onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"ACCEPTED_COST",event.target.value,)}}
                                className={`w-full px-0 py-4 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                                style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                                placeholder={"100000.00"}
                                value={activeInitiative.acceptedCost}
                                onBlur={()=>setEditActiveInitiativeAcceptedCost(false)}
                              />
                            ):(
                              <div className='w-full px-4 py-4 text-xl font-bold text-center rounded-lg bg-gray-200'>
                                {String(activeInitiative.acceptedCost)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='flex flex-col w-full mt-4 items-center justify-center'>
                        <div className='rounded-full bg-gray-900 w-full' style={{height:"0.05rem"}}>
                        </div>
                        </div>

                        <div className='flex flex-row w-full my-1 items-center justify-between text-lg font-bold'> 
                          <div className='flex flex-row text-xl h-full items-center justify-start'>
                          {String("Market Cost")}
                          </div>
                          <div className='flex flex-col h-full pt-2 items-center justify-end' onClick={()=>setEditActiveInitiativeMarketCost(true)}>
                            {editActiveInitiativeMarketCost?(
                              <input
                                autoFocus
                                type='text'
                                onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"MARKET_COST",event.target.value,)}}
                                className={`w-full px-0 py-4 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                                style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                                placeholder={"100000.00"}
                                value={activeInitiative.marketCost}
                                onBlur={()=>setEditActiveInitiativeMarketCost(false)}
                              />
                            ):(
                              <div className='w-full px-4 py-4 text-xl font-bold text-center rounded-lg bg-gray-200'>
                                {String(activeInitiative.marketCost)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='flex flex-col w-full mt-4 items-center justify-center'>
                          <div className='rounded-full bg-gray-900 w-full' style={{height:"0.05rem"}}>
                          </div>
                        </div>

                        <div className='flex flex-row w-full my-1 items-center justify-between text-lg font-bold'> 
                          <div className='flex flex-row text-xl h-full items-center justify-start'>
                          {String("Realized Cost")}
                          </div>
                          <div className='flex flex-col h-full pt-2 items-center justify-end' onClick={()=>setEditActiveInitiativeRealizedCost(true)}>
                            {editActiveInitiativeRealizedCost?(
                              <input
                                autoFocus
                                type='text'
                                onChange={(event)=>{updateInitiative(initiatives,activeInitiative.id,"REALIZED_COST",event.target.value,)}}
                                className={`w-full px-0 py-4 text-xl font-bold text-center rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
                                style={{resize:'vertical', backgroundColor:`#ffffff`,}}
                                placeholder={"100000.00"}
                                value={activeInitiative.realizedCost}
                                onBlur={()=>setEditActiveInitiativeRealizedCost(false)}
                              />
                            ):(
                              <div className='w-full px-4 py-4 text-xl font-bold text-center rounded-lg bg-gray-200'>
                                {String(activeInitiative.realizedCost)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Shade*/}
                  <div className='absolute top-0 left-0 flex flex-col h-full w-full bg-white opacity-90' onClick={()=>{setActiveInitiative(null)}}>
                  </div>
                </div>
              ):(
                <div className='hidden'/>
              )}
            </div>

            {/*Buttons*/}
            <div className='absolute bottom-0 left-0 flex flex-row h-12 w-full items-center justify-around' style={{transform:"translate(0%,calc(100% + 1rem))"}}>
              <div className='flex flex-col h-10 w-10 items-center justify-center border-b-4 border-t-4 rounded-xl border-black' onClick={()=>setShowDeleteInitiatives((showDeleteInitiatives)=>!showDeleteInitiatives)}>
                {String ("=")}
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='hidden'/>
      )}

      {/*Photos*/}
      {accessGranted?(
        <div className='flex flex-col w-full h-screen shrink-0 items-center justify-center bg-black'>
          <div className='flex flex-row my-2 h-full w-full items-center justify-around'>
          {[0,0].map((entry,index)=>{

            return(
              <div key={index} className='relative flex flex-col flex-1 mx-4 px-2 items-center justify-end pb-8 rounded-lg border-2 border-c2-highlight' style={{height:"100%"}}>
                <div className='absolute top-0 left-0 h-full w-full items-center justfiy-center'>
                  <img className="inline-block h-full w-full shrink-0 rounded-sm" src={"./photos/homePhoto.jpg"} alt="Location Icon"/>
                </div>

                <div className='absolute bottom-0 left-0 flex flex-col px-8 pb-2 h-full w-full items-center justify-end'>
                  <div className='flex flex-col w-full items-center justify-end'>
                    <div className='px-4 py-2 text-sm font-bold text-white bg-gray-600 rounded-xl'>
                    {String("Before and After Coming Soon!")}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
           <div className='flex flex-row my-2 h-full w-full items-center justify-around'>
          {[0,0].map((entry,index)=>{

            return(
              <div key={index} className='relative flex flex-col flex-1 mx-4 px-2 items-center justify-end pb-8 rounded-lg border-2 border-c2-highlight' style={{height:"100%"}}>
                <div className='absolute top-0 left-0 h-full w-full items-center justfiy-center'>
                  <img className="inline-block h-full w-full shrink-0 rounded-sm" src={"./photos/homePhoto.jpg"} alt="Location Icon"/>
                </div>

                <div className='absolute bottom-0 left-0 flex flex-col px-8 pb-2 h-full w-full items-center justify-end'>
                  <div className='flex flex-col w-full items-center justify-end'>
                    <div className='px-4 py-2 text-sm font-bold text-white bg-gray-600 rounded-xl'>
                    {String("Before and After Coming Soon!")}
                    </div>
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

//String value
const LightNumber= (props) => {
  const MONTH_NAMES={
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
  };
  const PERCENTILE_SUFFIXES={
    '0':'th',
    '1':'st',
    '2':'nd',
    '3':'rd',
    '4':'th',
    '5':'th',
    '6':'th',
    '7':'th',
    '8':'th',
    '9':'th',
  }
  const MILLISECONDS_PER_HOUR=216000

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
  }else if(props.config.isTimestampDelta){

    //Total Time - Floor Hours = Minutes
    //Total Minutes - Floor Minutes = Seconds
    let delta=props.value;
    let hours=Math.floor(delta/216000);
    let minutes=Math.floor((delta-hours*216000)/3600);
    let seconds=(delta-hours*216000-minutes*3600)/60;
    let hourString=hours<10?"0"+hours:hours;
    let timeString=String(hourString+":"+minutes+"."+seconds.toFixed(0));

    //Format the string as nice hours and minutes
    return timeString;
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
      suffix=PERCENTILE_SUFFIXES[lastDigit];
    }


    //Reappend meters to suffix
    if(props.config.suffix==='m'&&value!==0){
      suffix=String(suffix+"m");
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

export default LightProjectTimeline;