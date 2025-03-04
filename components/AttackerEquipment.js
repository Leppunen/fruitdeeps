import React, { Component } from "react";
import PropTypes from "prop-types";
// import Image from "next/image";

import { EquipmentSelect } from "./EquipmentSelect.js";
import ImageFallback from "./ImageFallback.js";
import Player from "../lib/Player.js";

class LoadoutCell extends Component {
	static propTypes = {
		player: PropTypes.instanceOf(Player),
		setPlayer: PropTypes.func,
		slotname: PropTypes.string
	};

	unequipItem (slot) {
		const player = this.props.player;
		player.unequip(slot);
		this.props.setPlayer(player.minimize());
	}

	render () {
		let img = "";
		if (this.props.player.equipment[this.props.slotname].name) {
			img = (<ImageFallback
				className="item-icon"
				src={`./assets/item_images/${this.props.player.equipment[this.props.slotname].id}.png`}
				fallback="https://oldschool.runescape.wiki/images/Null.png"
			/>);
		}
		if (this.props.player.equipment[this.props.slotname].name !== "") {
			return (<div
				className="loadout-cell"
				onClick={() => {
					this.unequipItem(this.props.slotname);
				}}
				data-tooltip={`unequip ${this.props.player.equipment[this.props.slotname].name}`}
			>
				{img}
			</div>);
		}
		else {
			return <div className="loadout-cell"></div>;
		}
	}
}

export class AttackerEquipment extends Component {
	static propTypes = {
		player: PropTypes.instanceOf(Player),
		setPlayer: PropTypes.func
	};

	render () {
		const player = this.props.player;

		return (<div className="highlight-section flex-container-vertical">
			<div className="loadout-container">
				<div className="loadout-row">
					<LoadoutCell
						slotname="head"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
				</div>
				<div className="loadout-row">
					<LoadoutCell
						slotname="cape"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="neck"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="ammo"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
				</div>
				<div className="loadout-row">
					<LoadoutCell
						slotname="weapon"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="body"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="shield"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
				</div>
				<div className="loadout-row">
					<LoadoutCell
						slotname="legs"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
				</div>
				<div className="loadout-row">
					<LoadoutCell
						slotname="hands"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="feet"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
					<LoadoutCell
						slotname="ring"
						player={player}
						setPlayer={this.props.setPlayer}
					/>
				</div>
			</div>
			<EquipmentSelect
				player={player}
				setPlayer={this.props.setPlayer}
			/>
		</div>);
	}
}
