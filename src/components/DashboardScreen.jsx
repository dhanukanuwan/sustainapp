import React, {useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import Header from './dashboard/Header';
import Statusbar from '../partials/Statusbar';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserData } from '../redux/userSlice';
import * as Keychain from 'react-native-keychain';
import globalStyles from '../globalStyles';
import { useTranslation } from 'react-i18next';

const DashboardScreen = ({ navigation }) => {

    const userData = useSelector((state) => state.userdata.data );
    const dispatch = useDispatch();
    const userDataStatus = useSelector((state) => state.userdata.success );

	const { t } = useTranslation();

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

	const backgroundStyle = {
		backgroundColor: '#f3f2f2'
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
					<Text style={styles.widgetTitle}>{t('hwi_title')}</Text>
					<Text style={styles.widgetText}>{t('hvi_dash_desc')}</Text>
					<Pressable style={globalStyles.btnSecondary} onPress={ () => navigation.navigate('Hwi') }>
						<Text style={{color: '#ffffff'}}>{t('app_go_to_test')}</Text>
					</Pressable>
				</View>
			}

			{userData?.all_capabilities && userData?.all_capabilities.includes('owi') &&
				<View style={styles.widget}>
					<Text style={styles.widgetTitle}>{t('owi_title')}</Text>
					<Text style={styles.widgetText}>{t('home_owi_desc')}</Text>
					<Pressable style={globalStyles.btnPrimary} onPress={ () => navigation.navigate('Owi') }>
						<Text style={{color: '#ffffff'}}>{t('app_go_to_test')}</Text>
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