"use strict";


function Hud(params) {
	var o = new BaseObject(params);
	o.dom = document.getElementById('hud');
	var visible = o.dom.style.visibility == 'visible';
	
	let wins = [ 'playerInfo', 'professions', 'missionScroll', 'missions', 'logWindow' ];
	o.windows = {};
	for (let w of wins) {
		o.windows[w] = new HudWindow({ eid: w, visible: true });
	}
	o.toggleWin = function(wid) {
		if (!o.windows[wid]) return;
		o.windows[wid].toggle();
	}
	o.toggleVisibility = function() {
		visible = !visible;
		o.dom.style.visibility = visible ? 'visible' : 'hidden';		
	}
	o.show = function() {
		visible = true;
		o.dom.style.visibility = 'visible';
	}
	o.resize = function() {
		var w = window.innerWidth * 0.5, h = window.innerHeight * 0.5;
		o.dom.style.height = h + 'px';
		o.dom.style.width = w + 'px';
	}	
	o.addWindow = function(wid, visible) {
		if (o.windows[wid]) return;
		o.windows[wid] = new HudWindow({eid: wid, visible: visible});
	}
	
	return o;
}
