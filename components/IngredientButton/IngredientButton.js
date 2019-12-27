import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './styles';

const IngredientButton = (props) => {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>Edit</Text>
        </View>
      </TouchableHighlight>
    );
}

export default IngredientButton;