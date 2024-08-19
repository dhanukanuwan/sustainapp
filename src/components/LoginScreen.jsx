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
	const [verificationCode, setVerificationCode] = useState('');
	const [userConfirmPass, setUserConfirmPass] = useState('');
	const [passwordError, setPaawordEroor] = useState('');

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
		setPaawordEroor('');

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

	const handleCodeVerification = async () => {

		setIsLoading( true );
		setPaawordEroor('');

		const passData = {
			user_email: resetPassData.data.user_email,
			step: 'auth',
			authcode: encodeURIComponent(verificationCode),
			pass: '',
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

		if ( !resetPassData || !resetPassData.data ) {
			return step;
		}

		if ( resetPassData.data.step === 'auth' ||  resetPassData.data.step === 'pass' ) {
			step = resetPassData.data.step;
		} else if ( resetPassData.data.step === 'complete' && resetPassData.message === 'reset_complete' ) {
			step = 'email';
		}

		return step;

	}

	const validatePassword = ( psw, confirmPass ) => {

		let msg = 'password_ok';

		switch (true) {
			case  (psw !== confirmPass ):
			  msg = 'password_match'
			  break
			case  (psw.length < 8 ):
			  msg = 'password_strength'
			  break
			case  (!(/[0-9]/.test(psw))):
			  msg = 'password_upper_lower'
			  break
			case (psw == psw.toLowerCase()) || (psw == psw.toUpperCase()):
			  msg = 'password_upper_lower'
			  break
		}

		return msg;
	}

	const handlePasswordSave = async () => {

		const validateStatus = validatePassword( userPassword, userConfirmPass );

		if ( validateStatus !== 'password_ok' ) {
			setPaawordEroor( validateStatus );
			return;
		}

		setIsLoading( true );
		setPaawordEroor('');

		const passData = {
			user_email: resetPassData.data.user_email,
			step: 'pass',
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
		setUserPassword('');
		setUserEmail('');
		setUserConfirmPass('');
		setVerificationCode('');



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
								<Text style={styles.sectionTitle}>{t('app_login_welcome')}</Text>
								<Image source={logo} style={styles.loginLogo} />

								{ isResetPass && resetPassData && resetPassData.success === false &&
									<>
										{ resetPassData.message && 
											<View style={styles.errorMsg}>
												<Text style={[styles.codeNotice, {color: '#38120a'}]}>{t(`app_${resetPassData.message}`)}</Text>
											</View>
										}

										{ !resetPassData.message && 
											<View style={styles.errorMsg}>
												<Text style={[styles.codeNotice, {color: '#38120a'}]}>{t('app_error_msg')}</Text>
											</View>
										}
									</>
								}

								{ resetPassData && resetPassData.success && resetPassData.message === 'reset_complete' &&
									<View style={[styles.errorMsg, {backgroundColor: '#edf7ed'}]}>
										<Text style={[styles.codeNotice, {color: '#45665e'}]}>{t(`app_${resetPassData.message}`)}</Text>
									</View>
								}

								{ (! isResetPass || ( resetPassData && resetPassData.success && resetPassData.message === 'reset_complete' ) ) &&
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

								{ (isResetPass && ( (resetPassData && resetPassData.message !== 'reset_complete') || !resetPassData )) &&
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

										{ getResetStep() === 'auth' &&
											<>
												<Text style={styles.codeNotice}>{t('app_resetpass_notice')}</Text>
												<TextInput style={globalStyles.inputStyles} placeholder={t('app_verif_code')} value={verificationCode} onChangeText={setVerificationCode} autoCapitalize="none" placeholderTextColor="#333"  />
												<Pressable style={[globalStyles.btnPrimary, {paddingHorizontal: 15}]} onPress={ handleCodeVerification }>
													{ isLoading === true ? (
														<ActivityIndicator size="small" color="#ffffff" />
													) : (
														<Text style={{color: '#ffffff'}}>{t('app_verif_code_btn')}</Text>
													)}
												</Pressable>
											</>
										}

										{ getResetStep() === 'pass' &&
											<>
												{ passwordError &&
													<View style={styles.errorMsg}>
														<Text style={[styles.codeNotice, {color: '#38120a'}]}>{t(`app_${passwordError}`)}</Text>
													</View>
												}
												
												<TextInput style={globalStyles.inputStyles} placeholder={t('app_enter_new_pswd')} secureTextEntry={true} value={userPassword} onChangeText={setUserPassword} autoCapitalize="none" placeholderTextColor="#333"   />
												<TextInput style={globalStyles.inputStyles} placeholder={t('app_confirm_pswd')} secureTextEntry={true} value={userConfirmPass} onChangeText={setUserConfirmPass} autoCapitalize="none" placeholderTextColor="#333"   />
												<Pressable style={[globalStyles.btnPrimary, {paddingHorizontal: 15}]} onPress={ handlePasswordSave }>
													{ isLoading === true ? (
														<ActivityIndicator size="small" color="#ffffff" />
													) : (
														<Text style={{color: '#ffffff'}}>{t('app_save')}</Text>
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
	},
	codeNotice: {
		fontStyle: 'italic',
		marginBottom: 5
	},
	errorMsg: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#e8d5d1',
		color: '#38120a',
		width: '100%',
		marginBottom: 10,
	}
});

export default LoginScreen;
