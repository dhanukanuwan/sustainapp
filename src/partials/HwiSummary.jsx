import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet } from 'react-native';

const HwiSummary = ({type, HwiData}) => {

    const [tableHead, setTableHead] = useState('');
    const [tableData, setTableData] = useState([]);

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

	let questions = [
        'Meningsfullhet i vardagen',
		'Kontroll över vardagsstressen',
		'Tillräckligt med återhämtning',
		'Tillräckligt med sömn',
		'Balans mellan krav och resurser på jobbet',
		'Balans mellan krav och resurser hemma',
		'Ork på jobbet',
		'Ork hemma',
		'Nöjd med arbetsinsatsen',
		'Nöjd med fritiden',
		'Kan koppla bort jobbet när man är ledig',
		'Kan koppla bort privata frågor när man jobbar'
    ]; 

    if ( type === 'ovi' ) {
		questions = [
			'Tydliga visioner och mål',
			'Bidrar till organisationens resultat',
			'Prioriterar varje dag',
			'Tydliga ansvarsområden och mål',
			'Har resurser för arbetsuppgifterna',
			'Delar organisationens värderingar',
			'Värderingarna är viktiga',
			'Tillit till sin chef',
			'Kollegialt stöd',
			'Trygg i gruppen och kan vara sig själv',
			'Hinner genomföra förändringar',
			'Förtroende för ledningen'
		];
	}

    return(
        <View>
           { tableHead && tableHead.length > 0 &&
				<View style={styles.tableContainer}>
					<View style={styles.tableHead}>
						<Text style={{flexGrow: 1}}>#</Text>
						<Text>{tableHead}</Text>
					</View>

					{questions.map( (question, i) => {
						return(
							<View key={i} style={[styles.tableHead, {backgroundColor: i%2 === 0 ? '#f1f1f1' : '#ffffff', alignItems: 'center',}]}>
								<Text style={{paddingRight: 5}}>{i+1}.</Text>
								<Text style={{flexGrow: 1, fontSize: 13}}>{question}</Text>
								<Text style={[styles.hwiValue, {backgroundColor: getHviColor(tableData[i])}]}>{tableData[i]}</Text>
							</View>
						);
					})}

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