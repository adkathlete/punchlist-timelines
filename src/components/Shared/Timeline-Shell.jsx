import React from "react";
import {useState, useEffect, useLayoutEffect, useRef} from 'react';

//TIMELINE SHELL: Blank timeline logic with empty element window

//Initialize router and routes to be used
import {Redirect} from "react-router-dom";

import DiditActionButton from "../Shared/DiditActionButton.jsx";
import SecondaryActionButton from "../Shared/SecondaryActionButton.jsx";

//TIME: ~5 Days @ ~8 hours per is 'fast' to do this with link to backend... Could proabably do this in ~50 hours over 3 days if absolutely necessary.
//2 Weeks is very comfortable. 1 is pretty fast.


//Color setting for doing stuff inc
const CATEGORY_COLORS = [
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

const FREQUENCIES = [
  "ONCE",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "ANNUALLY",
];

const DIDIT_VIEWS = ['TIME_HORIZONS','CATEGORIES','WORKFLOWS'];

const DAILY_SEGMENTS =[
  {id:"1",title:"Morning",appliesForGoal:(goal)=>{return Number.parseInt(goal.deadline.hours)>=4&&Number.parseInt(goal.deadline.hours)<12}},
  {id:"2",title:"Afternoon",appliesForGoal:(goal)=>{return Number.parseInt(goal.deadline.hours)>=12&&Number.parseInt(goal.deadline.hours)<17}},
  {id:"3",title:"Evening",appliesForGoal:(goal)=>{return Number.parseInt(goal.deadline.hours)>=17&&Number.parseInt(goal.deadline.hours)<=24||Number.parseInt(goal.deadline.hours)>=0&&Number.parseInt(goal.deadline.hours)<4}},
  ];

const WEEKDAY_SEGMENTS ={
  segments:[
    {id:"0",title:"Sunday", periodTitle:"S", appliesForGoal:(goal)=>{return goal.duedate.getDay()===0}},
    {id:"1",title:"Monday", periodTitle:"M",appliesForGoal:(goal)=>{return goal.duedate.getDay()===1}},
    {id:"2",title:"Tuesday", periodTitle:"T",appliesForGoal:(goal)=>{return goal.duedate.getDay()===2}},
    {id:"3",title:"Wednesday", periodTitle:"W",appliesForGoal:(goal)=>{return goal.duedate.getDay()===3}},
    {id:"4",title:"Thursday", periodTitle:"T", appliesForGoal:(goal)=>{return goal.duedate.getDay()===4}},
    {id:"5",title:"Friday", periodTitle:"F",appliesForGoal:(goal)=>{return goal.duedate.getDay()===5}},
    {id:"6",title:"Saturday", periodTitle:"S",appliesForGoal:(goal)=>{return goal.duedate.getDay()===6}},
  ],
  sortWeeklySegments:function (){
    let today = new Date();
    let dateNumIDArray=[0,1,2,3,4,5,6];
    let sortedSegments = [...this.segments];

    //Get todays date
    let todaysDate = today.getUTCDate();

    //Cha-cha-cha real smooth
    //I mean sort the date num array relative to todays date
    for(let i=0;i<7;i++){
      if(dateNumIDArray[0]!==todaysDate){
        let id = dateNumIDArray.shift();
        dateNumIDArray.push(id);

        let segment = sortedSegments.shift();
        sortedSegments.push(segment);
      }
    }

    //Return the sorted segments
    return sortedSegments;
  }
}

const HORIZON_SEGMENTS =[
  {id:"0",title:"Late",appliesForGoal:(goal)=>{return goal.horizonID==='LATE'&&goal.active}},
  {id:"1",title:"Today",appliesForGoal:(goal)=>{return goal.horizonID==='TODAY'}},
  {id:"2",title:"This Week",appliesForGoal:(goal)=>{return goal.horizonID==='THIS_WEEK'}},
  {id:"3",title:"This Month",appliesForGoal:(goal)=>{return goal.horizonID==='THIS_MONTH'}},
  {id:"4",title:"Sometime",appliesForGoal:(goal)=>{return goal.horizonID==='SOMETIME'}},
  ];

//Some time horizons for when you should do it. This probablly lives in the front end
const DIDIT_TIME_HORIZONS = [
  {id:"LATE", text:"Late", emoji:"⏰", show:false},
  {id:"TODAY", text:"Today", emoji:"🎯", show:true},
  {id:"THIS_WEEK", text:"This Week", emoji:"🗓", show:false},
  {id:"THIS_MONTH", text:"This Month", emoji:"🧭", show:false},
  {id:"SOMETIME", text:"Sometime", emoji:"🤷‍♂️", show:false},
]

const NEW_USER_GOALS = [
  {
    id:"0",
    description:"Do your 2nd Didit",
    workflowID:"",
    workflowIndex:null,
    categoryID:"0",
    color:"#0ea5e9",
    active:true,
    horizonID:"TODAY",
    frequency:"ONCE",
    frequencyText:"One Time",
    weekdays:[],
    duedate:new Date (),
    deadline:{
      hours:new Date ().getHours()<23?new Date ().getHours()+1:23,
      minutes:0,
    },
    didits:[],
    didit:function (timestamp){
      //Function to update the didit status for recurring tasks
      //Push a new timestamp to the logs of 'completed timestamps'
      //While I dont see a reason why you would 'do' inactive one time didits, I guess it could be a future use case where you say 'hey youve done these things a bunch maybe make it a workflow'
      try{
        //If it was ONCE, set active to false
        if(this.active && this.frequency==="ONCE"){
          this.active=false;
        }

        //You Didit!!!
        if(timestamp){

          //Create a new didit
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(timestamp),duedate:String(this.duedate.getTime())};

          //Add the timestamp
          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with provided timestamp", data:this.timestamps});
          return({status:"Success", message:"Added new Didit timestamp", data:this.timestamps});
        }else{
          //Add the timestamp
          let now = new Date();
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(now.getTime()),duedate:String(this.duedate.getTime())};

          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with current time", data:this.didits});
          return({status:"Success", message:"Added new Didit timestamp", data:this.didits});
        }
      }catch(err){
        console.log({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
        return({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
      }
    },
    occursOnDate:function(day,month,year,dayNum){
      let selected = false;
      let testDate = new Date();
      testDate.setDate(day);
      testDate.setMonth(month);
      testDate.setFullYear(year);

      //If the weekday is included, it is selected if it is after the current date
      if(this.weekdays.includes(dayNum) && testDate>=new Date()){
        selected=true;
      }

      //If the day is the due date, it should be selected
      if(this.duedate.getDate()===day&&this.duedate.getMonth()===month&&this.duedate.getFullYear()===year){
        selected=true;
      }

      //If the goal is monthly and recurs on the given date, it should be selected
      if(this.frequency==='MONTHLY' && this.duedate.getDate()===day){
        selected=true;
      }

      if(this.frequency==='ANNUALLY' && this.duedate.getDate()===day && this.duedate.getMonth()===month){
        selected=true;
      }

      return selected;
    },
    setNextDate:function (){
      //Update the didit's next date object based on its recurring frequency and time stamp
      try{
        //If the didit isnt active, then there is nothing to do
        if(this.active===false){
          console.log({status:"Success",message:"Calculated next date for didit", data:this.duedate});
          return ({status:"Success",message:"Calculated next date for didit", data:this.duedate});
        }else{
          //Initialize the current date and a 'next' dealine date object
          let newDeadline = this.duedate;

          //If Uninitialized, initialize it
          if (newDeadline===null){
            //Create a new date
            newDeadline = new Date();

            //Set the hours and minutes from the deadline
            newDeadline.setUTCHours(this.deadline.hours);
            newDeadline.setUTCMinutes(this.deadline.minutes);
            newDeadline.setUTCSeconds(0,0);
          }else{
            //Otherwise, just update the didit object
            switch (this.frequency){
              case "ONCE":
                //Do nothing, it only had one due date, so set active status to false
                break;
              case "DAILY":
                //Add one to the date
                newDeadline.setUTCDate(newDeadline.getUTCDate()+1);
                break;
              case "WEEKLY":
                //Get the next 'date of the week'
                let weekdays = this.weekdays;

                //This will be the weekday number of the 'last set' due date
                let currentWeekday = newDeadline.getDay();

                //If there are weekdays flagged for recurring didits, then find the next day; Otherwise loop around again
                //Weekdays: [0,1,2,3,4,5,6];
                //Weekdays: [1];
                if (weekdays.length && weekdays.length>0){
                  let currentIndex = weekdays.indexOf(currentWeekday)||0;
                  let difference = 0;
                  //If its the last one in the array, reset to the first, otherwise increment by the difference
                  if(currentIndex===weekdays.length-1){
                    //Grab the first weekday from the array
                    let nextWeekday = weekdays[0];
                    difference = (nextWeekday+7)-currentWeekday;
                  }else{
                    let nextWeekday = weekdays[currentIndex+1];
                    difference = nextWeekday-currentWeekday;
                  }

                  //Update the weekday
                  newDeadline.setUTCDate(newDeadline.getUTCDate()+difference);

                }else{
                  console.log({status:"Error",message:"No weekdays set for weekly recurrance",error:"Weekdays not set for weekly recurring didit"});
                }

                break;
              case "MONTHLY":
                //Note: Need to update for 'Last date of the month' errors
                //Add one to the month
                newDeadline.setUTCMonth(newDeadline.getUTCMonth()+1);
                break;
              case "ANNUALLY":
                //Add one to the date
                newDeadline.setUTCFullYear(newDeadline.getUTCFullYear()+1);
                break;
              default:

                break;

            }
          }

          console.log({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});

          //Update the didit object
          this.duedate=newDeadline;
          return ({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});
        }
      }catch(err){
        console.log({status:"Error",message:"Error calculating next date for didit", error:err});
        return ({status:"Error",message:"Error calculating next date for didit", error:err});
      }
    },
    updateDeadline: function(hours,minutes){
      if(hours>=0 && hours<=23 && minutes>=0 && minutes <60){
        this.deadline.hours=hours;
        this.deadline.minutes=minutes;
        this.duedate.setUTCHours(hours);
        this.duedate.setUTCMinutes(minutes);
        return true;
      }else{
        console.log({status:"Error", message:"Unable to update deadline with invalid hours and minutes. Hours must be [0-23] and minutes must be [0-59].",data:{hours:hours, minutes:minutes}})
        return false;
      }
    },
    updateWeekdays: function(weekdays){
      //If you get a blank array, then assume it is 1 time only
      if(Array.isArray(weekdays) && weekdays.length===0){
        this.frequency = "ONCE"
        this.frequencyText="One Time"
        this.weekdays=[];
        this.recurring=false;
      }else{
        let validWeekdays = true;

        //Test all weekdays in the array to make sure that they weekdays are valid;
        weekdays.every((entry)=>{if (entry<0 || entry>6){validWeekdays=false; return false} return true});

        if(validWeekdays){
          //Update the frequency to WEEKLY
          this.frequency="WEEKLY";

          //Ensure that it is always sorted least to most
          this.weekdays=weekdays.sort((a,b)=>{if(a<b){return -1}else if(a>b){return 1}else{return 0}});

          //Update the Frequency text
          if(weekdays.length===7){
            this.frequencyText = "Every Day"
          }else if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)){
            this.frequencyText = "Every Weekday"
          }else if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)){
            this.frequencyText = "Every Weekend"
          }else{
            let frequencyText = "Every";
            let DAY_MAP={
              "0":"Sunday",
              "1":"Monday",
              "2":"Tuesday",
              "3":"Wednesday",
              "4":"Thursday",
              "5":"Friday",
              "6":"Saturday"
            }
            weekdays.forEach((day,index)=>{
              frequencyText=frequencyText+" "+DAY_MAP[day];

              if(index!==weekdays.length-1){
                frequencyText=frequencyText+",";
              }
            });

            this.frequencyText=frequencyText;
          }

          //Update the current goal due date with the first valid week day from today (assume you are building a new workflow)
          //[0,1,2,3,4,5,6]
          //[-------^-----]
          let duedate = new Date();
          let foundMatch = false;

          //Loop through the one weeks worth of days to find the the day
          for(let index=0; index<7; index++){
            if(!foundMatch){
              if(this.weekdays.includes(duedate.getDay())){
                this.duedate=duedate;
                foundMatch=true;
              }else{
                duedate.setDate(duedate.getDate()+1);
              }
            }
          }

          return true;
        }else{
          console.log({status:"Error", message:"Unable to update weekdays with invalid days. Date numbers must be [0-6].",data:{weekdays}})
          return false;
        }
      }
    },
    updateTimeHorizon: function(){
      try{
        //Init the time horizons for each didit
        let today = new Date();
        let year = today.getFullYear();
        let todaysDateNumber = this.getDateNumberFromMonthAndDate(today.getMonth(),today.getDate());
        let todaysDayNumber = today.getDay();

        let duedateDateNumber = this.getDateNumberFromMonthAndDate(this.duedate.getMonth(),this.duedate.getDate());
        let duedateYear = this.duedate.getFullYear();
        let duedateDayNumber = this.duedate.getDay();

        //Assume everything is due sometime. Overwrite the time horizon if one of the other horizons apply
        this.horizonID="SOMETIME"

        //If the didit is a day old, its late
        if((duedateDateNumber<todaysDateNumber && year===duedateYear)||duedateYear<year){
          this.horizonID="LATE"
        }

        //If the didit is due this month, not due this week, and not late then its due this Month
        if(this.duedate.getMonth()===today.getMonth() && duedateDateNumber>todaysDateNumber && year===this.duedate.getFullYear()){
          this.horizonID="THIS_MONTH"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share the same years)
        //[0,1,2,3,4,5,6]
        if((duedateYear===year && duedateDateNumber>todaysDateNumber&&duedateDateNumber-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share they wrap around years)
        if((duedateYear-year===1 && (duedateDateNumber+365)-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due today, its today
        if(todaysDateNumber===duedateDateNumber && year===duedateYear){
          this.horizonID="TODAY"
        }
        console.log({status:"Success", message:"Updated time horizon", error:""});
        console.log(this);
      }catch(err){
        console.log({status:"Error", message:"Error updating the time horizon", error:err});
      }
    },
    getDateNumberFromMonthAndDate: function (month,date){
       let DAY_MAP = [
         {id:"January", abr: "Jan",month:0, days:31},
         {id:"February", abr: "Feb",month:1,days:28},
         {id:"March", abr: "Mar",month:2, days:31},
         {id:"April", abr: "Apr",month:3, days:30},
         {id:"May", abr: "May",month:4, days:31},
         {id:"June", abr: "Jun",month:5, days:30},
         {id:"July", abr: "Jul",month:6, days:31},
         {id:"August", abr: "Aug",month:7, days:31},
         {id:"September", abr: "Sep",month:8, days:30},
         {id:"October", abr: "Oct",month:9, days:31},
         {id:"November", abr: "Nov",month:10, days:30},
         {id:"December", abr: "Dev",month:11, days:31},
       ];

       //Get all of the days from months before the current month;
       let months=DAY_MAP.filter((entry,index)=>index<month);

       //Sum them up
       let dateNumber = months.reduceRight((total,entry)=>total+entry.days,0);

       //Add the date from the current month
       dateNumber+=date;

       //Return the cummulative date number for the month date combo;
       return dateNumber;
     }
  },
  {
    id:"1",
    description:"Do that work thing",
    workflowID:"",
    workflowIndex:null,
    categoryID:"1",
    color:"#8b5cf6",
    active:true,
    horizonID:"THIS_WEEK",
    frequency:"ONCE",
    frequencyText:"One Time",
    weekdays:[],
    duedate:new Date(),
    deadline:{
      hours:17,
      minutes:0,
    },
    didits:[],
    didit:function (timestamp){
      //Function to update the didit status for recurring tasks
      //Push a new timestamp to the logs of 'completed timestamps'
      //While I dont see a reason why you would 'do' inactive one time didits, I guess it could be a future use case where you say 'hey youve done these things a bunch maybe make it a workflow'
      try{
        //If it was ONCE, set active to false
        if(this.active && this.frequency==="ONCE"){
          this.active=false;
        }

        //You Didit!!!
        if(timestamp){

          //Create a new didit
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(timestamp),duedate:String(this.duedate.getTime())};

          //Add the timestamp
          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with provided timestamp", data:this.timestamps});
          return({status:"Success", message:"Added new Didit timestamp", data:this.timestamps});
        }else{
          //Add the timestamp
          let now = new Date();
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(now.getTime()),duedate:String(this.duedate.getTime())};

          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with current time", data:this.didits});
          return({status:"Success", message:"Added new Didit timestamp", data:this.didits});
        }
      }catch(err){
        console.log({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
        return({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
      }
    },
    occursOnDate:function(day,month,year,dayNum){
      let selected = false;
      let testDate = new Date();
      testDate.setDate(day);
      testDate.setMonth(month);
      testDate.setFullYear(year);

      //If the weekday is included, it is selected if it is after the current date
      if(this.weekdays.includes(dayNum) && testDate>=new Date()){
        selected=true;
      }

      //If the day is the due date, it should be selected
      if(this.duedate.getDate()===day&&this.duedate.getMonth()===month&&this.duedate.getFullYear()===year){
        selected=true;
      }

      //If the goal is monthly and recurs on the given date, it should be selected
      if(this.frequency==='MONTHLY' && this.duedate.getDate()===day){
        selected=true;
      }

      if(this.frequency==='ANNUALLY' && this.duedate.getDate()===day && this.duedate.getMonth()===month){
        selected=true;
      }

      return selected;
    },
    setNextDate:function (){
      //Update the didit's next date object based on its recurring frequency and time stamp
      try{
        //If the didit isnt active, then there is nothing to do
        if(this.active===false){
          console.log({status:"Success",message:"Calculated next date for didit", data:this.duedate});
          return ({status:"Success",message:"Calculated next date for didit", data:this.duedate});
        }else{
          //Initialize the current date and a 'next' dealine date object
          let newDeadline = this.duedate;

          //If Uninitialized, initialize it
          if (newDeadline===null){
            //Create a new date
            newDeadline = new Date();

            //Set the hours and minutes from the deadline
            newDeadline.setUTCHours(this.deadline.hours);
            newDeadline.setUTCMinutes(this.deadline.minutes);
            newDeadline.setUTCSeconds(0,0);
          }else{
            //Otherwise, just update the didit object
            switch (this.frequency){
              case "ONCE":
                //Do nothing, it only had one due date, so set active status to false
                break;
              case "DAILY":
                //Add one to the date
                newDeadline.setUTCDate(newDeadline.getUTCDate()+1);
                break;
              case "WEEKLY":
                //Get the next 'date of the week'
                let weekdays = this.weekdays;

                //This will be the weekday number of the 'last set' due date
                let currentWeekday = newDeadline.getDay();

                //If there are weekdays flagged for recurring didits, then find the next day; Otherwise loop around again
                //Weekdays: [0,1,2,3,4,5,6];
                //Weekdays: [1];
                if (weekdays.length && weekdays.length>0){
                  let currentIndex = weekdays.indexOf(currentWeekday)||0;
                  let difference = 0;
                  //If its the last one in the array, reset to the first, otherwise increment by the difference
                  if(currentIndex===weekdays.length-1){
                    //Grab the first weekday from the array
                    let nextWeekday = weekdays[0];
                    difference = (nextWeekday+7)-currentWeekday;
                  }else{
                    let nextWeekday = weekdays[currentIndex+1];
                    difference = nextWeekday-currentWeekday;
                  }

                  //Update the weekday
                  newDeadline.setUTCDate(newDeadline.getUTCDate()+difference);

                }else{
                  console.log({status:"Error",message:"No weekdays set for weekly recurrance",error:"Weekdays not set for weekly recurring didit"});
                }

                break;
              case "MONTHLY":
                //Note: Need to update for 'Last date of the month' errors
                //Add one to the month
                newDeadline.setUTCMonth(newDeadline.getUTCMonth()+1);
                break;
              case "ANNUALLY":
                //Add one to the date
                newDeadline.setUTCFullYear(newDeadline.getUTCFullYear()+1);
                break;
              default:

                break;

            }
          }

          console.log({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});

          //Update the didit object
          this.duedate=newDeadline;
          return ({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});
        }
      }catch(err){
        console.log({status:"Error",message:"Error calculating next date for didit", error:err});
        return ({status:"Error",message:"Error calculating next date for didit", error:err});
      }
    },
    updateDeadline: function(hours,minutes){
      if(hours>=0 && hours<=23 && minutes>=0 && minutes <60){
        this.deadline.hours=hours;
        this.deadline.minutes=minutes;
        this.duedate.setUTCHours(hours);
        this.duedate.setUTCMinutes(minutes);
        return true;
      }else{
        console.log({status:"Error", message:"Unable to update deadline with invalid hours and minutes. Hours must be [0-23] and minutes must be [0-59].",data:{hours:hours, minutes:minutes}})
        return false;
      }
    },
    updateWeekdays: function(weekdays){
      //If you get a blank array, then assume it is 1 time only
      if(Array.isArray(weekdays) && weekdays.length===0){
        this.frequency = "ONCE"
        this.frequencyText="One Time"
        this.weekdays=[];
        this.recurring=false;
      }else{
        let validWeekdays = true;

        //Test all weekdays in the array to make sure that they weekdays are valid;
        weekdays.every((entry)=>{if (entry<0 || entry>6){validWeekdays=false; return false} return true});

        if(validWeekdays){
          //Update the frequency to WEEKLY
          this.frequency="WEEKLY";

          //Ensure that it is always sorted least to most
          this.weekdays=weekdays.sort((a,b)=>{if(a<b){return -1}else if(a>b){return 1}else{return 0}});

          //Update the Frequency text
          if(weekdays.length===7){
            this.frequencyText = "Every Day"
          }else if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)){
            this.frequencyText = "Every Weekday"
          }else if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)){
            this.frequencyText = "Every Weekend"
          }else{
            let frequencyText = "Every";
            let DAY_MAP={
              "0":"Sunday",
              "1":"Monday",
              "2":"Tuesday",
              "3":"Wednesday",
              "4":"Thursday",
              "5":"Friday",
              "6":"Saturday"
            }
            weekdays.forEach((day,index)=>{
              frequencyText=frequencyText+" "+DAY_MAP[day];

              if(index!==weekdays.length-1){
                frequencyText=frequencyText+",";
              }
            });

            this.frequencyText=frequencyText;
          }

          //Update the current goal due date with the first valid week day from today (assume you are building a new workflow)
          //[0,1,2,3,4,5,6]
          //[-------^-----]
          let duedate = new Date();
          let foundMatch = false;

          //Loop through the one weeks worth of days to find the the day
          for(let index=0; index<7; index++){
            if(!foundMatch){
              if(this.weekdays.includes(duedate.getDay())){
                this.duedate=duedate;
                foundMatch=true;
              }else{
                duedate.setDate(duedate.getDate()+1);
              }
            }
          }

          return true;
        }else{
          console.log({status:"Error", message:"Unable to update weekdays with invalid days. Date numbers must be [0-6].",data:{weekdays}})
          return false;
        }
      }
    },
    updateTimeHorizon: function(){
      try{
        //Init the time horizons for each didit
        let today = new Date();
        let year = today.getFullYear();
        let todaysDateNumber = this.getDateNumberFromMonthAndDate(today.getMonth(),today.getDate());
        let todaysDayNumber = today.getDay();

        let duedateDateNumber = this.getDateNumberFromMonthAndDate(this.duedate.getMonth(),this.duedate.getDate());
        let duedateYear = this.duedate.getFullYear();
        let duedateDayNumber = this.duedate.getDay();

        //Assume everything is due sometime. Overwrite the time horizon if one of the other horizons apply
        this.horizonID="SOMETIME"

        //If the didit is a day old, its late
        if((duedateDateNumber<todaysDateNumber && year===duedateYear)||duedateYear<year){
          this.horizonID="LATE"
        }

        //If the didit is due this month, not due this week, and not late then its due this Month
        if(this.duedate.getMonth()===today.getMonth() && duedateDateNumber>todaysDateNumber && year===this.duedate.getFullYear()){
          this.horizonID="THIS_MONTH"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share the same years)
        //[0,1,2,3,4,5,6]
        if((duedateYear===year && duedateDateNumber>todaysDateNumber&&duedateDateNumber-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share they wrap around years)
        if((duedateYear-year===1 && (duedateDateNumber+365)-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due today, its today
        if(todaysDateNumber===duedateDateNumber && year===duedateYear){
          this.horizonID="TODAY"
        }
        console.log({status:"Success", message:"Updated time horizon", error:""});
        console.log(this);
      }catch(err){
        console.log({status:"Error", message:"Error updating the time horizon", error:err});
      }
    },
    getDateNumberFromMonthAndDate: function (month,date){
       let DAY_MAP = [
         {id:"January", abr: "Jan",month:0, days:31},
         {id:"February", abr: "Feb",month:1,days:28},
         {id:"March", abr: "Mar",month:2, days:31},
         {id:"April", abr: "Apr",month:3, days:30},
         {id:"May", abr: "May",month:4, days:31},
         {id:"June", abr: "Jun",month:5, days:30},
         {id:"July", abr: "Jul",month:6, days:31},
         {id:"August", abr: "Aug",month:7, days:31},
         {id:"September", abr: "Sep",month:8, days:30},
         {id:"October", abr: "Oct",month:9, days:31},
         {id:"November", abr: "Nov",month:10, days:30},
         {id:"December", abr: "Dev",month:11, days:31},
       ];

       //Get all of the days from months before the current month;
       let months=DAY_MAP.filter((entry,index)=>index<month);

       //Sum them up
       let dateNumber = months.reduceRight((total,entry)=>total+entry.days,0);

       //Add the date from the current month
       dateNumber+=date;

       //Return the cummulative date number for the month date combo;
       return dateNumber;
     }
  },
  {
    id:"2",
    description:"Go on that hike",
    workflowID:"",
    workflowIndex:null,
    categoryID:"1",
    color:"#d946ef",
    active:true,
    horizonID:"THIS_MONTH",
    frequency:"ONCE",
    frequencyText:"One Time",
    weekdays:[],
    duedate:new Date(),
    deadline:{
      hours:17,
      minutes:0,
    },
    didits:[],
    didit:function (timestamp){
      //Function to update the didit status for recurring tasks
      //Push a new timestamp to the logs of 'completed timestamps'
      //While I dont see a reason why you would 'do' inactive one time didits, I guess it could be a future use case where you say 'hey youve done these things a bunch maybe make it a workflow'
      try{
        //If it was ONCE, set active to false
        if(this.active && this.frequency==="ONCE"){
          this.active=false;
        }

        //You Didit!!!
        if(timestamp){

          //Create a new didit
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(timestamp),duedate:String(this.duedate.getTime())};

          //Add the timestamp
          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with provided timestamp", data:this.timestamps});
          return({status:"Success", message:"Added new Didit timestamp", data:this.timestamps});
        }else{
          //Add the timestamp
          let now = new Date();
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(now.getTime()),duedate:String(this.duedate.getTime())};

          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with current time", data:this.didits});
          return({status:"Success", message:"Added new Didit timestamp", data:this.didits});
        }
      }catch(err){
        console.log({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
        return({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
      }
    },
    occursOnDate:function(day,month,year,dayNum){
      let selected = false;
      let testDate = new Date();
      testDate.setDate(day);
      testDate.setMonth(month);
      testDate.setFullYear(year);

      //If the weekday is included, it is selected if it is after the current date
      if(this.weekdays.includes(dayNum) && testDate>=new Date()){
        selected=true;
      }

      //If the day is the due date, it should be selected
      if(this.duedate.getDate()===day&&this.duedate.getMonth()===month&&this.duedate.getFullYear()===year){
        selected=true;
      }

      //If the goal is monthly and recurs on the given date, it should be selected
      if(this.frequency==='MONTHLY' && this.duedate.getDate()===day){
        selected=true;
      }

      if(this.frequency==='ANNUALLY' && this.duedate.getDate()===day && this.duedate.getMonth()===month){
        selected=true;
      }

      return selected;
    },
    setNextDate:function (){
      //Update the didit's next date object based on its recurring frequency and time stamp
      try{
        //If the didit isnt active, then there is nothing to do
        if(this.active===false){
          console.log({status:"Success",message:"Calculated next date for didit", data:this.duedate});
          return ({status:"Success",message:"Calculated next date for didit", data:this.duedate});
        }else{
          //Initialize the current date and a 'next' dealine date object
          let newDeadline = this.duedate;

          //If Uninitialized, initialize it
          if (newDeadline===null){
            //Create a new date
            newDeadline = new Date();

            //Set the hours and minutes from the deadline
            newDeadline.setUTCHours(this.deadline.hours);
            newDeadline.setUTCMinutes(this.deadline.minutes);
            newDeadline.setUTCSeconds(0,0);
          }else{
            //Otherwise, just update the didit object
            switch (this.frequency){
              case "ONCE":
                //Do nothing, it only had one due date, so set active status to false
                break;
              case "DAILY":
                //Add one to the date
                newDeadline.setUTCDate(newDeadline.getUTCDate()+1);
                break;
              case "WEEKLY":
                //Get the next 'date of the week'
                let weekdays = this.weekdays;

                //This will be the weekday number of the 'last set' due date
                let currentWeekday = newDeadline.getDay();

                //If there are weekdays flagged for recurring didits, then find the next day; Otherwise loop around again
                //Weekdays: [0,1,2,3,4,5,6];
                //Weekdays: [1];
                if (weekdays.length && weekdays.length>0){
                  let currentIndex = weekdays.indexOf(currentWeekday)||0;
                  let difference = 0;
                  //If its the last one in the array, reset to the first, otherwise increment by the difference
                  if(currentIndex===weekdays.length-1){
                    //Grab the first weekday from the array
                    let nextWeekday = weekdays[0];
                    difference = (nextWeekday+7)-currentWeekday;
                  }else{
                    let nextWeekday = weekdays[currentIndex+1];
                    difference = nextWeekday-currentWeekday;
                  }

                  //Update the weekday
                  newDeadline.setUTCDate(newDeadline.getUTCDate()+difference);

                }else{
                  console.log({status:"Error",message:"No weekdays set for weekly recurrance",error:"Weekdays not set for weekly recurring didit"});
                }

                break;
              case "MONTHLY":
                //Note: Need to update for 'Last date of the month' errors
                //Add one to the month
                newDeadline.setUTCMonth(newDeadline.getUTCMonth()+1);
                break;
              case "ANNUALLY":
                //Add one to the date
                newDeadline.setUTCFullYear(newDeadline.getUTCFullYear()+1);
                break;
              default:

                break;

            }
          }

          console.log({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});

          //Update the didit object
          this.duedate=newDeadline;
          return ({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});
        }
      }catch(err){
        console.log({status:"Error",message:"Error calculating next date for didit", error:err});
        return ({status:"Error",message:"Error calculating next date for didit", error:err});
      }
    },
    updateDeadline: function(hours,minutes){
      if(hours>=0 && hours<=23 && minutes>=0 && minutes <60){
        this.deadline.hours=hours;
        this.deadline.minutes=minutes;
        this.duedate.setUTCHours(hours);
        this.duedate.setUTCMinutes(minutes);
        return true;
      }else{
        console.log({status:"Error", message:"Unable to update deadline with invalid hours and minutes. Hours must be [0-23] and minutes must be [0-59].",data:{hours:hours, minutes:minutes}})
        return false;
      }
    },
    updateWeekdays: function(weekdays){
      //If you get a blank array, then assume it is 1 time only
      if(Array.isArray(weekdays) && weekdays.length===0){
        this.frequency = "ONCE"
        this.frequencyText="One Time"
        this.weekdays=[];
        this.recurring=false;
      }else{
        let validWeekdays = true;

        //Test all weekdays in the array to make sure that they weekdays are valid;
        weekdays.every((entry)=>{if (entry<0 || entry>6){validWeekdays=false; return false} return true});

        if(validWeekdays){
          //Update the frequency to WEEKLY
          this.frequency="WEEKLY";

          //Ensure that it is always sorted least to most
          this.weekdays=weekdays.sort((a,b)=>{if(a<b){return -1}else if(a>b){return 1}else{return 0}});

          //Update the Frequency text
          if(weekdays.length===7){
            this.frequencyText = "Every Day"
          }else if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)){
            this.frequencyText = "Every Weekday"
          }else if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)){
            this.frequencyText = "Every Weekend"
          }else{
            let frequencyText = "Every";
            let DAY_MAP={
              "0":"Sunday",
              "1":"Monday",
              "2":"Tuesday",
              "3":"Wednesday",
              "4":"Thursday",
              "5":"Friday",
              "6":"Saturday"
            }
            weekdays.forEach((day,index)=>{
              frequencyText=frequencyText+" "+DAY_MAP[day];

              if(index!==weekdays.length-1){
                frequencyText=frequencyText+",";
              }
            });

            this.frequencyText=frequencyText;
          }

          //Update the current goal due date with the first valid week day from today (assume you are building a new workflow)
          //[0,1,2,3,4,5,6]
          //[-------^-----]
          let duedate = new Date();
          let foundMatch = false;

          //Loop through the one weeks worth of days to find the the day
          for(let index=0; index<7; index++){
            if(!foundMatch){
              if(this.weekdays.includes(duedate.getDay())){
                this.duedate=duedate;
                foundMatch=true;
              }else{
                duedate.setDate(duedate.getDate()+1);
              }
            }
          }

          return true;
        }else{
          console.log({status:"Error", message:"Unable to update weekdays with invalid days. Date numbers must be [0-6].",data:{weekdays}})
          return false;
        }
      }
    },
    updateTimeHorizon: function(){
      try{
        //Init the time horizons for each didit
        let today = new Date();
        let year = today.getFullYear();
        let todaysDateNumber = this.getDateNumberFromMonthAndDate(today.getMonth(),today.getDate());
        let todaysDayNumber = today.getDay();

        let duedateDateNumber = this.getDateNumberFromMonthAndDate(this.duedate.getMonth(),this.duedate.getDate());
        let duedateYear = this.duedate.getFullYear();
        let duedateDayNumber = this.duedate.getDay();

        //Assume everything is due sometime. Overwrite the time horizon if one of the other horizons apply
        this.horizonID="SOMETIME"

        //If the didit is a day old, its late
        if((duedateDateNumber<todaysDateNumber && year===duedateYear)||duedateYear<year){
          this.horizonID="LATE"
        }

        //If the didit is due this month, not due this week, and not late then its due this Month
        if(this.duedate.getMonth()===today.getMonth() && duedateDateNumber>todaysDateNumber && year===this.duedate.getFullYear()){
          this.horizonID="THIS_MONTH"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share the same years)
        //[0,1,2,3,4,5,6]
        if((duedateYear===year && duedateDateNumber>todaysDateNumber&&duedateDateNumber-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share they wrap around years)
        if((duedateYear-year===1 && (duedateDateNumber+365)-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due today, its today
        if(todaysDateNumber===duedateDateNumber && year===duedateYear){
          this.horizonID="TODAY"
        }
        console.log({status:"Success", message:"Updated time horizon", error:""});
        console.log(this);
      }catch(err){
        console.log({status:"Error", message:"Error updating the time horizon", error:err});
      }
    },
    getDateNumberFromMonthAndDate: function (month,date){
       let DAY_MAP = [
         {id:"January", abr: "Jan",month:0, days:31},
         {id:"February", abr: "Feb",month:1,days:28},
         {id:"March", abr: "Mar",month:2, days:31},
         {id:"April", abr: "Apr",month:3, days:30},
         {id:"May", abr: "May",month:4, days:31},
         {id:"June", abr: "Jun",month:5, days:30},
         {id:"July", abr: "Jul",month:6, days:31},
         {id:"August", abr: "Aug",month:7, days:31},
         {id:"September", abr: "Sep",month:8, days:30},
         {id:"October", abr: "Oct",month:9, days:31},
         {id:"November", abr: "Nov",month:10, days:30},
         {id:"December", abr: "Dev",month:11, days:31},
       ];

       //Get all of the days from months before the current month;
       let months=DAY_MAP.filter((entry,index)=>index<month);

       //Sum them up
       let dateNumber = months.reduceRight((total,entry)=>total+entry.days,0);

       //Add the date from the current month
       dateNumber+=date;

       //Return the cummulative date number for the month date combo;
       return dateNumber;
     }
  },
  {
    id:"3",
    description:"Learn to fly",
    workflowID:"",
    workflowIndex:null,
    categoryID:"7",
    color:"#fde047",
    active:true,
    horizonID:"SOMETIME",
    frequency:"ONCE",
    frequencyText:"One Time",
    weekdays:[],
    duedate:new Date(),
    deadline:{
      hours:17,
      minutes:0,
    },
    didits:[],
    didit:function (timestamp){
      //Function to update the didit status for recurring tasks
      //Push a new timestamp to the logs of 'completed timestamps'
      //While I dont see a reason why you would 'do' inactive one time didits, I guess it could be a future use case where you say 'hey youve done these things a bunch maybe make it a workflow'
      try{
        //If it was ONCE, set active to false
        if(this.active && this.frequency==="ONCE"){
          this.active=false;
        }

        //You Didit!!!
        if(timestamp){

          //Create a new didit
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(timestamp),duedate:String(this.duedate.getTime())};

          //Add the timestamp
          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with provided timestamp", data:this.timestamps});
          return({status:"Success", message:"Added new Didit timestamp", data:this.timestamps});
        }else{
          //Add the timestamp
          let now = new Date();
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(now.getTime()),duedate:String(this.duedate.getTime())};

          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with current time", data:this.didits});
          return({status:"Success", message:"Added new Didit timestamp", data:this.didits});
        }
      }catch(err){
        console.log({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
        return({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
      }
    },
    occursOnDate:function(day,month,year,dayNum){
      let selected = false;
      let testDate = new Date();
      testDate.setDate(day);
      testDate.setMonth(month);
      testDate.setFullYear(year);

      //If the weekday is included, it is selected if it is after the current date
      if(this.weekdays.includes(dayNum) && testDate>=new Date()){
        selected=true;
      }

      //If the day is the due date, it should be selected
      if(this.duedate.getDate()===day&&this.duedate.getMonth()===month&&this.duedate.getFullYear()===year){
        selected=true;
      }

      //If the goal is monthly and recurs on the given date, it should be selected
      if(this.frequency==='MONTHLY' && this.duedate.getDate()===day){
        selected=true;
      }

      if(this.frequency==='ANNUALLY' && this.duedate.getDate()===day && this.duedate.getMonth()===month){
        selected=true;
      }

      return selected;
    },
    setNextDate:function (){
      //Update the didit's next date object based on its recurring frequency and time stamp
      try{
        //If the didit isnt active, then there is nothing to do
        if(this.active===false){
          console.log({status:"Success",message:"Calculated next date for didit", data:this.duedate});
          return ({status:"Success",message:"Calculated next date for didit", data:this.duedate});
        }else{
          //Initialize the current date and a 'next' dealine date object
          let newDeadline = this.duedate;

          //If Uninitialized, initialize it
          if (newDeadline===null){
            //Create a new date
            newDeadline = new Date();

            //Set the hours and minutes from the deadline
            newDeadline.setUTCHours(this.deadline.hours);
            newDeadline.setUTCMinutes(this.deadline.minutes);
            newDeadline.setUTCSeconds(0,0);
          }else{
            //Otherwise, just update the didit object
            switch (this.frequency){
              case "ONCE":
                //Do nothing, it only had one due date, so set active status to false
                break;
              case "DAILY":
                //Add one to the date
                newDeadline.setUTCDate(newDeadline.getUTCDate()+1);
                break;
              case "WEEKLY":
                //Get the next 'date of the week'
                let weekdays = this.weekdays;

                //This will be the weekday number of the 'last set' due date
                let currentWeekday = newDeadline.getDay();

                //If there are weekdays flagged for recurring didits, then find the next day; Otherwise loop around again
                //Weekdays: [0,1,2,3,4,5,6];
                //Weekdays: [1];
                if (weekdays.length && weekdays.length>0){
                  let currentIndex = weekdays.indexOf(currentWeekday)||0;
                  let difference = 0;
                  //If its the last one in the array, reset to the first, otherwise increment by the difference
                  if(currentIndex===weekdays.length-1){
                    //Grab the first weekday from the array
                    let nextWeekday = weekdays[0];
                    difference = (nextWeekday+7)-currentWeekday;
                  }else{
                    let nextWeekday = weekdays[currentIndex+1];
                    difference = nextWeekday-currentWeekday;
                  }

                  //Update the weekday
                  newDeadline.setUTCDate(newDeadline.getUTCDate()+difference);

                }else{
                  console.log({status:"Error",message:"No weekdays set for weekly recurrance",error:"Weekdays not set for weekly recurring didit"});
                }

                break;
              case "MONTHLY":
                //Note: Need to update for 'Last date of the month' errors
                //Add one to the month
                newDeadline.setUTCMonth(newDeadline.getUTCMonth()+1);
                break;
              case "ANNUALLY":
                //Add one to the date
                newDeadline.setUTCFullYear(newDeadline.getUTCFullYear()+1);
                break;
              default:

                break;

            }
          }

          console.log({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});

          //Update the didit object
          this.duedate=newDeadline;
          return ({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});
        }
      }catch(err){
        console.log({status:"Error",message:"Error calculating next date for didit", error:err});
        return ({status:"Error",message:"Error calculating next date for didit", error:err});
      }
    },
    updateDeadline: function(hours,minutes){
      if(hours>=0 && hours<=23 && minutes>=0 && minutes <60){
        this.deadline.hours=hours;
        this.deadline.minutes=minutes;
        this.duedate.setUTCHours(hours);
        this.duedate.setUTCMinutes(minutes);
        return true;
      }else{
        console.log({status:"Error", message:"Unable to update deadline with invalid hours and minutes. Hours must be [0-23] and minutes must be [0-59].",data:{hours:hours, minutes:minutes}})
        return false;
      }
    },
    updateWeekdays: function(weekdays){
      //If you get a blank array, then assume it is 1 time only
      if(Array.isArray(weekdays) && weekdays.length===0){
        this.frequency = "ONCE"
        this.frequencyText="One Time"
        this.weekdays=[];
        this.recurring=false;
      }else{
        let validWeekdays = true;

        //Test all weekdays in the array to make sure that they weekdays are valid;
        weekdays.every((entry)=>{if (entry<0 || entry>6){validWeekdays=false; return false} return true});

        if(validWeekdays){
          //Update the frequency to WEEKLY
          this.frequency="WEEKLY";

          //Ensure that it is always sorted least to most
          this.weekdays=weekdays.sort((a,b)=>{if(a<b){return -1}else if(a>b){return 1}else{return 0}});

          //Update the Frequency text
          if(weekdays.length===7){
            this.frequencyText = "Every Day"
          }else if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)){
            this.frequencyText = "Every Weekday"
          }else if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)){
            this.frequencyText = "Every Weekend"
          }else{
            let frequencyText = "Every";
            let DAY_MAP={
              "0":"Sunday",
              "1":"Monday",
              "2":"Tuesday",
              "3":"Wednesday",
              "4":"Thursday",
              "5":"Friday",
              "6":"Saturday"
            }
            weekdays.forEach((day,index)=>{
              frequencyText=frequencyText+" "+DAY_MAP[day];

              if(index!==weekdays.length-1){
                frequencyText=frequencyText+",";
              }
            });

            this.frequencyText=frequencyText;
          }

          //Update the current goal due date with the first valid week day from today (assume you are building a new workflow)
          //[0,1,2,3,4,5,6]
          //[-------^-----]
          let duedate = new Date();
          let foundMatch = false;

          //Loop through the one weeks worth of days to find the the day
          for(let index=0; index<7; index++){
            if(!foundMatch){
              if(this.weekdays.includes(duedate.getDay())){
                this.duedate=duedate;
                foundMatch=true;
              }else{
                duedate.setDate(duedate.getDate()+1);
              }
            }
          }

          return true;
        }else{
          console.log({status:"Error", message:"Unable to update weekdays with invalid days. Date numbers must be [0-6].",data:{weekdays}})
          return false;
        }
      }
    },
    updateTimeHorizon: function(){
      try{
        //Init the time horizons for each didit
        let today = new Date();
        let year = today.getFullYear();
        let todaysDateNumber = this.getDateNumberFromMonthAndDate(today.getMonth(),today.getDate());
        let todaysDayNumber = today.getDay();

        let duedateDateNumber = this.getDateNumberFromMonthAndDate(this.duedate.getMonth(),this.duedate.getDate());
        let duedateYear = this.duedate.getFullYear();
        let duedateDayNumber = this.duedate.getDay();

        //Assume everything is due sometime. Overwrite the time horizon if one of the other horizons apply
        this.horizonID="SOMETIME"

        //If the didit is a day old, its late
        if((duedateDateNumber<todaysDateNumber && year===duedateYear)||duedateYear<year){
          this.horizonID="LATE"
        }

        //If the didit is due this month, not due this week, and not late then its due this Month
        if(this.duedate.getMonth()===today.getMonth() && duedateDateNumber>todaysDateNumber && year===this.duedate.getFullYear()){
          this.horizonID="THIS_MONTH"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share the same years)
        //[0,1,2,3,4,5,6]
        if((duedateYear===year && duedateDateNumber>todaysDateNumber&&duedateDateNumber-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share they wrap around years)
        if((duedateYear-year===1 && (duedateDateNumber+365)-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due today, its today
        if(todaysDateNumber===duedateDateNumber && year===duedateYear){
          this.horizonID="TODAY"
        }
        console.log({status:"Success", message:"Updated time horizon", error:""});
        console.log(this);
      }catch(err){
        console.log({status:"Error", message:"Error updating the time horizon", error:err});
      }
    },
    getDateNumberFromMonthAndDate: function (month,date){
       let DAY_MAP = [
         {id:"January", abr: "Jan",month:0, days:31},
         {id:"February", abr: "Feb",month:1,days:28},
         {id:"March", abr: "Mar",month:2, days:31},
         {id:"April", abr: "Apr",month:3, days:30},
         {id:"May", abr: "May",month:4, days:31},
         {id:"June", abr: "Jun",month:5, days:30},
         {id:"July", abr: "Jul",month:6, days:31},
         {id:"August", abr: "Aug",month:7, days:31},
         {id:"September", abr: "Sep",month:8, days:30},
         {id:"October", abr: "Oct",month:9, days:31},
         {id:"November", abr: "Nov",month:10, days:30},
         {id:"December", abr: "Dev",month:11, days:31},
       ];

       //Get all of the days from months before the current month;
       let months=DAY_MAP.filter((entry,index)=>index<month);

       //Sum them up
       let dateNumber = months.reduceRight((total,entry)=>total+entry.days,0);

       //Add the date from the current month
       dateNumber+=date;

       //Return the cummulative date number for the month date combo;
       return dateNumber;
     }
  },
  {
    id:"4",
    description:"Create your first goal",
    workflowID:"",
    workflowIndex:null,
    categoryID:"1",
    color:"#0ea5e9",
    active:true,
    horizonID:"TODAY",
    frequency:"ONCE",
    frequencyText:"One Time",
    weekdays:[],
    duedate:new Date(),
    deadline:{
      hours:17,
      minutes:0,
    },
    didits:[],
    didit:function (timestamp){
      //Function to update the didit status for recurring tasks
      //Push a new timestamp to the logs of 'completed timestamps'
      //While I dont see a reason why you would 'do' inactive one time didits, I guess it could be a future use case where you say 'hey youve done these things a bunch maybe make it a workflow'
      try{
        //If it was ONCE, set active to false
        if(this.active && this.frequency==="ONCE"){
          this.active=false;
        }

        //You Didit!!!
        if(timestamp){

          //Create a new didit
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(timestamp),duedate:String(this.duedate.getTime())};

          //Add the timestamp
          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with provided timestamp", data:this.timestamps});
          return({status:"Success", message:"Added new Didit timestamp", data:this.timestamps});
        }else{
          //Add the timestamp
          let now = new Date();
          let newDidit = {goalID:this.id, userID:"AK special",timestamp:String(now.getTime()),duedate:String(this.duedate.getTime())};

          this.didits.push(newDidit);

          //Refresh the didit's next date
          this.setNextDate();

          //Return
          console.log({status:"Success", message:"Added new Didit with current time", data:this.didits});
          return({status:"Success", message:"Added new Didit timestamp", data:this.didits});
        }
      }catch(err){
        console.log({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
        return({status:"Error", message:"Error Adding new Didit with provided timestamp", error:err});
      }
    },
    occursOnDate:function(day,month,year,dayNum){
      let selected = false;
      let testDate = new Date();
      testDate.setDate(day);
      testDate.setMonth(month);
      testDate.setFullYear(year);

      //If the weekday is included, it is selected if it is after the current date
      if(this.weekdays.includes(dayNum) && testDate>=new Date()){
        selected=true;
      }

      //If the day is the due date, it should be selected
      if(this.duedate.getDate()===day&&this.duedate.getMonth()===month&&this.duedate.getFullYear()===year){
        selected=true;
      }

      //If the goal is monthly and recurs on the given date, it should be selected
      if(this.frequency==='MONTHLY' && this.duedate.getDate()===day){
        selected=true;
      }

      if(this.frequency==='ANNUALLY' && this.duedate.getDate()===day && this.duedate.getMonth()===month){
        selected=true;
      }

      return selected;
    },
    setNextDate:function (){
      //Update the didit's next date object based on its recurring frequency and time stamp
      try{
        //If the didit isnt active, then there is nothing to do
        if(this.active===false){
          console.log({status:"Success",message:"Calculated next date for didit", data:this.duedate});
          return ({status:"Success",message:"Calculated next date for didit", data:this.duedate});
        }else{
          //Initialize the current date and a 'next' dealine date object
          let newDeadline = this.duedate;

          //If Uninitialized, initialize it
          if (newDeadline===null){
            //Create a new date
            newDeadline = new Date();

            //Set the hours and minutes from the deadline
            newDeadline.setUTCHours(this.deadline.hours);
            newDeadline.setUTCMinutes(this.deadline.minutes);
            newDeadline.setUTCSeconds(0,0);
          }else{
            //Otherwise, just update the didit object
            switch (this.frequency){
              case "ONCE":
                //Do nothing, it only had one due date, so set active status to false
                break;
              case "DAILY":
                //Add one to the date
                newDeadline.setUTCDate(newDeadline.getUTCDate()+1);
                break;
              case "WEEKLY":
                //Get the next 'date of the week'
                let weekdays = this.weekdays;

                //This will be the weekday number of the 'last set' due date
                let currentWeekday = newDeadline.getDay();

                //If there are weekdays flagged for recurring didits, then find the next day; Otherwise loop around again
                //Weekdays: [0,1,2,3,4,5,6];
                //Weekdays: [1];
                if (weekdays.length && weekdays.length>0){
                  let currentIndex = weekdays.indexOf(currentWeekday)||0;
                  let difference = 0;
                  //If its the last one in the array, reset to the first, otherwise increment by the difference
                  if(currentIndex===weekdays.length-1){
                    //Grab the first weekday from the array
                    let nextWeekday = weekdays[0];
                    difference = (nextWeekday+7)-currentWeekday;
                  }else{
                    let nextWeekday = weekdays[currentIndex+1];
                    difference = nextWeekday-currentWeekday;
                  }

                  //Update the weekday
                  newDeadline.setUTCDate(newDeadline.getUTCDate()+difference);

                }else{
                  console.log({status:"Error",message:"No weekdays set for weekly recurrance",error:"Weekdays not set for weekly recurring didit"});
                }

                break;
              case "MONTHLY":
                //Note: Need to update for 'Last date of the month' errors
                //Add one to the month
                newDeadline.setUTCMonth(newDeadline.getUTCMonth()+1);
                break;
              case "ANNUALLY":
                //Add one to the date
                newDeadline.setUTCFullYear(newDeadline.getUTCFullYear()+1);
                break;
              default:

                break;

            }
          }

          console.log({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});

          //Update the didit object
          this.duedate=newDeadline;
          return ({status:"Success",message:"Updated the next due date for the didit", data:newDeadline});
        }
      }catch(err){
        console.log({status:"Error",message:"Error calculating next date for didit", error:err});
        return ({status:"Error",message:"Error calculating next date for didit", error:err});
      }
    },
    updateDeadline: function(hours,minutes){
      if(hours>=0 && hours<=23 && minutes>=0 && minutes <60){
        this.deadline.hours=hours;
        this.deadline.minutes=minutes;
        this.duedate.setUTCHours(hours);
        this.duedate.setUTCMinutes(minutes);
        return true;
      }else{
        console.log({status:"Error", message:"Unable to update deadline with invalid hours and minutes. Hours must be [0-23] and minutes must be [0-59].",data:{hours:hours, minutes:minutes}})
        return false;
      }
    },
    updateWeekdays: function(weekdays){
      //If you get a blank array, then assume it is 1 time only
      if(Array.isArray(weekdays) && weekdays.length===0){
        this.frequency = "ONCE"
        this.frequencyText="One Time"
        this.weekdays=[];
        this.recurring=false;
      }else{
        let validWeekdays = true;

        //Test all weekdays in the array to make sure that they weekdays are valid;
        weekdays.every((entry)=>{if (entry<0 || entry>6){validWeekdays=false; return false} return true});

        if(validWeekdays){
          //Update the frequency to WEEKLY
          this.frequency="WEEKLY";

          //Ensure that it is always sorted least to most
          this.weekdays=weekdays.sort((a,b)=>{if(a<b){return -1}else if(a>b){return 1}else{return 0}});

          //Update the Frequency text
          if(weekdays.length===7){
            this.frequencyText = "Every Day"
          }else if (weekdays.length === 5 && !weekdays.includes(0) && !weekdays.includes(6)){
            this.frequencyText = "Every Weekday"
          }else if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)){
            this.frequencyText = "Every Weekend"
          }else{
            let frequencyText = "Every";
            let DAY_MAP={
              "0":"Sunday",
              "1":"Monday",
              "2":"Tuesday",
              "3":"Wednesday",
              "4":"Thursday",
              "5":"Friday",
              "6":"Saturday"
            }
            weekdays.forEach((day,index)=>{
              frequencyText=frequencyText+" "+DAY_MAP[day];

              if(index!==weekdays.length-1){
                frequencyText=frequencyText+",";
              }
            });

            this.frequencyText=frequencyText;
          }

          //Update the current goal due date with the first valid week day from today (assume you are building a new workflow)
          //[0,1,2,3,4,5,6]
          //[-------^-----]
          let duedate = new Date();
          let foundMatch = false;

          //Loop through the one weeks worth of days to find the the day
          for(let index=0; index<7; index++){
            if(!foundMatch){
              if(this.weekdays.includes(duedate.getDay())){
                this.duedate=duedate;
                foundMatch=true;
              }else{
                duedate.setDate(duedate.getDate()+1);
              }
            }
          }

          return true;
        }else{
          console.log({status:"Error", message:"Unable to update weekdays with invalid days. Date numbers must be [0-6].",data:{weekdays}})
          return false;
        }
      }
    },
    updateTimeHorizon: function(){
      try{
        //Init the time horizons for each didit
        let today = new Date();
        let year = today.getFullYear();
        let todaysDateNumber = this.getDateNumberFromMonthAndDate(today.getMonth(),today.getDate());
        let todaysDayNumber = today.getDay();

        let duedateDateNumber = this.getDateNumberFromMonthAndDate(this.duedate.getMonth(),this.duedate.getDate());
        let duedateYear = this.duedate.getFullYear();
        let duedateDayNumber = this.duedate.getDay();

        //Assume everything is due sometime. Overwrite the time horizon if one of the other horizons apply
        this.horizonID="SOMETIME"

        //If the didit is a day old, its late
        if((duedateDateNumber<todaysDateNumber && year===duedateYear)||duedateYear<year){
          this.horizonID="LATE"
        }

        //If the didit is due this month, not due this week, and not late then its due this Month
        if(this.duedate.getMonth()===today.getMonth() && duedateDateNumber>todaysDateNumber && year===this.duedate.getFullYear()){
          this.horizonID="THIS_MONTH"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share the same years)
        //[0,1,2,3,4,5,6]
        if((duedateYear===year && duedateDateNumber>todaysDateNumber&&duedateDateNumber-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due this week (e.g. use week num) its this week (case where they share they wrap around years)
        if((duedateYear-year===1 && (duedateDateNumber+365)-todaysDateNumber<6 && (todaysDayNumber<duedateDayNumber||duedateDayNumber===0))){
          this.horizonID="THIS_WEEK"
        }

        //If the didit is due today, its today
        if(todaysDateNumber===duedateDateNumber && year===duedateYear){
          this.horizonID="TODAY"
        }
        console.log({status:"Success", message:"Updated time horizon", error:""});
        console.log(this);
      }catch(err){
        console.log({status:"Error", message:"Error updating the time horizon", error:err});
      }
    },
    getDateNumberFromMonthAndDate: function (month,date){
       let DAY_MAP = [
         {id:"January", abr: "Jan",month:0, days:31},
         {id:"February", abr: "Feb",month:1,days:28},
         {id:"March", abr: "Mar",month:2, days:31},
         {id:"April", abr: "Apr",month:3, days:30},
         {id:"May", abr: "May",month:4, days:31},
         {id:"June", abr: "Jun",month:5, days:30},
         {id:"July", abr: "Jul",month:6, days:31},
         {id:"August", abr: "Aug",month:7, days:31},
         {id:"September", abr: "Sep",month:8, days:30},
         {id:"October", abr: "Oct",month:9, days:31},
         {id:"November", abr: "Nov",month:10, days:30},
         {id:"December", abr: "Dev",month:11, days:31},
       ];

       //Get all of the days from months before the current month;
       let months=DAY_MAP.filter((entry,index)=>index<month);

       //Sum them up
       let dateNumber = months.reduceRight((total,entry)=>total+entry.days,0);

       //Add the date from the current month
       dateNumber+=date;

       //Return the cummulative date number for the month date combo;
       return dateNumber;
     }
  },
];

const DEADLINES = [
  {hours:0, minutes:0},
  {hours:1, minutes:0},
  {hours:2, minutes:0},
  {hours:3, minutes:0},
  {hours:4, minutes:0},
  {hours:5, minutes:0},
  {hours:6, minutes:0},
  {hours:7, minutes:0},
  {hours:8, minutes:0},
  {hours:9, minutes:0},
  {hours:10, minutes:0},
  {hours:11, minutes:0},
  {hours:12, minutes:0},
  {hours:13, minutes:0},
  {hours:14, minutes:0},
  {hours:15, minutes:0},
  {hours:16, minutes:0},
  {hours:17, minutes:0},
  {hours:18, minutes:0},
  {hours:19, minutes:0},
  {hours:20, minutes:0},
  {hours:21, minutes:0},
  {hours:22, minutes:0},
  {hours:23, minutes:0},
]

const CADENCES = [
  {id:-1, text:"Once"},
  {id:1, text:"Mondays"},
  {id:2, text:"Tuesdays"},
  {id:3, text:"Wednesdays"},
  {id:4, text:"Thursdays"},
  {id:5, text:"Fridays"},
  {id:6, text:"Saturdays"},
  {id:0, text:"Sundays"},
  {id:-2, text:"Monthly"},
  {id:-3, text:"Annually"},
]

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

const HOURS = {
  "0":"12 AM",
  "6":"6 AM",
  "8":"8 AM",
  "10":"10 PM",
  "12":"12 PM",
  "14":"2 PM",
  "16":"4 PM",
  "18":"6 PM",
}

//Some time horizons for when you should do it. This probablly lives in the front end
const INSIGHT_LEVELS = {
  'WORK_DAY':{id:"WORK_DAY", text:"Hourly", periods:7,  getTitle:(startDate)=>{return WEEKDAY_SEGMENTS.segments[String(startDate.getUTCDay())].title}, getPeriodTitle:(startDate)=>{return HOURS[String(startDate.getUTCHours())]},incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); newDate.setUTCHours(newDate.getUTCHours()+2); return newDate;}},
  'DAY':{id:"DAY", text:"Daily", periods:4, getTitle:(startDate)=>{return WEEKDAY_SEGMENTS.segments[String(startDate.getUTCDay())].title}, getPeriodTitle:(startDate)=>{return HOURS[String(startDate.getUTCHours())]},incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); newDate.setUTCHours(newDate.getUTCHours()+6); return newDate;}},
  'WEEK':{id:"WEEK", text:"Weekly", periods:7, getTitle:(startDate)=>{return String((startDate.getUTCMonth()+1)+"/"+startDate.getUTCDate())}, getPeriodTitle:(startDate)=>{return WEEKDAY_SEGMENTS.segments[startDate.getUTCDay()].periodTitle},incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); newDate.setUTCDate(newDate.getUTCDate()+1); return newDate;}},
  'MONTH':{id:"MONTH", text:"Monthly", periods:5, getTitle:(startDate)=>{return MONTH_NAMES[String(startDate.getUTCMonth())]}, getPeriodTitle:(startDate)=>{return String((startDate.getUTCMonth()+1)+"/"+startDate.getUTCDate())}, incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); newDate.setUTCDate(newDate.getUTCDate()+7); return newDate;}},
  'QUARTER':{id:"QUARTER", text:"Quarterly", periods:3, getTitle:(startDate)=>{let month=startDate.getMonth(); if(month>=0&&month<3){return String("Q1 - "+startDate.getUTCFullYear())}; if(month>=3&&month<6){return String("Q2 - "+startDate.getUTCFullYear())}; if(month>=6&&month<9){return String("Q3 - "+startDate.getUTCFullYear())}; if(month>=9&&month<12){return String("Q4 - "+startDate.getUTCFullYear())};}, getPeriodTitle:(startDate)=>{return MONTH_NAMES[startDate.getUTCMonth()].slice(0,3)},incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); newDate.setUTCMonth(newDate.getUTCMonth()+1); return newDate;}},
  'YEAR':{id:"YEAR", text:"Annually", periods:4, getTitle:(startDate)=>{return startDate.getUTCFullYear()}, getPeriodTitle:(startDate)=>{let month=startDate.getMonth(); if(month>=0&&month<3){return "Q1"}; if(month>=3&&month<6){return "Q2"}; if(month>=6&&month<9){return "Q3"}; if(month>=9&&month<12){return "Q4"};}, incrementPeriodStartDate:(startDate)=>{let newDate=new Date(startDate.getTime()); if(newDate.getUTCMonth()===11){newDate.setUTCMonth(2); newDate.setUTCFullYear(newDate.getUTCFullYear()+1);}else{newDate.setUTCMonth(newDate.getUTCMonth()+3);} return newDate;}},
}

