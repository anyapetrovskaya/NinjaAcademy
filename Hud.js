"use strict";

function Hud(params) {
	var o = new BaseObject(params);
	var dom = document.getElementById('hud');
	var visible = dom.style.visibility == 'visible';
	
	let wins = [ 'playerInfo', 'professions', 'missionScroll', 'missions', 'logWindow' ];
	o.windows = {};
	for (let w of wins) {
		o.windows[w] = new HudWindow({ wid: w, visible: true });
	}
	o.toggleWin = function(wid) {
		if (!o.windows[wid]) return;
		o.windows[wid].toggle();
	}
	o.toggleVisibility = function() {
		visible = !visible;
		dom.style.visibility = visible ? 'visible' : 'hidden';		
	}
	o.show = function() {
		visible = true;
		dom.style.visibility = 'visible';
	}
	o.resize = function() {
		var w = window.innerWidth * 0.5, h = window.innerHeight * 0.5;
		dom.style.height = h + 'px';
		dom.style.width = w + 'px';
	}		
	
	return o;
}
