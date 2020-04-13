"use strict";

var container;
var ui, hud, game;


function MissionHandler() {
	var o = new Object();
	o.selectedMission = undefined;
	o.missions = {
		mi1: new AgentMission({ 	
			mShort: 'Agent: locate secret hideout.',
			mCategory: 'Agent Mission',
			mTitle: 'Locate Secret Hideout',
			mDesc: 'Ninja Alliance intelligence reports that there is a secret terrorist hideout near your location. Our agents discovered this photo of the hideout. Locate the hideout and report its whereabouts.',
			mPhoto: 'resources/img/grant-park.png',
			mCoord: { lat: 37.345749, lon: -122.070328 },
			mDuration: '15 min',
			mExp: '2,000 xp',
			mAction: 'Report'
			}),
		mi2: new Mission({ 	
			mShort: 'Scholar: sharpen your mind.',
			mCategory: 'Scholar Mission',
			mTitle: 'Sharpen Your Mind',
			mDesc: 'Sharp mind is the hallmark of a master ninja.  Study math on Khan Academy to sharpen your mind.',
			mPhoto: 'resources/img/ninja-study.png',					
			mDuration: '45 min',
			mExp: '6,000 xp',
			mAction: 'Finish'
			}),
		mi3: new Mission({ 	
			mShort: 'Operative: dispose of contaminants.',
			mCategory: 'Operative Mission',
			mTitle: 'Dispose of Contaminants',
			mDesc: 'Clan hideout is filling up with contaminants.  Collect trash and dispose of it in the bins outside.',
			mPhoto: 'resources/img/trash-cat.png',
			mDuration: '10 min',
			mExp: '1,500 xp',
			mAction: 'Finish'
			}),
		mi4: new Mission({ 	
			mShort: 'Survivor: tame silver wolf.',
			mCategory: 'Survivor Mission',
			mTitle: 'Tame Silver Wolf',
			mDesc: "Learning to survive in the wilderness is important for any ninja.  For today's lesson, tame a silver wolf in Ark: Survival Evolved.  Submit screenshot as proof.",
			mPhoto: 'resources/img/silver-wolf.jpg',
			mDuration: '15 min',
			mExp: '1,000 xp',
			mAction: 'Submit'
		}),
		mi5: new Mission({ 	
			mShort: 'Warrior: practice martial arts.',
			mCategory: 'Warrior Mission',
			mTitle: 'Practice Martial Arts',
			mDesc: 'A ninja is a warrior.  And a warrior must hone combat skills.  Follow the <a target="_blank" href=https://www.youtube.com/watch?v=gv1_HgYIitk>sensei</a> to practice kick techniques.',
			mPhoto: 'resources/img/martial-panda.png',
			mDuration: '10 min',
			mExp: '1,000 xp',
			mAction: 'Finish'
		})
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
			o.missions[mid].updateScroll();
		}
//		console.log(document.getElementById(mid).style.backgroundColor);
	};
	o.handleMissionAction = function() {
		if (!o.selectedMission) return;
		if (!o.missions[o.selectedMission]) return;
		o.missions[o.selectedMission].handleAction();
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
	mh.log("version 6");
};

function init() {
	reportVersion();
	missionClick('mi1');
};



//function init() {
//	setupGui();	 //in HUD.js
//	setupGame(); //in GameLogic.js
//}
//
//init();
