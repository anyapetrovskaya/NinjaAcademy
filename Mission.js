"use strict";

function Mission(params) {
	var o = new BaseObject(params);
	o.uiFields = ['mAction', 'mCategory', 'mTitle', 'mDesc', 'mPhoto', 'mDuration', 'mExp'];
	o.params.state = 'init';
	o.handleAction = function() { o.log("not implemented"); };	
	o.fieldFormat.mPhoto = "`<img style='vertical-align:top;height:100%;' src='${o.params[eid]}'>`";
	o.sup = {};
	o.sup.updateUi = o.updateUi;
	o.updateUi = function() {
		o.sup.updateUi();
		var dom = document.getElementById('mComplete');
		dom.style.visibility = o.params.state == 'complete' ? 'visible' : 'hidden';
	}
	o.completeMission = function() {
		o.params.state = 'complete';
		o.params.mAction = 'View';
		o.params.completedOn = (new Date(Date.now())).toLocaleString();
		o.params.completedTs = Date.now();
		o.updateUi();
	}
	o.showInfoWindow = function() {
		hud.addWindow('missionInfo', false);
		o.fillMissionInfo();
		hud.windows.missionInfo.show();
	}
	o.fillMissionInfo = function() {}
	return o;
}

function AgentMission(params) {
	var o = new Mission(params);
	o.fillMissionInfo = function() {
		let w = o.getElement('mInfo');
		if (o.params.state == 'complete') {
			w.innerHTML = `${o.params.msg} <br><br> Completed: <font face=arial size='3'>${o.params.completedOn}</font>`;
		} else {
			w.innerHTML = `${o.params.msg} `;
		}
	}
	o.handleAction = function() {
		o.handleReport();
		o.showInfoWindow();
	};
	o.handleReport = function() {
		if (o.params.state == 'complete') return;
		o.log("calling geo...");
		navigator.geolocation.getCurrentPosition(o.handleGeo, o.handleGeoError, o.geoOpt);
	}
	o.handleGeo = function(pos) {
		console.log("position");
		let crd = pos.coords;
		o.log(`You are at ${crd.latitude}, ${crd.longitude} up to ${crd.accuracy} meters.`);
		if (!o.params.mCoord) {
			o.log('No geo coords defined in this mission.');
			return;
		}
		let mCoord = o.params.mCoord; //{ lat: 37.345749, lon: -122.070328 };
		let d = getDistanceFromLatLonInM(mCoord.lat,mCoord.lon,crd.latitude,crd.longitude);
		o.log(`distance ${d.toFixed(0)} meters with ${crd.accuracy} meters accuracy.`);
		
		if (d < o.params.thresh) {
			o.params.msg = o.params.successMsg;
			o.completeMission();
		} else {
			o.params.msg = "Keep looking.  This does not seem to be the right place.";
		}
		o.showInfoWindow();
	};
	o.handleGeoError = function(err) {
		let s = `geo error(${err.code}): ${err.message}`;
		console.log(s);
		o.log(s);
		o.params.msg = "unable to determine your location";
		o.showInfoWindow();
//uncomment for debug:		
//		o.params.msg = o.params.successMsg;
//		o.completeMission();
	};
	o.geoOpt = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
	};
	return o;
}

function TimedHonorMission(params) {
	var o = new Mission(params);
	o.fillMissionInfo = function() {
		let s = `${o.params.msg} <br><br> <table cellpadding='5em' style='position:absolute;top:5em;font-family:verdana;font-size:70%;'>`;
		if (o.params.startedOn) s += `<tr><td style='text-align:left'>started:</td><td> ${o.params.startedOn}</td></tr>`;
		if (o.params.finishedOn) s += `<tr><td style='text-align:left'>finished:</td><td> ${o.params.finishedOn}</td></tr>`;
		if (o.params.lastDuration) {
			s += `<tr><td style='text-align:left'>duration:</td><td> ${o.params.lastDuration.toFixed(0)}s</td></tr>`;
			s += `<tr><td style='text-align:left'>expected:</td><td> ${o.params.durationTs}s</td></tr>`;
		}
		s += `</table>`;
		o.setElement('mInfo', s);		
		if (o.params.state != 'complete') {
			let btn = makeHudElement({
				bottom: '0em',
				right: '0em',
				padding: '0.5em 1em',
				borderRadius: '1em',
				border: 'medium solid #f1c232'
			});
			btn.innerHTML = o.params.state == 'init' ? 'Start' : 'Finish';
			btn.onclick = o.params.state == 'init' ? o.handleStart : o.handleFinish;
			o.getElement('mInfo').appendChild(btn);
		}
	}
	o.handleAction = function() { o.showInfoWindow(); };
	o.handleStart = function() {
		o.params.state = 'started';
		o.params.startedOn = (new Date(Date.now())).toLocaleString();
		o.params.startedTs = Date.now();
		o.params.lastDuration = undefined;
		o.params.finishedOn = undefined;
		o.updateUi();
		o.showInfoWindow();
	}
	o.handleFinish = function() {
		let ts = Date.now();
		o.params.finishTs = ts;
		o.params.finishedOn = (new Date(ts)).toLocaleString();
		o.params.lastDuration = (ts - o.params.startedTs) * 0.001;
		if (o.params.lastDuration < o.params.durationTs) {
			o.params.msg = o.params.failMsg;
			o.params.state = 'init';
		} else {
			o.params.msg = o.params.successMsg;
			o.completeMission();
		}
		o.updateUi();
		o.showInfoWindow();
	}
	return o;
}