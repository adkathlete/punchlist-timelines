import React from "react";
import {useState,useEffect} from 'react';

const Contact = (props)=>{
  //---------------------------------STATE--------------------------------------
  const PLACEHOLDERS={
    'ENTERPRISE_SALE':"Describe your use case and provide details about your timeline, budget, and team size and we'll be in touch!",
    'CUSTOM':"Want us to build you something bespoke? Describe your use case and provide details about your timeline and budget and we'll be in touch!",
    'ENTERPRISE_VALUE_ASSURANCE':"Light makes it easy to validate your current IT stack is working as intended, and provides same day audits for all core KPIs -- dates, category aggregates, event logs, and more. We can validate your data to make sure that nothing fell through the cracks, and the data you use in your business accurately represents the state of your business. We'd be happy to kick the tires with you to make sure that your digital transformation actually delivered its promised value.",
    'SUGGESTION':"Let us know what you'd like to see and we'll add it to our roadmap!",
    'BUG':"Let us know what isn't working, and we'll add it to our roadmap. The more details you can provide about your data types, as well as when and where in the app it happens, the faster we can fix it.",
    'AUTH':"Let us know how you would like to log in or authenticate",
    'QUESTION':"Whats on your mind? We'll do our best to respond within a business day.",
    'JOB_APPLICATION':"Describe how you'd like to contribute to our business and we'll be in touch!",
  }
  const [email,setEmail] = useState();
  const [category,setCategory] = useState ('ENTERPRISE_SALE');
  const [budget,setBudget] = useState ('$25k');
  const [teamSize,setTeamSize] = useState ('$25k');
  const [bugFixType,setBugFixType] = useState ('DEMO');
  const [message,setMessage] = useState ("");

  const [showEnterpriseOptions,setShowEnterpriseOptions]=useState(true);
  const [showBugFix,setShowBugFix]=useState(false);

  const [prepSubmit,setPrepSubmit]=useState(false);

  //---------------------------------EFFECTS------------------------------------
  //------------------------------EVENT HANDLERS--------------------------------
  const handleFormSubmit=(event)=> {
    console.log(event);
    updateSessionWithActionID(props.session,props.actionTags['POST_MESSAGE'],null);

    //If you have a valid email, and a message that is not empty, then submit your contact
    try{
      if(!!email && validEmailAddress(email)===true && !!message){
        console.log('Sending new message');
        let enterpriseBudget=category==='ENTERPRISE_SALE'||category==='CUSTOM'||category==='ENTERPRISE_VALUE_ASSURANCE'?budget:null;
        let enterpriseTeamSize=category==='ENTERPRISE_SALE'||category==='CUSTOM'||category==='ENTERPRISE_VALUE_ASSURANCE'?teamSize:null;
        let activeBugFixType=category==='BUG'?bugFixType:null;
        console.log({status:"Posting Message With Props", budget:enterpriseBudget, teamsize:enterpriseTeamSize, bugFixType:activeBugFixType});
        props.onNewMessage(email,category,message,enterpriseBudget,enterpriseTeamSize,activeBugFixType);
        setMessage("");
      }else{
        console.log('You need a valid email and message before we can be in touch')
        props.onNewMessage(null,category,message);
      }
    }catch(err){
      console.log({status:"Error", message:"Sorry, we had an issue sending your message, please try again later. ", error: err})
    }
  }

  //Super basic validation -- lets make sure that it has an @ in the name
  const validEmailAddress = (email) => {
    if(email.includes('@')){
      return true
    }else{
      return false
    }
  }

  //Callback for email input change event
  const handleEmailChange = (event) => {
    try{

      console.log(event)
      setEmail(String(event.target.value));

    }catch(err){
      console.log(err);
    }
  }

  //Callback for category change event
  const handleCategoryChange = (event) =>{
    //Update the category
    let newCategory=event.target.value;

    //Update enterprise options UI
    let timer;
    if(newCategory==='ENTERPRISE_SALE'||newCategory==='CUSTOM'||newCategory==='ENTERPRISE_VALUE_ASSURANCE'){
      setCategory(newCategory);
      setShowBugFix(false);
      timer=setTimeout(()=>setShowEnterpriseOptions(true), 100);
    }else if(newCategory==='BUG'){
      setCategory(newCategory);
      setShowEnterpriseOptions(false);
      timer=setTimeout(()=>setShowBugFix(true), 100);
    }else{
      setShowEnterpriseOptions(false);
      setShowBugFix(false);
      timer=setTimeout(()=>setCategory(newCategory), 800);
    }
    return ()=>clearInterval(timer);
  }

  //Callback for category change event
  const handleBudgetChange = (event) =>{
    console.log(event.target.value)
    setBudget(event.target.value);
  }

  //Callback for category change event
  const handleTeamSizeChange = (event) =>{
    console.log(event.target.value);
    setTeamSize(event.target.value);
  }

  //Callback for category change event
  const handleBugFix = (event) =>{
    console.log(event.target.value)
    setBugFixType(event.target.value);
  }

  //Cast the entry as a string to make sure that only strings can be entered as messages
  //Remember little bobby drop tables XKCD
  const handleMessageChange = (event) => {
    console.log(event.target.value)
    setMessage(String(event.target.value));
  }

  //------------------------------Session State---------------------------------
  //Session: Update the routes, entry path, and append Add / Channel redirect params if present
  useEffect(()=>{
    let updateRoutes=props.session&&(props.session.routes.length===0 || props.session.routes[props.session.routes.length-1]!=='CONTACT');

    if(updateRoutes){
      //Modify the session
      let newSession={...props.session};
      newSession.routes.push('CONTACT');

      //Update the entry path if it is null
      if(newSession.entryPath===''){
        newSession.entryPath='CONTACT';
      }

      //Save the session
      props.onUpdateSession(newSession);
    }

  },[props.session]);

  //Session:Update the session with the new action
  const updateSessionWithActionID=(session,actionTag,lightGranularityID,)=>{
    //Clone the session
    let newSession={...session};

    //Create the action tag from the props object
    let newAction={...actionTag};
    newAction.lightGranularityID=lightGranularityID;
    newAction.timestamp=Date.now();

    //Add the action tag
    newSession.actionLog.push(newAction);

    //Update the session state via callback
    props.onUpdateSession(newSession);
  }

  //---------------------------------STYLES-------------------------------------

  //---------------------------------COMPONENT----------------------------------
  return(
    <div className="relative flex flex-col h-screen w-full items-center justify-start bg-blackrounded-md overflow-hidden pb-2">
      <div className="flex flex-col h-full w-5/6 items-center justify-start relative max-w-xl mx-auto" style={{zIndex:5}}>
        {/*Titles*/}
        <div className="text-center mt-4 sm:mt-20">
          <h2 className="text-6xl sm:text-7xl font-extrabold text-c1">
            Get in touch
          </h2>
          <p className="mt-2 sm:mt-4 text-xl sm:text-2xl leading-6 text-shades">
            We'd love to hear from you -- drop us a note and we'd be glad to connect!
          </p>
        </div>

        {/*Form Tile*/}
        <div className="flex flex-col w-full flex-1 items-center justify-center py-4" style={{zIndex:5}}>
          <div className="flex flex-col w-full items-center justify-center py-2 sm:py-4 px-4 border-2 border-c1 rounded-2xl bg-black transition-all duration-1000 ease-in-out" style={{maxWidth:"32rem",minHeight:"34rem"}}>
            {/*Form Elements*/}
            <div className='flex flex-col flex-1 w-full items-center justify-around transition-all duration-500 ease-in-out transition-all duration-1000 ease-in-out'>
              {/*Email*/}
              <div className="flex flex-col w-full items-start justify-start sm:col-span-2">
                <label htmlFor="email" className="block text-lg font-bold text-c1">Email</label>
                <div className="w-full mt-1">
                  <input id="email" onChange={handleEmailChange} placeholder="email@example.com" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full bg-gray-900 text-white outline-none border-none sm:text-sm rounded-md focus:ring-2 focus:ring-c1"/>
                </div>
              </div>
              {/*Category Triage*/}
              <div className="flex flex-col w-full items-start justify-start pt-2 sm:py-4 sm:col-span-2">
              <label htmlFor="category" className="block text-lg font-bold text-c1">Category</label>
                <select id="category" name="category" onChange= {handleCategoryChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-500 outline-none border-none focus:outline-none focus:ring-2 focus:ring-c1 sm:text-sm rounded-md">
                  <option value='ENTERPRISE_SALE'>I'm want Light for my team or business</option>
                  <option value='CUSTOM'>I want a custom solution</option>
                  <option value='ENTERPRISE_VALUE_ASSURANCE'>I'm want to Lightproof my IT Stack</option>
                  <option value='BUG'>I found a bug</option>
                  <option value='SUGGESTION'>I have a feature request / use case</option>
                  <option value='AUTH'>I want to login with a different provider</option>
                  <option value='QUESTION'>I have a question</option>
                  <option value='JOB_APPLICATION'>I want to work with Light</option>
                </select>
              </div>
              {/*Budget Selection*/}
              {category==='ENTERPRISE_SALE'||category==='CUSTOM' || category==='ENTERPRISE_VALUE_ASSURANCE'?(
                <div className="flex flex-col w-full items-start justify-start pt-2 sm:py-4 sm:col-span-2 transition-all duration-1000 ease-in-out" style={{opacity:showEnterpriseOptions?"100%":"0%", height:showEnterpriseOptions?"100%":"0%"}}>
                  <label htmlFor="budget" className="block text-lg font-bold text-c1">Budget</label>
                    <select id="budget" name="budget" onChange={handleBudgetChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-500 outline-none border-none focus:outline-none focus:ring-2 focus:ring-c1 sm:text-sm rounded-md">
                      <option value='<$5k'>{'<$5k'}</option>
                      <option value='$5k'>$5k</option>
                      <option value='$10k'>$10k</option>
                      <option value='$15k'>$15k</option>
                      <option value='$25k'>$25k</option>
                      <option value='$50k+'>$50k+</option>
                    </select>
                </div>
              ):(
                <div className='hidden'/>
              )}
              {/*Team Size Selection*/}
              {category==='ENTERPRISE_SALE'||category==='CUSTOM' || category==='ENTERPRISE_VALUE_ASSURANCE'?(
                <div className="flex flex-col w-full items-start justify-start pt-2 sm:py-4 sm:col-span-2 transition-all duration-1000 ease-in-out" style={{opacity:showEnterpriseOptions?"100%":"0%", height:showEnterpriseOptions?"100%":"0%"}}>
                  <label htmlFor="teamSize" className="block text-lg font-bold text-c1">Team Size</label>
                    <select id="teamSize" name="teamSize" onChange={handleTeamSizeChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-500 outline-none border-none focus:outline-none focus:ring-2 focus:ring-c1 sm:text-sm rounded-md">
                      <option value='<5'>{'<5'}</option>
                      <option value='10'>10</option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                      <option value='500'>500</option>
                      <option value='1000+'>1000+</option>
                    </select>
                </div>
              ):(
                <div className='hidden'/>
              )}
              {/*Team Size Selection*/}
              {category==='BUG'?(
                <div className="flex flex-col w-full items-start justify-start pt-2 sm:py-4 sm:col-span-2 transition-all duration-1000 ease-in-out" style={{opacity:showBugFix?"100%":"0%", height:showBugFix?"100%":"0%"}}>
                  <label htmlFor="bugfix" className="block text-lg font-bold text-c1">Bug Type</label>
                    <select id="bugfix" name="bugfix" onChange={handleBugFix} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-900 text-gray-500 outline-none border-none focus:outline-none focus:ring-2 focus:ring-c1 sm:text-sm rounded-md">
                      <option value='DEMO'>Demo</option>
                      <option value='PAYMENT'>Membership</option>
                      <option value='AUTH'>Authentication</option>
                      <option value='LIGHTS'>My Lights</option>
                      <option value='DATA'>Data Type</option>
                      <option value='CATEGORY'>Category Creation</option>
                      <option value='TIME_SERIES_VALUE_PATTERN'>Cumulative Time Series Value Patterns (*i|i*) </option>
                      <option value='X|Y_SCATTER_PLOT'>X|Y Scatter Plot [|_+_|]</option>
                      <option value='A[b]'>Segment Time Horizon Overview [i]</option>
                      <option value='SEGMENT_OVERVIEW'>Segment Timespan Comparison [o|o|o|o]</option>
                      <option value='POP_SEGMENT_OVERVIEW'>POP Segment Overview 📊</option>
                      <option value='HISTOGRAM'>Historgram</option>
                      <option value='LIGHT_SABERS'>Timespan Value Distribution |[-]|</option>
                      <option value='EVENT_STREAM'>Event Stream Chart [+][iiiiii][V]</option>
                      <option value='PHOTON_CHART'>Photon Chart [oo|ooooo|*****]</option>
                      <option value='VALUE_PATTERN'>Value Range Filter [I]</option>
                      <option value='SETTINGS'>Settings</option>
                      <option value='LIGHTSTREAM'>Light Presentation Snapshots</option>
                      <option value='OTHER'>Other Bug Type</option>
                    </select>
                </div>
              ):(
                <div className='hidden'/>
              )}
              {/*Text Area*/}
              <div className="flex flex-col w-full items-start justify-start pt-2 sm:py-4 sm:col-span-2">
                <label htmlFor="message" className="block text-lg font-bold text-c1">Message</label>
                <div className="w-full mt-1">
                  <textarea id="message" value={message} name="message" onChange={handleMessageChange} placeholder={PLACEHOLDERS[category]} rows="4" className="py-3 px-4 block w-full text-white bg-gray-900 focus:outline-none outline-none border-none focus:ring-2 focus:ring-c1 sm:text-sm rounded-md"></textarea>
                </div>
              </div>
            </div>

            {/*Form Button*/}
            <div className='flex flex-col h-20 w-full items-center justify-center'>
              <button className={`flex flex-col w-full items-center justify-center rounded-full py-3 font-medium text-2xl border-2 border-c1 ${props.isMobile||prepSubmit?"text-white bg-c1":"bg-black text-c1"} transition-all duration-500 ease-in-out`} style={{transform:prepSubmit?"translate(0%,-4px)":"translate(0%,0%)"}} onMouseEnter={()=>setPrepSubmit(true)} onMouseLeave={()=>setPrepSubmit(false)} onClick={handleFormSubmit} >
                Let's talk
              </button>
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


export default Contact;
