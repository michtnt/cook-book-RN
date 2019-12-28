import React, {useState}from 'react';
import { 
    View, 
    Text,  
    TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import styles from './styles';

const AddCategory = (props) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
       const categoryObject = {
           name: newCategory
        }
        axios
        .post('http://172.19.202.190:3001/categories/add', categoryObject)
        .then(res => {
          console.log("New Category successfully added!");
          setNewCategory('');
          props.navigation.navigate('Category');
        })
        .catch((error) => console.log(error))
     }

    return(    
        <View style= {styles.main}>
        <View style={styles.photo}>
            <Text> Photo Upload </Text>
        </View>
         <View style={styles.input}>
            <TextInput 
            style={styles.inputText}
            onChangeText={text => setNewCategory(text)}
            placeholder="Mum's feet recipe"
            />
            <View style={styles.button}>
            <Icon name="check" size="40" onPress={handleAddCategory} />
            </View>
        </View>
        </View>
    )
}

export default AddCategory