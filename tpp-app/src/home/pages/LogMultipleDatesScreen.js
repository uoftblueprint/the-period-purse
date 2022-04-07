import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CloseIcon from '../../../ios/tppapp/Images.xcassets/icons/close_icon.svg';


export default function LogMultipleDatesScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.close}>
                  <CloseIcon fill={'#181818'}/>
                </TouchableOpacity>
                <Text style={styles.navbarTitle}>Tap date to log period</Text>

            </View>
            <Text>Calendar goes here. Might have pass in navigator to access it.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navbarContainer: {
        paddingTop: 98,
        paddingBottom: 30,
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#72C6B7',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbarTitle: {
        color: '#181818',
        fontWeight: "600",
        fontSize: 20,
    },
    close: {
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 18,
      bottom: 27
    }
})
