import React from "react";
import { View, ScrollView, Text, Image, Share } from "react-native";
import IOSIcon from "react-native-vector-icons/Ionicons"; // IMPORTANT: need to be without bracket
import { Rating } from "react-native-elements";
import IngredientButton from "../../components/IngredientButton/IngredientButton";
import styles from "./styles";

const Recipe = (props) => {
  const shareOptions = {
    title: "Title",
    message: `${props.navigation.getParam("recipeTitle")}`, // Note that according to the documentation at least one of "message" or "url" fields is required
    url: `${props.navigation.getParam("recipePhoto")}`,
    subject: "Subject",
  };

  Recipe.navigationOptions = ({ navigation }) => ({
    headerRight: (
      <IOSIcon
        name="ios-share"
        size={35}
        style={{ marginStart: 10, marginRight: 20 }}
        backgroundColor="#000000"
        onPress={() => Share.share(shareOptions)}
      />
    ),
  });

  const onPressRecipe = () => {
    const dataId = props.navigation.getParam("dataId");
    const category = props.navigation.getParam("category");
    const categoryId = props.navigation.getParam("categoryId");
    const recipeId = props.navigation.getParam("recipeId");
    const recipePhoto = props.navigation.getParam("recipePhoto");
    const recipeTitle = props.navigation.getParam("recipeTitle");
    const recipePreptime = props.navigation.getParam("recipePreptime");
    const recipeCooktime = props.navigation.getParam("recipeCooktime");
    const recipeServingsize = props.navigation.getParam("recipeServingsize");
    const recipeIngredients = props.navigation.getParam("recipeIngredients");
    const recipeDirections = props.navigation.getParam("recipeDirections");
    const recipeNotes = props.navigation.getParam("recipeNotes");
    const recipeRatings = props.navigation.getParam("recipeRatings");

    props.navigation.navigate("EditRecipe", {
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

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.image}>
          <Image
            style={{ width: 400, height: 500 }}
            source={{ uri: props.navigation.getParam("recipePhoto") }}
          />
        </View>
        <View>
          <IngredientButton onPress={onPressRecipe} />
          <Text style={{ ...styles.heading, fontWeight: "bold" }}>
            {" "}
            {props.navigation.getParam("recipeTitle")}
          </Text>
          <Text
            style={{
              ...styles.heading,
              fontSize: 22,
              letterSpacing: 1,
              marginLeft: 8,
              marginBottom: 20,
            }}
          >
            Serving Size {props.navigation.getParam("recipeServingsize")}
          </Text>
          <Text
            style={{
              ...styles.heading,
              fontSize: 22,
              letterSpacing: 1,
              marginLeft: 8,
              marginBottom: 20,
            }}
          >
            Prep Time {props.navigation.getParam("recipePreptime")}
          </Text>
          <Text
            style={{
              ...styles.heading,
              fontSize: 22,
              letterSpacing: 1,
              marginLeft: 8,
              marginBottom: 20,
            }}
          >
            Cook Time {props.navigation.getParam("recipeCooktime")}
          </Text>
          <View>
            <Text
              style={{
                ...styles.heading,
                fontSize: 25,
                textDecorationLine: "underline",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {" "}
              Ingredients{" "}
            </Text>
            <Text style={styles.text}>
              {" "}
              {props.navigation.getParam("recipeIngredients")}
            </Text>
            <Text
              style={{
                ...styles.heading,
                fontSize: 25,
                textDecorationLine: "underline",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {" "}
              Directions{" "}
            </Text>
            <Text style={styles.text}>
              {" "}
              {props.navigation.getParam("recipeDirections")}
            </Text>
            <Text
              style={{
                ...styles.heading,
                fontSize: 25,
                textDecorationLine: "underline",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {" "}
              Notes{" "}
            </Text>
            <Text style={{ ...styles.text, marginBottom: 30 }}>
              {" "}
              {props.navigation.getParam("recipeNotes")}
            </Text>
            <Rating
              imageSize={30}
              count={5}
              readonly
              startingValue={props.navigation.getParam("recipeRatings")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Recipe;
