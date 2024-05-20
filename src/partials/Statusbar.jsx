import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Statusbar = () => {

    const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};

    return (
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
        />
    )

}

export default Statusbar;