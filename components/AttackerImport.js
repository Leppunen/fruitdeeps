import React, { Component } from "react";
import PropTypes from "prop-types";

import Player from "../lib/Player.js";

export class AttackerImport extends Component {
	static propTypes = {
		player: PropTypes.instanceOf(Player),
		setPlayer: PropTypes.func
	};

	constructor (props) {
		super(props);

		this.importRef = React.createRef();
		this.doImport = this.doImport.bind(this);
		this.copyToClipboard = this.copyToClipboard.bind(this);

		this.state = { copied: false };
	}

	doImport () {
		this.props.setPlayer(JSON.parse(this.importRef.current.value));
		this.setState({ copied: true });
	}

	copyToClipboard (/* evt */) {
		navigator.clipboard.writeText(JSON.stringify(this.props.player.minimize()));
	}

	render () {
		let copy = "Copy";
		if (this.state.copied) {
			copy = "Copied!";
		}

		return (
			<div className="highlight-section flex-container-vertical">
				<div>
					<h3>Export</h3>
					<textarea
						className="input-invisible disabled"
						style={{ resize: "vertical",minHeight: "3em" }}
						value={JSON.stringify(this.props.player.minimize())}
						disabled
						placeholder="{}"
					>
					</textarea>
					<button onClick={this.copyToClipboard}>{copy}</button>
				</div>
				<div>
					<h3>Import</h3>
					<textarea
						className="input-invisible"
						style={{ resize: "vertical", minHeight: "3em" }}
						placeholder="{}"
						ref={this.importRef}
					>
					</textarea>
					<button onClick={this.doImport}> Import</button>
				</div>
			</div>
		);
	}
}
