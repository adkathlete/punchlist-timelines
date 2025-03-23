//Import react and react components
import React from "react";
import {useState,useEffect,useLayoutEffect} from 'react';

//Initialize router and routes to be used
import {
  NavLink,
  useLocation
} from "react-router-dom";

const Sidebar = (props) =>{
  //---------------------------------STATE--------------------------------------
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFriendRequestCount, setShowFriendReqeustCount] = useState(false);
  const [showWorkflowCount, setShowWorkflowCount] = useState(false);
  const [activePath,setActivePath]=useState("");
  const [click,setClick]=useState(null);

  //Const routes for if user routes to team, terms, etc
  const ACTIVE_ROUTES = ['/insights','/mylights','/lights','/account',];

  //---------------------------------EFFECTS------------------------------------
  useEffect(()=>{
    if(showSidebar){
      let timer = setTimeout(()=>{
        setShowWorkflowCount(true);
        setShowFriendReqeustCount(true);
      },500);

      return clearInterval(timer);
    }
  },[showSidebar]);

  //Parse the location from the the react router pathname
  useLayoutEffect(()=>{
    setActivePath(location.pathname);
  },[location]);

  //Click the button
  useEffect(()=>{
    if(click){
      let timer=setTimeout(()=>setClick(null), 150);

      return ()=>clearInterval(timer);
    }
  },[click]);

  //------------------------------EVENT HANDLERS--------------------------------

  const toggleSidebar = ()=>{
    if(showSidebar===true){
      setShowWorkflowCount(false);
      setShowFriendReqeustCount(false);
    }

    setShowSidebar((showSidebar)=>!showSidebar);
  }

  //---------------------------------COMPONENT----------------------------------
  return (
    <div className={`absolute bottom-6 flex flex-row items-center transition-all ease-in duration-300 ${showSidebar?('z-50 w-full'):('z-10 w-36')}`} style={{opacity:ACTIVE_ROUTES.includes(activePath)||activePath.includes('lights')?'100%':'0%',maxWidth:"40rem"}}>
      <div className={`flex flex-row mx-2 justify-around items-center w-full h-16 rounded-full`}>
        <div className={`transition-all ease-in h-full ${showSidebar?("delay-100 duration-100 w-full"):("delay-200 duration-300 w-12")} flex flex-row justify-around items-center rounded-full`}>
          <div className={`transition-all ease-in ${showSidebar?("duration-300 delay-300 h-full bg-black border-l-4 border-r-4 border-c2-highlight"):("h-1 bg-c2-highlight")} flex flex-row w-full justify-around items-center rounded-2xl z-40`}>

            <NavLink to="/insights" className={`transition-all ease-in ${showSidebar?(`duration-200 delay-300 ${click==='insights'?"w-10 h-10":"w-12 h-12"} border-t-2 border-b-2 ${activePath==="/insights"?'border-c2-highlight text-c2-highlight':'text-shades-extralight border-gray-800'}`):activePath==="/insights"?`${click==='insights'?"w-10 h-10":"w-12 h-12"} border-b-2 border-t-2 border-gray-900 text-c2-highlight`:"w-0 h-0"} flex flex-col justify-center items-center bg-black rounded-xl shadow-xl hover:text-c2-highlight z-50`} onClick={()=>{toggleSidebar(); setClick('insights');}} style={{transform:click==='insights'?"rotate(1deg)":""}}>
              <svg className={`h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </NavLink>

            <NavLink to="/mylights" className={`relative transition-all ease-in ${showSidebar?(`duration-200 delay-300 ${click==='lights'?"w-10 h-10":"w-12 h-12"} border-t-2 border-b-2 ${activePath==="/mylights"||activePath==='/lights'?'border-c2-highlight text-c2-highlight':'text-shades-extralight border-gray-800'}`):(activePath==="/mylights"||activePath==='/lights')?`${click==='lights'?"w-10 h-10":"w-12 h-12"} border-b-2 border-t-2 border-gray-900 text-c2-highlight`:"w-0 h-0"} flex flex-col justify-center items-center bg-black rounded-xl shadow-xl hover:text-c2-highlight z-50`} onClick={(event)=>{toggleSidebar(); setClick('lights'); if(!showSidebar && activePath==='/lights'){event.preventDefault()};}} style={{transform:click==='lights'?"rotate(1deg)":""}}>
              <svg className={`h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
              </svg>
            </NavLink>

            <NavLink to="/account" className={`relative transition-all ease-in ${showSidebar?(`duration-200 delay-300 ${click==='account'?"w-10 h-10":"w-12 h-12"} border-t-2 border-b-2 ${activePath==="/account"?'border-c2-highlight text-c2-highlight':'text-shades-extralight border-gray-800'}`):activePath==="/account"?`${click==='account'?"w-10 h-10":"w-12 h-12"} border-b-2 border-t-2 border-gray-900 text-c2-highlight`:"w-0 h-0"} flex flex-col justify-center items-center bg-black rounded-xl shadow-xl hover:text-c2-highlight z-50`} onClick={()=>{toggleSidebar(); setClick('account');}} style={{transform:click==='account'?"rotate(1deg)":""}}>
              <svg className={`h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </NavLink>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
