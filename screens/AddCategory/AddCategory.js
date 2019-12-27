import React, {useState}from 'react';
import { 
    View, 
    Text,  
    TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const AddCategory = (props) => {
    const [newCategory, setNewCategory] = useState('');

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
            <Icon name="check" size="40" onPress={() =>  props.navigation.navigate('Category')} />
            </View>
        </View>
        </View>
    )
}

export default AddCategory