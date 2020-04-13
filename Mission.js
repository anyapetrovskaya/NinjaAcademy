"use strict";

function Mission(params) {
	var o = new Object();
	o.init = function(params) {
		if (!params) return;
		for (let k of Object.keys(params)) o.params[k] = params[k];
//		o.params = params;
	};
	o.scrollFields = ['mAction', 'mCategory', 'mTitle', 'mDesc', 'mPhoto', 'mDuration', 'mExp'];
	o.params = { state: 'inProgress' };
	o.updateScroll = function() {
		for (let eid of o.scrollFields) o.updateElement(eid);		
	};
	o.handleAction = function() { o.log("not implemented"); };	
	o.updateElement = function(eid) {
		if (!o.params[eid]) return;
		let s = o.params[eid];
		if (o.fieldFormat[eid]) s = eval(o.fieldFormat[eid]);
		o.setElement(eid, s);
	};	
	o.fieldFormat = {
			mPhoto: "`<img style='vertical-align:top;height:125px;' src='${o.params[eid]}'>`"
	};
	o.setElement = function(eid, s) {
		if (!document.getElementById(eid)) return;
		document.getElementById(eid).innerHTML = s;
	};
	o.log = function(s) { o.setElement('errorLog', s); };
	o.init(params);
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