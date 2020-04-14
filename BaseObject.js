"use strict";

function BaseObject(params) {
	var o = new Object();
	
	o.init = function(params) {
		if (!params) return;
		for (let k of Object.keys(params)) o.params[k] = params[k];
	};
	o.uiFields = [];
	o.params = {};
	o.updateUi = function() {
		for (let eid of o.uiFields) o.updateElement(eid);		
	};
	o.updateElement = function(eid) {
		if (!o.params[eid]) return;
		let s = o.fieldFormat[eid] ? eval(o.fieldFormat[eid]) : o.params[eid];
		o.setElement(eid, s);
	};	
	o.fieldFormat = {};
	o.setElement = function(eid, s) {
		if (!document.getElementById(eid)) return;
		document.getElementById(eid).innerHTML = s;
	};
	o.log = function(s) { o.setElement('errorLog', s); };
	
	o.init(params);
	return o;
}