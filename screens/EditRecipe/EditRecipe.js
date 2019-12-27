import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView } from 'react-native';
import { Icon, AirbnbRating } from 'react-native-elements';
import styles from './styles';

const EditRecipe = (props) => {
    const [newCategory, setNewCategory] = useState('');

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
            onChangeText={text => setNewCategory(text)}
            placeholder="Title"
            />
            <View style={styles.break}></View>
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setNewCategory(text)}
            placeholder="Serving size"
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setNewCategory(text)}
            placeholder="Prep time"
            />
             <TextInput 
            style={styles.inputText}
            onChangeText={text => setNewCategory(text)}
            placeholder="Cook time"
            />
            <View style={styles.break}></View>
            <Text style={styles.heading}>Ingredients</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setNewCategory(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Directions</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setNewCategory(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Notes</Text>
            <View style={styles.textareacontainer}>
            <TextInput 
            multiline={true}
            style={styles.textarea}
            onChangeText={text => setNewCategory(text)}
            />
            </View>
            <View style={styles.break}></View>
            <Text style={styles.heading}>Rating</Text>
            <AirbnbRating
            count={5}
             defaultRating={0}
            size={30}
            showRating={false}
             />
             <View style={styles.break}></View>
            <View style={styles.button}>
            <Icon name="check" size="40" onPress={() =>  props.navigation.navigate('Recipe')} />
            </View>
        </View>
        </ScrollView>
        </View>
    )
}

export default EditRecipe;