const TEST_WORKFLOW_TIMELINE={id:"TEST", width:"100", color:"#4f46e5"}

const Timeline = (props)=>{
  //---------------------------------STATE--------------------------------------
  const MIN_TIMELINE_WIDTH_PX=39;
  const TIMELINE_EVENT_PADDING_PX=28;
  const GANTT_MIN_WIDTH_PX=18;
  const GANTT_Y_PADDING_PX=18;
  const GANTT_Y_OFFSET_PX=20;

  const [screenBlink,setScreenBlink] = useState(true);
  const [loadingData,setLoadingData] = useState(true);
  const [updatingData,setUpdatingData] = useState(true);
  const [initialized,setInitialized] = useState(false);
  const [initialTimelineEventID, setInitialTimelineEventID] = useState(null);

  //Workflow State && test workflows to mock UI / UX without data load
  const [testWorkflows,setTestWorkflows] = useState([]);

  //State variable for active timelines based on the active view
  const [activeTimelines,setActiveTimelines]=useState()

  const [insightWindow,setInsightWindow]=useState();
  const [insightLevel,setInsightLevel]=useState(INSIGHT_LEVELS['DAY']);
  const [insightTitle,setInsightTitle]=useState({text:"Summary",detail:""});

  const [showTimelineSettings,setShowTimelineSettings]=useState(false);
  const [showToday,setShowToday]=useState(false);
  const [showTimelineGantt,setShowTimelineGantt]=useState(true);
  const [showCompletedGoals,setShowCompletedGoals]=useState(true);
  const [preventOutOfBounds,setPreventOutOfBounds]=useState(true);
  const [fastForwardThroughEmptySpace,setFastForwardThroughEmptySpace]=useState(true);

  const [showViewControls,setShowViewControls] = useState(true);
  const [timelineViewID,setTimelineViewID] = useState('HORIZONS');

  const [showGoalView,setShowGoalView] = useState(false);
  const [selectedTimeline,setSelectedTimeline]=useState(null);
  const [selectedTimelineEvent,setSelectedTimelineEvent]=useState(null);
  //---------------------------------EFFECTS------------------------------------
  //Init Event Loop:
  //1a) Load Goals --> Rehydrate Goals --> Initilize Goal Timelines --> Initialize Insight Window From Goal Timelines
  //1b) Load Workflows --> Rehydrate Workflows --> Initialize Workflow Timelines

  //On Insight Window Change --> Recalculate the timeline widths for the active timeline view
  //1a) Load user goals from the DB once we get the user prop
  /*
  useEffect(()=>{
    if(props.user && props.user.userID){
      loadGoals(props.user.userID);
    }
  },[props.user]);

  //1b) Load users workflows from the DB once we get the user prop
  useEffect(()=>{
    if(props.user && props.user.userID){
      getUserWorkflows(props.user.userID);
    }
  },[props.user]);
  */

  //For Test:
  //Initialize the workflows and the time window (Initialize the test workflow first here)
  useEffect(()=>{
    initializeTestWorkflows();
  },[]);

  //1c) Toggle the show goal view if the data has finished loading
  useEffect(()=>{
    //If the activetimelines are equal to the user timelines, and the ids match, then toggle the view
    if(activeTimelines && activeTimelines.length===1 && !initialized){
      toggleShowGoalView(true);
    }

  },[activeTimelines]);

  //1d) Remove the daily welcome when you change the timeline event
  useEffect(()=>{
    if(selectedTimelineEvent && !initialTimelineEventID){
      setInitialTimelineEventID(selectedTimelineEvent.id);
    }

    if(selectedTimelineEvent && initialTimelineEventID && selectedTimelineEvent.id!==initialTimelineEventID){
      setInitialized(true)
    }
  },[selectedTimelineEvent,initialTimelineEventID])

  //Blink the screen
  useEffect(()=>{
    //Create an interval
    setTimeout(()=>{
      setScreenBlink(false);
    },200);
  },[]);

  //------------------------------RESIZE EVENT HANDLERS-------------------------
  //1) Tag the div with the appropriate ID identifier when it is selected
  //2) Update the width from the DOM node once it is selected
  //3) Attach the ref to the div to make sure the state gets updated on resizes
  const eventWindowRef = useRef();
  const [selectedTimelineEventViewWidthPX,setSelectedTimelineEventViewWidthPX] = useState(0);

  //Update the event width for selected timelines
  //Use layout effect to make sure that the you let the DOM render first, then grab the rendered element, ensuring that the ref object will not be null & reflects the rendered width
  useLayoutEffect(()=>{
    if(selectedTimeline){
      let ref = document.getElementById("activeTimelineEventWindow");
      if(ref){
        setSelectedTimelineEventViewWidthPX(ref.getBoundingClientRect().width)
      }
    }
  },[selectedTimeline]);

  //If the ref exists, and there is an offset width, then update the state with it
  window.addEventListener('resize', ()=>{if(eventWindowRef.current && eventWindowRef.current.offsetWidth){setSelectedTimelineEventViewWidthPX(eventWindowRef.current.offsetWidth)}});

  //------------------------------EVENT HANDLERS--------------------------------
  //NOTE: The goal of these event handlers is to prevent 'LOST IN SPACE'. Since there is no 'home button', we offer the user the ability to re-center at 'today' if they zoom in repeatedly, or zoom out repetedly
  //NOTE: 'Turning on the light, goal seeks the first goal closest to the currently active time horizon'. While this makes 'zooming in to the future or past more difficult', users can easily selecyt the timeline and 'skate along it to retain their bearing'

  //Initialize the state for the insights
  //InsightWindow:[startDate <= date <endDate];
  //insightWindow.endDate is the 'first non-valid time'
  const updateInsightHorizon = (activeWorkflows,horizon,startDateTimestamp,rewind,type)=>{

    //Create a new insight window for
    let newInsightWindow = {id:horizon.id,startDate:null,endDate:null, startDateTimestamp:null, endDateTimestamp:null, periods:[]};

    //Update the start date
    let endDate;

    //Shift things to 12:00AM for the provided date
    //End date is the 'first non-valid time' so the window is [startDate<=date<endDate]
    let startDate = new Date(startDateTimestamp);
    startDate.setUTCHours(0);
    startDate.setUTCMinutes(0);
    startDate.setUTCSeconds(0);
    startDate.setUTCMilliseconds(0);

    //Step the dates +-1
    if(horizon.id==='WORK_DAY'){
      startDate.setUTCHours(6);

      //Update the end date
      endDate=new Date(startDate);
      endDate.setUTCHours(20);


      //Update the title
      let title = {text:"Work Day Summary", detail:String(WEEKDAY_SEGMENTS.segments[startDate.getUTCDay()].title +" - " + (startDate.getUTCMonth()+1)+"/"+startDate.getUTCDate())};
      setInsightTitle(title);
    }

    //Step the dates +-1 day
    if(horizon.id==='DAY'){
      //Update the end date
      endDate=new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate()+1);

      //Update the title
      let title = {text:"Daily Summary", detail:String(WEEKDAY_SEGMENTS.segments[startDate.getUTCDay()].title +" - " + (startDate.getUTCMonth()+1)+"/"+startDate.getUTCDate())};
      setInsightTitle(title);
    }

    //Step the dates +-1 week
    if(horizon.id==='WEEK'){
      while(startDate.getUTCDay()!==0){
        startDate.setUTCDate(startDate.getUTCDate()-1);
      }

      //Update the end date
      endDate=new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate()+7);

      //Update the title
      let startWeekString = String(Number.parseInt(startDate.getUTCMonth()+1)+"/"+startDate.getUTCDate());
      let endWeekString = String(Number.parseInt(endDate.getUTCMonth()+1)+"/"+endDate.getUTCDate());
      let title = {text:"Weekly Summary", detail:String(startWeekString+" - "+endWeekString)};
      setInsightTitle(title);
    }

    //Step the dates +-1 Month
    if(horizon.id==='MONTH'){
      startDate.setUTCDate(1);

      //Update the end date
      endDate=new Date(startDate);
      if(endDate.getUTCMonth()===11){
        //Its the first of the new year
        endDate.setUTCMonth(0);
        endDate.setUTCFullYear(endDate.getUTCFullYear()+1);
      }else{
        //Wrap the dates forward 1 month
        endDate.setUTCMonth(endDate.getUTCMonth()+1);
      }

      let title = {text:"Monthly Summary", detail:String(MONTH_NAMES[String(startDate.getUTCMonth())]+" - "+startDate.getUTCFullYear())};
      setInsightTitle(title);
    }

    //Step the dates +-1 Quarter
    if(horizon.id==='QUARTER'){
      startDate.setUTCDate(1);

      let month = startDate.getUTCMonth();

      //Q1
      if(month>=0 && month<=2){
        startDate.setUTCMonth(0);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(3);

        //Update the title
        let title = {text:"Quarterly Summary", detail:String("Q1 - "+startDate.getUTCFullYear())};
        setInsightTitle(title);
      }

      //Q2
      if(month>=3 && month<=5){
        startDate.setUTCMonth(3);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(6);

        //Update the title
        let title = {text:"Quarterly Summary", detail:String("Q2 - "+startDate.getUTCFullYear())};
        setInsightTitle(title);
      }

      //Q3
      if(month>=6 && month<=9){
        startDate.setUTCMonth(6);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(9);

        //Update the title
        let title = {text:"Quarterly Summary", detail:String("Q3 - "+startDate.getUTCFullYear())};
        setInsightTitle(title);
      }

      //Q4
      if(month>=9 && month<=11){
        startDate.setUTCMonth(9);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(0);
        endDate.setUTCFullYear(endDate.getUTCFullYear()+1);

        //Update the title
        let title = {text:"Quarterly Summary", detail:String("Q4 - "+startDate.getUTCFullYear())};
        setInsightTitle(title);
      }
    }

    //Step the dates +-1 Year; Frame relative to the current quarter
    // Frame the current quarter as 'Q2' just so you have visibility of the previous quarter, current quarter, and upcoming quarters (seems like the right way to frame things)
    //[Q-1,Q0,Q+1,Q+2]
    if(horizon.id==='YEAR'){
      startDate.setUTCDate(1);
      let month=startDate.getUTCMonth();

      //Find the start month of the current quarter
      //Step the month back 3 months
      //Step the end date month forward 6 months

      //Q1:
      //Startdate: Q4 Y-1
      //EndDate: Q4
      if(month>=0 && month<=2){
        startDate.setUTCMonth(0);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(endDate.getUTCMonth()+6);

        //Update the title
        let title = {text:"Annual Summary", detail:String((startDate.getUTCFullYear()-1) +" - "+(startDate.getUTCFullYear()))};
        setInsightTitle(title);
      }

      //Q2
      //Startdate: Q1
      //EndDate: Q1 Y+1
      if(month>=3 && month<=5){
        startDate.setUTCMonth(3);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(endDate.getUTCMonth()+6);

        //Update the title
        let title = {text:"Annual Summary", detail:String(startDate.getUTCFullYear())};
        setInsightTitle(title);
      }

      //Q3
      //Startdate: Q2
      //EndDate: Q2 Y+1
      if(month>=6 && month<=9){
        startDate.setUTCMonth(6);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(endDate.getUTCMonth()+6);

        //Update the title
        let title = {text:"Annual Summary", detail:String(startDate.getUTCFullYear() +" - "+(startDate.getUTCFullYear()+1))};
        setInsightTitle(title);
      }

      //Q4
      //Startdate: Q3
      //EndDate: Q3 Y+1
      if(month>=9 && month<=11){
        startDate.setUTCMonth(9);

        //Update the end date
        endDate=new Date(startDate);
        endDate.setUTCMonth(endDate.getUTCMonth()+6);

        //Update the title
        let title = {text:"Annual Summary", detail:String(startDate.getUTCFullYear() +" - "+(startDate.getUTCFullYear()+1))};
        setInsightTitle(title);
      }
    }

    //Save the current goal (save will check to see if it has a valid descrition field or no )
    //Update the insight window object
    newInsightWindow.startDate=startDate;
    newInsightWindow.endDate=endDate;

    //Update the periods
    let periodStartDate=startDate;

    //Adjust start date for period labels
    if(horizon.id==='MONTH'){
      while(periodStartDate.getUTCDay()!==0){
        periodStartDate.setUTCDate(periodStartDate.getUTCDate()-1);
      }
    }

    for(let i=0; i<horizon.periods; i++){
      //Update the object
      let newStartDate = new Date(periodStartDate);
      let newEndDate =horizon.incrementPeriodStartDate(newStartDate);
      let title=horizon.getPeriodTitle(newStartDate);

      //Update the object
      let period={startDate:newStartDate, endDate:newEndDate, title:title};

      //Push the object to the period array
      newInsightWindow.periods.push(period);

      //Update the start date
      periodStartDate=newEndDate;
    }

    //Update the state
    newInsightWindow.startDateTimestamp=newInsightWindow.startDate.getTime();
    newInsightWindow.endDateTimestamp=newInsightWindow.endDate.getTime();

    setInsightWindow(newInsightWindow);
    setInsightLevel(horizon);

    if(activeWorkflows.length>0){
      updateWorkflowTimelinesWithInsightWindow(activeWorkflows,newInsightWindow,timelineViewID,rewind,showCompletedGoals,type);
    }
  }

  //Update the insight window for the given direction (e.g. shift the start period to the left (<) or right (>) one period)
  const updateInsightWindow=(activeWorkflows,activeInsightWindow,direction)=>{

    //Rotate through the view index ['Horizons, Categories'];
    let newInsightWindow = {...activeInsightWindow};
    newInsightWindow.periods=[];

    //Step the dates +-1 week
    if(activeInsightWindow.id==='DAY' || activeInsightWindow.id==='WORK_DAY'){
      if(direction==='<'){
        newInsightWindow.startDate.setUTCDate(newInsightWindow.startDate.getUTCDate()-1);
        newInsightWindow.endDate.setUTCDate(newInsightWindow.endDate.getUTCDate()-1);
      }

      if (direction==='>'){
        newInsightWindow.startDate.setUTCDate(newInsightWindow.startDate.getUTCDate()+1);
        newInsightWindow.endDate.setUTCDate(newInsightWindow.endDate.getUTCDate()+1);
      }

      let title = {text:"Daily Summary", detail:String(WEEKDAY_SEGMENTS.segments[newInsightWindow.startDate.getUTCDay()].title +" - " + (newInsightWindow.startDate.getUTCMonth()+1)+"/"+newInsightWindow.startDate.getUTCDate())};
      setInsightTitle(title);
    }

    //Step the dates +-1 week
    if(activeInsightWindow.id==='WEEK'){
      if(direction==='<'){
        newInsightWindow.endDate=new Date(newInsightWindow.startDate.getTime());
        newInsightWindow.startDate.setUTCDate(newInsightWindow.startDate.getUTCDate()-7);
      }

      if (direction==='>'){
        newInsightWindow.startDate= new Date(newInsightWindow.endDate.getTime());
        newInsightWindow.endDate.setUTCDate(newInsightWindow.endDate.getUTCDate()+7);
      }

      let startWeekString = String(Number.parseInt(newInsightWindow.startDate.getUTCMonth()+1)+"/"+newInsightWindow.startDate.getUTCDate());
      let endWeekString = String(Number.parseInt(newInsightWindow.endDate.getUTCMonth()+1)+"/"+newInsightWindow.endDate.getUTCDate());
      let title = {text:"Weekly Summary", detail:String(startWeekString+" - "+endWeekString)};
      setInsightTitle(title);
    }

    //Step the dates +-1 Month
    if(activeInsightWindow.id==='MONTH'){
      //Make sure that the start date is the first of the month
      //newInsightWindow.startDate.setUTCMonth(newInsightWindow.endDate.getUTCMonth());
      //newInsightWindow.startDate.setUTCDate(1);

      if(direction==='<'){
        newInsightWindow.endDate=new Date(newInsightWindow.startDate.getTime());
        if(newInsightWindow.startDate.getUTCMonth()===0){
          newInsightWindow.startDate.setUTCMonth(11);
          newInsightWindow.startDate.setUTCFullYear(newInsightWindow.startDate.getUTCFullYear()-1);
        }else{
          newInsightWindow.startDate.setUTCMonth(newInsightWindow.startDate.getUTCMonth()-1);
        }
      }

      if (direction==='>'){
        newInsightWindow.startDate=new Date(newInsightWindow.endDate.getTime());
        if(newInsightWindow.endDate.getUTCMonth()===11){
          newInsightWindow.endDate.setUTCMonth(0);
          newInsightWindow.endDate.setUTCFullYear(newInsightWindow.endDate.getUTCFullYear()+1);
        }else{
          newInsightWindow.endDate.setUTCMonth(newInsightWindow.endDate.getUTCMonth()+1);
        }
      }

      let title = {text:"Monthly Summary", detail:String(MONTH_NAMES[String(newInsightWindow.startDate.getUTCMonth())]+" - "+newInsightWindow.startDate.getUTCFullYear())};
      setInsightTitle(title);
    }

    //Step the dates +-1 Quarter
    if(activeInsightWindow.id==='QUARTER'){
      if(direction==='<'){
        newInsightWindow.endDate=new Date(newInsightWindow.startDate.getTime());
        if(newInsightWindow.startDate.getUTCMonth()===0){
          newInsightWindow.startDate.setUTCMonth(9);
          newInsightWindow.startDate.setUTCFullYear(newInsightWindow.startDate.getUTCFullYear()-1);
        }else{
          newInsightWindow.startDate.setUTCMonth(newInsightWindow.startDate.getUTCMonth()-3);
        }
      }

      if (direction==='>'){
        newInsightWindow.startDate=new Date(newInsightWindow.endDate.getTime());
        if(newInsightWindow.endDate.getUTCMonth()===9){
          newInsightWindow.endDate.setUTCMonth(0);
          newInsightWindow.endDate.setUTCFullYear(newInsightWindow.endDate.getUTCFullYear()+1);
        }else{
          newInsightWindow.endDate.setUTCMonth(newInsightWindow.endDate.getUTCMonth()+3);
        }
      }

      let startMonth = newInsightWindow.startDate.getUTCMonth();
      let quarter;

      if(startMonth>=0 && startMonth<=2){
        quarter='Q1';
      }
      if(startMonth>=3 && startMonth<=5){
        quarter='Q2';
      }
      if(startMonth>=6 && startMonth<=8){
        quarter='Q3';
      }
      if(startMonth>=9 && startMonth<=11){
        quarter='Q4';
      }

      let title = {text:"Quarterly Summary", detail:String(quarter+" - "+newInsightWindow.startDate.getUTCFullYear())};
      setInsightTitle(title);
    }

    //Step the dates +-1 Year
    if(activeInsightWindow.id==='YEAR'){
      if(direction==='<'){
        newInsightWindow.startDate.setUTCFullYear(newInsightWindow.startDate.getUTCFullYear()-1);
        newInsightWindow.endDate.setUTCFullYear(newInsightWindow.endDate.getUTCFullYear()-1);
      }

      if (direction==='>'){
        newInsightWindow.startDate.setUTCFullYear(newInsightWindow.startDate.getUTCFullYear()+1);
        newInsightWindow.endDate.setUTCFullYear(newInsightWindow.endDate.getUTCFullYear()+1);
      }

      let detailString;

      if(newInsightWindow.startDate.getUTCFullYear()===newInsightWindow.endDate.getUTCFullYear()){
        detailString=String(newInsightWindow.startDate.getUTCFullYear());
      }else{
        detailString=String(newInsightWindow.startDate.getUTCFullYear()+" - "+newInsightWindow.endDate.getUTCFullYear());
      }

      let title = {text:"Annual Summary", detail:detailString};
      setInsightTitle(title);
    }

    //Update the periods
    let periodStartDate= new Date(newInsightWindow.startDate.getTime());
    //Adjust start date for period labels
    if(activeInsightWindow.id==='MONTH'){
      while(periodStartDate.getUTCDay()!==0){
        periodStartDate.setUTCDate(periodStartDate.getUTCDate()-1);
      }
    }
    for(let i=0; i<INSIGHT_LEVELS[activeInsightWindow.id].periods; i++){
      //Update the object
      let newStartDate = new Date(periodStartDate);
      let newEndDate =INSIGHT_LEVELS[activeInsightWindow.id].incrementPeriodStartDate(newStartDate);
      let title=INSIGHT_LEVELS[activeInsightWindow.id].getPeriodTitle(newStartDate);

      //Update the object
      let period={startDate:newStartDate, endDate:newEndDate, title:title};

      //Push the object to the period array
      newInsightWindow.periods.push(period);

      //Update the start date
      periodStartDate=newEndDate;
    }

    //Update the state
    newInsightWindow.startDateTimestamp=newInsightWindow.startDate.getTime();
    newInsightWindow.endDateTimestamp=newInsightWindow.endDate.getTime();
    setInsightWindow(newInsightWindow);

    if(activeWorkflows.length>0){
      updateWorkflowTimelinesWithInsightWindow(activeWorkflows,newInsightWindow,timelineViewID,direction==='<',showCompletedGoals,'SCROLL');
    }
  }

  //Update the insight level for the given view
  //Zoom 'UP'or Zoom 'IN'
  const updateInsightLevel=(activeWorkflows,insightLevelID,direction)=>{

    //Find the index of the current level
    let levelIndex = Object.values(INSIGHT_LEVELS).findIndex(entry=>entry.id===insightLevelID);
    let levelCount = Object.values(INSIGHT_LEVELS).length-1;

    //Zoom up
    if(direction==='UP'){
      if(levelIndex<levelCount){
        updateInsightHorizon(activeWorkflows,Object.values(INSIGHT_LEVELS)[levelIndex+1],Date.now(),false,'ZOOM');
      }else{
        //Zoom you back to center if you just pound the zoom out button a bunch
        updateInsightHorizon(activeWorkflows,Object.values(INSIGHT_LEVELS)[levelCount],Date.now(),false,'ZOOM');
      }
    }

    //Or zoom in
    if(direction==='IN'){
      if(levelIndex>0){
        updateInsightHorizon(activeWorkflows,Object.values(INSIGHT_LEVELS)[levelIndex-1],Date.now(),false,'ZOOM');
      }else{
        //'Zoom you back to center if you just pound the zoom in button a bunch'
        updateInsightHorizon(activeWorkflows,Object.values(INSIGHT_LEVELS)[0],Date.now(),false,'ZOOM');
      }
    }

  }

  //Update the highlighted event for the given timeline
  //'Fast Forward (>>) / Reverse(<<) the insight window to the appropriate place for the insight window if the newly selected event is 'outside' the current insight window
  const updateTimelineEvent=(activeTimeline,direction)=>{
    //If the insight level is the workday level, then you have to filter the events for events from 6AM -> 6PM; Otherwise works as expected
    if(insightLevel && insightLevel.id==='WORK_DAY'){
      let workDayEvents = activeTimeline.events.filter(entry=>{let eventDate = new Date(entry.timestamp); return eventDate.getUTCHours()>=6 && eventDate.getUTCHours()<20}).sort((a,b)=>{if(a.timestamp<b.timestamp){return-1}else if(a.timestamp>b.timestamp){return 1}else{return 0}});
      let eventIndex = workDayEvents.findIndex(entry=>selectedTimelineEvent&&entry.id===selectedTimelineEvent.id);

      //If there is a selected timeline event then update it based on the direction
      if(selectedTimelineEvent && workDayEvents.findIndex(entry=>entry.id===selectedTimelineEvent.id)>=0){
        let itemIndex = workDayEvents.findIndex(entry=>entry.id===selectedTimelineEvent.id);
        let itemCount = workDayEvents.length-1;
        let loop=false;

        //Create new event object and new window flag
        let newEvent;
        let refreshInsightWindow=false;


        if(direction==='>'){
          if(itemIndex<itemCount){
            newEvent=workDayEvents[itemIndex+1]
            setSelectedTimelineEvent(newEvent);
          }else{
            loop=true;
            newEvent=workDayEvents[0]
            setSelectedTimelineEvent(workDayEvents[0]);
          }
        }

        if(direction==='<'){
          if(itemIndex>0){
            newEvent=workDayEvents[itemIndex-1]
            setSelectedTimelineEvent(newEvent);
          }else{
            newEvent=workDayEvents[itemCount]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //If the new event is 'out of bounds' then refresh the insight window [...,*,...[iwS,...iwE]] or [[iwS,...iwE]...,*,...]
        //Rewind (<<) if it isnt a loop from the last elem to the first
        if(newEvent.timestamp<insightWindow.startDate.getTime()){
          if(loop){
            //Dont rewind if loop
            updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,false,'SCROLL');
          }else{
            //Rewind if you didnt loop back to start
            updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,true,'SCROLL');
          }
        }

        //Fast Forward (>>)
        if(newEvent.timestamp>=insightWindow.endDate.getTime()){
          updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,false,'SCROLL');
        }
      }

      //If there isnt a selected workday event, then find the first event before, or after the window, based on the direction, if one exists
      if((!selectedTimelineEvent && workDayEvents.length>0)||(selectedTimelineEvent && workDayEvents.findIndex(entry=>entry.id===selectedTimelineEvent.id)<0)){
        //Try to find the first event before the insight window, or else loop around
        let newEvent;
        //Try to find the first event before the insight window, or else loop around to the tail end
        if(direction==='<'){
          console.log("Rewinding Event before insight Window");

          let startDateTimestamp = insightWindow.startDate.getTime();
          console.log(startDateTimestamp);


          //Find the first event where the date is before the end of the the window (reverse things)
          let reversedEntries = [...workDayEvents].reverse();
          let previousEventIndex = reversedEntries.findIndex(entry=>entry.timestamp<startDateTimestamp);
          console.log(reversedEntries);
          console.log("Next Event Index");
          console.log(previousEventIndex);

          if(previousEventIndex>=0){
            //Use the index for the reversed array [Last,...,previousEventIndex,2,1,0];
            newEvent = reversedEntries[previousEventIndex];
            console.log(newEvent);
            setSelectedTimelineEvent(newEvent);
          }else{
            //Set the selected event to the first event
            newEvent = workDayEvents[0]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //Try to find the first event after the insight window, or else loop around
        if(direction==='>'){
          console.log("Advancing Event Past insight Window");
          let endDateTimestamp = insightWindow.endDate.getTime();
          console.log(endDateTimestamp);


          //Find the first event where the date is after the end of the the window
          let nextEventIndex = workDayEvents.findIndex(entry=>entry.timestamp>endDateTimestamp);
          console.log("Next Event Index");
          console.log(nextEventIndex);


          if(nextEventIndex>=0){
            newEvent=workDayEvents[nextEventIndex]
            setSelectedTimelineEvent(newEvent);
          }else{
            //Set the event to the last event
            newEvent=workDayEvents[workDayEvents.length-1]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //Update the insight window with the new event
        console.log("Fast forwarding insight window to new event");

        let eventDate = new Date(newEvent.timestamp);
        console.log(eventDate);
        console.log(insightLevel);

        updateInsightHorizon(activeTimelines,insightLevel,eventDate.getTime(),direction==='<','SCROLL');
      }
    }else{
      //If there is a selected timeline event then update it based on the direction
      if(selectedTimelineEvent){
        let itemIndex = activeTimeline.events.findIndex(entry=>entry.id===selectedTimelineEvent.id);
        let itemCount = activeTimeline.events.length-1;
        let loop=false;

        //Create new event object and new window flag
        let newEvent;

        if(direction==='>'){
          if(itemIndex<itemCount){
            newEvent=activeTimeline.events[itemIndex+1];
            setSelectedTimelineEvent(newEvent);
          }else{
            loop=true;
            newEvent=activeTimeline.events[0]
            setSelectedTimelineEvent(selectedTimeline.events[0]);
          }
        }

        if(direction==='<'){
          if(itemIndex>0){
            newEvent=activeTimeline.events[itemIndex-1]
            setSelectedTimelineEvent(newEvent);
          }else{
            newEvent=activeTimeline.events[itemCount]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //If the new event is 'out of bounds' then refresh the insight window [...,*,...[iwS,...iwE]] or [[iwS,...iwE]...,*,...]
        //Rewind (<<) if it isnt a loop from the last elem to the first
        if(newEvent.timestamp<insightWindow.startDate.getTime()){
          if(loop){
            //Dont rewind if loop
            updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,false,'SCROLL');
          }else{
            //Rewind if you didnt loop back to start
            updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,true,'SCROLL');
          }
        }

        //Fast Forward (>>)
        if(newEvent.timestamp>=insightWindow.endDate.getTime()){
          updateInsightHorizon(activeTimelines,insightLevel,newEvent.timestamp,false,'SCROLL');
        }
      }

      //If there isnt a selected timleine event, then find the first event before, or after the window, based on the direction, if one exists
      if(!selectedTimelineEvent && activeTimeline && activeTimeline.events.length>0){
        //Try to find the first event before the insight window, or else loop around
        let newEvent;

        //Try to find the first event before the insight window, or else loop around to the tail end
        if(direction==='<'){
          console.log("Rewinding Event before insight Window");

          let startDateTimestamp = insightWindow.startDate.getTime();
          console.log(startDateTimestamp);


          //Find the first event where the date is before the end of the the window (reverse things)
          let reversedEntries = [...activeTimeline.events].reverse();
          let previousEventIndex = reversedEntries.findIndex(entry=>entry.timestamp<startDateTimestamp);
          console.log(reversedEntries);
          console.log("Next Event Index");
          console.log(previousEventIndex);

          if(previousEventIndex>=0){
            //Use the index for the reversed array [Last,...,previousEventIndex,2,1,0];
            newEvent = reversedEntries[previousEventIndex];
            console.log(newEvent);
            setSelectedTimelineEvent(newEvent);
          }else{
            //Set the selected event to the first event
            newEvent = selectedTimeline.events[0]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //Try to find the first event after the insight window, or else loop around
        if(direction==='>'){
          console.log("Advancing Event Past insight Window");
          let endDateTimestamp = insightWindow.endDate.getTime();
          console.log(endDateTimestamp);


          //Find the first event where the date is after the end of the the window
          let nextEventIndex = activeTimeline.events.findIndex(entry=>entry.timestamp>endDateTimestamp);
          console.log("Next Event Index");
          console.log(nextEventIndex);


          if(nextEventIndex>=0){
            newEvent=activeTimeline.events[nextEventIndex]
            setSelectedTimelineEvent(newEvent);
          }else{
            //Set the event to the last event
            newEvent=activeTimeline.events[activeTimeline.events.length-1]
            setSelectedTimelineEvent(newEvent);
          }
        }

        //Update the insight window with the new event
        console.log("Fast forwarding insight window to new event");

        let eventDate = new Date(newEvent.timestamp);
        console.log(eventDate);
        console.log(insightLevel);

        updateInsightHorizon(activeTimelines,insightLevel,eventDate.getTime(),direction==='<','SCROLL');
      }
    }
  }

  //Select the given workflow, and update the timeline and active timeline events
  const selectTimeline = (timeline) =>{
    //If the workflow is already selected, deselect it
    if(selectedTimeline && selectedTimeline.id===timeline.id){
      setSelectedTimeline(null);
      setSelectedTimelineEvent(null);
      setShowGoalView(false);
    }else{
      //Select the workflow
      setSelectedTimeline(timeline);

      //Update the selected timeline event for the given insight window;
      let activeEvents = timeline.events.filter(entry=>entry.activeForInsightWindow);
      if(activeEvents.length>0){
        setSelectedTimelineEvent(activeEvents[0]);
      }else{
        updateTimelineEvent(timeline,'>');
      }
    }
  }

  //Update the timeline view and active timelines based on the button click
  const updateTimelineView = (viewID,includeCompletedGoals)=>{
    if(!updatingData){
      //Update the state
      setTimelineViewID(viewID);

      //Update the active timelines

      if(viewID==='HORIZONS'){
        setSelectedTimeline(null);

        updateWorkflowTimelinesWithInsightWindow(testWorkflows,insightWindow,viewID,false,includeCompletedGoals,'SCROLL');
      }

      if(viewID==='CATEGORIES'){
        setSelectedTimeline(null);

        updateWorkflowTimelinesWithInsightWindow(testWorkflows,insightWindow,viewID,false,includeCompletedGoals,'SCROLL');
      }

      if(viewID==='WORKFLOWS'){
        setSelectedTimeline(null);

        updateWorkflowTimelinesWithInsightWindow(testWorkflows,insightWindow,viewID,false,includeCompletedGoals,'SCROLL');
      }
    }
  }

  //Turn on the light, and ensure that there is a goal selected so that the user isnt just lost in space
  const toggleShowGoalView = (toggle) =>{

    //If there isnt a selected timeline, then select it, and update the selected event
    if(activeTimelines && activeTimelines.length>0 && !selectedTimeline){
      selectTimeline(activeTimelines[0].timeline);
      //If you turned on the light, and there are no visible goals, update the timeline event
      let visibleEvents = activeTimelines[0].timeline.events.filter(entry=>entry.activeForInsightWindow);
      if(visibleEvents.length>0){
        setSelectedTimelineEvent(visibleEvents[0]);
      }else{
        updateTimelineEvent(activeTimelines[0].timeline,'>');
      }
    }

    //If you turned on the light, and there are no visible goals, update the timeline event
    if(toggle && selectedTimeline && selectedTimeline.events.filter(entry=>entry.activeForInsightWindow).length===0){
      updateTimelineEvent(selectedTimeline,'>');
    }

    setShowGoalView(toggle);
  }

  //Toggle whether or not you include completed goals
  //'Re-trigger the update timeline view with the new state variable'
  const toggleShowCompletedGoals = (includeCompletedGoals)=>{
    //Toggle the state variable
    setShowCompletedGoals(includeCompletedGoals);

    //Re-calculate the timeline with the appropriate filter for whether or not to include completed goals
    updateTimelineView(timelineViewID,includeCompletedGoals);
  }

  // ----------------------------HELPER FUNCTIONS-------------------------------
  //Initialize some test workflows because it is easier to do with dates I control
  const initializeTestWorkflows = ()=>{
    //Initialize a 'thin' test workflow
    let newTestWorkflow={
      id:"TEST",
      title:"Workflow 1",
      color:"#4f46e5",
      goals:[],
    }

    //Start of the Month
    let goal0 = {
      id:"0",
      color:"#0ea5e9",
      duedate: new Date("2022/11/01")
    }
    goal0.duedate.setUTCHours(0);
    goal0.duedate.setUTCMinutes(0);

    let goalT3 = {
      id:"T3",
      color:"#8b5cf6",
      duedate: new Date("2022/11/12")
    }
    goalT3.duedate.setUTCHours(23);
    goalT3.duedate.setUTCMinutes(59);

    //Start of the week
    let goal1 = {
      id:"1",
      color:"#8b5cf6",
      duedate: new Date("2022/11/13")
    }
    goal1.duedate.setUTCHours(0);
    goal1.duedate.setUTCMinutes(0);

    let goal2 = {
      id:"2",
      color:"#d946ef",
      duedate: new Date("2022/11/14")
    }
    goal2.duedate.setUTCHours(16);
    goal2.duedate.setUTCMinutes(0);

    //Thursday Goals
    let goal3 = {
      id:"3",
      color:"#ec4899",
      duedate: new Date("2022/11/17")
    }
    goal3.duedate.setUTCHours(8);
    goal3.duedate.setUTCMinutes(0);

    let goal4 = {
      id:"4",
      color:"#f43f5e",
      duedate: new Date("2022/11/17")
    }
    goal4.duedate.setUTCHours(12);
    goal4.duedate.setUTCMinutes(0);

    let goal5 = {
      id:"5",
      color:"#22c55e",
      duedate: new Date("2022/11/17")
    }
    goal5.duedate.setUTCHours(18);
    goal5.duedate.setUTCMinutes(0);

    let goalTest4 = {
      id:"gt4",
      color:"#22c55e",
      duedate: new Date("2022/11/17")
    }
    goalTest4.duedate.setUTCHours(19);
    goalTest4.duedate.setUTCMinutes(59);

    let goal6 = {
      id:"6",
      color:"#22d3ee",
      duedate: new Date("2022/11/17")
    }
    goal6.duedate.setUTCHours(21);
    goal6.duedate.setUTCMinutes(0);

    let goalTest = {
      id:"gT",
      color:"#fde047",
      duedate: new Date("2022/11/19")
    }
    goalTest.duedate.setUTCHours(23);
    goalTest.duedate.setUTCMinutes(59);

    let goalTest2 = {
      id:"gT2",
      color:"#fde047",
      duedate: new Date("2022/11/20")
    }
    goalTest2.duedate.setUTCHours(0);
    goalTest2.duedate.setUTCMinutes(0);

    //End of the week
    let goal7 = {
      id:"7",
      color:"#fde047",
      duedate: new Date("2022/11/20")
    }
    goal7.duedate.setUTCHours(23);
    goal7.duedate.setUTCMinutes(59);

    //End of the Quarter
    let goal8 = {
      id:"8",
      color:"#5eead4",
      duedate: new Date("2022/12/22")
    }
    goal8.duedate.setUTCHours(12);
    goal8.duedate.setUTCMinutes(0);

    newTestWorkflow.goals=[goal0,goalT3,goal1,goal2,goal3,goal4,goal5,goal6,goalTest4,goalTest2,goalTest,goal7,goal8];

    let updatedWorkflow = rehydrateWorkflowWithTimeline(newTestWorkflow);

    //Initialize a 'thin' test workflow
    let newTestWorkflow2={
      id:"TEST2",
      title:"Workflow 2",
      color:"#0ea5e9",
      goals:[],
    }

    //Start of the Month
    let agoal0 = {
      id:"a0",
      color:"#0ea5e9",
      duedate: new Date("2022/10/01")
    }
    agoal0.duedate.setUTCHours(0);
    agoal0.duedate.setUTCMinutes(0);

    //Start of the week
    let agoal1 = {
      id:"a1",
      color:"#8b5cf6",
      duedate: new Date("2022/10/13")
    }
    agoal1.duedate.setUTCHours(0);
    agoal1.duedate.setUTCMinutes(0);

    let agoal2 = {
      id:"a2",
      color:"#d946ef",
      duedate: new Date("2022/10/14")
    }
    agoal2.duedate.setUTCHours(16);
    agoal2.duedate.setUTCMinutes(0);

    //Thursday Goals
    let agoal3 = {
      id:"a3",
      color:"#ec4899",
      duedate: new Date("2022/10/17")
    }
    agoal3.duedate.setUTCHours(8);
    agoal3.duedate.setUTCMinutes(0);

    let agoal4 = {
      id:"a4",
      color:"#f43f5e",
      duedate: new Date("2022/10/17")
    }
    agoal4.duedate.setUTCHours(12);
    agoal4.duedate.setUTCMinutes(0);

    let agoal5 = {
      id:"a5",
      color:"#22c55e",
      duedate: new Date("2022/10/17")
    }
    agoal5.duedate.setUTCHours(18);
    agoal5.duedate.setUTCMinutes(0);

    let agoal6 = {
      id:"a6",
      color:"#22d3ee",
      duedate: new Date("2022/10/17")
    }
    agoal6.duedate.setUTCHours(21);
    agoal6.duedate.setUTCMinutes(0);

    //End of the week
    let agoal7 = {
      id:"a7",
      color:"#fde047",
      duedate: new Date("2022/10/20")
    }
    agoal7.duedate.setUTCHours(23);
    agoal7.duedate.setUTCMinutes(59);

    let agoal7Test = {
      id:"aTest7",
      color:"#fde047",
      duedate: new Date("2022/11/17")
    }
    agoal7Test.duedate.setUTCHours(14);
    agoal7Test.duedate.setUTCMinutes(35);

    //End of the Quarter
    let agoal8 = {
      id:"a8",
      color:"#5eead4",
      duedate: new Date("2023/1/10")
    }
    agoal8.duedate.setUTCHours(12);
    agoal8.duedate.setUTCMinutes(0);

    newTestWorkflow2.goals=[agoal0,agoal1,agoal2,agoal3,agoal4,agoal5,agoal6,agoal7,agoal7Test,agoal8];

    let updatedWorkflow2 = rehydrateWorkflowWithTimeline(newTestWorkflow2);

    //Update the state
    setTestWorkflows([updatedWorkflow,updatedWorkflow2]);

    //Initilzie the insight window with the workflows
    updateInsightHorizon([updatedWorkflow,updatedWorkflow2],insightLevel,new Date().getTime(),false,'ZOOM');
  }

  //Map the workflow and the workflow goals to a date timeline
  //If we are updating a workflow, then replace the selected timeline
  const rehydrateWorkflowWithTimeline=(workflow)=>{
    //Create a new timeline for the workflow
    //[StartDate,...,EndDate]
    //EVENT: {id:"String", timestamp:"160940192404589", offsetWidth:0, activeForInsightWindow:true}

    //Clone the workflow & goals
    let newWorkflow = {...workflow};
    newWorkflow.goals=[...workflow.goals];

    let sortedGoals = [...workflow.goals].sort((a,b)=>{
      if(a.duedate.getTime()<b.duedate.getTime()){
        return -1
      }else if(a.duedate.getTime()>b.duedate.getTime()){
        return 1
      }else{
        return 0
      }
    });

    //tOP: The Left Buffer for the main timeline [[....timelineOffsetPercentage.....][.......timelineWidthPercentage....][....R-Buffer:FLEX-1...]]
    //tWP: The width of the main timeline
    //oWP: The width of the overview selector relative to the total timeline length [.....[Overview Width].....]

    //Add the current time to the timeline
    let now = new Date();
    let nowLocale = new Date(now);
    nowLocale.setUTCHours(now.getHours());

    let newTimeline={
      id:workflow.id,
      startDate: new Date(sortedGoals[0].duedate.getTime()),
      endDate: new Date(sortedGoals[workflow.goals.length-1].duedate.getTime()),
      timelineOffsetPercentage:0,
      timelineWidthPercentage:0,
      overviewWidthPercentage:0,
      today:{id:"TODAY", timestamp:nowLocale, activeForInsightWindow:false, timelineOffsetPercentage:0},
      //Overview: [[.....................event.overviewOffsetPercentage........][*][........]]
      //Timeline: [[.......event.timelineOffsetPercentage....................][*][........]]
      //Gantt:    [[.......event.ganttOffsetPercentage........][GanttStart....[*]][........]]
      events:sortedGoals.map(entry=>{return {...entry, timestamp:entry.duedate.getTime(), overviewOffsetPercentage:0, timelineOffsetPercentage:0, ganttStartOffsetPercentage:0, activeForInsightWindow:false}}),
    }

    newWorkflow.timeline=newTimeline;

    return newWorkflow;
  }

  //Calculate Widths for the workflow timeline and each event that falls within the insight window
  //Filter the goals based on whether or not you show completed goals
  const updateWorkflowTimelinesWithInsightWindow=(workflows,newInsightWindow,viewID,rewind,includeCompletedGoals,updateType)=>{
    //1) Calculate the width of the workflow timeline
    //2) Calculate offsetWidths for each event
    let newWorkflows = [];

    let wStart=null;
    let wEnd=null;
    let iwStart = newInsightWindow.startDate.getTime();
    let iwEnd = newInsightWindow.endDate.getTime();

    workflows.forEach(workflow=>{
      //Clone the workflow
      let newWorkflow={...workflow};
      newWorkflow.goals=[...workflow.goals].filter(goal=>includeCompletedGoals||(!includeCompletedGoals&&goal.active));
      newWorkflow.timeline={...workflow.timeline};
      newWorkflow.timeline.today={...workflow.timeline.today};
      newWorkflow.timeline.events=[...workflow.timeline.events].filter(entry=>includeCompletedGoals||(!includeCompletedGoals&&entry.active));;

      //Define the timeline start and end dates
      wStart = workflow.timeline.startDate.getTime();
      wEnd = workflow.timeline.endDate.getTime();

      //Initialize the start and end date for active gantt
      let eventStartDate=null;
      let eventEndDate=null;

      //----------------------WORKFLOW WIDTH---------------------------
      //1) Figure out the workflow timeline widths
      //Workflow Timeline:[Ws,............,We]
      //Insight Window:   [  [IWs,...IWe]    ]

      //1.1)If the insight window is 'inside the workflow timeline' the width is 100%
      if(wStart<iwStart && wEnd>iwEnd){
        //Update the timeline widths
        newWorkflow.timeline.timelineOffsetPercentage=0;
        newWorkflow.timeline.timelineWidthPercentage=100;

        //Update the timeline overview widths
        let timelineWidth = wEnd-wStart;
        let insightWidth = iwEnd-iwStart;
        let insightOffsetWidth = iwStart-wStart
        newWorkflow.timeline.overviewWidthPercentage=insightWidth/timelineWidth*100;
        newWorkflow.timeline.overviewOffsetPercentage=insightOffsetWidth/timelineWidth*100;

        //Update the event start date  & end date for the goals
        eventStartDate=iwStart;
        eventEndDate=iwEnd;
      }

      //1.2)If the insight window is before the workflow timeline, the width is 0
      //Workflow Timeline:              [Ws,............,We]
      //Insight Window:   [IWs,...IWe] [Ws,............,We]
      if(wStart>=iwEnd){
        //Update the timeline widths
        newWorkflow.timeline.timelineOffsetPercentage=0;
        newWorkflow.timeline.timelineWidthPercentage=0;

        //Update the timeline overview widths
        newWorkflow.timeline.overviewWidthPercentage=0;
        newWorkflow.timeline.overviewOffsetPercentage=0;

        //Update the event start date  & end date for the goals
        eventStartDate=iwStart;
        eventEndDate=iwEnd;
      }

      //1.4)If the insight window overlaps the left edge of the workflow timeline
      //Workflow Timeline:        [Ws,...].........,We]
      //Insight Window:   [IWs,......IWe]
      if(wStart>=iwStart && wEnd>iwEnd && iwEnd>wStart){
        //Update the timeline widths
        let workflowLength = iwEnd-wStart;
        let insightWindowLength = iwEnd-iwStart;
        newWorkflow.timeline.timelineWidthPercentage=workflowLength/insightWindowLength*100;
        newWorkflow.timeline.timelineOffsetPercentage=100-newWorkflow.timeline.timelineWidthPercentage;


        //Update the timeline overview widths
        let timelineWidth = wEnd-wStart;
        let insightWidth = iwEnd-wStart;
        newWorkflow.timeline.overviewWidthPercentage=insightWidth/timelineWidth*100;
        newWorkflow.timeline.overviewOffsetPercentage=0;

        //Update the event start date  & end date for the goals
        eventStartDate=wStart;
        eventEndDate=iwEnd;
      }

      //1.3)If the insight window is after the workflow timeline, the width is 0
      //Workflow Timeline:[Ws,............,We]
      //Insight Window:   [Ws,............,We][IWs,...IWe]
      if(wEnd<iwStart){
        //Update the timeline widths
        newWorkflow.timeline.timelineOffsetPercentage=0;
        newWorkflow.timeline.timelineWidthPercentage=0;

        //Update the timeline overview widths
        newWorkflow.timeline.overviewWidthPercentage=0;
        newWorkflow.timeline.overviewOffsetPercentage=0;

        //Update the event start date  & end date for the goals
        eventStartDate=iwStart;
        eventEndDate=iwEnd;

      }

      //1.5)If the insight window overlaps the right edge of the workflow timeline
      //Workflow Timeline:[Ws,........[...,We]
      //Insight Window:               [IWs,.........IWe]
      if(wStart<iwStart && wEnd<iwEnd && wEnd>=iwStart){
        let workflowLength = wEnd-iwStart;
        let insightWindowLength = iwEnd-iwStart;
        newWorkflow.timeline.timelineWidthPercentage=workflowLength/insightWindowLength*100;
        newWorkflow.timeline.timelineOffsetPercentage=0;

        //Update the timeline overview widths
        let timelineWidth = wEnd-wStart;
        let insightWidth = wEnd-iwStart;
        let insightOffsetWidth = iwStart-wStart;
        newWorkflow.timeline.overviewWidthPercentage=insightWidth/timelineWidth*100;
        newWorkflow.timeline.overviewOffsetPercentage=insightOffsetWidth/timelineWidth*100;

        //Update the event start date  & end date for the goals
        eventStartDate=iwStart;
        eventEndDate=wEnd;
      }

      //1.6)If the insight window 'subsumes' the workflow timeline
      //Workflow Timeline:      [Ws,...........,We]
      //Insight Window:   [IWs,.......................IWe]
      if(wStart>=iwStart && wEnd<=iwEnd){
        let workflowLength = wEnd-wStart;
        let insightWindowLength = iwEnd-iwStart;
        let offsetLength = wStart-iwStart;
        newWorkflow.timeline.timelineWidthPercentage=workflowLength/insightWindowLength*100;
        newWorkflow.timeline.timelineOffsetPercentage=offsetLength/insightWindowLength*100;

        //Update the timeline overview widths
        newWorkflow.timeline.overviewWidthPercentage=100;
        newWorkflow.timeline.overviewOffsetPercentage=0;

        //Update the event start date  & end date for the goals
        eventStartDate=wStart;
        eventEndDate=wEnd;
      }

      //Update the current time width for the insight window
      if(newWorkflow.timeline.today.timestamp>=iwStart && newWorkflow.timeline.today.timestamp<iwEnd){
        newWorkflow.timeline.today.activeForInsightWindow=true;

        //Update the active insight window offset
        let todayOffset = newWorkflow.timeline.today.timestamp-iwStart;
        let insightWindowWidth = iwEnd-iwStart;
        newWorkflow.timeline.today.timelineOffsetPercentage=todayOffset/insightWindowWidth*100;
      }else{
        newWorkflow.timeline.today.activeForInsightWindow=false;
        newWorkflow.timeline.today.timelineOffsetPercentage=0;
      }

      //--------------------------EVENT OFFSETS---------------------------
      //Event:{id:entry.id, timestamp:entry.duedate.getTime(), overviewOffsetPercentage:0, timelineOffsetPercentage:0, activeForInsightWindow:false}
      //2) Figure out the events that are active for the insight window
      newWorkflow.timeline.events.forEach((event,index)=>{
        //2.1) Figure out the overview offset
        let overviewOffset = event.timestamp-wStart;
        let timelineWidth = wEnd-wStart;
        event.overviewOffsetPercentage=timelineWidth?overviewOffset/timelineWidth*100:0;

        //2.2) Figure out the offset for the current insight window
        //Update the event object with its offset, gantt offset, and active status
        if(event.timestamp>=iwStart && event.timestamp<iwEnd){
          event.activeForInsightWindow=true;

          //Update the active insight window offset
          let eventOffset = event.timestamp-eventStartDate;
          let insightWindowWidth = eventEndDate-eventStartDate;
          event.timelineOffsetPercentage=insightWindowWidth?eventOffset/insightWindowWidth*100:0;

          //2.3 Update the event offset for the gantt if the previous elem is i nthe insight window
          if(index>0){
            event.ganttStartOffsetPercentage=newWorkflow.timeline.events[index-1].timelineOffsetPercentage;
          }
        }else{
          event.activeForInsightWindow=false;
          //Update the active insight window offset
          event.timelineOffsetPercentage=0;

          event.ganttStartOffsetPercentage=0;
        }
      });

      //Set the active event
      let activeEvents = newWorkflow.timeline.events.filter(event=>event.activeForInsightWindow);
      let activeEvent;
      if(rewind){
        activeEvent=activeEvents[activeEvents.length-1];
      }else{
        activeEvent=activeEvents[0];
      }

      //Update the active selected timeline with new active events if one is selected
      if(selectedTimeline && selectedTimeline.id===newWorkflow.id){
        setSelectedTimeline(newWorkflow.timeline);
      }

      //Update the active event if the workflow is selected
      if(selectedTimeline && selectedTimeline.id===newWorkflow.id && activeEvent){
        setSelectedTimelineEvent(activeEvent);
      }

      //If there are no active events, update the event state
      if(selectedTimeline && selectedTimeline.id===newWorkflow.id && !activeEvent){
        setSelectedTimelineEvent(null);
      }

      //Push the updated workflow to the new workflows array
      newWorkflows.push(newWorkflow);
    });
    //Update the state
    setUpdatingData(false);
    setActiveTimelines(newWorkflows);

    //VIEW ZOOM CONTROLS:
    //NOTE: Change Workflow Categories counts as 'SCROLL' as you are 'scrolling new timelines into the same view window'-->Desired behavior will 'zoom up' if the new window OOB
    //1) Scroll Past data bounds (Includes Changing Workflow Types) ('Just 'rewind one horizon for now')-->Use 1.5
    //2) Scroll into blank window
    //3) Zoom into blank window (Includes OutOfBounds)

    //1) If you scrolled past the active timeline data, then 'zoom up' to try and re-center the user
    //'Aggressively pounding arrows will 'zoom you out to keep the data centered in the view'
    //[[...IW...][W1][W2]] || [[W1][w2][...IW....]]
    let windowOutOfBounds = newWorkflows.every(workflow=>workflow.timeline.startDate>newInsightWindow.endDate) || newWorkflows.every(workflow=>workflow.timeline.endDate<newInsightWindow.startDate);
    if(updateType==='SCROLL' && windowOutOfBounds && newInsightWindow.id!=='YEAR'){
      //updateInsightLevel(newWorkflows,newInsightWindow.id,'UP');
    }

    //1.5) If you are all the way zoomed out, prevent OOB (e.g. reshift to keep data in view)
    if(updateType==='SCROLL' && windowOutOfBounds && preventOutOfBounds){
      if(newWorkflows.every(workflow=>workflow.timeline.startDate>newInsightWindow.endDate)){
        //If you are OOB <
        updateInsightWindow(newWorkflows,newInsightWindow,'>');
      }else{
        //You are OOB >
        updateInsightWindow(newWorkflows,newInsightWindow,'<');
      }
      //props.onAlert("There's Nothing There", "There is no more data that way. Add some new goals for the future to explore that time horizon, or disable 'Prevent Out of Bounds' in your timeline settings to explore empty space.",1500);
    }


    //2) If you scrolled into empty space, and you want to fast forward through the empty space, then just update the insight window again in the same direction
    //'Aggressively pounding arrows will 'zoom you to the data so you dont just stare at empty windows to keep the data centered in the view'
    //[[W1][...IW...][W2]]
    let emptyWindow = newWorkflows.every(workflow=>workflow.timeline.events.every(entry=>!entry.activeForInsightWindow));
    if(updateType==='SCROLL' && !windowOutOfBounds && emptyWindow && fastForwardThroughEmptySpace){
      updateInsightWindow(newWorkflows,newInsightWindow,rewind?'<':'>');
    }

    //3) If you zoomed into a blank window, and you want to fast forward through the empty space, then just update the inshgt window again
    //'Aggressively pounding zoom in arrows will 'shift you to the data so you dont just stare at empty windows to keep the data centered in the view'
    //When this loops, it will hit case #2 with type 'SCROLL' again and will continue scrolling in the set direction until it hits data
    if(updateType==='ZOOM' && emptyWindow && fastForwardThroughEmptySpace){
      //If there are some workflows after the insight window, then FF otherwise rewind to find the data
      if(newWorkflows.some(workflow=>workflow.timeline.startDate>newInsightWindow.endDate)){
        updateInsightWindow(newWorkflows,newInsightWindow,'>');
      }else if(newWorkflows.some(workflow=>workflow.timeline.endDate<newInsightWindow.startDate)){
        updateInsightWindow(newWorkflows,newInsightWindow,'<');
      }
    }
  }

  //---------------------------------COMPONENT----------------------------------
  return(
    <div className={`flex flex-col justify-center items-center transition-all ease-in duration-100 ${screenBlink?("h-0"):("h-screen")}`}>
      <div className={`flex flex-col h-full transition-all ease-in duration-500 ${screenBlink?("w-0 border-2 border-c2 rounded-md"):("w-full")} items-center text-center overflow-y-scroll`} style={{transitionDelay:"180ms"}}>
        {/*---------Main Tile View: Start-------*/}
        <div className='flex flex-col w-full h-full justify-start border-2 bg-black pt-2 pb-24 px-2'>
          {/*---------Timeline view-------*/}
          <div className='flex flex-col w-full h-full justify-start items-center border rounded-2xl p-2 overflow-y-hidden'>
            {/*Titles*/}
            <div className='flex flex-row text-3xl font-bold text-white justify-center items-center mt-2'>
              Timeline
            </div>
            <div className='flex flex-row text-lg font-bold text-white justify-center items-center mt-1 mb-3'>
              {insightTitle.detail}
            </div>

            {/*Loading Data*/}
            {updatingData?(
              <div className='flex flex-col h-4/5 w-full items-center justify-center'>
                {/*Adjust size here -- scales to the height and width of parent container; min100px,*/}
                <div className='h-32 w-40'>
                  <LightSpinner variant={'rounded-3xl'} color={'#9333ea'} highlightWidth={12} borderHeight={8}/>
                </div>
              </div>
            ):(
              <div>
              </div>
            )}

            {/*Welcome Screen*/}
            {!updatingData && selectedTimeline && !initialized?(
              <div className='flex flex-col w-full items-center justify-start'>
                <div className='flex flex-col w-full justify-start text-white rounded-2xl' style={{backgroundColor:"rgba(255,255,255,0.05)"}}>
                  <span className='my-1'>Welcome to your daily timeline.</span>
                  <span className='my-1'>You have {selectedTimeline && selectedTimeline.events.filter(entry=>entry.activeForInsightWindow).length} active goals for the day.</span>
                </div>
              </div>
            ):(
              <div/>
            )}

            {/*Time Horizons*/}
            {insightWindow?(
              <div className='flex flex-row items-center justify-center px-1.5 w-full'>
                <div className='flex flex-row justify-between text-white font-bold rounded-2xl border my-2 px-2' style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px - 2px)`}}>
                  {insightWindow && insightWindow.periods.map((period,index)=>{
                    let highlighted=selectedTimelineEvent && selectedTimelineEvent.timestamp>=period.startDate.getTime() && selectedTimelineEvent.timestamp<period.endDate.getTime();
                    return(
                      <div key={index} className='flex flex-row flex-1 items-center justify-center px-1 border-l my-2 text-md'>
                        {selectedTimeline?(
                          <div className={`flex flex-col w-full rounded-b-sm ${highlighted?("text-white"):("text-gray-800")}`}>
                            {period.title}
                          </div>
                        ):(
                          <div className={`flex flex-col w-full rounded-b-sm text-white`}>
                            {period.title}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ):(
              <div/>
            )}

            {/*Timeline Tile List*/}
            {activeTimelines&&activeTimelines.length>0?(
              <div className='flex flex-col w-full justify-start items-center border rounded-2xl px-2 py-2 overflow-hidden' style={{height:`${props.isMobile?("650px"):("950px")}`}}>
                <div className='flex flex-col w-full flex-1 items-center justify-start overflow-y-scroll'>
                  {/*Timelines*/}
                  {activeTimelines.filter(workflow=>workflow.timeline.events.filter(entry=>entry.activeForInsightWindow).length>0 || workflow.timeline.timelineWidthPercentage>0).map(workflow=>{
                    return(
                      <div key={workflow.id} className={`flex flex-col justify-between w-full ${selectedTimeline&&selectedTimeline.id===workflow.id?("border-2 border-dotted"):("")} rounded-2xl p-2 mb-2`}>
                        {/*Timeline Title*/}
                        <div className='flex flex-row w-full border-b items-start text-white'>
                          {workflow.title}
                        </div>

                        {/*Timeline Overview*/}
                        <div className='flex flex-row items-center justify-start w-full' onClick={()=>{selectTimeline(workflow.timeline)}}>
                          {/*OffSet*/}
                          <div className='flex flex-row h-full' style={{width:`${0}%`}}>
                          </div>
                          <div className={`relative flex flex-row w-full items-center justify-start text-white font-bold items-center ${selectedTimeline && selectedTimeline.id===workflow.id?("mt-1"):("hidden")}`}>
                            {/*Timeline Pill*/}
                            <div className='flex flex-row items-center justify-between w-full h-2 text-white font-bold my-2'>
                              <div className='flex flex-row rounded-full h-full w-full border' style={{backgroundColor:`${workflow.color}`}}>
                              </div>
                            </div>

                            {/*Timeline Events*/}
                            <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
                              <div className='relative flex flex-col w-full h-full' style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                {workflow.timeline.events.filter(entry=>{if(!insightLevel){return true} if(insightLevel.id!=='WORK_DAY'){return true} if(insightLevel.id==='WORK_DAY'){let eventDate=new Date(entry.timestamp); return eventDate.getUTCHours()>=6 && eventDate.getUTCHours()<20} return false}).map(entry=>{
                                  return(
                                    <TimelineOverviewEvent key={entry.id} eventOffsetPercentage={entry.overviewOffsetPercentage}/>
                                  )
                                })}
                              </div>
                            </div>

                            {/*Timeline Overview Selector*/}
                            <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center py-1'>
                              <div className='relative flex flex-row items-center justify-start h-full w-full overflow-visible'  style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                {/*OffSet*/}
                                <div className='flex flex-row h-full transition-all ease-in duration-300' style={{width:`${workflow.timeline.overviewOffsetPercentage}%`}}>
                                </div>
                                {/*Selector*/}
                                <TimelineOverviewSelector translate={false} overviewWidthPercentage={workflow.timeline.overviewWidthPercentage} translateX={workflow.timeline.overviewOffsetPercentage<2?"-7px":(selectedTimelineEvent&&selectedTimelineEvent.overviewOffsetPercentage>99)?"15px":"0px"}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*Timeline Selected Goal View*/}
                        {selectedTimeline && selectedTimeline.id===workflow.id && selectedTimelineEvent && showGoalView?(
                          <div className='relative flex flex-row w-full h-40 items-center justify-start mt-2.5'>
                            {/*OffSet*/}
                            <div className='flex flex-row flex-shrink-0 h-full' style={{minWidth:`${MIN_TIMELINE_WIDTH_PX/2}px`, maxWidth:`calc(100% - ${MIN_TIMELINE_WIDTH_PX/2}px)`, width:`${workflow.timeline.timelineOffsetPercentage+workflow.timeline.timelineWidthPercentage/2}%`}}>
                            </div>
                            {/*Selector Connector*/}
                            <div className='relative flex flex-col flex-shrink-0 h-full items-center justify-start text-white font-bold rounded-md items-center' style={{minWidth:`${MIN_TIMELINE_WIDTH_PX}px`,width:`${workflow.timeline.timelineWidthPercentage}%`,borderColor:`${selectedTimeline.color}`,transform:"translate(-50%,0%)"}}>
                              <div className='absolute bottom-0 left-0 w-full h-4 flex flex-col items-center justify-start'>
                                <div className='flex flex-row items-center justify-center h-full w-full'>
                                  <div className='flex flex-row items-center justify-start h-full' style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                    <div className='flex flex-row justify-end items-center h-full transition-all ease-in duration-300' style={{width:`${selectedTimelineEvent.timelineOffsetPercentage}%`}}>
                                      <div className='flex flex-row flex-shrink-0 justify-center items-center rounded-md bg-white' style={{width:"2px", height:"8px", transform:`translate(50%,7px)`}}>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/*Goal View -- 100% */}
                            <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full text-white font-bold rounded-md border-2 p-1'>
                              <div className='flex flex-row items-center justify-between w-full h-36 rounded-md overflow-y-scroll' style={{backgroundColor:`${selectedTimelineEvent.color}`}}>
                                {/*
                                <GoalTile
                                  key={selectedTimelineEvent.id}
                                  goal={selectedTimelineEvent}
                                  onClick={()=>{}}
                                  onClose={()=>{deleteGoal(selectedTimelineEvent)}}
                                  onEdit={()=>{}}
                                  onRestoreGoal={()=>{restoreGoal(selectedTimelineEvent)}}
                                  onSkipGoal={()=>{}}
                                  activeEdit={false}
                                />
                                */}
                                {/*
                                <GoalTimelineTile
                                  key={selectedTimelineEvent.id}
                                  goal={selectedTimelineEvent}
                                  onClick={()=>{}}
                                  onClose={()=>{deleteGoal(selectedTimelineEvent)}}
                                  onEdit={()=>{}}
                                  onRestoreGoal={()=>{restoreGoal(selectedTimelineEvent)}}
                                  onSkipGoal={()=>{}}
                                  activeEdit={false}
                                />
                                */}
                              </div>
                            </div>
                          </div>
                        ):(
                          <div/>
                        )}

                        {/*Timeline*/}
                        <div className='relative flex flex-row items-start justify-start w-full' onClick={()=>{selectTimeline(workflow.timeline)}}>
                          {/*OffSet*/}
                          <div className={`flex flex-row flex-shrink-0 h-12 items-center ${selectedTimeline?(showGoalView?("mt-0.5"):("mt-2.5")):("")}`} style={{minWidth:`${MIN_TIMELINE_WIDTH_PX/2}px`, maxWidth:`calc(100% - ${MIN_TIMELINE_WIDTH_PX/2}px)`, width:`${workflow.timeline.timelineOffsetPercentage+workflow.timeline.timelineWidthPercentage/2}%`}}>
                          </div>
                          {/*Timeline*/}
                          <div className={`relative flex flex-shrink-0 flex-row items-start justify-start text-white font-bold ${selectedTimeline?(showGoalView?("mt-0.5"):("mt-2.5")):("")} z-10`} style={{height:`${selectedTimeline && selectedTimeline.id===workflow.id && showTimelineGantt?(48+4+ GANTT_Y_PADDING_PX+(workflow.timeline.events.filter(event=>event.activeForInsightWindow).length-1)*GANTT_Y_OFFSET_PX):(48)}px`,minWidth:`${MIN_TIMELINE_WIDTH_PX}px`,width:`${workflow.timeline.timelineWidthPercentage}%`,transform:"translate(-50%,0%)"}}>
                            {/*Timeline Pill*/}
                            <div className='relative flex flex-row items-center justify-between w-full h-8 text-white font-bold my-2'>
                              <div className='flex flex-row rounded-full h-full w-full border items-center' style={{backgroundColor:`${workflow.color}`}}>
                                <div className='flex flex-row w-full border-b border-dotted'>
                                </div>
                              </div>
                            </div>

                            {/*Timeline Events*/}
                            <div className='absolute top-0 left-0 w-full h-12 flex flex-col items-center justify-center'>
                              <div id={selectedTimeline && selectedTimeline.id===workflow.id?"activeTimelineEventWindow":"timelineEventWindow"} ref={selectedTimeline && selectedTimeline.id===workflow.id?eventWindowRef:null} className='relative flex flex-col w-full justify-start' style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                {workflow.timeline.events.filter(event=>event.activeForInsightWindow).map((entry,index)=>{
                                  let workflowIsSelected = selectedTimeline && workflow.id===selectedTimeline.id;
                                  let eventIDMatch=selectedTimelineEvent && selectedTimelineEvent.id===entry.id;
                                  let eventSelected = workflowIsSelected && eventIDMatch;
                                  let showGantt=showTimelineGantt && selectedTimeline && selectedTimeline.id===workflow.id

                                  let opacity = workflowIsSelected?(eventSelected?100:40):(100);

                                  return(
                                    <TimelineEvent
                                      key={entry.id}
                                      opacity={opacity}
                                      color={entry.color}
                                      showGantt={showGantt}
                                      complete={!entry.active}
                                      eventViewWidthPX={selectedTimelineEventViewWidthPX}

                                      eventOffsetPercentage={entry.timelineOffsetPercentage}
                                      ganttStartOffsetPercentage={index>0?workflow.timeline.events.filter(event=>event.activeForInsightWindow)[index-1].timelineOffsetPercentage:0}

                                      ganttSelected={selectedTimelineEvent && selectedTimelineEvent.id===entry.id}
                                      ganttYOffsetPX={GANTT_Y_PADDING_PX+(index+1)*GANTT_Y_OFFSET_PX}
                                      ganttMinWidthPX={GANTT_MIN_WIDTH_PX}
                                    />
                                  )
                                })}
                              </div>
                            </div>

                            {/*Timeline Event Selector*/}
                            {selectedTimeline && selectedTimeline.id===workflow.id && selectedTimelineEvent?(
                              <div className='absolute top-0 left-0 w-full h-12 flex flex-col items-center justify-center'>
                                <div className='flex flex-row items-center justify-start h-full'  style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                  <div className='flex flex-row justify-end items-center h-full transition-all ease-in duration-300' style={{width:`${selectedTimelineEvent.timelineOffsetPercentage}%`}}>
                                    {/*Selector*/}
                                    <TimelineEventSelector/>
                                  </div>
                                </div>
                              </div>
                            ):(
                              <div/>
                            )}
                          </div>

                          {/*Center Line*/}
                          <div className={`absolute top-0 left-0 flex flex-row w-full h-12 items-center ${selectedTimeline?(showGoalView?("mt-0.5"):("mt-2.5")):("")}`}>
                            <div className='flex flex-row w-full border-b border-dotted'>
                            </div>
                          </div>

                          {/*Today Icon*/}
                          {showToday && workflow.timeline.today.activeForInsightWindow?(
                            <div className='absolute top-0 left-0 flex flex-row w-full h-12 items-center justify-center'>
                              <div className={`flex flex-col h-8 ${selectedTimeline?(showGoalView?("mt-0.5"):("mt-2.5")):("")}`} style={{width:`calc(100% - ${TIMELINE_EVENT_PADDING_PX}px)`}}>
                                <TodayIcon key={workflow.timeline.today.id} eventOffsetPercentage={workflow.timeline.today.timelineOffsetPercentage}/>
                              </div>
                            </div>
                          ):(
                            <div/>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ):(
              <div/>
            )}

            {/*Alert for if you are in a window with no active timelines (e.g. no category goals or no active workflow goals)*/}
            {!updatingData && (!activeTimelines || activeTimelines.length===0)?(
              <div className='flex flex-col w-full justify-start items-center border rounded-2xl px-2 py-2 overflow-hidden' style={{height:`${props.isMobile?("650px"):("950px")}`}}>
                <div className='flex flex-col w-full flex-1 items-center justify-center overflow-y-scroll'>
                  <div className='flex flex-col h-5/6 w-5/6 items-center justify-center text-white text-md font-medium italic rounded-2xl p-2' style={{backgroundColor:"rgba(255,255,255,0.05)"}}>
                    <span>You have no active or completed goals for this catetegory.</span>
                    <span className='mt-4'>Select the 'Horizons' category to see all of your active and completed goals.</span>
                    <span className='mt-4'>Or create some new goals, habits, or workflows and your timelines will appear here!</span>
                  </div>
                </div>
              </div>
            ):(
              <div/>
            )}

            {/*Horizon Controls && Show Goal View Button*/}
            {activeTimelines?(
              <div className='flex flex-row justify-between items-center w-full px-1'>
                {/*Timeline Settings*/}
                {showViewControls?(
                  <div className='h-full flex flex-row items-center justify-center'>
                    <button type="button" className={`flex w-12 h-12 items-center justify-center rounded-full p-1 ${showTimelineSettings?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{setShowTimelineSettings((showTimelineSettings)=>!showTimelineSettings);}}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
                      </svg>
                    </button>
                  </div>
                ):(
                  <div/>
                )}
                {/*Timeline Event Controls*/}
                <div className='relative flex flex-row w-52 items-center justify-between h-16 mt-2 mb-1 border rounded-full px-2'>
                  <button type="button" className="flex w-12 h-12 items-center justify-center rounded-full p-1 text-shades-light" onClick={()=>{updateInsightWindow(activeTimelines,insightWindow,'<')}}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>

                  <div className='h-full w-20 flex flex-row items-center justify-center'>
                    <button type="button" className={`flex w-12 h-12 items-center justify-center rounded-full p-1 ${showGoalView?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{toggleShowGoalView(!showGoalView)}}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
                      </svg>
                    </button>
                  </div>

                  <button type="button" className="flex w-12 h-12 items-center justify-center rounded-full p-1 text-shades-light" onClick={()=>updateInsightWindow(activeTimelines,insightWindow,'>')}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                {/*Add Goal Button*/}
                {showViewControls?(
                  <div className='h-full flex flex-row items-center justify-center'>
                    <button type="button" className={`flex w-12 h-12 items-center justify-center rounded-full p-1 ${false?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{}}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.5v15m7.5-7.5h-15"></path>
                      </svg>
                    </button>
                  </div>
                ):(
                  <div/>
                )}
              </div>
            ):(
              <div />
            )}
          </div>
          {/*---------Timeline view-------*/}

          {/*---------Settings & View Controls-------*/}
          {/*Expand View Controls*/}
          <div className='flex flex-row w-full items-stat justify-center' style={{transform:"translate(0px,-9px)"}}>
            <button type="button" className={`flex w-12 h-4 items-center justify-center rounded-full bg-black ${showViewControls?("text-c2-highlight"):("text-white")} border`} onClick={()=>{setShowViewControls((showViewControls)=>!showViewControls)}}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
              </svg>
            </button>
          </div>

          {/*View Controller*/}
          <div className={`flex flex-row w-full items-center justify-center`}>
            <div className={`flex flex-row items-center justify-between rounded-full bg-black border -mt-1 transition-all ease-out duration-200 ${!showViewControls?("w-0 opacity-0"):("w-full opacity-100")}`} style={{maxWidth:"600px"}}>
              <div className={`flex flex-row w-full items-center justify-between rounded-full px-2 bg-black delay-200 transition-all ease-out duration-300 ${!showViewControls?("h-0 opacity-0"):("h-12 opacity-100")}`}>
                <div className={`h-full flex flex-row flex-1 flex-shrink-0 items-center justify-center rounded-full`}>
                  <button type="button" className={`flex w-12 h-full items-center justify-center rounded-full p-1 ${timelineViewID==='HORIZONS'?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{if(showViewControls){updateTimelineView('HORIZONS',showCompletedGoals)}}}>
                    Horizons
                  </button>
                </div>
                <div className='h-full flex flex-row flex-1 flex-shrink-0 items-center justify-center rounded-full'>
                  <button type="button" className={`flex w-12 h-full items-center justify-center rounded-full p-1 ${timelineViewID==='CATEGORIES'?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{if(showViewControls){updateTimelineView('CATEGORIES',showCompletedGoals)}}}>
                    Categories
                  </button>
                </div>
                <div className='h-full flex flex-row flex-1 flex-shrink-0 items-center justify-center rounded-full'>
                  <button type="button" className={`flex w-12 h-full items-center justify-center rounded-full p-1 ${timelineViewID==='WORKFLOWS'?("text-c2-highlight"):("text-shades-light")}`} onClick={()=>{if(showViewControls){updateTimelineView('WORKFLOWS',showCompletedGoals)}}}>
                    Workflows
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*---------Settings & View Controls-------*/}

        </div>
        {/*---------Main Tile View: End-------*/}

        {/*Timeline Settings Modal*/}
        {showTimelineSettings?(
          <div className='absolute top-0 left-0 flex flex-col w-full h-full z-50'>
            <TimelineSettings
              fastForwardThroughEmptySpace={fastForwardThroughEmptySpace}
              preventOutOfBounds={preventOutOfBounds}
              showCompletedGoals={showCompletedGoals}
              showTimelineGantt={showTimelineGantt}
              showToday={showToday}

              onToggleFastForwardThroughEmptySpace={()=>setFastForwardThroughEmptySpace((fastForwardThroughEmptySpace)=>!fastForwardThroughEmptySpace)}
              onTogglePreventOutOfBounds={()=>{if(!preventOutOfBounds){updateInsightHorizon(activeTimelines,insightLevel,Date.now(),false,'SCROLL');} setPreventOutOfBounds((preventOutOfBounds)=>!preventOutOfBounds);}}
              onToggleCompletedGoals={()=>toggleShowCompletedGoals(!showCompletedGoals)}
              onToggleShowTimelineGantt={()=>setShowTimelineGantt((showTimelineGantt)=>!showTimelineGantt)}
              onToggleShowToday={()=>setShowToday((showToday)=>!showToday)}

              onClose={()=>{setShowTimelineSettings(false)}}
            />
          </div>
        ):(
          <div/>
        )}

        {/*New Didit Creation Button*/}
        {selectedTimeline?(
          <div className={`transition-all ease-in delay-300 duration-300 ${screenBlink?("opacity-0"):("opacity-100")}`}>
            <DiditActionButton
              isMobile={props.isMobile}
              highlighted={false}
              variant={'RIGHT'}
              onClick={()=>updateTimelineEvent(selectedTimeline,'>')}
            />
          </div>
        ):(
          <div className={`transition-all ease-in delay-300 duration-300 ${screenBlink?("opacity-0"):("opacity-100")}`}>
            <DiditActionButton
              isMobile={props.isMobile}
              highlighted={false}
              variant={'ZOOM-OUT'}
              onClick={()=>updateInsightLevel(activeTimelines,insightLevel.id,'UP')}
            />
          </div>
        )}

        {/*Secondary Action Creation Button*/}
        {selectedTimeline?(
          <div className={`transition-all ease-in delay-300 duration-300 ${screenBlink?("opacity-0"):("opacity-100")}`}>
            <SecondaryActionButton
              isMobile={props.isMobile}
              highlighted={false}
              variant={'LEFT'}
              onClick={()=>updateTimelineEvent(selectedTimeline,'<')}
            />
          </div>
        ):(
          <div className={`transition-all ease-in delay-300 duration-300 ${screenBlink?("opacity-0"):("opacity-100")}`}>
            <SecondaryActionButton
              isMobile={props.isMobile}
              highlighted={false}
              variant={'ZOOM-IN'}
              onClick={()=>updateInsightLevel(activeTimelines,insightLevel.id,'IN')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Event Selector Window
// (**[props.width]**)
// Add 8 px width to the window width, shift left (<--) 5 px (border-2, opaque-buffer-2, 1/2 w-2 dot) to create a better window with a little buffer for edge cases; The point is active events should always be 'clearly inside' the window.
// Shift left or right translate X px for 0% Left and 100% Right edge cases;
const TimelineOverviewSelector = (props) =>{
  return(
    <div className='relative flex flex-row flex-shrink-0 h-full justify-center items-center border-2 border-white rounded-md' style={{width:`calc(${props.overviewWidthPercentage}% + 13px)`, minWidth:"16px",transform:`translate(calc(${props.translateX} - 5px),0%)`}}>
      <div className='flex flex-col h-full' style={{width:"2px",backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
      <div className='flex flex-col flex-1 h-full justify-center items-center' style={{minWidth:"4px"}}>
        <div className='flex flex-col w-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
        </div>
        <div className='flex flex-col h-2 w-full rounded-2xl items-center'>
        </div>
        <div className='flex flex-col w-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
        </div>
      </div>
      <div className='flex flex-col h-full' style={{width:"2px",backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
      {false?(
        <div>

        <div className='flex flex-col h-full' style={{width:"2px",backgroundColor:"rgba(255,255,255,0.85)"}}>
        </div>
        </div>
      ):(
        <div/>
      )}

      {/*Timeline Expansion Visual*/}
      <div className='absolute -bottom-0.5 right-0 flex flex-row items-center justify-center w-full' style={{transform:"translate(0%,100%)"}}>
        <div className={`relative flex flex-col h-3 items-center justify-between text-white font-bold items-center w-full`}>
          <div className='flex flex-row items-center justify-between w-2/5 h-1 rounded-full border-b border-c2-highlight'>
          </div>
          <div className='flex flex-row items-center justify-between w-2/3 h-1 rounded-full border-b border-c2-highlight'>
          </div>
          <div className='flex flex-row items-center justify-between w-full h-1 rounded-full border-b border-c2-highlight'>
          </div>
        </div>
      </div>
    </div>
  )
}

//Timeline event "signifies the due date of a didit / goal or action"
const TimelineOverviewEvent = (props) =>{
  return (
    <div className='absolute top-0 left-0 flex flex-row items-center justify-start h-full w-full'>
      {/*Spacing*/}
      <div className='flex flex-row h-1 items-center justify-end' style={{width:`${props.eventOffsetPercentage}%`}}>
        {/*Elem*/}
        <div className='relative flex flex-col items-center w-2 h-full justify-center' style={{transform:"translate(50%,0%)"}}>
          {/*Icon*/}
          <div className='relative bg-white rounded-full' style={{height:"3px", width:"3px"}}>
          </div>
        </div>
      </div>
    </div>
  )
}

//Event Selector Window
const TimelineEventSelector = (props) =>{
  return(
    <div className='flex flex-row flex-shrink-0 h-full justify-center items-center border-2 border-white rounded-md' style={{width:"24px",transform:`translate(50%,0%)`}}>
      <div className='flex flex-col h-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
      <div className='flex flex-col w-3 h-full justify-center items-center'>
      <div className='flex flex-col w-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
      <div className='flex flex-col h-8 w-full rounded-2xl items-center'>
      </div>
      <div className='flex flex-col w-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
      </div>
      <div className='flex flex-col h-full flex-1' style={{backgroundColor:"rgba(255,255,255,0.85)"}}>
      </div>
    </div>
  )
}

//Timeline event "signifies the due date of a didit / goal or action"
//Includes Gantt Timeline-->Massive simplification for the gantt icon to be perfectly aligned relative to the timeline event
const TimelineEvent = (props) =>{
  return (
    <div className='absolute top-0 left-0 flex flex-row items-center justify-start h-full w-full'>
      <div className='relative flex flex-row w-full h-full items-center justify-start'>
        {/*Spacing*/}
        <div className='flex flex-row h-6 items-center justify-end' style={{width:`${props.eventOffsetPercentage}%`}}>
          {/*Elem*/}
          <div className='relative flex flex-col items-center w-2 h-full justify-center transition-all ease-in duration-300' style={{opacity:`${props.opacity}%`,transform:"translate(50%,0%)"}}>
            {/*Icon*/}
            {props.complete?(
              <div className='relative w-2 h-2 bg-white' style={{transform:"rotate(45deg)"}}>
              </div>
            ):(
              <div className='relative w-2 h-2 bg-white rounded-full'>
              </div>
            )}
            {/*Mid-Line*/}
            <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center' style={{transform:"translate(0%,00%)",height:"24px"}}>
              <div className='relative h-5/6 bg-white rounded-full' style={{width:"1px"}}>
                {/*Gantt*/}
                {props.showGantt?(
                  <div className='absolute top-0 left-0 flex flex-col items-center w-full' style={{transform:`translate(0px,${props.ganttYOffsetPX}px)`}}>
                    {/*Color Padding Icon*/}
                    <div className='flex flex-row h-4 rounded-full justify-end items-center px-0.5 z-20' style={{backgroundColor:`${props.color}`}}>
                      {/*Event Icon*/}
                      <div className='relative h-3 w-3 bg-white rounded-full flex-shrink-0 z-20'>
                      </div>

                      {/*Gantt Timeline Outline (<---Left)*/}
                      <div className='absolute left-0 top-0 flex flex-row rounded-l-full border-l border-t border-b items-center justify-end z-10' style={{height:"calc(100% + 2px)", minWidth:`${props.ganttMinWidthPX/2+1}px`, width:`${props.eventViewWidthPX*(props.eventOffsetPercentage)/100+props.ganttMinWidthPX/2+1}px`, transform:`translate(calc(-100%),-1px)`}}>
                        {/*Gantt Timeline Shading*/}
                        <div className='rounded-l-full h-full z-10' style={{backgroundColor:`${props.color}`, minWidth:`${props.ganttMinWidthPX/2}px`, width:`${props.eventViewWidthPX*(props.eventOffsetPercentage-props.ganttStartOffsetPercentage)/100+props.ganttMinWidthPX/2}px`, transform:`translate(0px,0px)`}}>
                        </div>
                      </div>

                      {/*Gantt Timeline Outline (Right--->)*/}
                      <div className='absolute right-0 top-0 flex flex-row rounded-r-full border-r border-t border-b items-center z-10' style={{height:"calc(100% + 2px)", minWidth:`${props.ganttMinWidthPX/2+1}px`, width:`${props.eventViewWidthPX*(100-props.eventOffsetPercentage)/100+props.ganttMinWidthPX/2+1}px`, transform:`translate(calc(100% - 2px),-1px)`}}>
                      </div>
                    </div>
                  </div>
                ):(
                  <div/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//Today which signifies the current time
const TodayIcon = (props) =>{
  return (
    <div className='flex flex-row items-center justify-start h-full w-full z-30'>
      {/*Spacing*/}
      <div className='flex flex-row h-8 items-center justify-end' style={{width:`${props.eventOffsetPercentage}%`}}>
        {/*Elem*/}
        <div className='relative flex flex-col items-center w-2 h-full justify-center transition-all ease-in duration-300' style={{transform:"translate(50%,0%)"}}>
          {/*Mid-Line*/}
          <div className='absolute relative top-0 left-0 h-full flex flex-col justify-center items-center rounded-sm bg-white overflow-visible' style={{transform:"translate(0%,0%)", width:"6px", opacity:"60%",}}>
          </div>
        </div>
      </div>
    </div>
  )
}

//Timeline Settings Modal
const TimelineSettings = (props) =>{
  return(
    <div id={'settingsBackground'} className={`absolute top-0 flex flex-col h-full w-full items-center justify-center`} style={{backgroundColor:"rgba(0,0,0,0.85)"}} onClick={(event)=>{console.log(event); if(event.target.id==='settingsBackground'){props.onClose()}}}>
      <div className={`relative flex flex-col text-3xl font-bold items-center justify-center mx-4 p-2 rounded-2xl border bg-black`}>
        <div className='text-white mt-8'>
          🎛 🎚 Settings 🎚 🎛
        </div>
        <div className='flex flex-col items-center justify-center w-full h-full px-8 font-medium text-xl text-white my-8'>
          <span> Customize the look and feel of your timelines</span>
        </div>

        {/*Show Only Active Goals Selector*/}
        <div className='flex flex-col items-center justify-between p-1 w-84'>
          {/*Settings Title*/}
          <div className='flex flex-row justify-start items-start w-full border-b mx-1 my-2 text-white font-normal text-lg'>
            Timeline Settings
          </div>

          {/*Show Completed Goals*/}
          <div className='flex flex-row justify-start items-start mt-1 w-full'>
            <div className='flex flex-col flex-1 justify-between items-start rounded-full pr-3'>
              <div className='flex flex-row w-full justify-start text-left text-lg font-bold text-white'> Show Completed Goals</div>
              <div className='flex flex-row w-full justify-start text-left text-xs font-medium text-white italic mb-1'> {props.showCompletedGoals?("Timelines will include all goals, including those you have completed"):("Timelines will only include active goals that are not completed")}</div>
            </div>
            <div className='flex flex-col justify-start items-center rounded-full mt-0.5'>
              <div className={`flex flex-row w-14 p-1 ${props.showCompletedGoals?("justify-end border-c2-highlight"):("justify-start border-shades-light")} items-center shadow-md bg-white rounded-full border-2`} style={{maxWidth:"100%"}} onClick={()=>{props.onToggleCompletedGoals()}}>
                <div className={`flex flex-row w-4 h-4 ${props.showCompletedGoals?("bg-c2-highlight"):("bg-shades-extralight")} rounded-full`}>
                </div>
              </div>
            </div>
          </div>

          {/*Divider*/}
          <div className='flex flex-row justify-start items-start w-full border-b mx-1 my-2'>
          </div>

          {/*Show Gantt*/}
          <div className='flex flex-row justify-start items-start mt-1 w-full'>
            <div className='flex flex-col flex-1 justify-between items-start rounded-full pr-3'>
              <div className='flex flex-row w-full justify-start text-left text-lg font-bold text-white'> Show Timeline Gantt</div>
              <div className='flex flex-row w-full justify-start text-left text-xs font-medium text-white italic mb-1'> {props.showTimelineGantt?("Timelines will include gantt chart details"):("Timeline gantt details will be hidden")}</div>
            </div>
            <div className='flex flex-col justify-start items-center rounded-full mt-0.5'>
              <div className={`flex flex-row w-14 p-1 ${props.showTimelineGantt?("justify-end border-c2-highlight"):("justify-start border-shades-light")} items-center shadow-md bg-white rounded-full border-2`} style={{maxWidth:"100%"}} onClick={()=>{props.onToggleShowTimelineGantt()}}>
                <div className={`flex flex-row w-4 h-4 ${props.showTimelineGantt?("bg-c2-highlight"):("bg-shades-extralight")} rounded-full`}>
                </div>
              </div>
            </div>
          </div>

          {/*Divider*/}
          <div className='flex flex-row justify-start items-start w-full border-b mx-1 my-2'>
          </div>

          {/*Show Today*/}
          <div className='flex flex-row justify-start items-start mt-1 w-full'>
            <div className='flex flex-col flex-1 justify-between items-start rounded-full pr-3'>
              <div className='flex flex-row w-full justify-start text-left text-lg font-bold text-white'> Show Today Reference</div>
              <div className='flex flex-row w-full justify-start text-left text-xs font-medium text-white italic mb-1'> {props.showToday?("Timelines will include a semi-transparent overlay for the current time."):("Timelines will not include a visual reference for the current time.")}</div>
            </div>
            <div className='flex flex-col justify-start items-center rounded-full mt-0.5'>
              <div className={`flex flex-row w-14 p-1 ${props.showToday?("justify-end border-c2-highlight"):("justify-start border-shades-light")} items-center shadow-md bg-white rounded-full border-2`} style={{maxWidth:"100%"}} onClick={()=>{props.onToggleShowToday()}}>
                <div className={`flex flex-row w-4 h-4 ${props.showToday?("bg-c2-highlight"):("bg-shades-extralight")} rounded-full`}>
                </div>
              </div>
            </div>
          </div>

          {/*Divider*/}
          <div className='flex flex-row justify-start items-start w-full border-b mx-1 my-2'>
          </div>

          {/*Prevent Out of Bounds Errors*/}
          <div className='flex flex-row justify-start items-start mt-1 w-full'>
            <div className='flex flex-col flex-1 justify-between items-start rounded-full pr-3'>
              <div className='flex flex-row w-full justify-start text-left text-lg font-bold text-white'> Prevent Out of Bounds</div>
              <div className='flex flex-row w-full justify-start text-left text-xs font-medium text-white italic mb-1'> {props.preventOutOfBounds?("Time starts and ends with your data. Dates are limited to start with your first goal, and end with your goal furthest in the future."):("Time is time. You can explore time horizons in the future and past, even if you have no data there.")}</div>
            </div>
            <div className='flex flex-col justify-start items-center rounded-full mt-0.5'>
              <div className={`flex flex-row w-14 p-1 ${props.preventOutOfBounds?("justify-end border-c2-highlight"):("justify-start border-shades-light")} items-center shadow-md bg-white rounded-full border-2`} style={{maxWidth:"100%"}} onClick={()=>{props.onTogglePreventOutOfBounds()}}>
                <div className={`flex flex-row w-4 h-4 ${props.preventOutOfBounds?("bg-c2-highlight"):("bg-shades-extralight")} rounded-full`}>
                </div>
              </div>
            </div>
          </div>

          {/*Divider*/}
          <div className='flex flex-row justify-start items-start w-full border-b mx-1 my-2'>
          </div>

          {/*FF Through Empty Space*/}
          <div className='flex flex-row justify-start items-start mt-1 w-full'>
            <div className='flex flex-col flex-1 justify-between items-start rounded-full pr-3'>
              <div className='flex flex-row w-full justify-start text-left text-lg font-bold text-white'> Fast Forward Through Empty Space</div>
              <div className='flex flex-row w-full justify-start text-left text-xs font-medium text-white italic mb-1'> {props.fastForwardThroughEmptySpace?("Changes to the insight window with the ('<'*'>') buttons will always scroll new timeline events into view."):("Changes to the insight window with ('<'*'>') buttons will update the time horizon, even if there are no active events for the time horizon.")}</div>
            </div>
            <div className='flex flex-col justify-start items-center rounded-full mt-0.5'>
              <div className={`flex flex-row w-14 p-1 ${props.fastForwardThroughEmptySpace?("justify-end border-c2-highlight"):("justify-start border-shades-light")} items-center shadow-md bg-white rounded-full border-2`} style={{maxWidth:"100%"}} onClick={()=>{props.onToggleFastForwardThroughEmptySpace()}}>
                <div className={`flex flex-row w-4 h-4 ${props.fastForwardThroughEmptySpace?("bg-c2-highlight"):("bg-shades-extralight")} rounded-full`}>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/*Close button*/}
        <button type="button" onClick={()=>{props.onClose()}} className={`absolute top-2 right-2 items-center text-shades-light font-medium z-50 rounded-full bg-transparent focus:outline-none hover:bg-shades-light`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

const LightSpinner = (props)=>{
  return(
    <div className={`relative flex flex-col w-full h-full items-center justify-center ${props.variant} overflow-hidden`}>
      <div className={`flex flex-col w-full h-full items-center justify-center overflow-hidden z-20 ${props.variant}`} style={{minWidth:"100px", minHeight:"100px"}}>
        {/*'Border' Boudary*/}
        <div className={`relative flex flex-col h-full w-full items-center justify-start ${props.borderHeight?(String("border-"+props.borderHeight)):("border-4")} border-transparent ${props.variant} overflow-visible`}>
          {/*Spinner*/}
          <div className='flex flex-col w-full h-1/2 top-0 left-0 justify-end items-center overflow-visible'>
            <div className={`flex flex-col items-center justify-end ${props.highlightWidth?(String("h-"+props.highlightWidth)):("h-8")} animate-spin`} style={{width:"200%", backgroundColor:`${props.color}`}}>
            </div>
          </div>

          {/*Center Element In the border*/}
          <div className={`absolute flex flex-col w-full h-full items-center justify-center bg-white shadow-md ${props.variant}`}>
            <span className='text-5xl animate-pulse mb-1'>✨</span>
            <span className='text-md text-shades-light'>Loading</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Timeline;
