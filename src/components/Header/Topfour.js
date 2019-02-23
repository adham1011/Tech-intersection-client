import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLanguages } from '../../actions/languageActions';
import CircularProgressbar from 'react-circular-progressbar';

class Topfour extends Component {
	constructor(props) {
		super(props);
		// Don't call this.setState() here!
		this.state = {
			'2018': 0,
			'2017': 0,
			'2016': 0,
			'2015': 0,
			'2014': 0,
			'2013': 0
		};
		this.percentage = this.percentage.bind(this);
		this.sumOfYear = this.sumOfYear.bind(this);
	}
	componentWillMount() {
		this.props.getLanguages();
	}

	sumOfYear(year) {
		let newSum = 0;
		this.props.languages.map((element) => {
			newSum = this.state.Sum + element.years['2018'];
			this.setState({ Sum: newSum });
		});
	}
	percentage(value) {
		return parseInt(value / this.state.Sum * 100);
	}

	render() {
		const { languages, loading } = this.props.languages;
		const reducer = (accumulator, currentValue) => accumulator + currentValue;

		const items = []
			.concat(this.props.languages)
			.sort((a, b) => b.years['2013'] - a.years['2013'])
			.slice(0, 4)
			.map((item, index) => (
				<div key={[ index + item.count ].join()} className="col-12 col-md-6 col-lg-3 mb-3">
					<div className="card shadow border-0">
						<div className="card-top">
							<h4 className="text-white text-center text-uppercase font-weight-bold">{item.source}</h4>
						</div>
						<div className="card-body">
							<h5 className="card-title">{item.source}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{item.years['2017']}</h6>
							<p className="card-text">testing</p>
							<a href="#" className="card-link">
								{this.state.Sum}
							</a>
						</div>
					</div>
				</div>
			));

		return (
			<div className="Top-4">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h6 className="text-white text-uppercase font-weight-bold">Top of 2018</h6>
						</div>
						{items}
					</div>
				</div>
			</div>
		);
	}
}
Topfour.propTypes = {
	getLanguages: PropTypes.func.isRequired,
	languages: PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages
});
export default connect(mapStatetoProps, { getLanguages })(Topfour);
