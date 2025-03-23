import React from "react";
import {useState,useEffect,useLayoutEffect, useRef} from 'react';

//Modernized version of the light wave pattern annimation; Stick a line over a box with heights as inputs (used with Braile Component)
const LightWave = (props) =>{
  //Tension MX to 'tighten or slacken' curvature of the lines
  const TENSION_MX=8;
  // Each point has this box around it -- the numbers define and help determine the entry and exit angles and positioning of the c1 & c2 values for the bezier curves based on inbound and outbound slopes
  // Used to create the pathstring from the set of points
  //     1
  //  8  _  2
  // 7 | * | 3
  //  6  -  4
  //     5

  const SLOPE_MAP={
    'VERCIAL_POSITIVE':{id:'VERTICAL_POSITIVE', inboundCoordinate:'5', outboundCoordinate:'1', appliesToSlope:(slope)=>{return slope>=10}},
    'STEEP_POSITIVE':{id:'STEEP_POSITIVE', inboundCoordinate:'6', outboundCoordinate:'2', appliesToSlope:(slope)=>{return slope>2 && slope<10}},
    'FLAT':{id:'FLAT', inboundCoordinate:'7', outboundCoordinate:'3', appliesToSlope:(slope)=>{return slope>=-2 && slope <=2}},
    'STEEP_NEGATIVE':{id:'STEEP_NEGATIVE', inboundCoordinate:'8', outboundCoordinate:'4', appliesToSlope:(slope)=>{return slope<-2 && slope>-10}},
    'VERTICAL_NEGATIVE':{id:'VERTICAL_NEGATIVE', inboundCoordinate:'5', outboundCoordinate:'1', appliesToSlope:(slope)=>{return slope<=-10}},
  }
  const COORDINATE_MAP={
    '1':{id:'1', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x, y:point.y-coordinateOffset}}},
    '2':{id:'2', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y-coordinateOffset}}},
    '3':{id:'3', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y}}},
    '4':{id:'4', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x+coordinateOffset, y:point.y+coordinateOffset}}},
    '5':{id:'5', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x, y:point.y+coordinateOffset}}},
    '6':{id:'6', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y+coordinateOffset}}},
    '7':{id:'7', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y}}},
    '8':{id:'8', calculateCoordinateOffset:(point,coordinateOffset)=>{return {x:point.x-coordinateOffset, y:point.y-coordinateOffset}}},
  }
  //100 steps up, 100 steps down
  const POINT_COUNT=200;

  //Calculate coordiante offsets to curve the path
  const getCoordinatesForPoint=(currentPoint,previousPoint,nextPoint)=>{
    //Calculate the inbound and outbound slopes for the point
    let inboundSlope = ((currentPoint.y)-(previousPoint.y))/(currentPoint.x-previousPoint.x);
    let outboundSlope = 0;

    if(nextPoint.x!==currentPoint.x){
      outboundSlope = ((nextPoint.y)-(currentPoint.y))/(nextPoint.x-currentPoint.x);
    }

    //Calculate the coordinate entry and exit path based on the slopes

    let inboundCoordinateType = Object.values(SLOPE_MAP).find(entry=>{return entry.appliesToSlope(inboundSlope)});
    let outboundCoordinateType = Object.values(SLOPE_MAP).find(entry=>entry.appliesToSlope(outboundSlope));

    let inboundCoordinate = inboundCoordinateType?inboundCoordinateType.inboundCoordinate:7;
    let outboundCoordinate = outboundCoordinateType?outboundCoordinateType.outboundCoordinate:3;

    //Calcualte the coordinate offsets
    let inboundOffset = COORDINATE_MAP[inboundCoordinate].calculateCoordinateOffset(currentPoint,coordinateOffset);
    let outboundOffset = COORDINATE_MAP[outboundCoordinate].calculateCoordinateOffset(currentPoint,coordinateOffset);

    return {c1:inboundOffset,c2:outboundOffset, slopes:{inboundSlope:inboundSlope,outboundSlope:outboundSlope}};
  };

  //Calculate the path theough the plotted points based on the provided data
  const calculatePath=(pathData,zeroHeightOffset,smoothCurves)=>{

    if(true){
      let points=pathData.points

      let coordinates = [];

      let pathString = String("M " + points[0].x + " " + (lightViewHeight-points[0].y) +" C " + points[0].x + " " + (lightViewHeight-points[0].y) +" ");

      points.forEach((point,index)=>{
        if(index>0){
          let previousPoint = points[index-1];
          let nextPoint;

          if(index<points.length-1){
            nextPoint=points[index+1];
          }else{
            nextPoint = point
          }

          let coordinateOffsets = getCoordinatesForPoint(point,previousPoint,nextPoint);
          coordinates.push(coordinateOffsets);

          if(index<points.length-1){
            pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y)+ " C "+coordinateOffsets['c2'].x+" "+(lightViewHeight-coordinateOffsets['c2'].y) + " ");
          }else{
            pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y));
          }
        }
      });

      let newSlopes = {...slopes};
      newSlopes[pathData.key]=coordinates
      setSlopes(newSlopes);

      return pathString;
    }else{
      let points=pathData.points

      let coordinates = [];

      let pathString = String("M " + points[0].x + " " + (lightViewHeight-points[0].y) +" C " + points[0].x + " " + (lightViewHeight-points[0].y) +" ");

      points.forEach((point,index)=>{
        if(index>0){
          let previousPoint = points[index-1];
          let nextPoint;

          if(index<points.length-1){
            nextPoint=points[index+1];
          }else{
            nextPoint = point
          }

          let coordinateOffsets = getCoordinatesForPoint(point,previousPoint,nextPoint);
          coordinates.push(coordinateOffsets);

          if(index<points.length-1){
            pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y)+ " C "+coordinateOffsets['c2'].x+" "+(lightViewHeight-coordinateOffsets['c2'].y) + " ");
          }else{
            pathString=pathString+String(coordinateOffsets['c1'].x+" "+(lightViewHeight-coordinateOffsets['c1'].y)+" "+point.x+" "+(lightViewHeight-point.y));
          }
        }
      });

      let newSlopes = {...slopes};
      newSlopes[pathData.key]=coordinates
      setSlopes(newSlopes);

      return pathString;
    }
  }

  const lightRef = useRef();
  const [lightViewHeight,setLightViewHeight]=useState(null);
  const [lightViewWidth,setLightViewWidth]=useState(200);
  const [coordinateOffset,setCoordinateOffset] = useState((lightViewWidth/props.entries)/TENSION_MX);
  const [pathStrings,setPathStrings] = useState([]);
  const [slopes,setSlopes] = useState({});
  const [lightViewID,setLightViewID]=useState(String('lightView-'+Date.now()+Math.random()));

  const [newWaves,setNewWaves]=useState([]);
  const [animate,setAnimate]=useState(false);
  const [strokeDashArray,setStrokeDashArray]=useState(['0 0']);
  const [illuminatedPath,setIlluminatedPath]=useState(0);

  //Initialize the light view
  useLayoutEffect(()=>{
    let ref = document.getElementById(lightViewID);
    if(ref && ref.getBoundingClientRect().height!==lightViewHeight){
      console.log({status:"Updating Light View height", ref:ref});
      setLightViewWidth(ref.getBoundingClientRect().width);
      setLightViewHeight(ref.getBoundingClientRect().height);
      setCoordinateOffset((ref.getBoundingClientRect().width/props.entries)/TENSION_MX);
    }

  },[lightRef,props,lightViewID]);

  //Initialize the wave once the height is initialized
  useEffect(()=>{
    if(lightViewHeight && props){
      //Generate Paths for each wave form
      parseHeightData(props.linePointMap,lightViewWidth/props.entries,true);

      if(props.animate){
        setAnimate(props.animate)
      }
    }
  },[lightViewHeight,animate, props]);

  //Animate the waves
  useEffect(()=>{
    if(animate){
      //Set the interval && Churn the Ocean
      let interval = setInterval(()=>{
        /*
        let newWaveForms=[];

        for(let i=18; i>=1; i--){
          newWaveForms.push(generateWave());
        }

        //Adjust the heights to 'layer the paths'
        let newPointSets = {};
        newWaveForms.forEach((dataSet,index)=>{
          newPointSets[String(index)]=dataSet.map(entry=>entry-4.5*index);
        });

        //Generate Paths for each wave form
        parseHeightData(newPointSets,lightViewWidth/POINT_COUNT,true);

        setNewWaves(newWaveForms);
        */
        animateWaves();
      },3000);

      return ()=>clearInterval(interval);
    }
  },[pathStrings]);

  //Illuminate the waves
  useEffect(()=>{
    if(props.illuminate && props.linePointMap){
      let illuminationTimer=setInterval(()=>{
        setIlluminatedPath((illuminatedPath)=>illuminatedPath===Object.keys(props.linePointMap).length-1?0:illuminatedPath+1);
      },6000);

      return ()=>clearInterval(illuminationTimer);
    }
  },props)

  //Callback function to generat wave pattern
  const generateWave = (init) =>{
    let newWaveData = [];

    let basis=80;
    let yIntercept=basis;
    let wavePeakOffset=null;

    newWaveData.push(yIntercept);

    //'Step the data forward a bit just to make things look reasonable'
    for(let i=0; i<POINT_COUNT; i++){

      //Normalize the start and end of the wave
      if(i<0.18*POINT_COUNT || i>0.9*POINT_COUNT){
        newWaveData.push(basis);
      }else{

        //Build up the wave form
        if(i<=POINT_COUNT/2){
          let step = Math.random();
          let drift=0.15;

          let direction='POSITIVE';
          if(i%3===0 || step>0.85){
            direction='NEGATIVE';
          }

          if(direction==='POSITIVE'){
            yIntercept=yIntercept+step+drift;
          }else{
            yIntercept=yIntercept-step+drift;
          }

          newWaveData.push(Math.max(Math.min(98,yIntercept),0));
        }

        //Step back to the initial basis
        //Assume there are 100 steps, step a random amount but fiddle with things until the waves look great!
        if(i>POINT_COUNT/2){
          if(!wavePeakOffset){
            wavePeakOffset=Math.max(...newWaveData)-basis;
          }

          let step = Math.random();

          let direction='NEGATIVE';

          if(i%6===0 || step>0.9){
            direction='POSITIVE';
          }

          if(direction==='NEGATIVE'){
            //The plan here is to 'step by 0.5-1.5'% of the Peak offset each of the 100 steps
            //so if you have 100% height, you hack 0.5-1.5% of that initial height 100 times you should be close to the basis at the end
            if(i<0.8*POINT_COUNT){
              let percentDrift = 2.84;

              let percentStep = (step+percentDrift)/100;

              yIntercept=yIntercept-percentStep*wavePeakOffset;
            }else{
              //If you are in the last 10% then close the gap more aggressively in the final few steps
              if(i<0.85*POINT_COUNT){
                yIntercept=yIntercept-Math.abs(yIntercept-basis)/7;
              }else{
                yIntercept=yIntercept-Math.abs(yIntercept-basis)/2;
              }
            }
          }else{
            yIntercept=yIntercept+step;
          }

          newWaveData.push(Math.max(Math.min(98,yIntercept),basis));
        }
      }
    }



    return (newWaveData);
  }

  //Parse the heights for the data based on the provided data
  const parseHeightData=(pointSets,barWidth,smoothLines,)=>{
    let Paths = {};

    let maxHeight = 0;
    let minHeight = 0;

    //Get the max and min heights for all the pathstrings
    Object.keys(pointSets).forEach(key=>{
        let data = pointSets[key];

        let maxSetHeight = Math.max(...data);

        if(maxSetHeight>maxHeight){
          maxHeight=maxSetHeight;
        }

        let minSetHeight = Math.min(...data);

        if(minSetHeight<minHeight){
          minHeight = minSetHeight;
        }

      });

    //Calcualte the total basis
    let totalBasis=maxHeight+Math.abs(minHeight);
    let zeroHeightOffset=lightViewHeight*maxHeight/totalBasis

    //Calculate the heights and path data
    Object.keys(pointSets).forEach(key=>{
      let data = pointSets[key];

      let newHeights = data.map(point=>point>=0?point/maxHeight*maxHeight/totalBasis*100+Math.abs(minHeight)/totalBasis*100:(Math.abs(minHeight)-Math.abs(point))/Math.abs(minHeight)*Math.abs(minHeight)/totalBasis*100);

      let pathData = {key:key, points:data.map((point,index)=>{return {x:index*barWidth+barWidth/2, y:newHeights[index]/100*lightViewHeight}})};

      Paths[key]=calculatePath(pathData,zeroHeightOffset,smoothLines);
    });

    setPathStrings(Paths);
  }

  const animateWaves=()=>{
    //setStrokeDashArray(['8 1000']);
    //setTimeout(()=>setStrokeDashArray(['0 0']),1000);

    setStrokeDashArray(['8 1000']);
    setTimeout(()=>setStrokeDashArray(['0 0']),1000);
  }

  return(
    <div ref={lightRef} id={lightViewID} className='relative flex flex-col w-full h-full items-center justify-center'>
      {Object.values(pathStrings).length>0&&Object.values(pathStrings).map((pathString,pointSetIndex)=>{
        let illuminated=props.illuminate && illuminatedPath===pointSetIndex;
        let lineWidth=illuminated?3:props.illuminate?1:1.5;

        return(
          <div key={pointSetIndex} className='absolute top-0 left-0 flex flex-col w-full h-full'>
            {/*Draw the line*/}
            <div className={`flex flex-row flex-1 h-full z-0 transition-all duration-1000 ease-in-out`} style={{opacity:`${props.illuminate &&illuminated?100:props.illuminate?40:100}%`}}>
              <svg height={`${lightViewHeight}`} width={`${lightViewWidth}`} xmlns="http://www.w3.org/2000/svg" style={{color:`${props.colors?props.colors[pointSetIndex]:(pointSetIndex%3===0?"#2dd4bf":"#67E8F9")}`}}>
                <path className='transition-all duration-1000'  d={pathString} stroke="currentColor" strokeWidth={lineWidth} strokeDasharray={strokeDashArray} strokeLinejoin='round' strokeLinecap='round' fill="transparent"/>
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LightWave;
