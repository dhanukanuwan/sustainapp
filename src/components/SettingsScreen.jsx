import React, {useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView, useColorScheme, Image, Pressable  } from 'react-native';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import globalStyles from '../globalStyles';
import {AuthContext} from '../context/AuthContext';

const SettingsScreen = () => {

    const userData = useSelector((state) => state.userdata.data );
    const userDataStatus = useSelector((state) => state.userdata.success );

	const authContext = useContext(AuthContext);

	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : '#f3f2f2',
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
							<Text>Förnamn</Text>
							<Text style={styles.inputVal}>{userData.first_name}</Text>
						</View>
						<View style={styles.inputRow}>
							<Text>Efternamn</Text>
							<Text style={styles.inputVal}>{userData.last_name}</Text>
						</View>
						<View style={styles.inputRow}>
							<Text>Mailadress</Text>
							<Text style={styles.inputVal}>{userData.email}</Text>
						</View>
					</View>

					<View style={{marginTop: 60}}>
						<Pressable style={globalStyles.btnSecondary} onPress={ () =>  authContext.logout()}>
							<Text style={{color: '#ffffff'}}>Logga ut</Text>
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