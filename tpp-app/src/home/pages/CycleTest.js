import AnimatedProgressWheel from 'react-native-progress-wheel';
import React, { useState } from 'react';
import {View, Text} from 'react-native';

// Example for having a cycle component with text inside
export default function CycleTest(){
 return (
<View style={{flex: 1,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <View style={{flex: 1,flexDirection:'row',alignItems:'center',alignSelf:'flex-end',margin:10}}>
                      <AnimatedProgressWheel
                          size={200}
                          width={30}
                          color={'yellow'}
                          progress={45}
                          backgroundColor={'orange'}
                      >
                      </AnimatedProgressWheel>
                    </View>
                </View>


                <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center', position:'absolute'}}>
                  <Text>
                    7 Days
                  </Text>
                  <Text>
                    since period day
                  </Text>
       </View>
</View>)

}
