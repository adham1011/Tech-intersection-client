import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTagsByLanguage } from '../../actions/languageActions';
// import '../T-Grapgh/Intersection.css';
import './S-Graph.css';

import AutoComplete from '../AutoComplete';

class SecondMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.selected = this.selected.bind(this);
	}
	selected(value) {
		this.setState({ text: value });
		this.props.getTagsByLanguage(value);
	}
	renderPercentage() {
		return (
			<div className="col-12 col-md-4 mx-auto">
				<span className="dots">
					<span />
				</span>
			</div>
		);
	}
	render() {
		const { text } = this.state;
		var data = [].concat(this.props.language['year'])[0];
		console.log(data);
		// console.log('bla');
		// var array = data;
		/*message for mahmoud*/

		//#you can see what happening here !!! the thing is weird
		//# you can add tags.sort((a, b) => b.hits - a.hits).slice(0,21) after the search query in service,
		//much better than to handle this in the client, try to print (data) and you can see that u can't track it

		return (
			<section className="graph-main my-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h6 className="text-secondry text-uppercase font-weight-bold">
								Programming Languages intersections
							</h6>
							<p>
								The section is made to understand how the tags from same language interact with each
								other.
							</p>
						</div>
						<div className="col-4 mx-auto">
							<AutoComplete
								items={this.props.languages.map((lang) => lang.source)}
								selected={this.selected}
							/>
						</div>
						<div className="col-12 bg-white shadow p-4 mt-3">
							<div className="row" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}
SecondMain.propTypes = {
	getTagsByLanguage: PropTypes.func.isRequired,
	languages: PropTypes.array.isRequired,
	language: PropTypes.object
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages,
	language: state.languages.language
});
export default connect(mapStatetoProps, { getTagsByLanguage })(SecondMain);
