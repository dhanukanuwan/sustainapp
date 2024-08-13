import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HwiSummary = ({type, HwiData}) => {

    const [tableHead, setTableHead] = useState('');
    const [tableData, setTableData] = useState([]);
	const { i18n } = useTranslation();

    const hwiField = `field_${type === 'ovi' ? 'owi' : 'hwi'}_${i18n.language}_questions`;

    const fetchedHwiQuestions = useSelector((state) => state.userdata.data[hwiField] );

    useEffect( () => {

		if ( HwiData.date ) {
			const date = HwiData.date.split('-');
			const formatter = new Intl.DateTimeFormat('sv', { month: 'short' });
			const month = formatter.format(new Date(HwiData.date));

			const displayDate = `${date[2]} ${month}`;
			setTableHead(displayDate);
		}

        if ( HwiData.data && HwiData.data.length > 0  ) {
			const dataArray = HwiData.data.map( (item) => item.value );
			setTableData( dataArray );
		}

    }, [HwiData, type])

	const getHviColor = (value) => {

        let color = '#8b2c19';

        if (  value === 3 || value === 4 ) {
			color = '#cc9f00';
		}

		if (  value === 5 || value === 6 ) {
			color = '#586235';
		}

        return color;

    }

    return(
        <View>
           { tableHead && tableHead.length > 0 &&
				<View style={styles.tableContainer}>
					<View style={styles.tableHead}>
						<Text style={{flexGrow: 1}}>#</Text>
						<Text>{tableHead}</Text>
					</View>

					{fetchedHwiQuestions?.sustain_index_short_questions &&
						<>
							{fetchedHwiQuestions?.sustain_index_short_questions.map( (question, i) => {
								return(
									<View key={i} style={[styles.tableHead, {backgroundColor: i%2 === 0 ? '#f1f1f1' : '#ffffff', alignItems: 'center',}]}>
										<Text style={{paddingRight: 5}}>{i+1}.</Text>
										<Text style={{flexGrow: 1, fontSize: 13}}>{question.short_question}</Text>
										<Text style={[styles.hwiValue, {backgroundColor: getHviColor(tableData[i])}]}>{tableData[i]}</Text>
									</View>
								);
							})}
						</>
					}

				</View>
           }
        </View>
    );

}

const styles = StyleSheet.create({
	tableContainer: { 
		marginTop: 15
	},
	tableHead: {
		flexDirection: 'row',
		paddingVertical: 5,
		paddingHorizontal: 8,
		backgroundColor: '#ffffff',
	},
	hwiValue: {
		color: '#ffffff',
		padding: 5
	}
  });

export default HwiSummary;