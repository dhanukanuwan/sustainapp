import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import Config from "react-native-config";

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: Config.API_BASE_URL,
    });

    const publicAxios = axios.create({
        baseURL: Config.API_BASE_URL,
    });

    const basicAuth = `Basic ${Config.SUSTAIN_CHANGE_API_KEY}`;

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = basicAuth;
            }

            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json';
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = failedRequest => {
        // const data = {
        //   refreshToken: authContext.authState.refreshToken,
        // };

        const data = JSON.stringify({
            JWT: authContext.authState.accessToken,
        })

        const options = {
            method: 'POST',
            data,
            url: `${Config.API_BASE_URL}/simple-jwt-login/v1/auth/refresh/`,
            headers: { 'Authorization': basicAuth, 'Content-Type': 'application/json' }
        };

        return axios(options)
        .then(async tokenRefreshResponse => {
            failedRequest.response.config.headers.Authorization = basicAuth;

            authContext.setAuthState({
                ...authContext.authState,
                accessToken: tokenRefreshResponse.data.accessToken,
            });

            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    accessToken: tokenRefreshResponse.data.accessToken,
                }),
            );

            return Promise.resolve();
        })
        .catch(e => {
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
            });
        });
    };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};