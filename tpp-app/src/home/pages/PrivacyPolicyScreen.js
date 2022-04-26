import React from 'react';
import { View, ScrollView, StyleSheet, Text, useWindowDimensions, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import BackIcon from '../../../ios/tppapp/Images.xcassets/icons/back_icon.svg'
import OnboardingBackground from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'
import ErrorFallback from "../../error/error-boundary";


const source = { html: `<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">@import url('https://themes.googleusercontent.com/fonts/css?kit=fpjTOVmNbO4Lz34iLyptLWuHbT4qV-lhsIVD5LyY_XqH4VK7Dpzzvc124h4xZ5pB7Mlga2LpaMBRA3oTejcG0A');ol{margin:0;padding:0}table td,table th{padding:0}.c7{padding-top:0pt;padding-bottom:8pt;line-height:1.0;orphans:2;widows:2;text-align:left}.c1{padding-top:6pt;padding-bottom:6pt;line-height:1.1500000000000001;orphans:2;widows:2;text-align:left}.c13{padding-top:18pt;padding-bottom:6pt;line-height:1.1500000000000001;orphans:2;widows:2;text-align:left}.c4{padding-top:0pt;padding-bottom:8pt;line-height:1.0791666666666666;orphans:2;widows:2;text-align:left}.c6{color:#f25d4e;text-decoration:none;vertical-align:baseline;font-size:12pt;font-style:normal}.c11{color:#f15d4e;text-decoration:none;vertical-align:baseline;font-size:14pt;font-style:normal}.c2{color:#000000;text-decoration:none;vertical-align:baseline;font-size:11pt;font-style:normal}.c5{-webkit-text-decoration-skip:none;color:#0563c1;text-decoration:underline;text-decoration-skip-ink:none}.c9{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c0{font-weight:400;font-family:"Montserrat"}.c14{margin-left:17.9pt;text-indent:-17.9pt}.c8{font-weight:700;font-family:"Montserrat"}.c3{color:inherit;text-decoration:inherit}.c10{font-weight:400;font-family:"Calibri"}.c12{height:11pt}.title{padding-top:24pt;color:#000000;font-weight:700;font-size:36pt;padding-bottom:6pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:18pt;color:#666666;font-size:24pt;padding-bottom:4pt;font-family:"Georgia";line-height:1.0791666666666666;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Calibri"}p{margin:0;color:#000000;font-size:11pt;font-family:"Calibri"}h1{padding-top:24pt;color:#000000;font-weight:700;font-size:24pt;padding-bottom:6pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-weight:700;font-size:18pt;padding-bottom:4pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:0pt;color:#000000;font-weight:700;font-size:13.5pt;padding-bottom:8pt;font-family:"Times New Roman";line-height:1.0;orphans:2;widows:2;text-align:left}h4{padding-top:12pt;color:#000000;font-weight:700;font-size:12pt;padding-bottom:2pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:11pt;color:#000000;font-weight:700;font-size:11pt;padding-bottom:2pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:10pt;color:#000000;font-weight:700;font-size:10pt;padding-bottom:2pt;font-family:"Calibri";line-height:1.0791666666666666;page-break-after:avoid;orphans:2;widows:2;text-align:left}</style></head><body class="c9"><p class="c13"><span class="c8 c11">Privacy Statement</span></p><p class="c4"><span class="c2 c0">The Period Purse strives to achieve menstrual equity by providing people who menstruate with access to free menstrual products, and to reduce the stigma surrounding periods through public education and advocacy.</span></p><p class="c4"><span class="c2 c0">With the help of UofT Blueprint from the University of Toronto, we have developed this app to enable you to keep track of your periods and provide you with useful information. </span></p><p class="c1" id="h.gjdgxs"><span class="c2 c0">We understand that recording intimate information about your body in an app can be scary. Who can access this information? How will it be used? Is it well protected?</span></p><p class="c1"><span class="c0">This is why we build this app with your privacy first in mind. Contrary to other period tracking apps, with your Period Purse app, </span><span class="c8">no one but you can access any of the information you provide. </span><span class="c0">This</span><span class="c8">&nbsp;</span><span class="c0">document provides you with more information about how this works, and answers some commonly asked questions. You can also always reach out at </span><span class="c5 c0"><a class="c3" href="mailto:hello@periodpurse.com">hello@periodpurse.com</a></span><span class="c2 c0">&nbsp;if you cannot find what you are looking for. </span></p><p class="c1 c14"><span class="c6 c0">What do we do with your information?</span></p><p class="c1"><span class="c2 c0">Nothing! Nor the Period Purse, nor any other organization, can access your personal information. </span></p><p class="c1 c14" id="h.30j0zll"><span class="c6 c0">Did you get my consent?</span></p><p class="c1"><span class="c2 c0">We did not ask for your consent, because we do not want your data. Your data is yours and yours only.</span></p><p class="c4"><span class="c0 c6">Do you share my information with anyone?</span></p><p class="c4"><span class="c2 c0">We do not disclose your data to any third party. We could not if we wanted to since we do not have it!</span></p><p class="c1"><span class="c2 c0">All the data that you add to the app to keep track of your periods and your health is stored locally, on your phone, with one exception. We wanted you to be able to transfer your data from one device to the other in case you change phone, so that you do not lose your history. To make sure this would not jeopardize your privacy, we created an optional feature that enables you to connect your Apple account to your app and download all your data on your iCloud. Upon request, data goes straight from the app to your Apple account. You can then download it from your new phone. </span></p><p class="c1"><span class="c2 c0">Once your data is on your iCloud, the iCloud privacy policy applies. We invite you to read it if you have any question on how Apple protects your information.</span></p><p class="c4"><span class="c2 c0">The app also includes some links to social media pages. If you click those links, these pages&rsquo; privacy policy applies. </span></p><h3 class="c7"><span class="c6 c0">Is my information protected?</span></h3><h3 class="c7"><span class="c0 c2">We built this app so that you would feel comfortable tracking your periods on your phone. Not accessing it is the best way for us to protect it. </span></h3><h3 class="c7"><span class="c6 c0">I am underage. Can I use this app?</span></h3><h3 class="c7"><span class="c2 c0">From a privacy standpoint, you can use this app whichever your age is, because your data stays with you. </span></h3><h3 class="c7"><span class="c6 c0">Changes to this privacy policy</span></h3><h3 class="c7"><span class="c2 c0">If any of the above were to change, we will update this document to inform you.</span></h3><h3 class="c7"><span class="c6 c0">Questions and contact information</span></h3><p class="c4"><span class="c0">Any question? Just email us:</span><span>&nbsp;</span><span class="c0 c5"><a class="c3" href="mailto:hello@periodpurse.com">hello@periodpurse.com</a></span><span class="c0">.</span></p><p class="c4 c12"><span class="c2 c0"></span></p></body></html>`}

export default PrivacyPolicyScreen = ({navigation}) => {
    const {width} = useWindowDimensions();

    const onClose = () => {
        navigation.goBack();
    }

    return(
        <ErrorFallback>
            <ImageBackground source={OnboardingBackground} style={styles.containter}>
                <View style={styles.navbarContainer}>
                    <TouchableOpacity onPress={() => onClose()} style={styles.backIcon}>
                        <BackIcon fill={'#181818'}/>
                    </TouchableOpacity>
                    <Text style={styles.navbarText}>Privacy policy</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>Privacy policy</Text>
                    <View style={styles.line}/>
                    <RenderHtml source={source} contentWidth={width}/>
                </ScrollView>
            </ImageBackground>
        </ErrorFallback>
    );
}

const styles = StyleSheet.create({
    containter: {
        flex:1,
        marginBottom: 75,
    },
    scrollContainer: {
        padding: 20,
    },
    backIcon: {
        height: 40,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 18,
        bottom: 10

    },
    navbarContainer: {
        paddingTop: 60,
        paddingBottom: 20,
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navbarText: {
        fontSize: 20,
        fontFamily: "avenir",

    },
    title: {
        fontSize: 34,
        fontFamily: "avenir",
        fontWeight: "bold"
    },
    line: {
        marginTop: 5,
        height: 3, 
        alignSelf: 'stretch', 
        backgroundColor: '#6D6E71'
    }

})