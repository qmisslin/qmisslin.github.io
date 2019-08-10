var dom = {
	bg: document.querySelector("#bg"),
};
var p = 0;
var w = dom.bg.offsetWidth / 49;
var margin = 0.5;
dom.bg.parentNode.style="width:" + (w-2 * margin) + "px";


function loop() {
	p = (p < 47) ? p+1 : 1;
	//p = 0;
	dom.bg.style = "left:-"+(w * p + margin)+"px";
	window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);