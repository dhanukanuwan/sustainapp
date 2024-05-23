import React, {useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, useColorScheme, Pressable, StyleSheet } from 'react-native';
import Header from './dashboard/Header';
import Statusbar from '../partials/Statusbar';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserData } from '../redux/userSlice';
import * as Keychain from 'react-native-keychain';
import globalStyles from '../globalStyles';

const DashboardScreen = ({ navigation }) => {

    const userData = useSelector((state) => state.userdata.data );
    const dispatch = useDispatch();
    const userDataStatus = useSelector((state) => state.userdata.success );

    const loadUserData = useCallback( async () => {
		
		if ( userDataStatus === false ) {

			try {
				const token = await Keychain.getGenericPassword();
				const jwt = JSON.parse(token.password);
				dispatch(fetchUserData(jwt.accessToken))
		
			} catch (error) {
			  console.log(`User data error: ${error.message}`);
			}

		}

    }, [userDataStatus]);
    
    useEffect( () => {
    	loadUserData()
    }, [loadUserData])

    const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : '#f3f2f2'
	};

	// const handleBtnClick = ( screen ) => {
	// 	console.log( screen );
	// }

    return(
        <SafeAreaView style={backgroundStyle}>
            <Statusbar />
            <Header navigation={navigation} />

			{userData?.all_capabilities && userData?.all_capabilities.includes('hwi') &&
				<View style={styles.widget}>
					<Text style={styles.widgetTitle}>Human Well-being Index</Text>
					<Text style={styles.widgetText}>Ta hjälp av vårt test Human Well-being Index, som hjälper dig att må bra och prestera hållbart.</Text>
					<Pressable style={globalStyles.btnSecondary} onPress={ () => navigation.navigate('Hwi') }>
						<Text style={{color: '#ffffff'}}>Gör testet här</Text>
					</Pressable>
				</View>
			}

			{userData?.all_capabilities && userData?.all_capabilities.includes('owi') &&
				<View style={styles.widget}>
					<Text style={styles.widgetTitle}>Organisation Well function Index</Text>
					<Text style={styles.widgetText}>Detta test ger dig och er svar på hur välfungerande du och ni tycker att organisationen är.</Text>
					<Pressable style={globalStyles.btnPrimary} onPress={ () => navigation.navigate('Owi') }>
						<Text style={{color: '#ffffff'}}>Gör testet här</Text>
					</Pressable>
				</View>
			}

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
	widgetTitle: {
	  fontSize: 20,
	  fontWeight: '600',
	  textAlign: 'center',
	  marginBottom: 10,
	},
	widgetText: {
		textAlign: 'center',
		marginBottom: 15
	},
	widget: {
		marginVertical: 15,
		marginHorizontal: 10,
		padding: 15,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'rgba(0,0,0,0.1)',
		borderRadius: 5

	}
});

export default DashboardScreen;