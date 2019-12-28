import React, {useState} from 'react';
import axios from 'axios';
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView } from 'react-native';
import { Icon, AirbnbRating } from 'react-native-elements';
import styles from './styles';
import { StackViewTransitionConfigs } from 'react-navigation-stack';

const AddRecipe = (props) => {
    const [title, setTitle] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [notes, setNotes] = useState('');
    const [ratings, setRatings] = useState(0);

    const handleAddRecipe = () => {
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
         .post('http://172.19.202.190:3001/recipes/add', recipeObject)
         .then(res => {
           setTitle('');
           setServingSize('');
           setPrepTime('');
           setCookTime('');
           setIngredients('');
           setDirections('');
           setNotes('');
           setRatings(0);

           console.log("New Recipe successfully added!");
           props.navigation.navigate('RecipeList')
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
            placeholder="Title"
            />
            <View style={styles.break}></View>
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setServingSize(text)}
            placeholder="Serving size"
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setPrepTime(text)}
            placeholder="Prep time"
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setCookTime(text)}
            placeholder="Cook time"
            />
            <View style={styles.break}></View>
            <Text style={styles.heading}>Ingredients</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setIngredients(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Directions</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setDirections(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Notes</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setNotes(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Rating</Text>
            <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            showRating={false}
            onFinishRating={(rating) => setRatings(rating)}
             />
             <View style={styles.break}></View>
            <View style={styles.button}>
            <Icon name="check" size="40" onPress={handleAddRecipe} />
            </View>
        </View>
        </ScrollView>
        </View>
    )
}

export default AddRecipe;