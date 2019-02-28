import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './BubbleChart.css';

import { Chart } from 'react-google-charts';

class LineChart extends Component {
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

	render() {
		var array = [ [ 'year' ] ];
		let n = this.props.values[1] - this.props.values[0] + 1;
		for (let i = 0; i < n; i++) {
			array.push([ String(parseInt(this.props.values[0]) + i) ]);
		}
		const edit = this.props.languages.map((language) => {
			if (language.count > 30000) {
				array[0].push(language.source);
				let temp = this.props.values[0];
				for (var i = 1; i < n + 1; i++) {
					array[i].push(language.years[temp++]);
				}
			}
		});

		return (
			<div className="col-12 mt-5">
				<Chart
					className="shadow"
					width={'100%'}
					height={'700px'}
					chartType="LineChart"
					loader={<div className="Loading" />}
					data={array}
					options={{
						title: 'Language popularity',
						hAxis: {
							title: 'Year'
						},
						vAxis: {
							title: 'Total questions'
						},
						animation: {
							startup: true,
							easing: 'linear',
							duration: 1500
						},
						series: {}
					}}
					rootProps={{ 'data-testid': '2' }}
				/>
			</div>
		);
	}
}

LineChart.propTypes = {
	languages: PropTypes.array.isRequired,
	values: PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages
});
export default connect(mapStatetoProps, {})(LineChart);
