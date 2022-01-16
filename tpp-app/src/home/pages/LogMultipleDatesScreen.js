import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import VectorImage from 'react-native-vector-image';
import { Calendar } from './CalendarScreen';


export default function LogMultipleDatesScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.close}>
                  <VectorImage source={require('../../../ios/tppapp/Images.xcassets/icons/close_icon.svg')}/>
                </TouchableOpacity>
                <Text style={styles.navbarTitle}>Tap date to log period</Text>

            </View>
            <Calendar />
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
