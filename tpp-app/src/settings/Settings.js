import React, {useState} from 'react';
import {View, Switch } from 'react-native';
import {Card} from 'react-native-elements';

export default function Settings () {
    const [isEnabled, setIsEnabled] = useState(true)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Card>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </Card>
        </View>
    )
}
