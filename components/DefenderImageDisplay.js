import React, { Component } from "react";
import { MonsterSelect } from "./MonsterSelect.js";
import { DefenderVersionSelect } from "./DefenderVersionSelect.js";
import ImageFallback from "./ImageFallback.js";
import Image from "next/image";

export class DefenderImageDisplay extends Component {
	constructor (props) {
		super(props);
		this.state = {
			monList: [],
			monSelected: 0
		};

		this.setMonList = this.setMonList.bind(this);
	}

	setMonList (monList) {
		this.setState({
			monList: monList,
			monSelected: 0
		});

		let mon = monList[0];
		this.props.setMonster(mon);
	}

	render () {

		return (<div className="highlight-section flex-container-vertical">
				<h3 className="center">{this.props.monster.name}</h3>

				{this.state.monList.length > 1 ? (
					<DefenderVersionSelect monList={this.state.monList} monster={this.props.monster}
					                       setMonster={this.props.setMonster}/>) : ""}

				<div className="center">
					<ImageFallback className="monster-image"
					               src={"https://oldschool.runescape.wiki/w/Special:Redirect/file?wpvalue=" + this.props.monster.image}
					               fallback="https://oldschool.runescape.wiki/images/Man_%28blue%29.png"/>
				</div>
				<MonsterSelect setMonList={this.setMonList}/>
			</div>);
	}
}
