import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const BackButton = ({ onPress, title }) => {
    return (
        <View style={styles.backButtonContainer}>
            <Button
                icon={
                    <Icon
                    name="arrow-back-ios"
                    size={24}
                    color="#5A9F93"
                    />
                }
                titleStyle={styles.backButtonText}
                title={title}
                onPress={onPress}
                type="clear"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backButtonContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        width: 120,
        height: 54,
        bottom: 10
    },
    backButtonText: {
        fontStyle: 'normal',
        fontWeight: "600",
        color: '#000',
        alignItems: 'center',
        lineHeight: 20,
    }
});
