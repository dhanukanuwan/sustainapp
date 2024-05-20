import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, useColorScheme, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SettingsScreen = () => {

    const userData = useSelector((state) => state.userdata.data );
    const userDataStatus = useSelector((state) => state.userdata.success );

	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : '#f3f2f2'
	};

    return(
        <SafeAreaView style={backgroundStyle}>
            { userDataStatus === false ? (
                <View style={styles.loading}><Spinner /></View>
            ) : (
                // <Text>Settings {console.log( userData.user_avatar )}</Text>
				<View style={styles.conatiner}>
					
					{ userData.user_avatar &&
						<View style={styles.profilePicWrap}>
							<Image source={{ uri: userData.user_avatar}} style={styles.profilePic}></Image>
						</View>
					}
					
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
		borderRadius: 100
	}
});

export default SettingsScreen;