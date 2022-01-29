import React from "react";
import { Button, Text, View } from "react-native";


export default function LogSymptomsScreen({ navigation, route }) {

  // this is how you access the params passed from the previous page
  // const date = route.params.date
  // console.log(date)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: '20px 20px 0px 0px' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Log your symptoms here. Swipe down to dismiss or click the button.</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
