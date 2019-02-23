import React, { Component } from 'react';
import './Fgraph.css';
import BubbleCharts from './BubbleChart';

export default class Fgrpaph extends Component {
	render() {
		return (
			<section className="graph-main my-4">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h6 className="text-secondry text-uppercase font-weight-bold">&Delta; By the years</h6>
						</div>
						<BubbleCharts />
					</div>
				</div>
			</section>
		);
	}
}
