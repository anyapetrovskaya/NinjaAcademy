"use strict";

var container;
var ui, hud, game;


function MissionHandler() {
	var o = new Object();
	o.selectedMission = undefined;
	o.missions = {
		mi1: { 	
			mDesc: 'Agent: locate secret hideout.',
			mCategory: 'Agent Mission',
			mTitle: 'Locate Secret Hideout',
			mDetail: 'Ninja Alliance intelligence reports that there is a secret terrorist hideout near your location. Our agents discovered this photo of the hideout. Locate the hideout and report its whereabouts.',
			mPhoto: 'resources/img/grant-park.png',
			mDuration: '15 min',
			mExp: '2,000 xp',
			mAction: 'Report'
			},
		mi2: { 	
			mDesc: 'Scholar: sharpen your mind.',
			mCategory: 'Scholar Mission',
			mTitle: 'Sharpen Your Mind',
			mDetail: 'Sharp mind is the hallmark of a master ninja.  Study math on Khan Academy to sharpen your mind.',
			mPhoto: 'resources/img/ninja-study.png',					
			mDuration: '45 min',
			mExp: '6,000 xp',
			mAction: 'Finish'
			},
		mi3: { 	
			mDesc: 'Operative: dispose of contaminants.',
			mCategory: 'Operative Mission',
			mTitle: 'Dispose of Contaminants',
			mDetail: 'Clan hideout is filling up with contaminants.  Collect trash and dispose of it in the bins outside.',
			mPhoto: 'resources/img/trash-cat.png',
			mDuration: '10 min',
			mExp: '1,500 xp',
			mAction: 'Finish'
			},
		mi4: { 	
			mDesc: 'Survivor: tame silver wolf.',
			mCategory: 'Survivor Mission',
			mTitle: 'Tame Silver Wolf',
			mDetail: "Learning to survive in the wilderness is important for any ninja.  For today's lesson, tame a silver wolf in Ark: Survival Evolved.  Submit screenshot as proof.",
			mPhoto: 'resources/img/silver-wolf.jpg',
			mDuration: '15 min',
			mExp: '1,000 xp',
			mAction: 'Submit'
		},
		mi5: { 	
			mDesc: 'Warrior: practice martial arts.',
			mCategory: 'Warrior Mission',
			mTitle: 'Practice Martial Arts',
			mDetail: 'A ninja is a warrior.  And a warrior must hone combat skills.  Follow the <a target="_blank" href=https://www.youtube.com/watch?v=gv1_HgYIitk>sensei</a> to practice kick techniques.',
			mPhoto: 'resources/img/martial-panda.png',
			mDuration: '10 min',
			mExp: '1,000 xp',
			mAction: 'Finish'
		}
	};
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
			o.updateMissionDetail(mid);
		}
//		console.log(document.getElementById(mid).style.backgroundColor);
	};
	o.updateMissionDetail = function(mid) {
		let mp = o.missions[mid];
		if (!mp) return;
		let eids = ['mAction', 'mCategory', 'mTitle', 'mDetail', 'mPhoto', 'mDuration', 'mExp'];
		for (let eid of eids) o.updateElement(eid, mp);		
	};
	o.updateElement = function(eid, mp) {
		if (!mp[eid]) return;
		let pre = o.pre[eid] ? o.pre[eid] : '';
		let post = o.post[eid] ? o.post[eid] : '';
		document.getElementById(eid).innerHTML = pre + mp[eid] + post;
	};
	
	o.pre = {
			mPhoto: "<img style='vertical-align:top;height:125px;' src='"					
	};
	o.post = {
			mPhoto: "'>"					
	};
	o.handleGeo = function(pos) {
		console.log("position");
//		console.log(pos);
		let crd = pos.coords;
		o.log(`I know where you are .... ${crd.latitude}, ${crd.longitude} up to ${crd.accuracy} meters.`);
//		o.log("you are at lat: "+pos.coords/latitude+", long: "+pos.coords.longitude);
//		alert("you are at lat: "+pos.coords/latitude+", long: "+pos.coords.longitude);
	};
	o.handleGeoError = function(err) {
		let s = `geo error(${err.code}): ${err.message}`;
		console.log(s);
		o.log(s);
	};
	o.geoOpt = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
	};
	o.handleMissionAction = function() {
		if (!o.selectedMission) return;
		o.log("calling geo...");
		navigator.geolocation.getCurrentPosition(o.handleGeo, o.handleGeoError, o.geoOpt);
	};
	o.log = function(s) {
		document.getElementById('errorLog').innerHTML = s;
	};
	
	return o;
}
var mh = new MissionHandler();
function missionClick(mid) {
	mh.handleMissionClick(mid);
}
function actionClick() {
	mh.handleMissionAction();
}

function reportVersion() {
	mh.log("version 4");
};





//function init() {
//	setupGui();	 //in HUD.js
//	setupGame(); //in GameLogic.js
//}
//
//init();
