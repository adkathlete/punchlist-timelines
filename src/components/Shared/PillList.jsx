import React from "react";
import {useState, useEffect} from 'react';

const PillList = (props)=>{
  //---------------------------------STATE--------------------------------------
  const [myItems,setMyItems] = useState([]);
  const [content,setContent] = useState("");
  const [maxLength] = useState (5);
  const [focused,setFocused] = useState(false);
  const [readOnly,setReadOnly] = useState(false);

  //Annimation State Variables
  const [keyStrokeDuration] = useState(1000);
  const [annimationInterval,setAnnimationInterval] = useState(null);

  //---------------------------------EFFECTS------------------------------------
  //Effect to animate the sample data, if there is any, when there is not a simulation running
  useEffect(()=>{
    console.log('HEY SAMPLE DATA CHANGED');
    console.log(props.animate);
    console.log(!!props.sampleData);
    console.log(props.simulationRunning!==true)
    console.log(!focused);
    if(props.animate && !!props.sampleData && props.simulationRunning!==true && !focused){
      console.log('Pill List: Starting Annimation')
      startAnnimation();
    }
  },[props.animate,props.sampleData,props.simulationRunning,focused])


  //Clear the annimation interval if one is running while user querries run
  /*useEffect(()=>{
  console.log('Pill List: Annimation Changed')
  if(!props.animate && annimationTimer){
    clearInterval(annimationTimer);
  }
},[props.animate])*/

  //---------------------------------CALLBACKS----------------------------------
  //Callback for adding an item
  const addItem=()=>{
    console.log(`Adding new item ${content}`)
    //Parse the content to upper case
    var currentcontent = content.trim().toUpperCase();
    console.log(currentcontent);

    //Set a max of 10 entries for the array given current API constraints
    if (!currentcontent || myItems.length === 10 || myItems.find(element=>{return element===currentcontent})){
      return;
    } else{

      //Add a new entry to the array
      myItems.push(currentcontent);

      //Trigger callback to the base simulator
      props.onChange(myItems);

      //Reset the content string to trigger a re-render
      if(myItems.length<10){
        setContent("");
      }else{
        setReadOnly(true);
        setContent("🌟 Way to diversify! 🌟 You entered the max of 10 stocks -- Sign up today to start investing with portfolios of any size!");
      }
    }
}

  //Callback for starting an animation
  const startAnnimation = ()=>{
    if(!focused&&!!props.sampleData){
      try{
        console.log('Pill List: Clearing items')
        //1) Reset the items array to clear it out
        setMyItems([]);

        //2) Start an interval that will animate until cancled
        let entryIndex = 0;
        let entry = String(props.sampleData[entryIndex]);
        let stringLength = 0;

        const annimation = setInterval(()=>{
          console.log(`Running Loop for ${entry} with string length: 1 `)
          //Increment the index if it is less than the entry length
          if(stringLength<entry.length){
            stringLength++
          }else{
            //Add the new entry to the array
            setMyItems(myItems=>[...myItems,entry]);

            //If there are more elements than update the entry index, otherwise trigger the callback
            if(entryIndex<props.sampleData.length-1){
              //Increment the entry index
              entryIndex++

              //Grab the new entry
              entry = String(props.sampleData[entryIndex]);

              //Reset the stringLength
              stringLength = 1;

            }else{
              console.log('Cleaning Up')
              //Reset the content
              setContent("")

              //Run the callback
              props.onAnnimationComplete()

              //Clear the interval
              clearInterval(annimation)

              //Return to break the loop so you dont set the context below
              return;
            }
          }

          //Update the content string if you have more to go
          setContent(entry.substr(0,stringLength));
        },keyStrokeDuration);

        setAnnimationInterval(annimation);

        //Return a clean up function
        return ()=>clearInterval(annimation);

      }catch(err){
        console.log(`PillList: Error Annimating Sample Data--${err}`)
      }
    } else{
      console.log('Pill List: Simulation Running -- No Refresh needed')
    }
  }

  //------------------------------EVENT HANDLERS--------------------------------
  const handleFocus = (event) => {
    if(props.canEdit&&!props.simulationRunning){
      console.log('Resetting items on focus')
      //Clear all items in state, to get ready for user input
      setMyItems([]);
      setContent("");
      setFocused(true);

      //Make it read only again if there were previously 10 entries
      if(readOnly){
        setReadOnly(false);
        setContent("");
      }

      //Stop any ongoing annimation
      clearInterval(annimationInterval);
      setAnnimationInterval(null);
    }
  }

  //Handle change if there are fewer than 10 entries
	const handleChange = (event) => {
    if(myItems.length<10 && props.canEdit){
  		console.log(event.target.value)
  		setContent(event.target.value);
    }
	}

  //Handle on focus change exit by resetting content to an empty string if there are fewer than 10 stocks
  //Reset focus as needed after a period
  const handleBlur = (event) => {
    console.log('Clearing Focus simulation');
    setTimeout(()=>{
      if(myItems.length<10){
        setContent("");
      }
      setFocused(false);
    },10000);
  }

  //Create new pill on enter
  const handleKeyUp=(event)=> {
    //console.log(event);
		if (event.key === "Enter") {
      addItem();
		}
	}

  //Helper to delete and remove item on click
  const handleClick = (event) => {
    console.log(event)
    const idToRemove = Number(event.target.dataset["item"]);
    const newArray = myItems.filter((listitem,index) => {return index !== idToRemove});

    setMyItems(newArray);
    props.onChange(newArray.map(element=>{return element}));

    //If you delete an element, you have made room for new elements again in the max list
    if(readOnly){
      setReadOnly(false);
      setContent("");
    }
  }

  //---------------------------------COMPONENT----------------------------------
  return(
		<div className="container">
      <div className="container py-2 flex justify-center">
        {
          myItems.map((listitem, index) => (
            <button
              type="button"
              key={"list-item-"+index}
              onClick={handleClick}
              data-item={index}
              className="inline-flex px-3 py-2 border border-transparent shadow-sm text-md leading-4 font-bold rounded-md text-white bg-c1 hover:bg-c1-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-c1-highlight">
              {listitem}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
          ))
        }
      </div>
      <input
          className="block text-center w-full placeholder-shades border-4 border-c1 focus:outline-none focus:ring-c1-highlight focus:border-c1-highlight sm:text-sm rounded-md"
          id={props.simulatorName}
          type="text"
          name="initvalue"
          autoComplete="off"
          readOnly={readOnly}
          placeholder={props.placeholder}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          maxLength={maxLength}
          value={content}
      />
		</div>
  );
}

//---------------------------------COMPONENTS-----------------------------------

export default PillList;
