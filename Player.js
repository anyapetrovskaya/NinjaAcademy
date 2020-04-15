"use strict";

function Player(params) {
	var o = new BaseObject(params);
	
	o.uiFields = ['alias', 'clan', 'gold', 'playerPortrait', 'emblem'];
	o.params = { 
			uid: 1,
			email: 'petrovskaya.anya@gmail.com',
			alias: 'Angel',
			clan: 'Bloodfang',
			gold: 33877,
			playerPortrait: "resources/img/girl-ninja-flip.jpg",
			emblem: "resources/img/emblemTiger4.png",
			missions: {
				m1: {},
				m2: {},
				m3: {}
			}
	};
	o.fieldFormat = {
			playerPortrait:	"`<img style='width=100%' src='${o.params[eid]}'>`",
			emplem: "`<img style='width:100%' src='${o.params[eid]}'>`"
	};
	return o;
}