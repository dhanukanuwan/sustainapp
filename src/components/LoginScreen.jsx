import React, {useState, useContext} from 'react';
import {View, TextInput, ImageBackground, Pressable, Image, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert,  SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import globalStyles from '../globalStyles';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const image = {uri: 'https://sustainchange.se/app-images/login-bg.jpg'};
const logo = {uri: 'https://sustainchange.se/app-images/logo.png'};

const LoginScreen = () => {

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const authContext = useContext(AuthContext);
  	const {authAxios} = useContext(AxiosContext);

	  const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};

	const handleLoginSubmit = async () => {

		const requestBody = JSON.stringify({
            email: userEmail,
            password: userPassword,
          })
		
		try {
			const response = await authAxios.post('/simple-jwt-login/v1/auth', requestBody);
		
			const accessToken = response.data.data.jwt;
			authContext.setAuthState({
				accessToken,
				authenticated: response.data.data.success,
			});
		
			await Keychain.setGenericPassword(
				'token',
				JSON.stringify({
					accessToken,
				}),
			);
		} catch (error) {
			Alert.alert('Login Failed');
			console.log( error )
		}
		
	}

	return(
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.innerContainer}>
						<ImageBackground source={image} resizeMode="cover" style={styles.image}>
							<View style={styles.loginform}>
								<Text style={styles.sectionTitle}>Välkommen till</Text>
								<Image source={logo} style={styles.loginLogo} />
								<TextInput style={globalStyles.inputStyles} placeholder="Vänligen skriv din mailadress." inputMode="email" value={userEmail} onChangeText={setUserEmail} autoCapitalize="none" placeholderTextColor="#333"  />
								<TextInput style={globalStyles.inputStyles} placeholder="Vänligen skriv ditt lösenord" secureTextEntry={true} value={userPassword} onChangeText={setUserPassword} autoCapitalize="none" placeholderTextColor="#333"   />
								<Pressable style={globalStyles.btnPrimary} onPress={ handleLoginSubmit }>
									<Text style={{color: '#ffffff'}}>Logga in</Text>
								</Pressable>
							</View>
						</ImageBackground>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
		
	);
}

const styles = StyleSheet.create({
	sectionTitle: {
	  fontSize: 24,
	  fontWeight: '600',
	  textAlign: 'center',
	  marginBottom: 10,
	},
	image: {
	  flex: 1,
	  justifyContent: 'center',
	},
	container: {
	  flex: 1,
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'space-around',
	},
	loginform: {
	  backgroundColor: 'white',
	  padding: 20,
	  margin: 20,
	  textAlign: 'center',
	  alignItems: 'center',
	},
	loginLogo: {
	  width: 250,
	  height: 40,
	  marginBottom: 15
	},
});

export default LoginScreen;
