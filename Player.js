"use strict";

function Player(params) {
	var o = new BaseObject(params);
	
	o.uiFields = ['alias', 'clan', 'gold', 'playerPortrait', 'emblem'];
	o.params = { state: 'inProgress' };
	o.fieldFormat = {
			playerPortrait:	"`<img style='width=100%' src='${o.params[eid]}'>`",
			emplem: "`<img style='width:100%' src='${o.params[eid]}'>`"
	};
	return o;
}