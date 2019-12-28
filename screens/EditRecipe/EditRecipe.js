import React, {useState} from 'react';
import axios from 'axios';
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView } from 'react-native';
import { Icon, AirbnbRating } from 'react-native-elements';
import styles from './styles';

const EditRecipe = (props) => {
    const [title, setTitle] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [notes, setNotes] = useState('');
    const [ratings, setRatings] = useState(0);

    const handleEditRecipe = () => {

        const recipeObject = {
            title: title,
            servingSize: servingSize,
            prepTime: prepTime,
            cookTime: cookTime,
            ingredients: ingredients,
            directions: directions,
            notes: notes,
            ratings: ratings,
         }

    axios
    .put(`http://172.19.202.190:3001/recipes/update/${props.navigation.getParam('dataId')}`,recipeObject)
    .then(res => {
      console.log("Recipe updated!");
      props.navigation.navigate('Recipe');
    })
    .catch((error) => console.log(error))
    }

    return(   
        <View style= {styles.main}>
         <ScrollView>
        <View style={styles.photo}>
            <Text> Photo Upload </Text>
        </View>
         <View style={styles.input}>
            <Text style={styles.heading}>Overview</Text>
            <TextInput 
            style={styles.inputText}
            onChangeText={text => setTitle(text)}
            defaultValue={props.navigation.getParam('recipeTitle')}
            />
            <View style={styles.break}></View>
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setServingSize(text)}
            defaultValue={props.navigation.getParam('recipeServingsize')}
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setPrepTime(text)}
            defaultValue={props.navigation.getParam('recipePreptime')}
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setCookTime(text)}
            defaultValue={props.navigation.getParam('recipeCooktime')}
            />
            <View style={styles.break}></View>
            <Text style={styles.heading}>Ingredients</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setIngredients(text)}
            defaultValue={props.navigation.getParam('recipeIngredients')}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Directions</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setDirections(text)}
            defaultValue={props.navigation.getParam('recipeDirections')}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Notes</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setNotes(text)}
            defaultValue={props.navigation.getParam('recipeNotes')}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Rating</Text>
            <AirbnbRating
            count={5}
            defaultRating={props.navigation.getParam('recipeRatings')}
            size={30}
            showRating={false}
            onFinishRating={(rating) => setRatings(rating)}
             />
             <View style={styles.break}></View>
            <View style={styles.button}>
            <Icon name="check" size="40" onPress={handleEditRecipe} />
            </View>
        </View>
        </ScrollView>
        </View>
    )
}

export default EditRecipe;