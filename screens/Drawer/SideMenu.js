import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

const SideMenu = (props) => {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="CATEGORIES"
          source="ios-restaurant"
          onPress={() => {
            props.navigation.navigate("Category");
            props.navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="RECIPES"
          source="ios-wine"
          onPress={() => {
            props.navigation.navigate("RecipeList");
            props.navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="ABOUT"
          source="ios-outlet"
          onPress={() => {
            props.navigation.navigate("About");
            props.navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
};

SideMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default SideMenu;
