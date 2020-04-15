"use strict";

function MissionHandler() {
	var o = new BaseObject();
	o.selectedMission = undefined;
//	let msg = 'Ninja Alliance intelligence reports that there is a secret terrorist hideout near your location. Our agents discovered this photo of the hideout. Locate the hideout and report its whereabouts.';
	o.missions = {
		mi6: new AgentMission({ 
			mid: 6,
			mShort: 'Agent: locate secret hideout.',
			mCategory: 'Agent Mission',
			mTitle: 'Locate Secret Hideout',
			mDesc: 'Ninja Alliance intelligence reports that there is a secret terrorist hideout near your location. Our agents discovered this photo of the hideout. Locate the hideout and report its whereabouts.',
//			mDesc: msg + msg + msg + msg,
			mPhoto: 'resources/img/grant-park.png',
			mCoord: { lat: 37.345749, lon: -122.070328 },
			thresh: 100,
			msg: 'Click "Report" if you think you have found the hideout.',
			successMsg: "Great work.  You have located the secret hideout!",
			mDuration: '15 min',
			mExp: '2,000 xp',
			mAction: 'Report'
			}),
		mi1: new AgentMission({ 
			mid: 1,
			mShort: 'Agent: find secret meeting point.',
			mCategory: 'Agent Mission',
			mTitle: 'Find Secret Meeting Point',
			mDesc: 'Ninja Alliance has been tipped off about a new secret terrorist meeting point near your location. Our intelligence came across this photo of the location. Locate the meeting point and report its whereabouts.',
			mPhoto: 'resources/img/farmLoc.jpg',
			mCoord: { lat: 37.332592, lon: -122.099542 },
			thresh: 100,
			msg: 'Click "Report" if you think you have found the meeting place.',
			successMsg: "Great work.  You found the secret meeting place!",
			mDuration: '60 min',
			mExp: '5,000 xp',
			mAction: 'Report'
			}),
		mi2: new Mission({ 	
			mid: 2,
			mShort: 'Scholar: sharpen your mind.',
			mCategory: 'Scholar Mission',
			mTitle: 'Sharpen Your Mind',
			mDesc: 'Sharp mind is the hallmark of a master ninja.  Study math on Khan Academy to sharpen your mind.',
			mPhoto: 'resources/img/ninja-study2.png',					
			mDuration: '45 min',
			mExp: '6,000 xp',
			mAction: 'Finish'
			}),
		mi3: new Mission({ 	
			mid: 3,
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
			mid: 4,
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
			mid: 5,
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
	mh = new MissionHandler();
	hud = new Hud();
	reportVersion();
	missionClick('mi1');
	hud.show();
//	document.getElementById('alias').style.color='#00FF00';
//	hud.resize();
};
