import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {getHwiMsgs } from '../redux/userSlice';
import RenderHtml from 'react-native-render-html';
import HwiSummary from './HwiSummary';
import { useTranslation } from 'react-i18next';

const HwiResults = ({type}) => {

    const userHwi = useSelector((state) => state.userdata.data.hvi_data );
    const userOwi = useSelector((state) => state.userdata.data.ovi_data );
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { t, i18n } = useTranslation();

    const [hwiCount, setHwiCount] = useState(0);
    const [owiCount, setOwiCount] = useState(0);
    const [recentOwi, setRecentOwi] = useState({});
    const [recentHwi, setRecentHwi] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        
        if ( userHwi.personal && userHwi.personal.length > 0 ) {
            const recentHwi = [...userHwi.personal].pop();
            setHwiCount( recentHwi.hvi_count );
            setRecentHwi( recentHwi );
        }

    }, [userHwi])

    useEffect( () => {
        
        if ( userOwi.personal && userOwi.personal.length > 0 ) {
            const recentOwi = [...userOwi.personal].pop();
            setOwiCount( recentOwi.ovi_count );
            setRecentOwi(recentOwi);
        }

    }, [userOwi])

    const loadHwiMessages = useCallback( async () => {

        setLoading( true );
		
		try {

            const requestData = {
				type: type,
				count: hwiCount,
                lng: i18n.language
			}

            dispatch(getHwiMsgs(requestData))
    
        } catch (error) {
          console.log(`HWI messages error: ${error.message}`);
        }

        setLoading( false );

    }, [hwiCount]);

    useEffect( () => {

        if ( type === 'hvi' ) {
            loadHwiMessages()
        }

    }, [loadHwiMessages, type])

    const getHviColor = (count) => {
		let color = '#8b2c19';

		if ( count > 24 && count < 60 ) {
			color = '#cc9f00';
		}

		if ( count > 59 ) {
			color = '#586235';
		}

		return color;
	}

    const source = {
        html: userHwi.msgs ? userHwi.msgs : ``
    };

    return(
        <>
            <View style={styles.countWrap}>
                <View><Text style={styles.countText}>{t(`your_${type}_is`)} </Text></View>
                <View><Text style={[styles.countText, {backgroundColor: getHviColor(type === 'hvi' ? hwiCount : owiCount), color: '#ffffff', paddingVertical: 10, paddingHorizontal: 15}]}>{ type === 'hvi' ? hwiCount : owiCount}</Text></View>
            </View>
            { type === 'hvi' && ! loading &&
                <View>
                    <RenderHtml
                        contentWidth={width}
                        source={source}
                    />
                </View>
            }

            { type === 'ovi' && <HwiSummary type="ovi" HwiData={recentOwi} />}
            { type === 'hvi' && <HwiSummary type="hvi" HwiData={recentHwi} />}

        </>
    )

}

const styles = StyleSheet.create({
	countWrap: {
        flexDirection: 'row',
		alignItems: 'center',
	},
    countText: {
        fontSize: 20,
        fontWeight: '600'
    },
    countNumber: {
        padding: 10
    }
});

export default HwiResults;