/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';

const Root = () => {
    return (
      <AuthProvider>
        <AxiosProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AxiosProvider>
      </AuthProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
