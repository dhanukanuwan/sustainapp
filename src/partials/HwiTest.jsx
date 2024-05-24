import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

const HwiTest = ({questions}) => {

	let intialValues = [];
	
	if ( questions ) {
		questions.map( ( question ) => 
			question.type === 'custom' ? intialValues.push({value: ''}) : intialValues.push({value: 2})
		)
	}

	const [sliderValues, setSliderValues] = useState(intialValues);

	const handleHviUpdate = (val, updatedIndex) => {

		const valInt = parseInt( val, 10 );

		const newHvi = sliderValues.map( (obj, index ) => 
			index === updatedIndex ? { ...obj, value: valInt } : obj
		);

		setSliderValues( newHvi );

	}
	
    return (
		<>
			{ questions && questions.map( (question, i) => {
				return (
					<View key={i} style={styles.sliderWrap}>
						<View style={styles.slideQuestion}>
							<Text style={{fontWeight: '600'}}>{`${i+1}) `}</Text>
							<Text style={{fontWeight: '600'}}>{question.title}</Text>
						</View>
						
						{ question.hints &&
							<View style={styles.hintsWrap}>
								{ question.hints.map( (  hint, j ) => {
									return (
										<Text key={j} style={styles.hintText}>{hint}</Text>
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