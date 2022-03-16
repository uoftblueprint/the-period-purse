
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from '../../../ios/tppapp/Images.xcassets/icons/arrow_accordion.svg';

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
          data: props.data,
          expanded : false,
          isLastChild : props.isLastChild
        }
    }

  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon style={this.state.expanded && { transform: [{ rotate: "180deg" }] }} />
            </TouchableOpacity>
            {
                !this.props.isLastChild &&
                <View style={styles.parentHr} />
            }
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>
                </View>
            }

       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight:'bold',
        color: 'grey',
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: '#fff',
    },
    parentHr: {
        height: 2,
        backgroundColor: '#EFEFF4',
        width: '100%'
    },
    child:{
        backgroundColor: '#fff',
        padding:16,
    }

});
