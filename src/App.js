import React, { Component } from 'react';
// import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/Header';

import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="app">
					<Header />
				</div>
			</Provider>
		);
	}
}

export default App;
