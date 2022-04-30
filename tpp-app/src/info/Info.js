import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, ScrollView, Image, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import OnboardingBackground from '../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import padIcon from '../../ios/tppapp/Images.xcassets/icons/pad_icon.png';
import tamponsIcon from '../../ios/tppapp/Images.xcassets/icons/tampons_icon.png';
import underwearIcon from '../../ios/tppapp/Images.xcassets/icons/underwear_icon.png';
import cupIcon from '../../ios/tppapp/Images.xcassets/icons/cup_icon.png';
import clothPadIcon from '../../ios/tppapp/Images.xcassets/icons/clothpad_icon.png'
import { GETFactCycle, POSTFactCycle } from "./InfoService"
import { getFullCurrentDateString } from "../services/utils/helpers.js"
import discIcon from '../../ios/tppapp/Images.xcassets/icons/disc_icon.png'
import { STACK_SCREENS } from './InfoNavigator';
import { Footer } from '../services/utils/footer';
import PaddyIcon from "../../ios/tppapp/Images.xcassets/icons/paddy.svg";
import factsJSON from "../pages/DYKFacts.json"

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

const FunFactCard = ({ bodyText, onPress }) =>{
    return (
        <TouchableOpacity style={styles.funFactCard} onPress={onPress}>
            <PaddyIcon style={styles.paddyStyling} height={"75%"}/>
            <Text style={styles.DYKText}>Did you know?</Text>
            <Text style={styles.DYKBodyText}>{bodyText}... </Text>
        </TouchableOpacity>
    )
}

const cardData = [
    {
        name: "Period" + "\n" + "Underwears",
        image: underwearIcon,
        screen: STACK_SCREENS.PERIOD_UNDERWEARS
    },
    {
        name: "Menstrual Cups",
        image: cupIcon,
        screen: STACK_SCREENS.MENSTRUAL_CUPS
    },
    {
        name: "Pads",
        image: padIcon,
        screen: STACK_SCREENS.PADS
    },
    {
        name: "Cloth Pads",
        image: clothPadIcon,
        screen: STACK_SCREENS.CLOTH_PADS
    },
    {
        name: "Tampons",
        image: tamponsIcon,
        screen: STACK_SCREENS.TAMPONS
    },
    {
        name: "Menstrual Disc",
        image: discIcon,
        screen: STACK_SCREENS.DISC
    }
]

export default function Info ({ navigation }) {
    const [factCycleArray, setFactCycleArray] = useState([]);

    var fact = "Getting fact"
    var factWhole;
    useEffect(() => {
        async function retrieveFactCycle() {
            let factArray = await GETFactCycle()
            setFactCycleArray(factArray);
            console.log(`This is setting factCycleArray on the InfoPage: ${factArray}`)

            if (!factArray){
                POSTFactCycle().then(async () => {
                    let factArray = await GETFactCycle();
                    setFactCycleArray(factArray);
                   
                })
            }
        if (getFullCurrentDateString() != factArray[0]) {
            POSTFactCycle().then(async () => {
            let factArray = await GETFactCycle();
            setFactCycleArray(factArray)
        });
        }    
        }
        retrieveFactCycle()
    }, [])
    factWhole = factsJSON[factCycleArray[1]]
    console.log(`This is factCycleArray on Info page: ${factCycleArray}`)
    console.log(`This is factCycleArray number on Info Page: ${factCycleArray[1]}`)
    if(factWhole){
        fact = factWhole.slice(0, 84)
    }
    console.log(`This is fact on Info Page: ${fact}`)

    return (
        <ImageBackground source={OnboardingBackground} style={styles.container}>
            <ScrollView>
                <SafeAreaView style={styles.cardContainer}>
                    <FunFactCard bodyText={fact} onPress={() => navigation.navigate(STACK_SCREENS.FUN_FACT)}/>
                    <Text style={{
                        ...styles.productText,
                        textAlign: 'left',
                        color: "#6D6E71",
                        marginTop: '5%',
                        marginLeft: '5%',
                        marginBottom: '2%'
                    }}>
                        Tap to learn more about period products
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
                    <Footer navigation={navigation}/>
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
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
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
      },
    funFactCard: {
        backgroundColor: '#72C6B7',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: "#000",
        width: "88%",
        margin: '3%',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        height: 130,
        flexBasis: 165,
        marginLeft: '6%',
    },
    productCard: {
        backgroundColor: '#FFA3A4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: "#000",
        margin: '3%',
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
        width: "88%",
        height: 235,
        borderRadius: 12,
        borderWidth: 0,
        borderColor: "#000",
        marginTop: '3%',
        marginLeft: '6%',  // 5%
        marginBottom: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: '10%',
        paddingTop: '40%',
        marginBottom: 75,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly'
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
    DYKText: {
        fontFamily: "Avenir",
        fontWeight: "800",
        fontSize: 16,
        margin: 20,
        color: '#fff',
        left: "3%"
    },
    DYKBodyText: {
        fontFamily: "Avenir",
        left: "8%",
        fontWeight: "400",
        paddingRight: "35%",
        top: "-5%"

    },
    visitButton: {
        backgroundColor: "#73C7B7",
        borderRadius: 8,
    },
    productIcon: {
        marginBottom: 10
    },
    paddyStyling: {
        position: 'absolute',
        left: "65%",
        top: "12%"
    }
});
