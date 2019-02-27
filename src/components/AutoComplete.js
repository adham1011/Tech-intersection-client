import React, { Component } from 'react';

class AutoComplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
			text: ''
		};
	}

	onTextChange = (e) => {
		const { items } = this.props;
		const value = e.target.value;
		let suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = items.sort().filter((v) => regex.test(v));
			// console.log(suggestions);
		}
		this.setState(() => ({ suggestions, text: value }));
	};

	suggestionSelected(value) {
		// e.preventDefault;
		this.setState(() => ({
			text: value,
			suggestions: []
		}));
		this.props.selected(value);
	}

	renderSuggestions() {
		const { suggestions } = this.state;
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul className="list-group">
				{suggestions.map((item) => (
					<li
						key={item}
						className="list-group-item list-group-item-action"
						onClick={() => this.suggestionSelected(item)}
					>
						{item}
					</li>
				))}
			</ul>
		);
	}
	render() {
		const { text } = this.state;
		return (
			<div>
				<input
					className="form-control w-100"
					type="text"
					onChange={this.onTextChange}
					placeholder={this.props.placeHolder}
					value={text}
				/>
				{this.renderSuggestions()}
			</div>
		);
	}
}

export default AutoComplete;
