import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import IOSIcon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const MenuButton = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)"
    >
      <View style={styles.btnContainer}>
        <IOSIcon name={props.source} style={styles.btnIcon} size={25} />
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.string,
  title: PropTypes.string,
};

export default MenuButton;
