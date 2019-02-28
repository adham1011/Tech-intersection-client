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
			text: '',
			isEmpty: true,
			year: '2018',
			selcted: [],
			results: false
		};
		this.selected = this.selected.bind(this);
		this.rendertags = this.rendertags.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.selectTag = this.selectTag.bind(this);
		this.renderPercentage = this.renderPercentage.bind(this);
	}
	selectTag(e) {
		let arr = this.state.selcted;
		let item = e.target.value;
		var newarr = arr.includes(item) ? arr.filter((i) => i != item) : [ ...arr, item ];

		if (newarr.length <= 2) {
			this.setState({
				selcted: newarr
			});
		}
	}

	selected(value) {
		this.props.getTagsByLanguage(value);
		this.setState({ text: value, isEmpty: false });
	}
	rendertags(obj) {
		const data = obj.tags
			.map((tag) => {
				return (
					<li key={tag.tag + tag.hits} className="">
						<input
							className="mx-2"
							type="checkbox"
							checked={this.state.selcted.includes(tag.tag) ? true : false}
							value={tag.tag}
							onChange={(e) => this.selectTag(e)}
						/>
						{tag.tag}
						<span className=" mx-4 badge badge-secondary badge-pill">{tag.hits}</span>
					</li>
				);
			})
			.slice(0, 15);
		return data;
	}

	renderPercentage() {
		return (
			<div className="col-12 col-md-4 mx-auto text-center">
				<span className="dots">
					<span />
				</span>
			</div>
		);
	}
	clearLanguage() {
		this.setState({ isEmpty: true, selected: [], year: '2018' });
	}
	changeYear(e) {
		this.setState({ year: e.target.value, selcted: [] });
	}
	render() {
		const { text } = this.state;
		// var data = [].concat(this.props.language['year'])[0];

		// console.log('bla');
		// var array = data;
		/*message for mahmoud*/

		//#you can see what happening here !!! the thing is weird
		//# you can add tags.sort((a, b) => b.hits - a.hits).slice(0,21) after the search query in service,
		//much better than to handle this in the client, try to print (data) and you can see that u can't track it
		var tags = this.props.language;
		var content;
		if (tags === null || Object.keys(tags).length === 0) {
			content = null;
		} else {
			content = tags.year.map((obj) => {
				if (obj['year'] == this.state.year) {
					return (
						<div key={parseInt(obj.source)} className="col-12">
							<div className="col-12 text-center my-3">
								<h4>
									<strong>{this.state.text}</strong>
									<button
										type="button"
										className="x-button border-0 bg-white ml-3 "
										onClick={this.clearLanguage.bind(this)}
									>
										<span>&times;</span>
									</button>
								</h4>
								<div className=" col-12 text-center border-top font-weight-bold">
									<ul className="years my-3">
										<li className="d-inline mr-2">
											<button
												className={this.state.year == '2018' ? 'btn active' : 'btn'}
												value={'2018'}
												onClick={(e) => this.changeYear(e)}
											>
												2018
											</button>
										</li>
										<li className="d-inline mx-2">
											<button
												className={this.state.year == '2017' ? 'btn active' : 'btn'}
												value={'2017'}
												onClick={(e) => this.changeYear(e)}
											>
												2017
											</button>
										</li>
										<li className="d-inline mx-2">
											<button
												className={this.state.year == '2016' ? 'btn active' : 'btn'}
												value={'2016'}
												onClick={(e) => this.changeYear(e)}
											>
												2016
											</button>
										</li>
										<li className="d-inline mx-2">
											<button
												className={this.state.year == '2015' ? 'btn active' : 'btn'}
												value={'2015'}
												onClick={(e) => this.changeYear(e)}
											>
												2015
											</button>
										</li>
										<li className="d-inline mx-2">
											<button
												className={this.state.year == '2014' ? 'btn active' : 'btn'}
												value={'2014'}
												onClick={(e) => this.changeYear(e)}
											>
												2014
											</button>
										</li>
										<li className="d-inline mx-2">
											<button
												className={this.state.year == '2013' ? 'btn active' : 'btn'}
												value={'2013'}
												onClick={(e) => this.changeYear(e)}
											>
												2013
											</button>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-12 tags mt-4">
								<ul className="">{this.rendertags(obj)}</ul>
							</div>
							<div className="col-12 text-center mb-4 mt-5">
								<button
									name="compare"
									className={this.state.selcted.length == 2 ? 'btn btn-secondary d-inline' : 'd-none'}
								>
									Compare
								</button>
							</div>
						</div>
					);
				}
			});
		}
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
						<div className="col-4">
							<AutoComplete
								items={this.props.languages.map((lang) => lang.source)}
								selected={this.selected}
								placeHolder={'Write a language'}
							/>
						</div>
						<div className="col-12">
							<div className="col-12 bg-white shadow mt-3">
								<div className="row">
									{!this.state.isEmpty ? content : this.state.results ? this.renderPercentage() : ''}
								</div>
							</div>
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
