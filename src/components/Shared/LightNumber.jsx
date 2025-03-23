import React from "react";

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

export default LightNumber;
