import React from 'react';
import { View, ScrollView, StyleSheet, Text, useWindowDimensions, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import BackIcon from '../../../ios/tppapp/Images.xcassets/icons/back_icon.svg'
import OnboardingBackground from '../../../ios/tppapp/Images.xcassets/SplashScreenBackground.imageset/colourwatercolour.png'

const source = {html: `<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">.lst-kix_list_1-3>li:before{content:" "}.lst-kix_list_1-4>li:before{content:" "}ol.lst-kix_list_1-0.start{counter-reset:lst-ctn-kix_list_1-0 0}.lst-kix_list_1-0>li{counter-increment:lst-ctn-kix_list_1-0}ol.lst-kix_list_1-0{list-style-type:none}.lst-kix_list_1-7>li:before{content:" "}.lst-kix_list_1-5>li:before{content:" "}.lst-kix_list_1-6>li:before{content:" "}li.li-bullet-0:before{margin-left:-14.4pt;white-space:nowrap;display:inline-block;min-width:14.4pt}ul.lst-kix_list_1-3{list-style-type:none}.lst-kix_list_1-0>li:before{content:"" counter(lst-ctn-kix_list_1-0,decimal) ". "}ul.lst-kix_list_1-4{list-style-type:none}.lst-kix_list_1-8>li:before{content:" "}ul.lst-kix_list_1-1{list-style-type:none}ul.lst-kix_list_1-2{list-style-type:none}ul.lst-kix_list_1-7{list-style-type:none}.lst-kix_list_1-1>li:before{content:" "}.lst-kix_list_1-2>li:before{content:" "}ul.lst-kix_list_1-8{list-style-type:none}ul.lst-kix_list_1-5{list-style-type:none}ul.lst-kix_list_1-6{list-style-type:none}ol{margin:0;padding:0}table td,table th{padding:0}.c19{margin-left:39.6pt;padding-top:0pt;padding-left:-3.6pt;padding-bottom:0pt;line-height:1.4625000000000001;orphans:2;widows:2;text-align:left;margin-right:44pt}.c27{margin-left:39.6pt;padding-top:0pt;padding-left:-3.6pt;padding-bottom:0pt;line-height:1.4625000000000001;orphans:2;widows:2;text-align:left;margin-right:32pt}.c11{-webkit-text-decoration-skip:none;color:#000000;font-weight:700;text-decoration:underline;text-decoration-skip-ink:none;font-size:12pt;font-family:"Times New Roman"}.c5{padding-top:0pt;padding-bottom:0pt;line-height:0.6208333333333333;orphans:2;widows:2;text-align:left;height:11pt}.c24{padding-top:0pt;padding-bottom:0pt;line-height:1.4625000000000001;orphans:2;widows:2;text-align:left;margin-right:3pt}.c26{padding-top:0pt;padding-bottom:0pt;line-height:1.0166666666666666;orphans:2;widows:2;text-align:left;height:11pt}.c9{padding-top:0pt;padding-bottom:0pt;line-height:0.35000000000000003;orphans:2;widows:2;text-align:left;height:11pt}.c29{padding-top:0pt;padding-bottom:0pt;line-height:1.3541666666666667;orphans:2;widows:2;text-align:left;margin-right:14pt}.c39{padding-top:0pt;padding-bottom:0pt;line-height:1.4625000000000001;orphans:2;widows:2;text-align:left;margin-right:18pt}.c2{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:10pt;font-family:"Times New Roman";font-style:normal}.c37{padding-top:0pt;padding-bottom:0pt;line-height:0.6375000000000001;orphans:2;widows:2;text-align:left;height:11pt}.c18{padding-top:0pt;padding-bottom:0pt;line-height:1.3541666666666667;orphans:2;widows:2;text-align:left;margin-right:11pt}.c25{padding-top:0pt;padding-bottom:0pt;line-height:1.3541666666666667;orphans:2;widows:2;text-align:left;margin-right:6pt}.c6{padding-top:0pt;padding-bottom:0pt;line-height:0.7541666666666668;orphans:2;widows:2;text-align:left;height:11pt}.c12{padding-top:0pt;padding-bottom:0pt;line-height:0.7125;orphans:2;widows:2;text-align:left;height:11pt}.c10{padding-top:0pt;padding-bottom:0pt;line-height:1.3833333333333335;orphans:2;widows:2;text-align:justify;margin-right:18pt}.c30{padding-top:0pt;padding-bottom:0pt;line-height:1.1333333333333333;orphans:2;widows:2;text-align:left;height:11pt}.c0{padding-top:0pt;padding-bottom:0pt;line-height:0.8333333333333334;orphans:2;widows:2;text-align:left;height:11pt}.c3{padding-top:0pt;padding-bottom:0pt;line-height:0.3666666666666667;orphans:2;widows:2;text-align:left;height:11pt}.c22{padding-top:0pt;padding-bottom:0pt;line-height:1.3499999999999999;orphans:2;widows:2;text-align:left;height:11pt}.c16{padding-top:0pt;padding-bottom:0pt;line-height:1.5833333333333333;orphans:2;widows:2;text-align:justify;margin-right:9pt}.c15{padding-top:0pt;padding-bottom:0pt;line-height:1.4208333333333334;orphans:2;widows:2;text-align:left;height:11pt}.c31{padding-top:0pt;padding-bottom:0pt;line-height:1.0250000000000001;orphans:2;widows:2;text-align:left;height:11pt}.c20{padding-top:0pt;padding-bottom:0pt;line-height:1.0;orphans:2;widows:2;text-align:center;margin-right:2pt}.c38{padding-top:0pt;padding-bottom:0pt;line-height:1.3833333333333335;orphans:2;widows:2;text-align:left;margin-right:15pt}.c21{padding-top:0pt;padding-bottom:0pt;line-height:1.4625000000000001;orphans:2;widows:2;text-align:left;margin-right:24pt}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:12pt;font-family:"Times New Roman";font-style:normal}.c28{padding-top:0pt;padding-bottom:0pt;line-height:0.08333333333333333;orphans:2;widows:2;text-align:left}.c34{padding-top:0pt;padding-bottom:0pt;line-height:1.0;orphans:2;widows:2;text-align:right}.c7{padding-top:0pt;padding-bottom:0pt;line-height:1.0;orphans:2;widows:2;text-align:left}.c33{font-size:8pt;font-family:"Times New Roman";color:#000000;font-weight:400}.c35{font-size:11pt;font-family:"Times New Roman";color:#000000;font-weight:400}.c4{font-size:11.5pt;font-family:"Times New Roman";color:#000000;font-weight:400}.c32{font-size:11.5pt;font-family:"Times New Roman";color:#000000;font-weight:700}.c8{font-size:12pt;font-family:"Times New Roman";color:#000000;font-weight:400}.c13{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c17{padding:0;margin:0}.c40{color:#000000;font-size:10pt}.c36{margin-left:319pt}.c23{font-style:italic}.c14{margin-left:3pt}.title{padding-top:24pt;color:#000000;font-weight:700;font-size:36pt;padding-bottom:6pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:18pt;color:#666666;font-size:24pt;padding-bottom:4pt;font-family:"Georgia";line-height:1.0;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Times New Roman"}p{margin:0;color:#000000;font-size:11pt;font-family:"Times New Roman"}h1{padding-top:24pt;color:#000000;font-weight:700;font-size:24pt;padding-bottom:6pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-weight:700;font-size:18pt;padding-bottom:4pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:14pt;color:#000000;font-weight:700;font-size:14pt;padding-bottom:4pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:12pt;color:#000000;font-weight:700;font-size:12pt;padding-bottom:2pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:11pt;color:#000000;font-weight:700;font-size:11pt;padding-bottom:2pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:10pt;color:#000000;font-weight:700;font-size:10pt;padding-bottom:2pt;font-family:"Times New Roman";line-height:1.0;page-break-after:avoid;orphans:2;widows:2;text-align:left}</style></head><body class="c13"><a id="id.gjdgxs"></a><p class="c20"><span class="c11">TERMS AND CONDITIONS</span></p><p class="c22"><span class="c1"></span></p><p class="c16"><span class="c4">These terms and conditions (the &quot;Terms and Conditions&quot;) govern the use of </span><span class="c32">www.theperiodpurse.com</span><span class="c4">&nbsp;(the &quot;Site&quot;). This Site is owned and operated by The Period Purse. This Site is a news or media website.</span></p><p class="c31"><span class="c1"></span></p><p class="c24"><span class="c8">By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.</span></p><p class="c5"><span class="c1"></span></p><p class="c7"><span class="c11">Intellectual Property</span></p><p class="c3"><span class="c1"></span></p><p class="c38"><span class="c8">All content published and made available on our Site is the property of The Period Purse and the Site&#39;s creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.</span></p><p class="c12"><span class="c1"></span></p><p class="c7"><span class="c11">Accounts</span></p><p class="c3"><span class="c1"></span></p><p class="c7"><span class="c8">When you create an account on our Site, you agree to the following:</span></p><p class="c22"><span class="c1"></span></p><ol class="c17 lst-kix_list_1-0 start" start="1"><li class="c19 li-bullet-0"><span class="c1">You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and</span></li></ol><p class="c30"><span class="c1"></span></p><ol class="c17 lst-kix_list_1-0" start="2"><li class="c27 li-bullet-0"><span class="c1">All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.</span></li></ol><p class="c37"><span class="c1"></span></p><p class="c21"><span class="c8">We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</span></p><p class="c5"><span class="c1"></span></p><p class="c7"><span class="c11">Limitation of Liability</span></p><p class="c3"><span class="c1"></span></p><p class="c10"><span class="c8">The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.</span></p><p class="c12"><span class="c1"></span></p><p class="c7"><span class="c11">Indemnity</span></p><p class="c3"><span class="c1"></span></p><p class="c29"><span class="c8">Except where prohibited by law, by using this Site you indemnify and hold harmless The Period Purse and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</span></p><p class="c6"><span class="c1"></span></p><p class="c7"><span class="c11">Applicable Law</span></p><p class="c3"><span class="c1"></span></p><p class="c39"><span class="c8">These Terms and Conditions are governed by the laws of Canada. The Period Purse headquarters is in Ontario.</span></p><p class="c0"><span class="c1"></span></p><p class="c0"><span class="c1"></span></p><p class="c0"><span class="c1"></span></p><p class="c34"><span class="c35">Page 1 of 2</span></p><a id="id.30j0zll"></a><p class="c7"><span class="c8 c23">Website Terms and Conditions</span><span class="c40">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="c4">Page 2 of 2</span></p><p class="c15"><span class="c2"></span></p><p class="c7 c14"><span class="c11">Severability</span></p><p class="c3"><span class="c2"></span></p><p class="c14 c18"><span class="c8">If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</span></p><p class="c6"><span class="c2"></span></p><p class="c7 c14"><span class="c11">Changes</span></p><p class="c3"><span class="c2"></span></p><p class="c14 c25"><span class="c8">These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.</span></p><p class="c6"><span class="c2"></span></p><p class="c7 c14"><span class="c11">Contact Details</span></p><p class="c3"><span class="c2"></span></p><p class="c7 c14"><span class="c8">Please contact us if you have any questions or concerns. Our contact details are as follows:</span></p><p class="c0"><span class="c2"></span></p><p class="c26"><span class="c2"></span></p><p class="c7 c14"><span class="c8">______________________________________</span></p><p class="c9"><span class="c2"></span></p><p class="c7 c14"><span class="c8">hello@theperiodpurse.com</span></p><p class="c9"><span class="c2"></span></p><p class="c7 c14"><span class="c8">1460 The Queensway, Toronto, Ontario, M8S 1S7</span></p><p class="c22"><span class="c2"></span></p><p class="c7 c14"><span class="c8">You can also contact us through the feedback form available on our Site.</span></p><p class="c22"><span class="c2"></span></p><p class="c7 c36"><span class="c8">Effective Date: 14th day of April, 2022</span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><p class="c30"><span class="c2"></span></p><p class="c7"><span class="c33">&copy;2002-2022 LawDepot.ca&reg;</span></p></body></html>`}

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
                <Text style={styles.navbarText}>Terms and Conditions</Text>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Terms and Conditions</Text>
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