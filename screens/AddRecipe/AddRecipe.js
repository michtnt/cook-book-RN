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

const AddRecipe = (props) => {
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
    
    const handleAddRecipe = () => {

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
         .post('http://10.1.1.128:3001/recipes/add', recipeObject)
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