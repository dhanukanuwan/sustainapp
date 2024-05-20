import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';

const logoWhite = {uri: 'https://sustainchange.se/app-images/logo-white.png'};

const Header = () => {

    return(
        <View style={styles.container}>
            <Image source={logoWhite} style={styles.whiteLogo} />
            <View style={styles.barIcon}>
                <View style={styles.barOne}></View>
                <View style={styles.barTwo}></View>
                <View style={styles.barThree}></View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
	whiteLogo: {
	  width: 110,
      height: 25
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