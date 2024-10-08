import React, {useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Pressable  } from 'react-native';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import globalStyles from '../globalStyles';
import {AuthContext} from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {

    const userData = useSelector((state) => state.userdata.data );
    const userDataStatus = useSelector((state) => state.userdata.success );

	const authContext = useContext(AuthContext);

	const { t } = useTranslation();

	const backgroundStyle = {
		backgroundColor: '#f3f2f2',
		flex: 1,
	};

    return(
        <SafeAreaView style={backgroundStyle}>
            { userDataStatus === false ? (
                <View style={styles.loading}><Spinner /></View>
            ) : (
				<View style={styles.conatiner}>
					
					{ userData.user_avatar &&
						<View style={styles.profilePicWrap}>
							<Image source={{ uri: userData.user_avatar}} style={styles.profilePic}></Image>
						</View>
					}

					<View style={styles.formContainer}>
						<View style={styles.inputRow}>
							<Text>{t('app_first_name')}</Text>
							<Text style={styles.inputVal}>{userData.first_name}</Text>
						</View>
						<View style={styles.inputRow}>
							<Text>{t('app_last_name')}</Text>
							<Text style={styles.inputVal}>{userData.last_name}</Text>
						</View>
						<View style={styles.inputRow}>
							<Text>{t('app_email_address')}</Text>
							<Text style={styles.inputVal}>{userData.email}</Text>
						</View>
					</View>

					<View style={{marginTop: 60}}>
						<Pressable style={globalStyles.btnSecondary} onPress={ () =>  authContext.logout()}>
							<Text style={{color: '#ffffff'}}>{t('app_log_out')}</Text>
						</Pressable>
					</View>

				</View>
            )}
            
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
	loading: {
		marginTop: 25,
	},
	conatiner: {
		paddingHorizontal: 15,
		paddingVertical: 30
	},
	profilePicWrap: {
        justifyContent: 'center',
		flexDirection: 'row',
	},
	profilePic: {
		width: 60,
		height: 60,
		borderRadius: 100,
		position: 'absolute',
		zIndex: 9
	},
	formContainer: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'rgb(215,214,214)',
		paddingTop: 50,
		position: 'relative',
		zIndex: -1,
		top: 30,
		borderBottomWidth: 0,
	},
	input: {
		backgroundColor: '#ffffff',
		borderColor: '#dee2e6',
		borderWidth: 1,
		borderStyle: 'solid',
		height: 35,
		paddingHorizontal: 10
	},
	inputRow: {
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: 'rgb(215,214,214)',
		borderStyle: 'solid',
		paddingVertical: 10
	},
	inputVal: {
		color: 'rgba(0,0,0,0.5)',
		marginTop: 3
	}
});

export default SettingsScreen;