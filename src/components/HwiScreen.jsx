import React, {useState} from 'react';
import {View, Text, useColorScheme, SafeAreaView, ImageBackground, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import globalStyles from '../globalStyles';
import HwiTest from '../partials/HwiTest';
import hwiQuestions from '../utils/hwi-questions';

const coverImage = {uri: 'https://sustainchange.se/app-images/hwi-cover.jpg'};
const backIcon = {uri: 'https://sustainchange.se/app-images/back-arrow.png'};

const HwiScreen = () => {

    const [showTest, setShowTest] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : '#f3f2f2',
		flex: 1,
	};

    return(
        <SafeAreaView style={backgroundStyle}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={coverImage} resizeMode="cover" style={styles.image}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.bannerTitle}>Human Well-being Index</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.textWrap}>

                    { showTest === true ? (

                       <>
							<View style={styles.backLink}>
								<View style={styles.backIconInner}>
									<Image source={backIcon} style={styles.backIcon}></Image>
									<Pressable onPress={ () => setShowTest(false) } >
										<Text style={styles.backText}>Gå tillbaka</Text>
									</Pressable>
									
								</View>
							</View>
                        	<HwiTest questions={hwiQuestions} />
                       </>

                    ) : (
                        <>
                            <Text style={styles.contentTitle}>Ta hjälp av vårt test Human Well-being Index, som hjälper dig att må bra och prestera hållbart.</Text>
                            <Text>På tolv frågor och cirka fem minuter kan du få en indikation på hur hållbar din vardag är. Frågorna är formulerade för att ge dig en sammantagen bild av hur du ligger till, 
                                och möjlighet att reflektera över vad som kan göra din vardag mer hållbar. Över tid kan du sedan följa hur du lyckas med att en mer hållbar livsstil och vardag.</Text>

                            <Pressable style={[globalStyles.btnPrimary, {marginTop: 20, backgroundColor: '#08303c'}]} onPress={ () => setShowTest( true) }>
                                <Text style={{color: '#ffffff'}}>Testa din hållbarhet</Text>
                            </Pressable>
                            
                            <Text style={styles.contentTitle}>Resultatet delas in i en röd-gul-grön skala enligt följande:</Text>
                            <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#b23722'}]}> Rött (12-24) </Text> : Tyder på en ohållbar vardag och en riskfaktor för ohälsa – en riskposition. Du behöver göra något åt din situation för att inte riskera din hälsa.</Text>
                            <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#e9b90f'}]}> Gult (25-59) </Text> : Tyder på att delar av din vardag är ohållbar och att du pendlar mellan en risk- och friskposition. Genom att göra förändringar i din vardag kan du ta kommandot och göra tillvaron mer hållbar.</Text>
                            <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#586230'}]}> Grönt (60–72) </Text> : Tyder på en hållbar vardag och är en friskfaktor för hälsa – en friskposition.</Text>
                            <Text>Du kan känna dig trygg med att göra testet för dina svar behandlas helt konfidentiellt!</Text>
                        </>
                    )}

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
	bannerTitle: {
	  fontSize: 22,
	  fontWeight: '600',
	  textAlign: 'center',
      color: '#ffffff'
	},
    contentTitle: {
        fontSize: 14,
	    fontWeight: '600',
        marginBottom: 10,
        marginTop: 20
    },
	image: {
	  flex: 1,
	},
	container: {
	  height: 100,
      width: '100%',
	},
	innerContainer: {
		backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
	    justifyContent: 'center',
	},
    textWrap: {
        paddingHorizontal: 15,
        paddingBottom: 30
    },
    textSpan: {
        padding: 3,
        color: '#ffffff',
        lineHeight: 18,
    },
    inlineText: {
        marginBottom: 10
    },
	backLink: {
		marginVertical: 15,
	},
	backIcon: {
		width: 15,
		height: 9,
		marginRight: 3
	},
	backIconInner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	backText: {
		fontSize: 12,
		textDecorationLine: 'underline'
	}
});

export default HwiScreen;