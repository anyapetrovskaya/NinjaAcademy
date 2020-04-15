"use strict";

function makeHudElement(p, elt) {
	if (elt === undefined) elt = 'div';
	if (p === undefined) p = {};
	var defaults = {
			position: 'absolute',
			bottom: '0px',
			right: '0px',
			background: 'rgba(0,0,0,0.5)',
			color: 'white',
			width: '200px',
			height: '200px',
	};
	var ret = document.createElement(elt);
	for (var n in defaults) ret.style[n] = defaults[n];
	for (var n in p) ret.style[n] = p[n];
	ret.onmousedown = ui.consumeMouse; //to prevent target picking/clearing when over hud element
	return ret;
}

function HudElement(params) {
	var o = new BaseObject(params);
	o.dom = document.getElementById(o.params.eid);
	
	o.toggle = function() {
		o.params.visible = !o.params.visible;
		let eid = o.params.eid;
		o.dom.style.visibility = o.params.visible ? 'visible' : 'hidden';
		console.log(`toggle ${eid} to `+ o.dom.style.visibility);
	}
	o.show = function() {
		o.params.visible = true;
		o.dom.style.visibility = 'visible';
	}
	o.hide = function() {
		o.params.visible = false;
		o.dom.style.visibility = 'hidden';
	}
	o.removeSelf = function() {
		o.dom.parentNode.removeChild(o.dom);
		o.dom = undefined;
	}
	return o;
}

function HudWindow(params) {
	var o = new HudElement(params);
	return o;
}
