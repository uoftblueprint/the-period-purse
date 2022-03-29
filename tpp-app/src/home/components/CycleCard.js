import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';


 function OnPeriodText({periodDays}){
   return (
     <View style={styles.periodTextContainer}>
       <Text style={styles.cycleText}>Period Day </Text>
       <Text style={styles.cycleNumber}> {periodDays} </Text>
     </View>
   )
 }

 function OffPeriodText({daysSinceLastPeriod}){
   return (
     <View style={styles.periodTextContainer}>
       <Text style={styles.cycleNumber}> {daysSinceLastPeriod} </Text>
       <Text style={styles.cycleText}> Days since </Text>
       <Text style={styles.cycleText}> last period </Text>
     </View>
   )
 }


 function Cycle({periodDays, daysSinceLastPeriod, cycleDonutPercent}){
  return (
  
      // Cycle Centering code
      <View>
            <View style={styles.centeredColumn}>
                <View style={styles.centeredRow}>
                  <AnimatedProgressWheel
                      size={200}
                      width={25}
                      color={'#B31F20'}
                      fullColor={'#72C6B7'}
                      progress={cycleDonutPercent}
                      backgroundColor={'#F1F1F0'}
                  >
                  </AnimatedProgressWheel>
                </View>
            </View>

          {/* centering the text within the cycle */}
          <View style={styles.absoluteCentered}>
              {periodDays > 0 ? <OnPeriodText periodDays={periodDays}/> : <OffPeriodText daysSinceLastPeriod={daysSinceLastPeriod}/>}
          </View>
      </View>
 )
 }

 export default function CycleCard({periodDays, daysSinceLastPeriod, cycleDonutPercent}){
   return (
        <View style={styles.card}>
          <Cycle periodDays={periodDays} daysSinceLastPeriod={daysSinceLastPeriod} cycleDonutPercent={cycleDonutPercent}/>
        </View>
   );
}

const styles = StyleSheet.create({
  card:{
    borderRadius: 12,
    height: 298,
    backgroundColor: "white",
  },
  cycleText: {
    fontFamily: "Avenir",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.30000001192092896,
    color: "#6D6E71",
  },
  cycleNumber: {
    fontFamily: "Avenir",
    fontSize: 50,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 68,
    letterSpacing: -0.30000001192092896,
    color: "#B31F20",
  },
  periodTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredColumn: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center' 
  }, 
  centeredRow: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-end',
    margin:10
  },
  absoluteCentered: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center'}

});