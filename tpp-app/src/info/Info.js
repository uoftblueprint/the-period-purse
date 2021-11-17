import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements'


const cardGap = 16;
const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const LearnMoreCard = () => {
    return(
        <Card>
            <Card.Title>Learn more about The Period Purse</Card.Title>
            <Card.Divider/>
            <Text style={{ marginBottom: 10}}>
            The Period Purse strives to achieve menstrual equity by providing people 
            who menstruate with access to free menstrual products, and to reduce the 
            stigma surrounding periods through public education and advocacy.
            </Text>
            <Button
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Visit the website'
                onPress={() => Linking.openURL('https://www.theperiodpurse.com')}
            />
        </Card>  
    )
}

const PadsCard = () =>{
    return(
        <Card containerStyle={styles.card}>
            <View >
            
                <Text>Pads</Text>

            </View>
        </Card>
    )
}

const TamponsCard = () =>{
    return(
        <Card containerStyle={styles.card}>
            
        </Card>
    )

}

const PeriodUnderwearsCard = () =>{
    return(
        <Card>
            
        </Card>
    )

}

const MenstrualCupsCard = () =>{
    return(
        <Card>
            
        </Card>
    )
}

const ClothPadsCard = () =>{
    return(
        <Card>
            
        </Card>
    )
}



export default function Info () {
    return (
        <ScrollView>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 80 }}>
                <Text>Learn more about period products</Text>
                <PadsCard/>
                <TamponsCard/>
                <PeriodUnderwearsCard/>
                <MenstrualCupsCard/>
                <ClothPadsCard/>
                <LearnMoreCard/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: cardWidth,
    },
});