import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView, Image, TouchableOpacity } from 'react-native';
import padIcon from '../../ios/tppapp/Images.xcassets/icons/pad_icon.png';
import tamponsIcon from '../../ios/tppapp/Images.xcassets/icons/tampons_icon.png';
import underwearIcon from '../../ios/tppapp/Images.xcassets/icons/underwear_icon.png';
import cupIcon from '../../ios/tppapp/Images.xcassets/icons/cup_icon.png';
import clothPadIcon from '../../ios/tppapp/Images.xcassets/icons/clothpad_icon.png'
import PadImageHappy from 'tpp-app/ios/tppapp/Images.xcassets/InfoPageImages/pad-3-2x.png';
import { GETFactCycle, POSTFactCycle } from "./InfoService"
import { getFullCurrentDateString } from "../services/utils/helpers.js"

const LearnMoreCard = () => {
    return(
        <View style={styles.learnMoreCard}>
            <Text style={styles.productText}>Learn more about The Period Purse</Text>

            <Text style={styles.learnMoreText}>
                The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy.
            </Text>
            <TouchableOpacity
                style={styles.visitButton}
                onPress={() => Linking.openURL('https://www.theperiodpurse.com')}
            >
                <Text style={{...styles.productText, margin: 10}}>Visit the website</Text>
            </TouchableOpacity>
        </View>
    )
}

const DidYouKnowCard = () => {
    return(
        <View>
        <Text style={styles.didYouKnowText}>Did you know?</Text>
        <Text style={styles.didYouKnowDescription}>{`${getFactShortened()}`}</Text>
        <Image style={styles.paddyIcon} source={PadImageHappy}/>
        </View>
    )
}

const MenstrualProductCard = ({name, image, onPress}) =>{
    return(
        <TouchableOpacity style={styles.productCard} onPress={onPress}>
        <View>
            <Image style={styles.productIcon} source={image}/>
            <Text style={styles.productText}>{name}</Text>
        </View>
        </TouchableOpacity>
    )
}

/**
 * Retrieves the fact that the user is supposed to see that day
 * @returns a string of the relevant fact, shortened to 90 characters
 */
export function getFactShortened() {
    // try to get the fact cycle array first
    var fact_array = GETFactCycle();

    // if the array is null, then this means we haven't initiatlized the fact cycle array
    if (fact_array == null) {
        // initialize the fact cycle with POSTFactCycle
        POSTFactCycle();
        fact_array = GETFactCycle();
    }

    // if today's date and the stored date don't match, update
    if (getFullCurrentDateString() != fact_array[0]) {
        POSTFactCycle();
        fact_array = GETFactCycle();
    }

    const dykData = require('../pages/DYKFacts.json');

    return dykData[fact_array[1]].slice(87) + "..."
}

const cardData = [
    {
        name: "Period" + "\n" + "Underwears",
        image: underwearIcon,
        screen: "Period Underwears"
    },
    {
        name: "Menstrual Cups",
        image: cupIcon,
        screen: "Menstrual Cups"
    },
    {
        name: "Pads",
        image: padIcon,
        screen: "Pads"
    },
    {
        name: "Cloth Pads",
        image: clothPadIcon,
        screen: "Cloth Pads"
    },
    {
        name: "Tampons",
        image: tamponsIcon,
        screen: "Tampons"
    }
]

export default function Info ({ navigation }) {
    return (
        <ScrollView>
            <TouchableOpacity style={styles.didYouKnowCard} onPress={() => navigation.navigate("DidYouKnow")}>
                <DidYouKnowCard />
            </TouchableOpacity>
            <View style={styles.cardContainer}>
                <Text style={{
                    ...styles.productText,
                    textAlign: 'left',
                    color: "#6D6E71",
                    margin: 15
                }}>
                    Learn more about period products
                </Text>

                <View style={styles.containerRow}>
                    {cardData.map((card, i) => { return (
                        <MenstrualProductCard
                            key={i}
                            name={card.name}
                            image={card.image}
                            onPress={() => navigation.navigate(card.screen)}
                        />
                    )})}
                </View>

                <LearnMoreCard/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    didYouKnowCard: {
        backgroundColor: '#72C6B7',
        borderRadius: 12,
        borderWidth: 0,
        width: 360,
        height: 148,
        left: 17,
        top: 77
    },
    productCard: {
        backgroundColor: '#FFA3A4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: "#000",
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        height: 170,
        flexBasis: 165
    },
    learnMoreCard: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: "92%",
        height: 235,
        borderRadius: 12,
        borderWidth: 0,
        borderColor: "#000",
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    cardContainer: {
        flex:1,
        paddingHorizontal: 10,
        paddingTop: 80,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    didYouKnowText: {
        fontFamily: "Avenir",
        fontWeight: "800",
        fontSize: 16,
        color: "#FFFFFF",
        height: 20,
        left: 25,
        top: 19
    },
    didYouKnowDescription: {
        fontFamily: "Avenir",
        fontWeight: "400",
        fontSize: 14,
        color: "#0000",
        height: 76,
        left: 0,
        top: 35
    },
    productText: {
        fontFamily: "Avenir",
        fontWeight: "800",
        fontSize: 15,
        textAlign: 'center',
    },
    learnMoreText: {
        fontFamily: "Avenir",
        fontWeight: "400",
        fontSize: 14,
        margin: 20,
    },
    visitButton: {
        backgroundColor: "#73C7B7",
        borderRadius: 8,
    },
    productIcon: {
        marginBottom: 10
    },
    paddyIcon:{
        height: 97,
        width: 75,
        top: 10,
        left: 250,
        marginBottom: 22
    }
});
