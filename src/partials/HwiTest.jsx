import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import globalStyles from '../globalStyles';
import { useDispatch } from 'react-redux';
import {saveUserHwi, saveUserOvi } from '../redux/userSlice';
import * as Keychain from 'react-native-keychain';
import HwiResults from './HwiResults';
import { useTranslation } from 'react-i18next';

const HwiTest = ({questions, type, showResults}) => {

	let intialValues = [];
	
	if ( questions ) {
		questions.map( ( question ) => 
			question.type === 'custom' ? intialValues.push({value: ''}) : intialValues.push({value: 2})
		)
	}

	const [sliderValues, setSliderValues] = useState(intialValues);
	const dispatch = useDispatch();
	const [isSaving, setIsSaving] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { t } = useTranslation();

	useEffect( () => {
        
        if ( showResults === true ) {
			setShowResult(true);
		}

    }, [showResults])

	const handleHviUpdate = (val, updatedIndex) => {

		const valInt = parseInt( val, 10 );

		const newHvi = sliderValues.map( (obj, index ) => 
			index === updatedIndex ? { ...obj, value: valInt } : obj
		);

		setSliderValues( newHvi );

	}

	const handleSaveHwi = async () => {

		setIsSaving(true);

		try {
			const token = await Keychain.getGenericPassword();
			const jwt = JSON.parse(token.password);

			const requestData = {
				token: jwt.accessToken,
				hwi: sliderValues
			}

			if ( type === 'hvi' ) {
				dispatch(saveUserHwi( requestData ))
			}

			if ( type === 'ovi' ) {
				dispatch(saveUserOvi( requestData ))
			}

			setShowResult( true );
	
		} catch (error) {
		  console.log(`Hwi save error: ${error.message}`);
		}

		setIsSaving( false );

	}

	if ( showResult ) {
		return (
			<HwiResults type={type} />
		)
	}
	
    return (
		<>
			{ questions && questions.map( (question, i) => {
				return (
					<View key={i} style={styles.sliderWrap}>
						<View style={styles.slideQuestion}>
							<Text style={{fontWeight: '600'}}>{`${i+1}) `}</Text>
							<Text style={{fontWeight: '600'}}>{question.question}</Text>
						</View>
						
						{ question.hints &&
							<View style={styles.hintsWrap}>
								{ question.hints.map( (  hint, j ) => {
									return (
										<Text key={j} style={styles.hintText}>{hint.hint}</Text>
									)
								}) }
							</View>
						}

						<Slider
							value={sliderValues[i].value}
							onValueChange={value => handleHviUpdate( value, i )}
							maximumValue={6}
							minimumValue={1}
							step={1}
							trackMarks={[1,2,3,4,5,6]}
							trackStyle={{height: 6}}
							minimumTrackStyle={{backgroundColor: '#e9b90f'}}
							thumbTintColor={'#e9b90f'}
							renderTrackMarkComponent={(mark) => {
								return(
									<View style={{marginTop: 35, marginLeft: 5 }}>
										<Text style={{fontWeight: '600'}}>{mark+1}</Text>
									</View>
								)
							}}
						/>
						
					</View>
				)
			}) }

			<View>

				<Pressable style={[globalStyles.btnSecondary, {marginTop: 20}]} onPress={ () => handleSaveHwi() }>
					{ isSaving === true ? (
						<ActivityIndicator size="small" color="#ffffff" />
					) : (
						<Text style={{color: '#ffffff'}}>{t('app_save')}</Text>
					)}
					
				</Pressable>

			</View>
			
		</>
    );

}

const styles = StyleSheet.create({
	sliderWrap: {
	  marginVertical: 15,
	  paddingRight: 15
	},
	slideQuestion: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	hintsWrap: {
		marginTop: 10,
		paddingLeft: 15
	},
	hintText: {
		color: 'rgba(0,0,0,0.6)',
		fontSize: 12,
		marginBottom: 5
	}
});

export default HwiTest;