import React, { useState, useEffect } from 'react';
import { 
   View,
   FlatList, 
   Text, 
   Image, 
   TouchableHighlight } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import styles from './styles';

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
    .get('http://10.1.1.128:3001/recipes/')
    .then(response => {
      console.log('Yeet recipes are fetched!')
      setRecipes(response.data)
    })
  }, [])

    const onPressRecipe = (item) => {
      const dataId = item.id
      const recipeId = item.recipeId
      const recipePhoto = item.photo_url
      const recipeTitle = item.title
      const recipePreptime = item.prepTime
      const recipeCooktime = item.cookTime
      const recipeServingsize = item.servingSize
      const recipeIngredients = item.ingredients
      const recipeDirections = item.directions
      const recipeNotes = item.notes
      const recipeRatings = item.ratings

      props.navigation.navigate('Recipe', {
        dataId,
        recipeTitle, 
        recipeId,
        recipePhoto,
        recipePreptime, 
        recipeCooktime, 
        recipeServingsize,
        recipeIngredients,
        recipeDirections,
        recipeNotes,
        recipeRatings});
    }

    const handleSearch = text => {
      var recipeArray1 = getRecipesByRecipeName(text);
      var recipeArray2 = getRecipesByCategoryName(text);
      var recipeArray3 = getRecipesByIngredientName(text);
      var aux = recipeArray1.concat(recipeArray2);
      var recipeArray = [...new Set(aux)];
      if (text == '') {
        this.setState({
          value: text,
          data: []
        });
      } else {
        this.setState({
          value: text,
          data: recipeArray
        });
      }
    };

    return(
        <View>
          <ScrollView>
            <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => handleSearch(text)}
          onClear={() => handleSearch('')}
          placeholder="Search"
        />
            <FlatList 
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={recipes} 
              renderItem={({item}) => {
                return(
                    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => onPressRecipe(item)}>
                    <View style={styles.container}>
                      <Image style={styles.photo} source={{ uri: item.photo_url }} />
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.category}>{item.categoryId.name}</Text>
                    </View>
                  </TouchableHighlight>
                )
            }}
            keyExtractor={item => `${item.recipeId}`}
            />
            </ScrollView>
        </View>
    )
}

export default RecipeList;
