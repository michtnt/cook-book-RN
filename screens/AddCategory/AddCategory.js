import React, { useState, useEffect}from 'react';
import axios from 'axios';
import { 
    View, 
    Image,
    TextInput, 
    Button} from 'react-native';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import styles from './styles';

const AddCategory = (props) => {
    const [newCategory, setNewCategory] = useState('');
    const [image, setImage] = useState(null);

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

    const handleAddCategory = () => {
       const categoryObject = {
           name: newCategory,
           photo_url: image
        }
        axios
        .post('http://10.1.1.128:3001/categories/add', categoryObject)
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
           <Button 
           title="Pick a picture from camera roll"
           onPress={handleImage}
           />
           {image && <Image source={{uri: image}} style={{width: 300, height: 250}} />}
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