import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AutoComplete from '../AutoComplete';

class SecondMain extends Component {
	render() {
		return (
			<section className="graph-main my-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h6 className="text-secondry text-uppercase font-weight-bold">
								Programming Languages intersections
							</h6>
						</div>
						<div className="col-4 mx-auto">
							<AutoComplete items={this.props.languages.map((lang) => lang.source)} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}
SecondMain.propTypes = {
	languages: PropTypes.array.isRequired
	// values: PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	languages: state.languages.languages
});
export default connect(mapStatetoProps, {})(SecondMain);
