import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { 
    View, 
    Text, 
    TextInput,
    Button, 
    Image,
    ScrollView } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Icon, AirbnbRating } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PORT from '../../misc/port';
import styles from './styles';

const AddRecipe = (props) => {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [chosen, setChosen] = useState('');
    const [image, setImage] = useState(null);
    const [servingSize, setServingSize] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [notes, setNotes] = useState('');
    const [ratings, setRatings] = useState(0);

    useEffect(() => {
        axios
        .get(`http://${PORT}:3001/categories/`)
        .then(response => {
          console.log('Yeet categories are fetched!')
           response.data.map((res) => {
               let object = { key: res.id, label : res.name, value: res.name}
               categories.push(object);
           })
        })
      }, [])

    
      useEffect(() => {
        getPermissionAsync();
        console.log("Permission asked.")
      }, [])

      const getPermissionAsync = async () => {
        if(Constants.platform.ios){
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status !== 'granted'){
                alert('Sorry. We need camera permissions.');
            }
        }
    }

    const handleImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        console.log(result);

        if(!result.cancelled){
            setImage(result.uri);
        }
    }

    const handleAddRecipe = () => {

        const categoryId = categories.map((res) => {
            if(res.label == chosen ){
                return res.key;
            }
        })

        const recipeObject = {
            title: title,
            categoryId: categoryId,
            photo_url: image,
            servingSize: servingSize,
            prepTime: prepTime,
            cookTime: cookTime,
            ingredients: ingredients,
            directions: directions,
            notes: notes,
            ratings: ratings,
         }

         axios
         .post(`http://${PORT}:3001/recipes/add`, recipeObject)
         .then(res => {
           setTitle('');
           setCategories([]);
           setChosen('');
           setImage(null);
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
        <Button 
           title="Pick a picture from camera roll"
           onPress={handleImage}
           />
           {image && <Image source={{uri: image}} style={{width: 300, height: 250}} />}
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