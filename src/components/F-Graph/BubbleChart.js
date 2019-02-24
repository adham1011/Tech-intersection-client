import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLanguages } from '../../actions/languageActions';

import { Chart } from 'react-google-charts';

class BubbleChart extends Component {
	render() {
		// const array = [ [ 'Year' ], [ '2013' ], [ '2014' ], [ '2015' ], [ '2016' ], [ '2017' ], [ '2018' ] ];

		//  var contnt = this.props.languages.map((language) => {
		//  	if (language.count > 30000) {
		//  		array[0].push(language.source);
		//  		array[1].push(language.years['2013']);
		//  		array[2].push(language.years['2014']);
		//  		array[3].push(language.years['2015']);
		//  		array[4].push(language.years['2016']);
		//  		array[5].push(language.years['2017']);
		//  		array[6].push(language.years['2018']);
		//  	}
		//  });

		const array=[['Language', 'X', 'Y', 'Questions'],['Nidal',5,3,30]];
		var contnt = this.props.languages.map((language)=>{
    	if (language.count > 30000) {
		array.push([ language.source , language.years[2018]-language.years[2013], language.count, language.count ] )
		}});
		
		console.log(array);
		return (
			<div className="col-12 ">
				<Chart
					className="shadow"
					width={'100%'}
					height={'700px'}
					chartType="BubbleChart"
					loader={<div>Loading Chart</div>}
					 data={ array }
					// 	[ 'Source', '#2013', '#2014', '#2015', '#2016' ],
					// 	[ 'CAN', 80.66, 1.67, 'North America', 33739900 ],
					// 	[ 'DEU', 79.84, 1.36, 'Europe', 81902307 ],
					// 	[ 'DNK', 78.6, 1.84, 'Europe', 5523095 ],
					// 	[ 'EGY', 72.73, 2.78, 'Middle East', 79716203 ],
					// 	[ 'GBR', 80.05, 2, 'Europe', 61801570 ],
					// 	[ 'IRN', 72.49, 1.7, 'Middle East', 73137148 ],
					// 	[ 'IRQ', 68.09, 4.77, 'Middle East', 31090763 ],
					// 	[ 'ISR', 81.55, 2.96, 'Middle East', 7485600 ],
					// 	[ 'RUS', 68.6, 1.54, 'Europe', 141850000 ],
					// 	[ 'USA', 78.09, 2.05, 'North America', 307007000 ]
					// }
					options={{
						title:
							'Correlation between life expectancy, fertility rate ' +
							'and population of some world countries (2010)',
						hAxis: { title: 'Life Expectancy' },
						vAxis: { title: 'Fertility Rate' },
						bubble: { textStyle: { fontSize: 11 } }
					}}
					rootProps={{ 'data-testid': '1' }}
				/>
			</div>
		);
	}
}

BubbleChart.propTypes = {
	languages: PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages
});
export default connect(mapStatetoProps, {})(BubbleChart);
