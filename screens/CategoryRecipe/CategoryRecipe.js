import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, FlatList, Text, Image, TouchableHighlight } from "react-native";
import PORT from "../../misc/port";
import styles from "./styles";

const CategoryRecipe = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://${PORT}:3001/categories/${props.navigation.getParam(
          "categoryId"
        )}/recipes`
      )
      .then((response) => {
        console.log("Yeet categories recipes are fetched!");
        setRecipes(response.data);
      });
  }, []);

  const onPressRecipe = (item) => {
    const category = item.name;
    const categoryId = item.id;
    const recipeId = item.recipeId;
    const recipePhoto = item.photo_url;
    const recipeTitle = item.title;
    const recipePreptime = item.prepTime;
    const recipeCooktime = item.cookTime;
    const recipeServingsize = item.servingSize;
    const recipeIngredients = item.ingredients;
    const recipeDirections = item.directions;
    const recipeNotes = item.notes;
    const recipeRatings = item.ratings;
    props.navigation.navigate("Recipe", {
      category,
      categoryId,
      recipeTitle,
      recipeId,
      recipePhoto,
      recipePreptime,
      recipeCooktime,
      recipeServingsize,
      recipeIngredients,
      recipeDirections,
      recipeNotes,
      recipeRatings,
    });
  };

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressRecipe(item)}
            >
              <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.photo_url }} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default CategoryRecipe;
