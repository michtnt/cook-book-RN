import { StyleSheet  } from 'react-native';

export const categoryCard = StyleSheet.create({
    categoriesItemContainer: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 215,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
      },
      categoriesPhoto: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        shadowColor: 'blue',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,   
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
      },
      categoriesName: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
        marginTop: 10,
        letterSpacing: 3
      },
      categoriesInfo: {
        marginTop: 3,
        marginBottom: 5,
        fontSize:20
      }
});
