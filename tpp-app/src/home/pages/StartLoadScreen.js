import LoadingVisual from "../components/LoadingVisual";
import React, { useEffect } from "react";
import { useState } from "react";
import { GETAllTrackingPreferences } from "../../services/SettingsService";
import { MainNavigator } from "../../../App";
import Welcome from "../../onboarding/Welcome"

export const StartLoadScreen = () => {
    const [preferences, setPreferences] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
     async function getPreferences() {
       setPreferences(await GETAllTrackingPreferences());
     }
     getPreferences();
    }, [])

    useEffect(() => {
        if(preferences){
            setLoaded(true);
        }
    }, [preferences]);

    if (loaded){
        if(preferences && preferences[0] && preferences[0][1])
            // tracking preferences have been set, go to main page
            return (<MainNavigator></MainNavigator>);
        else
            // tracking preferences have not been set, go to onboarding
            return (<Welcome></Welcome>);
    }
    else {
        return (<LoadingVisual/>);
    }
}

