import React from 'react';
import { 
    ScrollView, 
    View, 
    Text } from 'react-native';
import styles from './styles';

const About = () => {
    return(
        <ScrollView>
        <View>
            <Text style={{...styles.inputText, marginTop:20}}> Documentation </Text>
            <Text style={styles.text}>So, I tried to finish this in 3 days (perhaps impossible.) after watching on React 5 or 6 hours crash course in youtube yesterday merely to impress my girlfriend. </Text>
            <Text style={{...styles.text, paddingTop:10}}>This is the second day and I manage to finish the front-end 90% (excessive googling.) and all that's left is backend and extra features.</Text>
            <Text style={{...styles.text, paddingTop:10}}>This was originally made because I have trouble on memorising these kind of things, especially.. the banana bread recipe that I already do more than 30 times perhaps and still forgot what is the ingredients. </Text>
            <Text style={{...styles.text, paddingTop:10}}>And yeah. I refuse to download a recipe-app from App-store (I'm very certain there is.) because, like I said before <Text style={{fontWeight: 'bold'}}>I want to impress my girlfriend.</Text> Thank you.</Text>
            <Text style={{...styles.inputText, fontSize: 20, letterSpacing: 4, marginTop:20}}> © 2019 Michelle</Text>
        </View>
        </ScrollView>
    )
}

export default About;