import React from 'react';
import {View, StyleSheet, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

const logoWhite = {uri: 'https://sustainchange.se/app-images/logo-white.png'};

const Header = ({ navigation }) => {

    const { i18n } = useTranslation();

    const flagImg = {uri: `https://sustainchange.se/app-images/flags/${i18n.language === 'sv' ? 'en' : 'sv'}.png`};

    const handleLngSwitch = ( activeLng ) => {
        if ( activeLng === 'sv' ) {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('sv');
        }
    }

    return(
        <View style={styles.container}>
            <Image source={logoWhite} style={styles.whiteLogo} />
            <View style={styles.iconWrap}>
                <Pressable  onPress={ () => handleLngSwitch( i18n.language ) }>
                    <Image source={flagImg} style={styles.flag} />
                </Pressable>
                <Pressable style={styles.iconWrap} onPress={ () => navigation.navigate('Settings') }>
                    <View style={styles.barIcon}>
                        <View style={styles.barOne}></View>
                        <View style={styles.barTwo}></View>
                        <View style={styles.barThree}></View>
                    </View>
                </Pressable>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
	whiteLogo: {
	  width: 110,
      height: 25
	},
    flag: {
        width: 25,
        height: 25,
        borderRadius: 50
    },
    container: {
        color: '#ffffff',
        backgroundColor: '#093846',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 30,
        marginStart: 10,
    },
    barIcon: {
        width: 30,
    },
    bar: {
        height: 3,
        backgroundColor: '#ffffff'
    },
    barOne: {
        width: '100%',
        height: 3,
        backgroundColor: '#ffffff',
        marginBottom: 3,
    },
    barTwo: {
        width: '75%',
        height: 3,
        backgroundColor: '#ffffff',
        marginBottom: 3,
    },
    barThree: {
        width: '50%',
        height: 3,
        backgroundColor: '#ffffff',
        marginBottom: 3,
    }
});

export default Header;