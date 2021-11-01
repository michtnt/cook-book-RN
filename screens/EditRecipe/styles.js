import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center' ,
    // alignItems: 'center',
  },
  photo: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 2200,
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  inputText: {
    marginLeft: 15,
    letterSpacing: 6,
    fontSize: 20,
    height: 50,
    width: "93%",
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 40,
  },
  heading: {
    marginLeft: 15,
    fontSize: 25,
    letterSpacing: 4,
    marginBottom: 10,
  },
  break: {
    marginBottom: 40,
  },
  textareacontainer: {
    borderColor: "black",
    borderWidth: 0.5,
  },
  textarea: {
    height: 400,
    justifyContent: "flex-start",
    fontSize: 20,
  },
});

export default styles;
