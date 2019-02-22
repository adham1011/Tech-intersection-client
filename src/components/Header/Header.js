import React, { Component } from 'react';
import Bubble from './bubbles.png';
import './header.css';

class Header extends Component {
	render() {
		return (
			<section className="mb-3">
				<div className="cover">
					<p className="display-4 text-center text-white text-uppercase">
						Better Fit Technologies For Your
						<strong> PROJECT</strong>
					</p>
				</div>
			</section>
		);
	}
}

export default Header;
