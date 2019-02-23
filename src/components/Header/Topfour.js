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
			year: '2018'
		};
		this.printYear = this.printYear.bind(this);
		this.handleRight = this.handleRight.bind(this);
		this.handleLeft = this.handleLeft.bind(this);
	}
	componentWillMount() {
		this.props.getLanguages();
	}

	handleLeft(event) {
		if (this.state.year < 2018) {
			this.setState({ year: ++this.state.year });
		}
	}

	handleRight(event) {
		if (this.state.year > 2013) {
			this.setState({ year: --this.state.year });
		}
	}
	printYear(elements) {
		const percentage = 66;
		const items = []
			.concat(elements)
			.sort((a, b) => b.years[this.state.year] - a.years[this.state.year])
			.slice(0, 4)
			.map((item, index) => (
				<div key={[ index + item.count ].join()} className="col-12 col-md-6 col-lg-3 mb-3">
					<div className="card shadow border-0">
						<div className="card-top">
							<h4 className="text-white text-center text-uppercase font-weight-bold">{item.source}</h4>
						</div>
						<div className="card-body">
							<div className="progress-bar">
								<CircularProgressbar percentage={percentage} text={`${percentage}%`} />
							</div>
							<h5 className="card-title">{item.source}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{item.years[this.state.year]}</h6>
							<p className="card-text">testing</p>
							<a href="#" className="card-link">
								{item.source}
							</a>
						</div>
					</div>
				</div>
			));
		return items;
	}

	render() {
		const { languages, loading } = this.props.languages;

		return (
			<div className="Top-4">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="row">
								<div className="col-8">
									<h6 className="text-secondry text-uppercase font-weight-bold mb-0 mt-2">
										Top of {this.state.year}
									</h6>
								</div>
								<div className="col-4 mb-2">
									{this.state.year > 2013 ? (
										<button
											className="btn btn-dark next float-right ml-2"
											onClick={this.handleRight}
										>
											&#62;
										</button>
									) : (
										''
									)}
									{this.state.year < 2018 ? (
										<button className="btn btn-dark left float-right" onClick={this.handleLeft}>
											&#60;
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</div>
						{this.printYear(this.props.languages)}
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
