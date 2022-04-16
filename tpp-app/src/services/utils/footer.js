import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FacebookIcon from "../../../ios/tppapp/Images.xcassets/icons/facebook.svg";
import InstagramIcon from "../../../ios/tppapp/Images.xcassets/icons/instagram.svg";
import TikTokIcon from "../../../ios/tppapp/Images.xcassets/icons/tiktok.svg";
import TwitterIcon from "../../../ios/tppapp/Images.xcassets/icons/twitter.svg";
import YoutubeIcon from "../../../ios/tppapp/Images.xcassets/icons/youtube.svg";

export const STACK_SCREENS = {
    TERMS_AND_CONDITION: "TermsAndCondition",
    PRIVACY_POLICY: "PrivacyPolicy"
}

const socialMediaIcons = [
    {"component": <InstagramIcon />, "url": "https://www.instagram.com/theperiodpurse/"},
    {"component": <TikTokIcon />, "url": "https://www.tiktok.com/@theperiodpurse"},
    {"component": <YoutubeIcon />, "url": "https://www.youtube.com/channel/UC2YgDU_9XxbjJsGGvXwxwyA"},
    {"component": <TwitterIcon />, "url": "https://twitter.com/ThePeriodPurse"},
    {"component": <FacebookIcon />, "url": "https://www.facebook.com/theperiodpurse/"},
]

const SocialMediaButton = (props) => {
    const openLink = () => Linking.canOpenURL(props.url).then(() => {
        Linking.openURL(props.url);
    });

    return (
        <TouchableOpacity onPress={openLink} style={styles.icon}>
            {props.icon}
        </TouchableOpacity>
    );
}

const Socials = () => {
    return (
        <View style={styles.iconsContainer}>
            {
                socialMediaIcons.map((socialMedia, i) => {
                    return <SocialMediaButton key={i} icon={socialMedia.component} url={socialMedia.url} />
                })
            }
        </View>
    );
}

const TermsAndConditions = ({navigation}) => {
    const openLink = () => {
        navigation.navigate(STACK_SCREENS.PRIVACY_POLICY)
    }

    // const openLink = () => Linking.canOpenURL("https://www.google.com/").then(() => {
    //     Linking.openURL("https://www.google.com/");
    // });

    return (
        <View styles={styles.termsAndConditionsContainer}>
            <View style={styles.copyright}>
                <Text style={styles.copyrightText}>&copy; 2022 The Period Purse, All rights reserved.</Text>
            </View>
            <View style={styles.terms}>
                <TouchableOpacity onPress={openLink} style={styles.icon} >
                    <Text style={styles.termsText}> Terms and Conditions</Text>
                    <Text style={styles.lineText}> __________________ </Text>
                </TouchableOpacity>
                <Text> and </Text>
                <TouchableOpacity onPress={openLink} style={styles.icon} >
                    <Text style={styles.termsText}> Privacy Policy. </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const Footer = ({navigation}) => {
    return (
        <View>
            <Socials/>
            <TermsAndConditions navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 24,
        marginRight: 38,
        marginTop: 85,
        marginBottom: 75
    },
    iconsContainer: {
        marginTop: 50,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    icon: {
        margin: 10,
    },
    termsAndConditionsContainer: {
        marginTop: 10,
    },
    copyright: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        color: "red"
    },
    copyrightText: {
        color: "#6D6E71"
    },
    terms: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    lineText: {
        marginTop: -10,
        color: "#5A9F93",
    },
    termsText: {
        color: "#5A9F93",
        textDecorationLine: "underline"
    }
});