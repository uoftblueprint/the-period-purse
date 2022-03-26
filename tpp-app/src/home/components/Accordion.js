
import React, {Component, createElement} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation } from "react-native";
import ExpandArrow from '../../../ios/tppapp/Images.xcassets/icons/arrow_accordion.svg';
import SelectPicker from './SelectPicker';
import TimeInput from './TimeInput';
import { FLOW_LEVEL, CRAMP_LEVEL, MOOD_LEVEL } from "../../services/utils/constants";


// ALL ICON IMPORTS
import SleepIcon from '../../../ios/tppapp/Images.xcassets/icons/symptoms/sleep-moon.svg';
import ExerciseIcon from '../../../ios/tppapp/Images.xcassets/icons/symptoms/exercise-icon.svg';
import NotesIcon from '../../../ios/tppapp/Images.xcassets/icons/symptoms/notes-lines.svg';

// FLOW ICONS
import FlowHeavy from '../../../ios/tppapp/Images.xcassets/icons/symptoms/flow/flow-heavy.svg';
import FlowMedium from '../../../ios/tppapp/Images.xcassets/icons/symptoms/flow/flow-medium.svg';
import FlowLight from '../../../ios/tppapp/Images.xcassets/icons/symptoms/flow/flow-light.svg';
import FlowNone from '../../../ios/tppapp/Images.xcassets/icons/symptoms/flow/flow-none.svg';
import FlowSpotting from '../../../ios/tppapp/Images.xcassets/icons/symptoms/flow/flow-spotting.svg';

// CRAMPS ICONS
import CrampsNeutral from '../../../ios/tppapp/Images.xcassets/icons/symptoms/cramps/cramps-neutral.svg';
import CrampsBad from '../../../ios/tppapp/Images.xcassets/icons/symptoms/cramps/cramps-bad.svg';
import CrampsTerrible from '../../../ios/tppapp/Images.xcassets/icons/symptoms/cramps/cramps-terrible.svg';
import CrampsGood from '../../../ios/tppapp/Images.xcassets/icons/symptoms/cramps/cramps-good.svg';
import CrampsNone from '../../../ios/tppapp/Images.xcassets/icons/symptoms/cramps/cramps-nocramps.svg';

// MOOD ICONS
import MoodHappy from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-happy.svg';
import MoodNeutral from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-neutral.svg';
import MoodSad from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-sad.svg';
import MoodLol from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-lol.svg';
import MoodIdk from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-idk.svg';
import MoodGreat from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-great.svg';
import MoodSick from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-sick.svg';
import MoodAngry from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-angry.svg';
import MoodLoved from '../../../ios/tppapp/Images.xcassets/icons/symptoms/mood/mood-loved.svg';

const accordionData = {
    flow: {
        title: 'Flow',
        icon: FlowMedium,
        options: [
            <FlowLight fill={'#000'} value={FLOW_LEVEL.LIGHT} />,
            <FlowMedium fill={'#000'} value={FLOW_LEVEL.MEDIUM} />,
            <FlowHeavy fill={'#000'} value={FLOW_LEVEL.HEAVY} />,
            <FlowSpotting fill={'#000'} value={FLOW_LEVEL.SPOTTING} />,
            <FlowNone fill={'#000'} value={FLOW_LEVEL.NONE} />
        ],
    },
    mood: {
        title: 'Mood',
        icon: CrampsNeutral,
        options: [
            <MoodHappy value={MOOD_LEVEL.HAPPY} />,
            <MoodNeutral value={MOOD_LEVEL.NEUTRAL} />,
            <MoodSad value={MOOD_LEVEL.SAD} />,
            <MoodLol value={MOOD_LEVEL.LOL} />,
            <MoodIdk value={MOOD_LEVEL.IDK} />,
            <MoodGreat value={MOOD_LEVEL.GREAT} />,
            <MoodSick value={MOOD_LEVEL.SICK} />,
            <MoodAngry value={MOOD_LEVEL.ANGRY} />,
            <MoodLoved value={MOOD_LEVEL.LOVED} />,
        ],
    },
    sleep: {
        title: 'Sleep',
        icon: SleepIcon,
        content: <TimeInput />
    },
    cramps: {
        title: 'Cramps',
        icon: CrampsTerrible,
        options: [
            <CrampsNeutral fill={'#000'} value={CRAMP_LEVEL.NEUTRAL} />,
            <CrampsBad fill={'#000'} value={CRAMP_LEVEL.BAD} />,
            <CrampsTerrible fill={'#000'} value={CRAMP_LEVEL.TERRIBLE} />,
            <CrampsGood fill={'#000'} value={CRAMP_LEVEL.GOOD} />,
            <CrampsNone fill={'#000'} value={CRAMP_LEVEL.NONE} />
        ],
    },
    exercise: {
        title: 'Exercise',
        icon: ExerciseIcon,
        content: 'blahblah'
    },
    notes: {
        title: 'Notes',
        icon: NotesIcon,
        content: 'blahblah'
    },
}

export default class Accordion extends Component{

    constructor(props) {
        super(props);

        // set accordion data based on symptom type
        this.accordionType = accordionData[props.type];
        this.title = this.accordionType.title;
        this.icon = this.accordionType.icon;

        this.state = {
          expanded : false,
        };
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded : !this.state.expanded });
    }

    render() {
        // Change icon color depending on if there's a selected value
        const iconFill = this.props.value ? '#72C6B7' : '#6D6E71';
        const renderedIcon = createElement(this.icon, {
            fill: iconFill
        });

        let accContent;
        switch (this.props.type) {
          case 'flow':
          case 'mood':
          case 'cramps':
            accContent = <SelectPicker optionIcons={this.accordionType.options} selectThis={this.props.setState} curVal={this.props.value} />
            break;
          case 'sleep':
            accContent = <TimeInput />
          default: // do nothing
            break;
        }

        return (
          <View>

                {/* ACCORDION HEADER */}
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <View style={styles.heading}>
                        {renderedIcon}
                        <Text
                            style={[
                                styles.title,
                                this.icon && { position: 'absolute', marginLeft: 45 }, // if there's an icon, shift title left
                                this.props.value && styles.selected // if there's a selected value, title is teal
                            ]}>
                              {this.title}
                              {/* {this.props.value} */}
                        </Text>
                    </View>
                    <ExpandArrow style={this.state.expanded && { transform: [{ rotate: "180deg" }] }} />
                </TouchableOpacity>

                {/* ACCORDION HR */}
                {
                    !this.props.isLastChild &&
                    <View style={styles.parentHr} />
                }

                {/* ACCORDION CONTENT */}
                {
                    this.state.expanded &&
                    (<View style={styles.content}>
                        {accContent}
                    </View>)
                }

          </View>
        )
    }



}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6D6E71',
    },
    selected: {
        color: '#72C6B7'
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height: 56,
        paddingLeft: 28,
        paddingRight: 28,
        alignItems:'center',
        backgroundColor: '#fff',
    },
    parentHr: {
        height: 2,
        backgroundColor: '#EFEFF4',
        width: '100%'
    },
    content: {
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    heading: {
        flexDirection: 'row',
        alignItems:'center',
    }
});
