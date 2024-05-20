import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
	inputStyles: {
	  borderWidth: 2,
	  borderColor: '#dee2e6',
      marginBottom: 10,
      borderRadius: 3,
      height: 40,
      backgroundColor: '#ffffff',
      paddingHorizontal: 7,
      width: '100%'
	},
    btnPrimary: {
        backgroundColor: '#cc9f00',
        color: '#ffffff',
        borderRadius: 50,
        paddingHorizontal: 10,
        minWidth: 200,
        textAlign: 'center',
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnSecondary: {
        backgroundColor: '#8b2c19',
        color: '#ffffff',
        borderRadius: 50,
        paddingHorizontal: 10,
        minWidth: 200,
        textAlign: 'center',
        paddingVertical: 10,
        alignItems: 'center',
    }
});

export default globalStyles;