import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView, Image, TouchableOpacity } from 'react-native';
import padIcon from '../../ios/tppapp/Images.xcassets/icons/pad_icon.png';
import tamponsIcon from '../../ios/tppapp/Images.xcassets/icons/tampons_icon.png';
import underwearIcon from '../../ios/tppapp/Images.xcassets/icons/underwear_icon.png';
import cupIcon from '../../ios/tppapp/Images.xcassets/icons/cup_icon.png';
import clothPadIcon from '../../ios/tppapp/Images.xcassets/icons/clothpad_icon.png';

const LearnMoreCard = () => {
    return(
        <View style={styles.learnMoreCard}>
            <Text style={styles.productText}>Learn more about The Period Purse</Text>
            
            <Text style={styles.learnMoreText}>
            The Period Purse strives to achieve menstrual equity by providing people 
            who menstruate with access to free menstrual products, and to reduce the 
            stigma surrounding periods through public education and advocacy.
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

const MenstrualProductCard = ({name, image}) =>{
    return(
        <View style={styles.productCard}>
            <Image style={styles.productIcon} source={image}/>
            <Text style={styles.productText}>{name}</Text>
        </View>
    )
}


export default function Info () {
    return (
        <ScrollView>
            <View style={styles.cardContainer}>
                <Text style={{...styles.productText, textAlign: 'left',
        color: "#6D6E71",
        margin: 15}}>Learn more about period products</Text>

                <View style={styles.containerRow}>
                    <MenstrualProductCard name={"Period" + "\n" + "Underwears"} image={underwearIcon}/>
                    <MenstrualProductCard name="Menstrual Cups" image={cupIcon}/>
                    <MenstrualProductCard name="Pads" image={padIcon}/>
                    <MenstrualProductCard name="Cloth Pads" image={clothPadIcon}/>
                    <MenstrualProductCard name="Tampons" image={tamponsIcon}/>
                </View>
                
                

                <LearnMoreCard/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    productCard: {
        flex: 1,
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
        flexBasis: 160,
        flexGrow: 0,
        flexShrink: 0,
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
        flex:1,
        flexDirection: 'row',
        flexWrap: "wrap",
        
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
});