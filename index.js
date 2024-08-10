/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, ActivityIndicator, StyleSheet, View } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import React, { Suspense } from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';

import "./src/localize/i18n";

const SuspenseFallback = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#093846" />
  </View>
);

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <Provider store={store}>
            <Suspense fallback={ <SuspenseFallback />}>
              <App />
            </Suspense>
          </Provider>
        </AxiosProvider>
      </AuthProvider>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });

AppRegistry.registerComponent(appName, () => Root);
