"use strict";

function HudWindow(params) {
	var o = new BaseObject(params);
	var dom = document.getElementById(o.params.wid);
	
	o.toggle = function() {
		o.params.visible = !o.params.visible;
		let wid = o.params.wid;
		dom.style.visibility = o.params.visible ? 'visible' : 'hidden';
		console.log(`toggle ${wid} to `+ dom.style.visibility);
	}
	return o;
}
