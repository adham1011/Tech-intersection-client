import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

const styles = {
	fontFamily: 'sans-serif',
	textAlign: 'center'
};

class LangModal extends Component {
	// state = {
	// 	open: props.open
	// };
	onOpenModal = () => {
		this.setState({ open: true });
		console.log('okay');
		// `my state = ${this.state.open}`
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};
	render() {
		console.log(this.props.open);
		const { open } = this.props.open;
		console.log(open);
		return (
			<div style={styles}>
				<h4>jknsdf</h4>
				<Modal open={this.props.open} onClose={this.onCloseModal} center>
					<h2>Simple centered modal</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
						hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
					</p>
				</Modal>
			</div>
		);
	}
}
export default LangModal;
