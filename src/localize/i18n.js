import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import i18nHttpLoader from 'i18next-http-backend';
import {API_BASE_URL, SUSTAIN_CHANGE_API_KEY} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChainedBackend from "i18next-chained-backend";
import AsyncStorageBackend from 'i18next-async-storage-backend2';

const STORE_LANGUAGE_KEY = "user_selected_lng";

const defaultLng = getLocales()[0].languageCode || 'sv';

const languageDetectorPlugin = {
    type: "languageDetector",
    async: true,
    init: () => { },
    detect: async function () {
        try {
            await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    return callback(language);
                } else {
                    return callback( getLocales()[0].languageCode );
                }
            });
        } catch (error) {
            console.log("Error reading language", error);
        }
    },
    cacheUserLanguage: async function (language) {
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) { }
    },
};

i18n
  .use(initReactI18next)
  .use(ChainedBackend)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: defaultLng,
    load:"languageOnly",
    react: {
      useSuspense: true,
    },
    backend: {
        backends: [
            AsyncStorageBackend,
            i18nHttpLoader
        ],
        backendOptions: [
            {
                expirationTime: 60 * 1000 // 1 * 24 * 60 * 60 * 1000 1 day
            },
            {
                loadPath: `${API_BASE_URL}/sustainchange/v1/gettranslatedstrings/?lang={{lng}}`,
                parse: (data) => {
                    return data;
                },
                request: (options, url, payload, callback) => {

                    fetch(
                        url,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
                            },
                        }).then(res => res.json())
                        .then( (res ) => {
                            //console.log(res?.translations);
                            callback(null, {
                                data: res.translations,
                                status: 200
                            });
                        }).catch( (err) => {
                            console.log(err);
                            callback(err, null);
                    });
                },
            }
        ]
    },
  });
export default i18n;