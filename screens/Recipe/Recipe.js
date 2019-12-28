import React from 'react';
import { 
   View,
   ScrollView, 
   Text, 
   Image,
   Share } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";
import IngredientButton from '../../components/IngredientButton/IngredientButton'
import styles from './styles';

const Recipe = (props) => {

    const shareOptions = {
        title: 'Title',
        message: `${props.navigation.getParam('recipeTitle')}`, // Note that according to the documentation at least one of "message" or "url" fields is required
        url: `${props.navigation.getParam('recipePhoto')}`,
        subject: 'Subject'
      };
      
     Recipe.navigationOptions = ({navigation}) => ({
        headerRight: (
          <IOSIcon name="ios-share" size={35} style={{marginStart:10, marginRight: 20}} backgroundColor="#000000" onPress={() => Share.share(shareOptions)}/>
          ),
      })

    return(
        <View style={styles.main}>
            <ScrollView> 
            <View style={styles.image}>
            <Image style={{width: 400, height: 500}} source={{ uri: props.navigation.getParam('recipePhoto') }} />
            </View>
            <View>
                <IngredientButton onPress = {() => {props.navigation.navigate('EditRecipe');}}/>
                <Text style={{...styles.heading, fontWeight: 'bold'}}> {props.navigation.getParam('recipeTitle')}</Text>
    <Text style={{...styles.heading, fontSize: 22, letterSpacing: 1, marginLeft: 8, marginBottom:20}}>Serving Size                    {props.navigation.getParam('recipeServingsize')}</Text>
                <Text style={{...styles.heading, fontSize: 22, letterSpacing: 1, marginLeft: 8, marginBottom:20}}>Prep Time                       {props.navigation.getParam('recipePreptime')}</Text>
                <Text style={{...styles.heading, fontSize: 22, letterSpacing: 1, marginLeft: 8, marginBottom:20}}>Cook Time                      {props.navigation.getParam('recipeCooktime')}</Text>
                <Text style={{...styles.heading, fontSize: 25, textDecorationLine: 'underline', marginTop: 20, height:2000}}> Ingredients </Text>
                
            </View>
            </ScrollView>
         </View>

    )
}

export default Recipe;
