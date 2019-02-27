import React, { Component } from 'react';
import './Filter.css';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { ECANCELED } from 'constants';
import './Fgraph.css';
import BubbleCharts from './BubbleChart';
import LineChart from './LineChart';
import AutoComplete from '../AutoComplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTagsByLanguage } from '../../actions/languageActions';

const sliderStyle = {
	// Give the slider some width
	position: 'relative',
	width: '90%',
	height: 80,
	marginLeft: '5%',
	marginRight: '5%'
	//border: '1px solid steelblue',
};

const railStyle = {
	position: 'absolute',
	width: '100%',
	height: 10,
	// marginLeft: '5%',

	marginTop: 35,
	borderRadius: 5,
	backgroundColor: '#8B9CB6'
};
function Tick({ tick, count }) {
	// tick component
	return (
		<div>
			<div
				style={{
					position: 'absolute',
					marginTop: 52,
					marginLeft: -0.5,
					width: 1,
					height: 8,
					backgroundColor: 'silver',
					left: `${tick.percent}%`
				}}
			/>
			<div
				style={{
					position: 'absolute',
					marginTop: 60,
					fontSize: 10,
					textAlign: 'center',
					marginLeft: `${-(100 / count) / 2}%`,
					width: `${100 / count}%`,
					left: `${tick.percent}%`
				}}
			>
				{tick.value}
			</div>
		</div>
	);
}

function Track({ source, target, getTrackProps }) {
	//  track component
	return (
		<div
			style={{
				position: 'absolute',
				height: 10,
				zIndex: 1,
				marginTop: 35,
				backgroundColor: '#546C91',
				borderRadius: 5,
				cursor: 'pointer',
				left: `${source.percent}%`,
				width: `${target.percent - source.percent}%`
			}}
			{...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
		/>
	);
}

export function Handle({
	// handle component
	handle: { id, value, percent },
	getHandleProps
}) {
	return (
		<div
			style={{
				left: `${percent}%`,
				position: 'absolute',
				marginLeft: -15,
				marginTop: 25,
				zIndex: 2,
				width: 30,
				height: 30,
				border: 0,
				textAlign: 'center',
				cursor: 'pointer',
				borderRadius: '50%',
				backgroundColor: '#2C4870',
				color: '#333'
			}}
			{...getHandleProps(id)}
		>
			<div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -20 }}>{value}</div>
		</div>
	);
}

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [ 2013, 2018 ],
			text: ''
		};
		this.selected = this.selected.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onChange = (values) => {
		this.setState({ values });
	};
	selected(value) {
		this.setState({ text: value });
		this.props.getTagsByLanguage(value);
	}

	render() {
		const { text } = this.state;

		return (
			<section className="graph-main my-4">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h6 className="text-secondry text-uppercase font-weight-bold">&Delta; By the years</h6>
						</div>
					</div>
					<div className="row sticky-top">
						<div className="col-12 mb-3">
							<div className="bg-white shadow">
								<Slider
									rootStyle={sliderStyle} // inline styles for the outer div. Can also use className prop.
									domain={[ 2013, 2018 ]}
									step={1}
									mode={2}
									values={[ 2013, 2018 ]}
									onUpdate={this.onChange}
								>
									<Rail>
										{(
											{ getRailProps } // adding the rail props sets up events on the rail
										) => <div style={railStyle} {...getRailProps()} />}
									</Rail>
									<Handles>
										{({ handles, getHandleProps }) => (
											<div className="slider-handles">
												{handles.map((handle) => (
													<Handle
														key={handle.id}
														handle={handle}
														getHandleProps={getHandleProps}
													/>
												))}
											</div>
										)}
									</Handles>
									<Tracks right={false} left={false}>
										{({ tracks, getTrackProps }) => (
											<div className="slider-tracks">
												{tracks.map(({ id, source, target }) => (
													<Track
														key={id}
														source={source}
														target={target}
														getTrackProps={getTrackProps}
													/>
												))}
											</div>
										)}
									</Tracks>
									<Ticks count={6}>
										{({ ticks }) => (
											<div className="slider-ticks">
												{ticks.map((tick) => (
													<Tick key={tick.id} tick={tick} count={ticks.length} />
												))}
											</div>
										)}
									</Ticks>
								</Slider>
							</div>
						</div>
					</div>
					<div className="row">
						<BubbleCharts values={this.state.values} />
						<LineChart values={this.state.values} />
					</div>
				</div>
			</section>
		);
	}
}

// Filter.propTypes = {
// 	getTagsByLanguage: PropTypes.func.isRequired,
// 	languages: PropTypes.array.isRequired,
// 	language: PropTypes.object
// };
// const mapStatetoProps = (state) => ({
// 	languages: state.languages.languages,
// 	language: state.languages.language
// });
// export default connect(mapStatetoProps, { getTagsByLanguage })(Filter);
export default Filter;
