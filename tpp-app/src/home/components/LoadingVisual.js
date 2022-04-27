import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/**
 * 
 * @returns styled indicator for showing that we are loading something
 */
export default function LoadingVisual (){
    // general use pattern is to use Promise.all for all backend calls. and stop rendering this when done
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#ff0000"/>
        </View>
    )
}

const styles = StyleSheet.create({
   centered: {
       display: "flex",
       flex: 1,
       justifyContent: "center",
       alignContent: "center",
       backgroundColor: "#FFFFFF",
   }

})