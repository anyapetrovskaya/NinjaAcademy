"use strict";

function MissionHandler() {
	var o = new BaseObject();
	o.selectedMission = undefined;
	o.missions = data.missions;
	for (let k of Object.keys(data.missions)) {
		let dk = data.missions[k];
		let generator = dk.generator ? dk.generator : 'Mission';
		o.missions[k] = eval(`new ${generator}(dk)`);
	}
	for (let k of Object.keys(o.missions)) o.missions[k].setElement(k, o.missions[k].params.mShort);
	o.handleMissionClick = function(mid) {
		if (o.missions[mid] == undefined) {
			alert("no such mid="+mid);
			return;
		}
		if (o.selectedMission == mid) {
			o.selectedMission = undefined;
			document.getElementById(mid).style.backgroundColor = '#000000';
		} else {
			if (o.selectedMission) document.getElementById(o.selectedMission).style.backgroundColor = '#000000';
			o.selectedMission = mid;
			document.getElementById(mid).style.backgroundColor = '#8f8f8f';
			o.missions[mid].updateUi();
		}
	};
	o.handleMissionAction = function() {
		if (!o.selectedMission) return;
		if (!o.missions[o.selectedMission]) return;
		o.missions[o.selectedMission].handleAction();
	};
	
	return o;
}
var hud = undefined;
var mh = undefined;
function missionClick(mid) { mh.handleMissionClick(mid); }
function actionClick() { mh.handleMissionAction(); }
function hudToggle(wid) { hud.toggleWin(wid); }
function reportVersion() { mh.log("version 6"); }

function init() {
	initData();
	mh = new MissionHandler();
	hud = new Hud();
	reportVersion();
	missionClick('mi1');
	hud.show();
//	document.getElementById('alias').style.color='#00FF00';
//	hud.resize();
};
