import React, {useState, useContext} from 'react';
import {View, TextInput, ImageBackground, Pressable, Image, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert,  SafeAreaView, StatusBar, useColorScheme, ActivityIndicator } from 'react-native';
import globalStyles from '../globalStyles';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {handlePassReset } from '../redux/userSlice';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const image = {uri: 'https://sustainchange.se/app-images/login-bg.jpg'};
const logo = {uri: 'https://sustainchange.se/app-images/logo.png'};

const LoginScreen = () => {

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const authContext = useContext(AuthContext);
  	const {authAxios} = useContext(AxiosContext);
	const [isLoading, setIsLoading] = useState( false );
	const [isResetPass, setIsResetPass] = useState( false );

	const resetPassData = useSelector((state) => state.userdata.resetpass );
    const dispatch = useDispatch();

	  const { t, i18n } = useTranslation();

	  const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};

	const handleLoginSubmit = async () => {

		setIsLoading( true );

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

		setIsLoading( false );
		
	}

	const passwordReset = async () => {

		setIsLoading( true );

		const passData = {
			user_email: userEmail,
			step: 'request',
			authcode: '',
			pass: userPassword,
			lang: i18n.language
		};

		try {
			await dispatch(handlePassReset(passData))
	
		} catch (error) {
		  console.log(`User data error: ${error.message}`);
		}

		setIsLoading( false );

	}

	const getResetStep = () => {

		let step = 'email';

		if ( !resetPassData || !resetPassData.step ) {
			return step;
		}

		if ( resetPassData.step === 'auth' ||  resetPassData.step === 'pass' ) {
			step = resetPassData.step;
		} else if ( resetPassData.step === 'complete' && resetPassData.message === 'reset_complete' ) {
			step = 'email';
		}

		return step;

	}

	//console.log( resetPassData );

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
								<Text style={styles.sectionTitle}>{t('app_login_welcome')}</Text>
								<Image source={logo} style={styles.loginLogo} />

								{ ! isResetPass &&
									<>
										<TextInput style={globalStyles.inputStyles} placeholder={t('app_enter_email')} inputMode="email" value={userEmail} onChangeText={setUserEmail} autoCapitalize="none" placeholderTextColor="#333"  />
										<TextInput style={globalStyles.inputStyles} placeholder={t('app_enter_pswd')} secureTextEntry={true} value={userPassword} onChangeText={setUserPassword} autoCapitalize="none" placeholderTextColor="#333"   />
										<View style={styles.resetLink}>
											<Pressable onPress={ () => setIsResetPass( true ) }>
												<Text style={[globalStyles.linkPrimary, {fontStyle: 'italic'}]}>{t('app_forgot_pass')}</Text>
											</Pressable>
										</View>
										<Pressable style={globalStyles.btnPrimary} onPress={ handleLoginSubmit }>
											{ isLoading === true ? (
												<ActivityIndicator size="small" color="#ffffff" />
											) : (
												<Text style={{color: '#ffffff'}}>{t('community_login')}</Text>
											)}
										</Pressable>
									</>
								}

								{ isResetPass &&
									<>
										{ getResetStep() === 'email' &&
											<>
												<TextInput style={globalStyles.inputStyles} placeholder={t('app_enter_email')} inputMode="email" value={userEmail} onChangeText={setUserEmail} autoCapitalize="none" placeholderTextColor="#333"  />
												<Pressable style={[globalStyles.btnPrimary, {paddingHorizontal: 15}]} onPress={ passwordReset }>
													{ isLoading === true ? (
														<ActivityIndicator size="small" color="#ffffff" />
													) : (
														<Text style={{color: '#ffffff'}}>{t('app_reset_pass')}</Text>
													)}
												</Pressable>
											</>
										}

										<View style={[styles.resetLink, {marginTop: 10}]}>
											<Pressable onPress={ () => setIsResetPass( false ) }>
												<Text style={[globalStyles.linkPrimary, {fontStyle: 'italic'}]}>{t('community_login')}</Text>
											</Pressable>
										</View>
									</>
								}
								
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
	resetLink: {
		marginBottom: 10,
		justifyContent: 'flex-end',
		width: '100%',
		flexDirection: 'row',
    	flexWrap: 'wrap',
	}
});

export default LoginScreen;
