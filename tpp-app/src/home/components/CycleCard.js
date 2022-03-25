import AnimatedProgressWheel from 'react-native-progress-wheel';
 import React, { useState, useEffect } from 'react';
 import {View, Text} from 'react-native';
 import CycleService from '../../services/cycle/CycleService';


 function onPeriodText(periodDays){
   return (
     <View>
       <Text>Period Day </Text>
       <Text> {periodDays} </Text>
     </View>
   )
 }

 function offPeriodText(daysSinceLastPeriod){
   return (
     <View>
       <Text> {daysSinceLastPeriod} </Text>
       <Text> Days since last period </Text>
     </View>
   )
 }


 function Cycle(){
   let [periodDays, setPeriodDays] = useState(0);
   let [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState(0);
   let [cycleDonutPercent, setCycleDonutPercent] = useState(0);

   useEffect(() =>
   {
     CycleService.GETPeriodDay().then(days => {
       setPeriodDays(days);
     });

     CycleService.GETCycleDonutPercent().then(percent => {
       setCycleDonutPercent(percent);
     });

     CycleService.GETDaysSinceLastPeriodEnd().then(days => {
       setDaysSinceLastPeriod(days);
     })
   }, []);




  return (
   <View style={{flex: 1,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                   <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                       <View style={{flex: 1,flexDirection:'row',alignItems:'center',alignSelf:'flex-end',margin:10}}>
                         <AnimatedProgressWheel
                             size={200}
                             width={30}
                             color={'#B31F20'}
                             progress={cycleDonutPercent}
                             backgroundColor={'#F1F1F0'}
                         >
                         </AnimatedProgressWheel>
                       </View>
                   </View>


                   <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center', position:'absolute'}}>
                     {periodDays > 0 ? onPeriodText(periodDays) : offPeriodText(daysSinceLastPeriod)}
         </View>
   </View>
 )
 }

 export default function CycleCard(){
   return (
       <View>
       <Cycle/>
       </View>
   );
   }