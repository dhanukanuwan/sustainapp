/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useContext, useEffect, useState} from 'react';
import LoginScreen from './src/components/LoginScreen';
import {AuthContext} from './src/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from "jwt-decode";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './src/components/DashboardScreen';
import HwiScreen from './src/components/HwiScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      const decoded = jwtDecode(jwt.accessToken);

      const timeNow = Math.floor(Date.now() / 1000);

      if ( decoded.exp > timeNow ) {
          
        authContext.setAuthState({
          accessToken: jwt.accessToken || null,
          authenticated: jwt.accessToken !== null,
        });
        
        setStatus('loggedin');

      } else {

        setStatus('error');

        authContext.setAuthState({
          accessToken: null,
          authenticated: false,
        });

      }

    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  // if (status === 'loading') {
  //   return <Spinner />;
  // }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={ status === 'loggedin' ? 'Dashboard' : 'Login'}>

          { authContext?.authState?.authenticated !== false ? (
            <>
              <Stack.Screen options={{headerShown: false}} name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Hwi" component={HwiScreen} />
            </>
          ) : (
            <>
              <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
