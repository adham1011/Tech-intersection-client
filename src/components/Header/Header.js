import React, { Component } from 'react';
import './header.css';
import Bubble from './newback.png';

import Topfour from './Topfour';

class Header extends Component {
	render() {
		return (
			<header className="mb-5">
				<div className="main ">
					<div className="cover">
						<p className="text-center text-white text-uppercase">
							<strong>Discover</strong> What<br /> Technologies Fit Your<br />
							<strong>PROJECT</strong>
						</p>
					</div>
				</div>
				<section className="cards-section">
					<Topfour />
				</section>
			</header>
		);
	}
}

export default Header;
