import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import IOSIcon from "react-native-vector-icons/Ionicons";
import CategoryScreen from "../Category/Category";
import AddCategory from "../AddCategory/AddCategory";
import CategoryRecipe from "../CategoryRecipe/CategoryRecipe";
import RecipeList from "../RecipeList/RecipeList";
import SideMenu from "../Drawer/SideMenu";
import AddRecipe from "../AddRecipe/AddRecipe";
import Recipe from "../Recipe/Recipe";
import EditRecipe from "../EditRecipe/EditRecipe";
import About from "../About/About";

const MainNavigator = createStackNavigator({
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: "CATEGORY",
      headerLeft: (
        <IOSIcon
          name="ios-menu"
          size={35}
          style={{ marginStart: 10, marginLeft: 15 }}
          backgroundColor="#000000"
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerRight: (
        <IOSIcon
          name="ios-add"
          size={40}
          style={{ marginStart: 10, marginRight: 20 }}
          backgroundColor="#000000"
          onPress={() => navigation.navigate("AddCategory")}
        />
      ),
    }),
  },
  AddCategory: {
    screen: AddCategory,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <IOSIcon
          name="ios-attach"
          size={30}
          style={{ marginStart: 10, marginRight: 20 }}
          backgroundColor="#000000"
          onPress={() => console.log("scan")}
        />
      ),
    }),
  },
  RecipeList: {
    screen: RecipeList,
    navigationOptions: ({ navigation }) => ({
      title: "RECIPE",
      headerRight: (
        <IOSIcon
          name="ios-add"
          size={40}
          style={{ marginStart: 10, marginRight: 20 }}
          backgroundColor="#000000"
          onPress={() => navigation.navigate("AddRecipe")}
        />
      ),
    }),
  },
  AddRecipe: {
    screen: AddRecipe,
    navigationOptions: ({ navigation }) => ({
      title: "RECIPE",
      headerRight: (
        <IOSIcon
          name="ios-attach"
          size={30}
          style={{ marginStart: 10, marginRight: 20 }}
          backgroundColor="#000000"
          onPress={() => console.log("scan")}
        />
      ),
      headerLeft: (
        <IOSIcon
          name="ios-close"
          size={50}
          style={{ marginStart: 10, marginLeft: 20 }}
          backgroundColor="#000000"
          onPress={() => navigation.navigate("RecipeList")}
        />
      ),
    }),
  },
  CategoryRecipe: {
    screen: CategoryRecipe,
  },
  Recipe: {
    screen: Recipe,
  },
  EditRecipe: {
    screen: EditRecipe,
  },
  About: {
    screen: About,
  },
});

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator,
  },
  {
    drawerPosition: "left",
    initialRouteName: "Main",
    drawerWidth: 250,
    contentComponent: SideMenu,
  }
);

const App = createAppContainer(DrawerStack);

export default App;
