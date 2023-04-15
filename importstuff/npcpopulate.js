// const fs = require("fs");
// const csv = require("csv-parser");

import fs from "fs";
import csv from "csv-parser";
// import api from "../lib/api.js"

// import con from "../database/connection.js";

const bonuslist = [
	"hitpoints",
	"att",
	"str",
	"def",
	"mage",
	"range",
	"attbns",
	"strbns",
	"amagic",
	"mbns",
	"arange",
	"rngbns",
	"dstab",
	"dslash",
	"dcrush",
	"dmagic",
	"drange"
];

const npcList = [];

fs.createReadStream("./importstuff/wiki_monster_data.csv")
	.pipe(csv())
	.on("data", async (row) => {
		// Check if row is populated
		if (!("name" in row)) {
			return;
		}

		const example = {
			name: "Sotetseg",
			image: "Sotetseg.png",
			version: "",
			versionNumber: 0,
			combat: 995,
			stats: { amagic: 0, arange: 0, att: 250, attbns: 0, dcrush: 70, def: 200, dmagic: 30, drange: 150, dslash: 70, dstab: 70, hitpoints: 4000, mage: 250, mbns: 0, range: 0, rngbns: 0, str: 250, strbns: 48 },
			attributes: []
		};

		// parse image name
		let filename = row.image;
		filename = filename.replace("[[File:", "");
		filename = filename.replace("]]", "");
		filename = filename.split("|")[0];

		const monster = {
			name: row.name,
			image: filename,
			version: row.version,
			version_number: parseInt(row.version_number) || null,
			combat: parseInt(row.combat) || 0,
			attributes: [],
			stats: {}
		};

		const attribSet = new Set();
		const attribList = row.attributes.split(",").map((f) => f.trim());


		if (attribList[0] !== "") {
			for (let attrib of attribList) {
				if (attrib.includes("vampyre")) {
					attrib = "vampyre";
				}
				attribSet.add(attrib);
			}
		}

		for (const bonus of bonuslist) {
			// con("monster_stat")
			// .insert({
			// 	monsterId: id,
			// 	category: bonus,
			// 	value: parseInt(row[bonus]) || 0,
			// })
			// .then((a) => {
			// 	console.log(a, "did it work");
			// });
			monster.stats[bonus] = parseInt(row[bonus] || 0);
		}

		monster.attributes = Array.from(attribSet);
		// console.log(monster)

		npcList.push(monster);
		// try {
		// 	await con("monster").del().where("idmonster", "!=", 0);
		// 	await con("monster_stat").del().where("monsterId", "!=", 0);
		// 	await con("monster_attributes").del().where("monsterId", "!=", 0);
		// 	await con("monster").insert({
		// 		name: row.name,
		// 		version: row.version,
		// 		imageName: filename,
		// 		combat: parseInt(row.combat) || 0,
		// 		version_number: parseInt(row.version_number) || null,
		// 	});

		// 	con("monster")
		// 		.select("idmonster")
		// 		.where({
		// 			name: row.name,
		// 			version: row.version,
		// 			combat: parseInt(row.combat) || 0,
		// 		})
		// 		.then((rows) => {
		// 			if (rows.length < 1) {
		// 				return;
		// 			}
		// 			const id = rows[0].idmonster;
		// 			// console.log(rows);
		// 			bonuslist.forEach((bonus) => {
		// 				con("monster_stat")
		// 					.insert({
		// 						monsterId: id,
		// 						category: bonus,
		// 						value: parseInt(row[bonus]) || 0,
		// 					})
		// 					.then((a) => {
		// 						console.log(a, "did it work");
		// 					});
		// 			});

		// 			var attribList = row.attributes.split(",").map((f) => {
		// 				return f.trim();
		// 			});

		// 			if (attribList[0] !== "") {
		// 				attribList.forEach((attrib) => {
		// 					if (attrib.includes("vampyre")) {
		// 						attrib = "vampyre";
		// 					}

		// 					con("monster_attributes")
		// 						.insert({
		// 							monsterId: id,
		// 							attribute: attrib,
		// 						})
		// 				});
		// 			}
		// 		});

		// 	console.log("successful", row.name);
		// } catch (e) {
		// 	console.log(e);
		// }
	})
	.on("end", async () => {
		// for(let i = 0; i < npcList.length; i++){
		// 	let npc = npcList[i]
		// 	await api.addNpc(npc).then(() => console.log(npc.name))
		// }
		fs.writeFileSync("./public/assets/npcs.json", JSON.stringify(npcList));
		console.log("all npcs complete");
		process.exit();
	});
