//TESTS: Currently passes all dates in the last 5 years useing ./tests/dateTest.js
//0)From startDate I want to calculate the date tstring for:
//1)Yesterday, The beginning of the week, 1 month, 3 months, 6 months, YTD, 1 year, 3 years, 5 years
//2) Convert from the correct day into the YYYYMMDD format needed by the API

const VALID_FREQUENCIES = ["SECOND","MINUTE","QUARTER_HOUR","HALF_HOUR","HOUR","1.5_HOUR","3_HOUR","HALF_DAY","DAY"];

function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj))
  const propNames = Object.getOwnPropertyNames(obj)

  propNames.forEach(function(name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    Object.defineProperty(copy, name, desc)
  })

  return copy
}

function supportedAggregates(){
  return [
  'DAY',
  'WEEK',
  'MONTH',
  'QUARTER',
  'HALF',
  'YEAR_TO_DATE',
  'YEAR',
  ]
}

//1 Figure out the right day to request for each case
//TODO: Check for Market Holidays during days of the week
//**This function should return the valid date that is AT LEAST the relative period prior to the current date
function getRelativeDate (startDate,aggregate,number) {

  //Initilize a new date from the startDate
  const relativeDate = new Date(startDate);

  //If optional number is left out, set it equal to 1;
  if(!number||Number.isNaN(number)){
    let number = 1;
  }

  //myKeys ;)
  switch(aggregate) {
    case 'MINUTE':
      relativeDate.setMinutes(startDate.getMinutes()-1*number)
      accountForWeekends(relativeDate);
      break;
    case 'HOUR':
      relativeDate.setHours(startDate.getHours()-1*number)
      accountForWeekends(relativeDate);
      break;
    case 'DAY':
      //We want to know the change since yesterday's close, so we need yesterday's date (or the date of the most recent market close)
      relativeDate.setUTCDate(startDate.getUTCDate()-1*number)
      accountForWeekends(relativeDate);
      break;
    case 'WEEK':
      relativeDate.setUTCDate(startDate.getUTCDate()-7*number);
      accountForWeekends(relativeDate);
      break;
    case 'MONTH':
      relativeDate.setUTCMonth(startDate.getUTCMonth()-1*number);
      accountForWeekends(relativeDate);
      break;
    case 'QUARTER':
      relativeDate.setUTCMonth(startDate.getUTCMonth()-3*number);
      accountForWeekends(relativeDate);
      break;
    case 'HALF':
      relativeDate.setUTCMonth(startDate.getUTCMonth()-6*number);
      accountForWeekends(relativeDate);
      break;
    case 'YEAR_TO_DATE':
      relativeDate.setUTCDate(30);
      relativeDate.setUTCMonth(11);
      relativeDate.setUTCFullYear(relativeDate.getUTCFullYear()-1)
      accountForWeekends(relativeDate);
      break;
    case 'YEAR':
    relativeDate.setUTCFullYear(startDate.getUTCFullYear()-1*number);
    accountForWeekends(relativeDate);
      break;
    default:
      break;
  }

  return relativeDate;

}

function accountForWeekends(relativeDate){

  let weekDayNum=relativeDate.getUTCDay();

  if(weekDayNum===0){
    relativeDate.setUTCDate(relativeDate.getUTCDate()-2);
  } else if(weekDayNum===6){
    relativeDate.setUTCDate(relativeDate.getUTCDate()-1);
  }

  return relativeDate;
}

//2) Convert the date into the string needed by the API
function get_YYYYMMDD_FromDate (date) {

  let dateString = "";
  let year;
  let month;
  let day;

  year = date.getUTCFullYear();


  if(date.getUTCMonth()+1<10){
    month = "0"+(date.getUTCMonth()+1);
  } else{
    month = date.getUTCMonth()+1;
  }

  if(date.getUTCDate()<10){
    day = "0"+date.getUTCDate();
  } else{
    day = date.getUTCDate();
  }

  dateString = year + "-" + month + "-" + day;

  return dateString;

}

//2) Convert the date into the string needed by the API
function MMDD_FromDate (date) {

  let dateString = "";
  let month;
  let day;

  if(date.getUTCMonth()+1<10){
    month = "0"+(date.getUTCMonth()+1);
  } else{
    month = date.getUTCMonth()+1;
  }

  if(date.getUTCDate()<10){
    day = "0"+date.getUTCDate();
  } else{
    day = date.getUTCDate();
  }

  dateString = month + "-" + day;

  return dateString;

}

function nextDate(YYYYMMDD_dateString){
  const nextDate = new Date(Date.parse(YYYYMMDD_dateString));

  nextDate.setUTCDate(nextDate.getUTCDate()-1);

  return get_YYYYMMDD_FromDate(nextDate);
}

function setDateFrom_YYYYMMDD(YYYYMMDD_dateString){
  let date = new Date();

  const pieces=YYYYMMDD_dateString.split('-');

  console.log(pieces);

  let year = pieces[0];

  let month = pieces[1];

  let day = pieces [2];

  date.setUTCFullYear(year);
  date.setUTCMonth(month);
  date.setUTCDate(day);

  console.log(date.toUTCString());
  return date;

}

function getQuarterFromDate(date){
  let monthNum = date.getUTCMonth();

  if(monthNum<3){
    return 'Q1'
  }

  if(monthNum>3 && monthNum<6){
    return 'Q2'
  }

  if(monthNum>6 && monthNum<9){
    return 'Q3'
  }

  if(monthNum>9 && monthNum<12){
    return 'Q4'
  }
}

function midnight(timestamp){
  let midnight = new Date(timestamp);
  midnight.setUTCHours(0);
  midnight.setUTCMinutes(0);
  midnight.setUTCSeconds(0);
  midnight.setUTCMilliseconds(0);

  return midnight
}

module.exports = {copy, VALID_FREQUENCIES, supportedAggregates, getRelativeDate, accountForWeekends, get_YYYYMMDD_FromDate, MMDD_FromDate,setDateFrom_YYYYMMDD, nextDate, getHoursAndMinutesFromTimestamp, midnight}
