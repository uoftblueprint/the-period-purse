import React from 'react';
import { View, ScrollView, StyleSheet, Text, useWindowDimensions, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import BackIcon from '../../../ios/tppapp/Images.xcassets/icons/back_icon.svg'
import OnboardingBackground from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

const source = {html: `<!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>LawDepot&#39;s Website Terms and Conditions</title><style type="text/css"> * {margin:0; padding:0; text-indent:0; }
 h1 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: underline; font-size: 12pt; }
 .p, p { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; margin:0pt; }
 .s1 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 12pt; }
 .s2 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 11pt; }
 .s3 { color: black; font-family:"Times New Roman", serif; font-style: italic; font-weight: normal; text-decoration: none; font-size: 12pt; }
 .a, a { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }
 .s4 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt; }
 li {display: block; }
 #l1 {padding-left: 0pt;counter-reset: c1 1; }
 #l1> li>*:first-child:before {counter-increment: c1; content: counter(c1, decimal)". "; color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 12pt; }
 #l1> li:first-child>*:first-child:before {counter-increment: c1 0;  }
</style></head><body><h1 style="padding-top: 3pt;padding-left: 188pt;text-indent: 0pt;text-align: center;">TERMS AND CONDITIONS</h1><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;text-align: left;"><a href="http://www.theperiodpurse.com/" class="a" target="_blank">These terms and conditions (the &quot;Terms and Conditions&quot;) govern the use of </a><a href="http://www.theperiodpurse.com/" class="s1" target="_blank">www.theperiodpurse.com</a></p><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;text-align: left;">(the &quot;Site&quot;). This Site is owned and operated by The Period Purse. This Site is a news or media website.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Intellectual Property</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">All content published and made available on our Site is the property of The Period Purse and the Site&#39;s creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Accounts</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;text-align: left;">When you create an account on our Site, you agree to the following:</p><p style="text-indent: 0pt;text-align: left;"><br/></p><ol id="l1"><li data-list-text="1."><p style="padding-left: 48pt;text-indent: -14pt;line-height: 130%;text-align: left;">You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and</p><p style="text-indent: 0pt;text-align: left;"><br/></p></li><li data-list-text="2."><p style="padding-left: 48pt;text-indent: -14pt;line-height: 130%;text-align: left;">All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</p></li></ol><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: justify;">Limitation of Liability</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: justify;">The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Indemnity</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">Except where prohibited by law, by using this Site you indemnify and hold harmless The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: justify;">Applicable Law</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: justify;">These Terms and Conditions are governed by the laws of Canada. The Period Purse headquarters is in Ontario.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p class="s2" style="padding-top: 10pt;text-indent: 0pt;text-align: right;">Page 1 of 2</p><p class="s3" style="padding-top: 3pt;padding-left: 10pt;text-indent: 0pt;text-align: left;">Website Terms and Conditions                                    <span class="p">Page 2 of 2</span></p><p style="padding-left: 5pt;text-indent: 0pt;line-height: 1pt;text-align: left;"><span/></p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Severability</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Changes</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;line-height: 130%;text-align: left;">These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><h1 style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Contact Details</h1><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;text-align: left;">Please contact us if you have any questions or concerns. Our contact details are as follows:</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-left: 12pt;text-indent: 0pt;line-height: 1pt;text-align: left;"><span/></p><p style="padding-top: 3pt;padding-left: 12pt;text-indent: 0pt;text-align: left;"><a href="mailto:hello@theperiodpurse.com">hello@theperiodpurse.com</a></p><p style="padding-top: 4pt;padding-left: 12pt;text-indent: 0pt;text-align: left;">1460 The Queensway, Toronto, Ontario, M8S 1S7</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-left: 12pt;text-indent: 0pt;text-align: left;">You can also contact us through the feedback form available on our Site.</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-left: 328pt;text-indent: 0pt;text-align: left;">Effective Date: 14th day of April, 2022</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="text-indent: 0pt;text-align: left;"><br/></p><p class="s4" style="padding-left: 10pt;text-indent: 0pt;text-align: left;">©2002-2022 LawDepot.ca®</p></body></html>
`}

export default TermsAndConditionsScreen = ({navigation}) => {
    const {width} = useWindowDimensions();

    const onClose = () => {
        navigation.goBack();
    }

    return(
        <ImageBackground source={OnboardingBackground} style={styles.containter}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => onClose()} style={styles.backIcon}>
                    <BackIcon fill={'#181818'}/>
                </TouchableOpacity>
                <Text style={styles.navbarText}>Terms and conditions</Text>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Terms and conditions</Text>
                <View style={styles.line}/>
                <RenderHtml source={source} contentWidth={width}/>
                    {/* <Text style={styles.titleText}>TERMS AND CONDITIONS</Text>
                    
                    <Text style={styles.standardText}>{
                        `\nThese terms and conditions (the "Terms and Conditions") govern the use of`}
                        <Text style={{...styles.standardText, fontWeight: "bold",}}> www.theperiodpurse.com </Text>
                        {`(the "Site"). This Site is owned and operated by The Period Purse. This Site is a news or media website.`
                    }</Text>
                    <Text style={styles.standardText}>{`\nBy using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.`}</Text>
                    
                    <Text style={styles.header}>{`\nIntellectual Property`}</Text>
                    <Text style={styles.standardText}>{`All content published and made available on our Site is the property of The Period Purse and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.`}</Text>
                    <Text style={styles.header}>{`\nAccounts`}</Text>
                    <Text style={styles.standardText}>{`When you create an account on our Site, you agree to the following:`}</Text>
                <Text style={styles.listNumber}>{`\u2022 You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and`}</Text> */}
            </ScrollView>
        </ImageBackground>
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
    titleText: {
        alignSelf: "center",
        fontSize: 22,
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontFamily: "Times new roman"
    },
    header:{
        fontFamily: "Times new roman",
        lineHeight: 25,
        fontSize: 20,
        textDecorationLine: "underline",
        fontWeight: "bold",
    },  
    standardText: {
        fontFamily: "Times new roman",
        lineHeight: 25,
        fontSize: 18,
    },
    listNumber:{
        fontFamily: "Times new roman",
        lineHeight: 25,
        fontSize: 18,
        marginLeft: "10%",
    },
    listText:{
        fontFamily: "Times new roman",
        lineHeight: 25,
        fontSize: 18,
        marginLeft: "12%",
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