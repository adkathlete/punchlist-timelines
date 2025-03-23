import React from 'react';
import {useState, useEffect} from 'react';

//Import Data Loaders
import XLSX from 'xlsx/xlsx.js';

//Light Project Timeline
const LightProjectTimeline=()=>{

  const ACCESS_CODE=8757;

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

  const [initiatives,setInitiatives]=useState();
  const [months,setMonths]=useState();
  const [projectCost,setProjectCost]=useState(0);
  const [cumulativeCost,setCumulativeCost]=useState(0);
  const [maxInitiativeCost,setMaxInitiativeCost]=useState(null);
  const [activeInitiativeID,setActiveInitiativeID]=useState(null);
  const [showProjectCost ,setShowProjectCost ]=useState(false);
  const [showCostInTitle,setShowCostInTitle]=useState(true);
  const [showCumulativeCost,setShowCumulativeCost]=useState(false);
  const [showInitiativeDetails,setShowInitiativeDetails]=useState(false);
  const [showInitiativeCostChart,setShowInitiativeCostChart]=useState(false);

  const [authenticate,setAuthenticate]=useState(true);
  const [accessGranted,setAccessGranted]=useState(false);
  const [punchlistClientID,setPunchlistClientID]=useState(null);

  useEffect(()=>{
    loadPunchlist();
  },[])

  useEffect(()=>{
    if(initiatives){
      initializeMonths(initiatives);
    }
  },[initiatives]);

  //Load the Punchlist from ./punchlists/punchlist.xlsx [Data]
  const loadPunchlist=async ()=>{
    //Initialize headders for the csv file
    let HEADERS={
      'key':{id:"key", columnKey:"A", columnIndex:0,},
      'summary':{id:"summary", columnKey:"B", columnIndex:1,},
      'status':{id:"status", columnKey:"C", columnIndex:2,},
      'active':{id:"active", columnKey:"D", columnIndex:3,},
      'startDate':{id:"startDate", columnKey:"E", columnIndex:4,},
      'endDate':{id:"endDate", columnKey:"F", columnIndex:5,},
      'duration':{id:"duration", columnKey:"G", columnIndex:6,},
      'offset':{id:"offset", columnKey:"H", columnIndex:7,},
      'initiativeCost':{id:"initiativeCost", columnKey:"I", columnIndex:9,},
      'color':{id:"color", columnKey:"J", columnIndex:10,},
      'colorIndex':{id:"colorIndex", columnKey:"K", columnIndex:11,},
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
        startDate:String(sheet[columns[HEADERS.startDate.columnKey].keys[i]].w),
        endDate:String(sheet[columns[HEADERS.endDate.columnKey].keys[i]].w),
        duration:Number.parseInt(sheet[columns[HEADERS.duration.columnKey].keys[i]].v),
        offset:Number.parseInt(sheet[columns[HEADERS.offset.columnKey].keys[i]].v),
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
      i.offset=(i.offset+2)/365*100
    });

    //Update the state
    console.log({status:"Punchlist: Loaded Initiatives", initiativeCount:Object.keys(newInitiatives).length});
    console.log(Object.values(newInitiatives)[0]);
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
    <div className='relative flex flex-col h-full w-full items-center justify-end pb-24'>
      <div className='relative flex flex-col items-center justify-start rounded-lg border-2 border-gray-900 z-50' style={{width:"70%", height:"87%"}}>
        {/*Core timeline*/}
        {initiatives&&Object.values(initiatives).map((entry,index)=>{
          return(
            <div key={index} className={`relative flex flex-row w-full py-0.5 items-center justify-start ${entry.colorIndex===3?" border-black bg-gray-200":""} ${entry.active?"bg-sky-100":""} ${activeInitiativeID===entry.id?"shrink-0 h-6 bg-green-200":"flex-1"} z-50 transition-all duration-500 ease-in-out`}>
            {/*Initiative Name*/}
            <div className={`absolute top-0 left-0 h-full flex flex-row items-start justify-end ${entry.colorIndex===0||entry.colorIndex===3?"font-extrabold":""} ${entry.active?"text-sky-600 font-extrabold":""} ${entry.status==="Done"?"italic":""} transition-all duration-500 ease-in-out`} onMouseEnter={()=>showInitiativeDetails&&setActiveInitiativeID(entry.id)} style={{transform:"translate(calc(-100% - 1rem),0%)", width:"16rem",fontSize:activeInitiativeID===entry.id?"0.9rem":"0.5rem"}}>
            {String(entry.description)}
            </div>
            {/*Initiative Name*/}
            <div className={`absolute top-0 right-0 h-full flex flex-col items-end justify-center text-right ${entry.colorIndex===0||entry.colorIndex===3?"font-extrabold":""} ${entry.active?"text-sky-600 font-extrabold":""} ${entry.status==="Done"?"italic":""} transition-all duration-500 ease-in-out`} onMouseEnter={()=>showInitiativeDetails&&setActiveInitiativeID(entry.id)} style={{transform:"translate(calc(100% + 1rem),0%)", fontSize:activeInitiativeID===entry.id?"0.9rem":"0.5rem"}}>
            {showInitiativeCostChart?String("$"+Number.parseFloat(entry.initiativeCost/1000).toFixed(1)+"K"):String(entry.startDate+" - "+entry.endDate)}
            </div>
            <div className='flex flex-col h-full' style={{width:`${entry.offset}%`}}>
            </div>
            <div className={`flex flex-col h-full rounded-lg border-r-0 border-l-0 border-gray-900 z-50`} style={{width:`${entry.initiativeWidth}%`,minWidth:"10px",backgroundColor:TIMELINE_COLORS[entry.colorIndex].color}}>
            </div>
            </div>
          )
        })}

        {/*Cost Chart*/}
        <div className={`absolute bottom-0 left-0 flex flex-row ${showProjectCost||showInitiativeCostChart?"h-full":"h-0 opacity-0"} w-full items-center rounded-lg justify-center transition-all duration-1000 ease-in-out`} onClick={()=>{if(!showInitiativeCostChart){setShowInitiativeCostChart(true); setShowProjectCost(false)}else{setShowInitiativeCostChart(false); setShowProjectCost(true)}}} style={{zIndex:60}}>
          <div className='relative flex flex-row h-full w-full items-center justify-start rounded-lg' style={{zIndex:60}}>
          {/*Show Monthly Aggregate Costs*/}
          {showProjectCost?(
            <div className='relative flex flex-row h-full w-full pt-12 items-center justify-start rounded-lg' style={{zIndex:60}}>
              {projectCost&&months&&Object.values(months).map((month,monthIndex)=>{
                let maxMonthlyCost=Math.max(...Object.values(months).map(m=>m.totalCost));
                return(
                  <div key={monthIndex} className='flex flex-col h-full flex-1 items-center justify-end p-2' style={{zIndex:60}}>
                    {/*Monthly Bars*/}
                    {!showCumulativeCost?(
                      <div className={`relative flex flex-col w-2/3 rounded-t-xl ${month.active?"bg-sky-400 border-t-4 border-gray-900":"border-t-4 border-sky-400 bg-gray-900"}`} style={{height:`${month.totalCost/maxMonthlyCost*100}%`}}>
                        <div className='absolute top-0 left-0 w-full flex flex-col items-center justify-center font-bold text-gray-900 text-sm' style={{transform:"translate(0%,calc(-100% - 1rem)"}}>
                        {String("$"+Number.parseFloat(month.totalCost/1000).toFixed(1)+"K")}
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
                    <div className={`flex flex-row h-full items-center justify-end rounded-r-full border-r-4 ${i.active?"bg-sky-400 border-gray-900":"bg-gray-900 border-sky-400"} transition-all duration-500 ease-in-out`} style={{width:`${i.initiativeCost/maxInitiativeCost*100}%`}}>
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
                  <div className='absolute bottom-0 left-0 flex flex-col my-2 items-center justify-center text-gray-400' style={{fontSize:"0.7rem"}}>
                    {String(initiatives[activeInitiativeID].timeTo+" days")}
                  </div>
                  <div className='absolute bottom-0 right-0 flex flex-col my-2 items-center justify-center text-gray-400' style={{fontSize:"0.7rem"}}>
                    {String(Number.parseInt(Object.keys(initiatives).findIndex(i=>i===activeInitiativeID)+1))} / {String(Number.parseInt(Object.keys(initiatives).length))}
                  </div>
                </div>
              </div>
              
              <div className='flex flex-col h-full w-full bg-white' style={{opacity:"65%"}}>
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
          <div className='absolute top-0 left-0 flex flex-row h-full w-full items-center justify-start z-50' onClick={()=>{if(activeInitiativeID){setActiveInitiativeID(null); setShowInitiativeDetails(false)}else{setActiveInitiativeID(Object.keys(initiatives)[0]); setShowInitiativeDetails(true);}}}>
            <div className='relative flex flex-col h-full items-end justify-start' style={{width:"22.5%",}}>
              <div className='flex flex-col h-full w-full bg-black' style={{opacity:"20%"}}>
              </div>
              <div className='absolute top-0 right-0 flex flex-col h-3 w-3 border-2 border-green-400 bg-green-100 z-50' style={{transform:"translate(50%,calc(-50% - 1px)) rotate(45deg)"}}>
              </div>
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
        <div className='absolute top-0 right-0 items-center justify-center' onClick={()=>{if(showInitiativeCostChart){setShowInitiativeCostChart(false); setShowProjectCost(false)}else{setShowProjectCost((showProjectCost)=>!showProjectCost)}}} style={{zIndex:60,transform:"translate(calc(100% + 1rem),calc(-100% - 3rem))"}}>
          <img className="inline-block h-14 w-14 flex-shrink-0 rounded-sm transition-all delay-700 duration-1000 ease-in-out opacity-75" src={"./photos/punchlistLogo.png"} alt="Location Icon"/>
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
      </div>

      {/*LogIn*/}
      <div className={`absolute top-0 left-0 flex flex-col ${accessGranted||!authenticate?"h-0 opacity-0":"h-full"} w-full items-center justify-center transition-all duration-1000 ease-in-out`} style={{zIndex:100}}>
        <div className='relative flex flex-col h-full w-full items-center justify-center rounded-xl overflow-hidden'>
          <div className='flex flex-col h-full w-full bg-white' style={{opacity:"95%"}}>
          </div>
          {!accessGranted&&authenticate?(
            <div className='absolute top-0 left-0 flex flex-col h-full w-full items-center justify-center'>
              <div className='flex flex-col items-center justify-center rounded-xl shadow-lg bg-white border-2 border-gray-100' style={{height:"20rem", width:"20rem"}}>
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
            </div>
          ):(
            <div className='hidden'/>
          )}
        </div>
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
  )
}

export default LightProjectTimeline;