"use strict";

function Mission(params) {
	var o = new BaseObject(params);
	o.uiFields = ['mAction', 'mCategory', 'mTitle', 'mDesc', 'mPhoto', 'mDuration', 'mExp'];
	o.params.state = 'inProgress';
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
		o.params.mAction = 'Info';
		o.params.completedOn = new Date(Date.now());
		o.updateUi();
	}
	o.showInfoWindow = function() {
		hud.addWindow('missionInfo', true);
		o.fillMissionInfo();
	}
	o.fillMissionInfo = function() {}
	return o;
}

//frameid.parentNode.removeChild(frameid);
function AgentMission(params) {
	var o = new Mission(params);
	o.fillMissionInfo = function() {
		let w = o.getElement('mInfo');
		if (o.params.state == 'complete') {
			w.innerHTML = `${o.params.msg} <br><br> You have completed this mission on ${o.params.completedOn}.`;
		} else {
			w.innerHTML = `${o.params.msg} `;
		}
	}
	o.handleAction = function() {
		o.showInfoWindow();
		hud.windows.missionInfo.show();
		o.handleReport();
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
			o.params.msg = "Great work.  You have located the secret hideout!";
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
//		
//		o.params.msg = "Great work.  You have located the secret hideout!";
//		o.completeMission();
//
	};
	o.geoOpt = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
	};
	return o;
}