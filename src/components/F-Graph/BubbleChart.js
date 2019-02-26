import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getLanguages } from '../../actions/languageActions';
import { Chart } from 'react-google-charts';

class BubbleChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			graphData: [ [ 'Language', 'X', 'Y', 'Questions' ] ],
			flag: 0
		};

		this.onChange = this.onChange.bind(this);
	}
	onChange = (values) => {
		this.setState({ values });
	};

	componentDidMount() {}
	render() {
		//IMPORTNAT LINE since every time we call the render we dont
		//want to push on top of old data we clear and then push
		this.state.graphData = [ [ 'Language', 'X', 'Y', 'Questions' ] ];
		this.props.languages.map((language) => {
			if (language.count > 30000) {
				this.state.graphData.push([
					language.source,
					language.years[this.props.values[1]] - language.years[this.props.values[0]],
					language.count,
					language.count
				]);
				// console.log(this.state.graphData);
			}
		});

		return (
			<div className="col-12 ">
				<Chart
					className="shadow"
					width={'100%'}
					height={'700px'}
					chartType="BubbleChart"
					loader={<div>Loading Chart</div>}
					data={this.state.graphData}
					options={{
						title:
							'Correlation between life expectancy, fertility rate ' +
							'and population of some world countries (2010)',
						hAxis: { title: 'Life Expectancy' },
						vAxis: { title: 'Fertility Rate' },
						colorAxis: { colors: [ '#7FB1B4', '#7B7C98', '#766A8E', '#6D4679' ] },
						bubble: { textStyle: { fontSize: 11 } }
					}}
					rootProps={{ 'data-testid': '1' }}
				/>
			</div>
		);
	}
}

BubbleChart.propTypes = {
	languages: PropTypes.array.isRequired,
	values: PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages
});
export default connect(mapStatetoProps, {})(BubbleChart);
