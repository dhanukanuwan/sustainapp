import React from 'react';
import {View, Text, useColorScheme, SafeAreaView, ImageBackground, StyleSheet, ScrollView, Pressable } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import globalStyles from '../globalStyles';

const coverImage = {uri: 'https://sustainchange.se/app-images/hwi-cover.jpg'};

const OwiScreen = () => {

    const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : '#f3f2f2',
		flex: 1,
	};

    const handleShowTest = () => {
        console.log('test');
    }

    return(
        <SafeAreaView style={backgroundStyle}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={coverImage} resizeMode="cover" style={styles.image}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.bannerTitle}>Organisation Well function Index</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.textWrap}>

                    <Text style={styles.contentTitle}>Med Organisation Well function Index kan du se hur välfungerande du tycker att organisationen är i relation till dig och ditt arbete.</Text>
                    <Text>
                        Som arbetsgrupp får ni ett teamresultat att diskutera och utvecklas utifrån. Därefter kan du och ni följa er utveckling över tid - mot en alltmer välfungerande organisation.
                    </Text>
                    
                    <Pressable style={[globalStyles.btnPrimary, {marginVertical: 15, backgroundColor: '#08303c'}]} onPress={ handleShowTest }>
                        <Text style={{color: '#ffffff'}}>Starta testet</Text>
                    </Pressable>

                    <Text>Med tolv frågor som tar cirka fem minuter att besvara får du en indikation på hur välfungerande du tycker att organisationen är i relation till dig och ditt arbete. Frågorna är framtagna utifrån vad forskning och praktiska erfarenheter påvisat är viktiga kriterier för en välfungerande organisation. Dessa är:</Text>

                    <View style={styles.listItemsContainer}>
                        <Text style={styles.listItem}>{'\u2022'} att medarbetaren har god överblick, ser sin och den egna arbetsgruppens roll i hela arbetsprocessen</Text>
                        <Text style={styles.listItem}>{'\u2022'} att medarbetaren själv har kontroll över sina arbetsuppgifter och full empowerment, det vill säga har kompetens att utföra sina uppgifter samt de resurser och det mandat som krävs</Text>
                        <Text style={styles.listItem}>{'\u2022'} att relationerna på arbetsplatsen är goda och trygga</Text>
                    </View>
                    
                    <Text style={{marginVertical: 15}}>Indexet kan vara mellan 12-72 där indexet indikerar hur organisationen fungerar i relation till dig och dina arbetsuppgifter. Teamets resultatet ger en indikation på hur ni som grupp upplever organisationen.</Text>
                    <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#b23722'}]}> Rött (12-24) </Text> : Det kan handla om något tillfälligt, t ex en kris. Om det inte är en tillfällig situation är rött en allvarlig indikation på att organisationen inte är välfungerande ur ditt perspektiv eller om teamresultatet är rött ur hela gruppens perspektiv.</Text>
                    <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#e9b90f'}]}> Gult (25-59) </Text> : Här är det intressant att se vad det är som skaver i organisationen, finns det oklarheter som behöver redas ut och hur kan era relationer utvecklas?</Text>
                    <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#586230'}]}> Grönt (60–72) </Text> : Du arbetar på arbetsplats om som passar dig mycket väl och har gruppen ett högt index tycker det på att du, och ni, arbetar i en välfungerande organisation.</Text>
                    <Text>Du kan känna dig trygg med att göra testet för dina svar behandlas helt konfidentiellt!</Text>
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
    listItemsContainer: {
        flexDirection: 'column',
        paddingVertical: 20,
        paddingLeft: 15
    },
    listItem: {
        marginBottom: 10
    }
});

export default OwiScreen;