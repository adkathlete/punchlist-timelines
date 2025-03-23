import React from "react";
import {useState, useEffect,} from 'react';

const Terms=(props)=>{

  //------------------------------Session State---------------------------------
  //Session: Update the routes, entry path, and append Add / Channel redirect params if present
  useEffect(()=>{
    let updateRoutes=props.session&&(props.session.routes.length===0 || props.session.routes[props.session.routes.length-1]!=='TERMS');

    if(updateRoutes){
      //Modify the session
      let newSession={...props.session};
      newSession.routes.push('TERMS');

      //Update the entry path if it is null
      if(newSession.entryPath===''){
        newSession.entryPath='TERMS';
      }

      //Save the session
      props.onUpdateSession(newSession);
    }

  },[props.session]);
  //---------------------------------STATE--------------------------------------
  //---------------------------------EFFECTS------------------------------------
  //------------------------------EVENT HANDLERS--------------------------------
  //---------------------------------STYLES-------------------------------------

  //---------------------------------COMPONENT----------------------------------
  return(
    <div className="relative flex flex-col h-screen w-full items-center justify-start sm:py-16 px-2 bg-black">
      <div className='flex flex-col items-center justify-start h-full w-full' style={{zIndex:5, maxWidth:"58rem"}}>
        <div className="text-center mx-2 ">
          <div className="text-5xl font-extrabold text-white py-4 px-4">Terms and Conditions</div>
          <div className="max-w-xl py-2 mx-auto text-2xl text-accent text-white">General Information</div>
        </div>
        <div className="flex flex-col flex-1 w-full px-2 mt-6 prose prose-lg text-shades overflow-y-scroll overflow-x-hidden">
          <div className='text-c2-highlight font-bold my-2'>Our Commitment to You</div>
          <div>
            Light - "The Product" - is provided by Starlight Platforms, Inc. to customers who want to see and think clearly, and share those thoughts with others. We promise to do our best to keep you, and your data safe, secure, and private. Saved lights are stored securely with Google, and can only be accessed by you.
          </div>
          <div className='text-c2-highlight font-bold my-2'>Payment</div>
          <div>
            All payments are processed exclusively via Stripe, over secure https connections, designed to keep your information safe and secure. Your payment data and credit card information is never stored, and is only used to activate your membership and hosted light subscriptions. Memberships are valid for the full annual (12 month) term in which payment was received, and may be canceled at any time. Canceled memberships remain valid for the duration of the annual term in which they were purchased.
          </div>
          <div className='text-c2-highlight font-bold my-2'>Hosted Lights</div>
          <div>
            Hosted Lights are provided by Starlight Platforms, Inc. to customers who want to share their lights with others. Your data is hosted with Google at https://usestarlight.com/lights/[YOUR_LIGHT_LINK] and can be accessed by anyone with your light's unique link. Hosted lights may be activated or deactivated at anytime, and payment, once applied covers the full Calendar Month Term in which it was received.
          </div>
          <div className='text-c2-highlight font-bold my-2'>Payment Terms</div>
          <div>
            Monthly payments for Memberships to Light, Light+, Hosted Light Subscriptions and other paid Light services received by Starlight Platforms, Inc. - "The Company" - will be applied to the full month term in which the payment was received. Subscriptions are automatically renewed at term end. Subscriptions may be cancled at any time, which prevents subsequent payments from auto-renewing at month end.
          </div>
          <div className='font-bold my-2'>Light by Starlight Platforms Inc® is a brand of Doing Stuff, Inc.</div>
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

export default Terms;
