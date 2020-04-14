"use strict";

function Mission(params) {
	var o = new BaseObject(params);
	o.uiFields = ['mAction', 'mCategory', 'mTitle', 'mDesc', 'mPhoto', 'mDuration', 'mExp'];
	o.params.state = 'inProgress';
	o.handleAction = function() { o.log("not implemented"); };	
	o.fieldFormat.mPhoto = "`<img style='vertical-align:top;height:100%;' src='${o.params[eid]}'>`";
	return o;
}


function AgentMission(params) {
	var o = new Mission(params);
	o.handleAction = function() {
		o.log("calling geo...");
		navigator.geolocation.getCurrentPosition(o.handleGeo, o.handleGeoError, o.geoOpt);
	};
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
	return o;
}