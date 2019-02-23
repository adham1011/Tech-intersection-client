import React, { Component } from 'react';
import './Fgraph.css';
import BubbleCharts from './BubbleChart';

export default class Fgrpaph extends Component {
	render() {
		return (
			<section className="graph-main">
				<div className="container">
					<div className="row">
						<h6 className="text-uppercase font-weight-bold">&Delta; By the years</h6>
						<BubbleCharts />
					</div>
				</div>
			</section>
		);
	}
}
