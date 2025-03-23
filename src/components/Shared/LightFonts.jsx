import React from "react";

//Sure fine fonts are solved.
const LightFont=()=>{

  const CHAR_PATH_MAP={
    "A":"M 13.6 7 C 15 5 17.3 5 18.6 7 L 25.4 24 A 2 2 180 0 1 22.1 25.8 L 20 21.2 L 12 21.2 L 10.2 25.8 A 2 2 180 0 1 6.9 24 Z M 13.5 17 L 18.5 17 L 16 10 Z",
    "B":"M 19 6 C 26 7 24.5 14.6 21 15.4 C 26.2 16.4 27 25.2 19 26 L 10.3 26 A 2 2 90 0 1 8.3 24 L 8.3 8 A 2 2 90 0 1 10.3 6 Z M 12.3 9 L 12.3 14.2 L 17 14.2 C 21.1 14.2 21.1 9 17 9 Z M 12.3 17.4 L 12.3 23 L 17.5 23 C 22 23 22 17.4 17.5 17.4 Z",
    "C":"M 24.3 19.5 C 24.3 22.5 21.8 26.3 17 26.3 C 2.9 27.3 2.9 4.7 17 5.7 C 20.8 5.7 24.1 7.9 24.3 12 A 1.8 1.8 180 0 1 21.3 13 C 20.9 12 19.5 9.2 17 8.8 C 8.4 7.7 8.4 24.3 17 23 C 19.2 23 20.7 20.5 21.3 18.5 A 1.7 1.7 180 0 1 24.3 19.5 Z",
    "D":"M 16 6 C 22.5 6 25.2 10 25.2 16 C 25.2 22 22.5 26 16 26 L 10 26 A 2 2 90 0 1 8 24 L 8 8 A 2 2 90 0 1 10 6 Z M 12.1 9.1 L 12.1 22.8 L 15 22.8 C 20 22.8 21 20 21 16 C 21 12 20 9.1 15 9.1 Z",
    "E":"M 8.5 7.5 A 1.5 1.5 90 0 1 10 6 L 22.1 6 A 1.5 1.5 180 0 1 22.1 9 L 12.5 9 L 12.5 14 L 21.3 14 A 1.5 1.5 180 0 1 21.3 17 L 12.5 17 L 12.5 22.8 L 22.3 22.8 A 1.6 1.6 180 0 1 22.3 26 L 10.2 26 A 1.6 1.6 90 0 1 8.5 24.5 Z",
    "F":"M 9 8 A 2 2 90 0 1 11 6 L 21.5 6 A 1.5 1.5 180 0 1 21.5 9 L 13.1 9 L 13.1 14.3 L 20.2 14.3 A 1.5 1.5 180 0 1 20.2 17.3 L 13.1 17.3 L 13.1 24.3 A 2 2 180 0 1 9 24.3 Z",
    "G":"M 21.8 21.5 L 21.8 18.5 L 17.9 18.5 A 1.5 1.5 180 0 1 17.9 15.5 L 23.9 15.5 A 1.5 1.5 90 0 1 25.4 17 L 25.4 22.5 C 25.4 23.7 21.8 26.3 17 26.3 C 2.9 27.3 2.9 4.7 17 5.7 C 20.8 5.6 24.9 7.9 24.9 11 A 1.9 1.9 180 0 1 21.5 12 C 21 11 19.5 8.7 17 8.7 C 8.1 7.7 8.1 24.3 17 23.3 C 19 23.3 21.8 22.2 21.8 21.5 Z",
    "H":"M 7.5 7.6 A 2 2 180 0 1 11.5 7.6 L 11.5 13.8 L 20.4 13.8 L 20.4 7.6 A 2 2 180 0 1 24.4 7.6 L 24.4 24.3 A 2 2 180 0 1 20.4 24.3 L 20.4 17.1 L 11.5 17.1 L 11.5 24.3 A 2 2 180 0 1 7.5 24.3 Z",
    "I":"M 14 7.6 A 2 2 180 0 1 18 7.6 L 18 24.3 A 2 2 180 0 1 14 24.3 Z",
    "J":"M 18 8 C 17.8 4.8 22.2 4.8 22 8 L 22 20 C 22.2 28.4 8.5 28.4 8.7 20 C 8.7 17.3 12.4 17.3 12.5 20 C 12.5 24.2 18 24.2 18 20 L 18 24 Z",
    "K":"M 8.5 7.6 A 2 2 180 0 1 12.5 7.6 L 12.5 15.2 L 21.3 6 A 1.9 1.9 180 0 1 24.1 8.6 L 18.6 13.8 L 25 23 C 27 25.9 23.7 27.3 21.8 25.6 L 15.9 16.5 L 12.5 19.8 L 12.5 24.5 A 2 2 180 0 1 8.5 24.5 Z",
    "L":"M 9 7.6 A 2 2 180 0 1 13 7.6 L 13 22.7 L 21.7 22.7 A 1.6 1.6 180 0 1 21.7 26 L 11 26 A 2 2 90 0 1 9 24 Z",
    "M":"M 6.3 7.9 A 1.9 1.9 90 0 1 8.2 6 L 10.5 6 C 12.5 6 12.3 6.5 12.6 7 L 16 19.6 L 19.4 7 C 19.8 6.3 20 6 21 6 L 23.7 6 A 1.9 1.9 90 0 1 25.6 7.9 L 25.6 24.5 A 1.8 1.8 180 0 1 22 24.5 L 22 10 L 18.1 25 C 17.1 26.8 14.9 26.8 13.9 25 L 10 10 L 10 24.5 A 1.8 1.8 180 0 1 6.3 24.5 Z",
    "N":"M 7.6 8 C 7.6 5.9 10.4 4.4 12.1 6.9 L 20.7 20 L 20.6 8 C 20.6 4.8 24.4 4.8 24.4 8 L 24.4 24 C 24.2 27 21 27 19.4 24.5 L 11.4 12.2 L 11.4 24.4 C 11.4 27 7.6 27 7.6 24.4 Z",
    "O":"M 16 5.6 C 29.1 4.9 29.1 27.1 16 26.3 C 2.9 27.1 2.9 4.9 16 5.6 Z M 16 8.8 C 8.3 8.5 8.3 23.4 16 23.1 C 23.7 23.4 23.7 8.5 16 8.8 Z",
    "P":"M 17 6 C 26 5.5 26 18.7 16.5 18.2 L 12.4 18.2 L 12.4 24.3 A 2 2 180 0 1 8.4 24.3 L 8.4 8 A 2 2 90 0 1 10.4 6 Z M 12.4 9 L 12.4 15.1 L 16 15.1 C 20.8 15.1 20.8 9 16 9 Z",
    "Q":"M 16 5.6 C 29.1 4.9 29.1 27.1 16 26.3 C 2.9 27.1 2.9 4.9 16 5.6 Z M 16 8.8 C 8.3 8.5 8.3 23.4 16 23.1 C 23.7 23.4 23.7 8.5 16 8.8 Z M 16.4 19.3 C 17.2 19.3 21.4 22.2 21.5 22.5 C 21.4 22.6 26.8 25.5 26.5 25.5 A 1.4 1.4 180 0 1 25 27.8 C 24.3 27.8 20 25 20 24 C 19 23 15 21 15 21 C 14.2 19.8 15.7 18.9 16.4 19.3 Z",
    "R":"M 18 6 C 27 5.5 26.6 16.5 19.3 16.9 C 20.9 17.1 25.1 23 25 24.5 C 25 26.9 22.3 26.7 21.4 25.5 L 18 20 C 17 18.5 16.5 17.2 12.4 17.4 L 12.4 24.3 A 2 2 180 0 1 8.4 24.3 L 8.4 8 A 2 2 90 0 1 10.4 6 Z M 12.4 9 L 12.4 14.5 L 17 14.5 C 21.8 14.5 21.8 9 17 9 Z",
    "S":"M 8.5 12.5 C 6.9 3.3 23 3.9 23 10.5 C 23 12.5 20.5 12.9 19.8 11.5 C 17.9 6.4 11.7 8.6 12.1 11 C 12.1 11.5 12 13 18 14.1 C 21 15.1 23.9 16 23.9 20 C 24 28.4 8 28.5 8 20 C 8.7 18 10.8 18.5 11.3 19.5 L 11.8 20.6 C 13.2 25 20.4 23.8 19.9 20 C 19.9 17.3 14 17.3 11.6 16 C 9.6 15 9 14 8.5 12.5 Z",
    "T":"M 22.9 6 A 1.6 1.6 180 0 1 22.9 9.2 L 18 9.2 L 18 24.3 A 2 2 180 0 1 14 24.3 L 14 9.2 L 9.1 9.2 A 1.6 1.6 180 0 1 9.1 6 Z",
    "U":"M 7.6 7.6 A 2 2 180 0 1 11.6 7.6 L 11.6 18 C 11.6 20.3 12 23.2 16 23.1 C 20 23.1 20.4 20.3 20.4 18 L 20.4 7.6 A 2 2 180 0 1 24.4 7.6 L 24.4 18 C 24.4 23.7 22 26.3 16 26.3 C 10 26.3 7.6 23.7 7.6 18 Z",
    "V":"M 7.25 8.3 A 1.9 1.9 180 0 1 11 7 L 16 21.8 L 20.9 7 A 1.9 1.9 180 0 1 24.6 8.3 L 18.75 24 C 18.75 24 18.2 26.3 16 26.3 C 13.7 26.3 13 24 13 24 Z",
    "W":"M 3.4 8 A 1.9 1.9 180 0 1 7.1 7 L 10.1 20.1 L 13.5 7.5 C 13.5 7.5 14 5.6 16 5.6 C 18 5.6 18.5 7.5 18.5 7.5 L 22 20.1 L 24.9 7 A 1.9 1.9 180 0 1 28.6 8 L 24.55 24.5 C 24.55 24.5 24.1 26.3 22.1 26.3 C 20.1 26.3 19.65 24 19.65 24 L 16 10.6 L 12.4 24 C 12.4 24 11.9 26.3 9.9 26.3 C 7.9 26.3 7.45 24.5 7.45 24.5 Z",
    "X":"M 8.9 8.1 A 1.75 1.75 180 0 1 11.9 6.3 L 16 12.8 L 20.45 6.3 A 1.75 1.75 180 0 1 23.4 8.1 L 18.55 15.5 L 23.65 23.5 A 1.75 1.75 180 0 1 20.44 25.5 L 16 18.6 L 11.45 25.5 A 1.75 1.75 180 0 1 8.3 23.5 L 13.6 15.5 Z",
    "Y":"M 8.1 8.15 A 1.8 1.8 180 0 1 11.15 6.25 L 16 14.1 L 20.95 6.25 A 1.8 1.8 180 0 1 24 8.15 L 18 17.45 L 18 24.4 A 2 2 180 0 1 14 24.4 L 14 17.45 Z",
    "Z":"M 10 9 C 7.7 9 7.7 6 10 6 L 21.5 6 C 23.9 6 24.1 8.2 23.4 9.5 L 12.15 23 L 23 23 C 25.3 23 25.3 26 23 26 L 9.5 26 C 7.5 26 6.5 24 7.7 22.5 L 19 9 Z",
    "SPACE":"",
  }

  const [textString,setTextString]=useState(null);
  const [editTextString,setEditTextString]=useState(null);

  return(
    <div className='flex flex-col h-full w-full items-center justify-start'>
      {/*Map Paths To Boxes*/}
      <div className='flex flex-row w-3/4 rounded-2xl border-r-4 border-l-4 border-gray-900 p-2 mt-2'>
        {textString&&[0].map((entry,index)=>{
          let pathMap=[];
          for(let i=0; i<textString.length; i++){
            let symbolID=textString[i].toUpperCase();
            if(symbolID===" "){
              symbolID='SPACE';
            }
            CHAR_PATH_MAP[symbolID]&&pathMap.push(CHAR_PATH_MAP[symbolID]);
          }
          console.log({status:"Updated Path Map for String", pathMap:pathMap});
          return(
            <div key={index} className='flex flex-row w-full h-full flex-wrap'>
            {pathMap.map((charPath,pathIndex)=>{
              return(
                <div key={pathIndex} className='flex flex-col w-4 flex-shrink-0 h-full items-center justify-center'>
                  <svg className="flex flex-col items-center w-full h-full flex-shrink-0 justify-center text-c2-highlight" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d={charPath}></path>
                  </svg>
                </div>
              )
            })}
            </div>
          )
        })}
      </div>

      <div className='flex flex-row flex-1 w-full'>
      </div>

      {/*Decrtiption Input*/}
      <div className='flex flex-row h-16 w-48 my-2 rounded-2xl border-2 border-gray-900 p-2' onClick={()=>setEditTextString(true)}>
        {editTextString?(
          <input
            autoFocus
            type='text'
            onChange={(event)=>{setTextString(event.target.value)}}
            className={`w-full px-0 py-0 text-xl font-bold text-left rounded-md outline-none border-none placeholder-white placeholder:italic focus:outline-none focus:ring-2 focus:ring-c2-highlight`}
            style={{resize:'vertical', backgroundColor:`#000000`,}}
            placeholder={"New Char Array"}
            value={textString}
            onBlur={()=>setEditTextString(null)}
          />
        ):(
        <div className='flex flex-row w-full h-full items-center justify-center px-0 py-0 text-xl font-bold text-center whitespace-nowrap'>
          {textString}
        </div>
      )}
      </div>
    </div>
  )
}

export default LightFont;
