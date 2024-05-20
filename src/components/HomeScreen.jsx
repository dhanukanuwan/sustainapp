import React from 'react';
import {View, Text } from 'react-native';
import Header from './dashboard/Header';
import DashboardScreen from './DashboardScreen';
import HwiScreen from './HwiScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {

    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                <Drawer.Screen name="HWI" component={HwiScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );

}

export default HomeScreen;