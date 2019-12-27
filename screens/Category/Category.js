import React from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  Image, 
  TouchableHighlight } from 'react-native';
import { categories } from '../../database/data';
import { getNumberOfRecipes } from '../../database/dataAPI';
import styles from './styles';

const CategoryScreen = (props) => {
    const onPressCategory = (item) => {
      const categoryId = item.id;
      props.navigation.navigate('CategoryRecipe', {categoryId});
      };

    return(    
    <View>
    <FlatList
          data={categories} 
          renderItem={({item}) => {
              return(
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => onPressCategory(item)}>
                 <View style={styles.categoriesItemContainer}>
                     <Text style={styles.categoriesName}>{item.name}</Text>
                     <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
                      <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} Recipes</Text>
                    </View>
                  </TouchableHighlight>
              )
          }}
          keyExtractor={item => `${item.id}`}
    />
   </View>
    )
}

export default CategoryScreen;