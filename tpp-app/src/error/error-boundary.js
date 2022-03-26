import * as React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import Warning from '../../ios/tppapp/Images.xcassets/icons/warning.svg';

export default function ErrorFallback({error, resetErrorBoundary}) {
    return (
            <View role="alert" style={styles.errorContainer}>
                <View style={styles.errorIcon}>
                    <Warning/>
                </View>
                <Text style={styles.errorTitle}>Whoops</Text>
                <Text style={styles.errorText}>Something went wrong. Please try again, or close the app and reopen it.</Text>
                <TouchableHighlight underlayColor={'#EEEEEE'} style={styles.tryAgainButton}
                                    onPress={() => { resetErrorBoundary() }}>
                    <Text>Try Again</Text>
                </TouchableHighlight>
            </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        alignItems: 'center'
    },
    errorIcon: {
        position: 'absolute',
        top: 300,
    },
    errorTitle: {
        position: 'absolute',
        height: 27,
        top: 371,
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: "800",
        fontSize: 20,
        lineHeight: 27,
        textAlign: 'center',
        letterSpacing: -0.02,
        color: '#6D6E71'
    },
    errorText: {
        position: 'absolute',
        width: 342,
        height: 59,
        top: 404,

        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        letterSpacing: -0.3,
        color: '#000000',
    },
    tryAgainButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        position: 'absolute',
        width: 129,
        height: 45,
        top: 475,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 30,
    },
    tryAgainButtonText: {
        backgroundColor: '#FFFFFF',
        /* black */

        borderColor: '#000000',
    }
});
