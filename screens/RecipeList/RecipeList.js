import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import PORT from "../../misc/port";
import styles from "./styles";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get(`http://${PORT}:3001/recipes/`).then((response) => {
      console.log("Yeet recipes are fetched!");
      setRecipes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://${PORT}:3001/categories/`).then((response) => {
      console.log("Yeet categories are fetched!");
      setCategories(response.data);
    });
  }, []);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // for when it refreshes

    axios.get(`http://${PORT}:3001/recipes/`).then((response) => {
      console.log("Yeet recipes are fetched!");
      setRecipes(response.data);
    });

    axios.get(`http://${PORT}:3001/categories/`).then((response) => {
      console.log("Yeet categories are fetched!");
      setCategories(response.data);
    });

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const onPressRecipe = (item) => {
    const dataId = item.id;
    const category = item.categoryId.name;
    const categoryId = item.categoryId.id;
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
      dataId,
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

  const handleSearch = (text) => {};

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchBar
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            flex: 1,
          }}
          inputContainerStyle={{
            backgroundColor: "#EDEDED",
          }}
          inputStyle={{
            backgroundColor: "#EDEDED",
            borderRadius: 10,
            color: "black",
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={(text) => handleSearch(text)}
          onClear={() => handleSearch("")}
          placeholder="Search"
        />
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
                  <Image
                    style={styles.photo}
                    source={{ uri: item.photo_url }}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.category}>{item.categoryId.name}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </ScrollView>
    </View>
  );
};

export default RecipeList;
