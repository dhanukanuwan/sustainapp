import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import globalStyles from '../globalStyles';
import HwiTest from '../partials/HwiTest';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {fetchHwiQuestions } from '../redux/userSlice';

const coverImage = {uri: 'https://sustainchange.se/app-images/hwi-cover.jpg'};
const backIcon = {uri: 'https://sustainchange.se/app-images/back-arrow.png'};

const OwiScreen = () => {

    const [showTest, setShowTest] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const { t, i18n } = useTranslation();

    const owiField = `field_owi_${i18n.language}_questions`;

    const fetchedOwiQuestions = useSelector((state) => state.userdata.data[owiField] );
    const dispatch = useDispatch();

    const loadOwiQuestions = useCallback( async () => {
		
		if ( !fetchedOwiQuestions ) {

			try {
				dispatch(fetchHwiQuestions(owiField))
		
			} catch (error) {
			  console.log(`User data error: ${error.message}`);
			}

		}

    }, [fetchedOwiQuestions]);
    
    useEffect( () => {
    	loadOwiQuestions()
    }, [loadOwiQuestions])

	const backgroundStyle = {
		backgroundColor: '#f3f2f2',
		flex: 1,
	};

    return(
        <SafeAreaView style={backgroundStyle}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={coverImage} resizeMode="cover" style={styles.image}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.bannerTitle}>{t('owi_title')}</Text>
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
                                    <Text style={styles.backText}>{t('app_go_back')}</Text>
                                </Pressable>
                                
                            </View>
                        </View>
                        {fetchedOwiQuestions?.index_questions && <HwiTest questions={fetchedOwiQuestions?.index_questions} type="ovi" showResults={showResults} /> }
                    </>

                    ) : (
                    <>
                        <Text style={styles.contentTitle}>{t('owi_info_text_1')}</Text>
                        <Text>{t('owi_info_text_2')}</Text>
                        
                        <Pressable style={[globalStyles.btnPrimary, {marginTop: 15, backgroundColor: '#08303c'}]} onPress={ () => {setShowTest( true ); setShowResults( false)} }>
                            <Text style={{color: '#ffffff'}}>{t('app_go_to_test')}</Text>
                        </Pressable>
                        <Pressable style={[globalStyles.btnSecondary, {marginTop: 10, marginBottom: 15}]} onPress={ () => { setShowTest( true); setShowResults( true)} }>
                                <Text style={{color: '#ffffff'}}>{t('app_view_owi')}</Text>
                        </Pressable>

                        <Text>{t('owi_info_text_3')}</Text>

                        <View style={styles.listItemsContainer}>
                            <Text style={styles.listItem}>{'\u2022'} {t('owi_info_text_4')}</Text>
                            <Text style={styles.listItem}>{'\u2022'} {t('owi_info_text_5')}</Text>
                            <Text style={styles.listItem}>{'\u2022'} {t('owi_info_text_6')}</Text>
                        </View>
                        
                        <Text style={{marginVertical: 15}}>{t('owi_info_text_7')}</Text>
                        <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#b23722'}]}> {t('hwi_red_text')} (12-24) </Text> : {t('owi_info_red_text')}</Text>
                        <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#e9b90f'}]}> {t('hwi_yellow_text')} (25-59) </Text> : {t('owi_info_yellow_text')}</Text>
                        <Text style={styles.inlineText}><Text style={[styles.textSpan, {backgroundColor: '#586230'}]}> {t('hwi_green_text')} (60–72) </Text> : {t('owi_info_green_text')}</Text>
                        <Text>{t('hwi_info_text_4')}</Text>
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
    listItemsContainer: {
        flexDirection: 'column',
        paddingVertical: 20,
        paddingLeft: 15
    },
    listItem: {
        marginBottom: 10
    },
    backLink: {
		marginVertical: 15
	},
	backIcon: {
		width: 15,
		height: 9,
		marginRight: 3
	},
	backIconInner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	backText: {
		fontSize: 12,
		textDecorationLine: 'underline'
	}
});

export default OwiScreen;