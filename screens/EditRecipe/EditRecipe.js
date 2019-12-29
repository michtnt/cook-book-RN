import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Icon, AirbnbRating } from 'react-native-elements';
import styles from './styles';

const EditRecipe = (props) => {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [chosen, setChosen] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [notes, setNotes] = useState('');
    const [ratings, setRatings] = useState(0);

    useEffect(() => {
        axios
        .get('http://10.1.1.128:3001/categories/')
        .then(response => {
          console.log('Yeet categories are fetched!')
           response.data.map((res) => {
               let object = { key: res.id, label : res.name, value: res.name}
               categories.push(object);
               console.log(object)
           })
           console.log(categories);
        })
      }, [])

    const handleEditRecipe = () => {

        const categoryId = categories.map((res) => {
            if(res.label == chosen ){
                return res.key;
            }
        })

        const recipeObject = {
            title: title,
            categoryId: categoryId,
            servingSize: servingSize,
            prepTime: prepTime,
            cookTime: cookTime,
            ingredients: ingredients,
            directions: directions,
            notes: notes,
            ratings: ratings,
         }

    axios
    .put(`http://10.1.1.128:3001/recipes/update/${props.navigation.getParam('dataId')}`,recipeObject)
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
            <Text style={{...styles.heading, marginLeft: 3, marginTop: 20}}> Category </Text>
            <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
            <RNPickerSelect
            placeholder={{}}
            items={categories}
            onValueChange={(val) => setChosen(val)}
            InputAccessoryView={() => null}
            placeholder={{label: 'Set Category', value: null}}
            />
            </View>
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