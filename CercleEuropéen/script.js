
addStyle = (_dom, _styleObj) => {
    if(_dom.style == null) _dom.style = "";
    Object.keys(_styleObj).forEach(key => _dom.style[key] = _styleObj[key]);
};
selAll = (_sel) => Array.from(document.querySelectorAll(_sel));
sel = (_sel) => document.querySelector(_sel);

function refresh_background(){
    selAll('.scroll-background').forEach(
        domElement => {
            _top = domElement.getBoundingClientRect().top;
            addStyle(domElement, {'background-position': '50% '+(-_top)+'px'}); //
            console.log(_top);
        });
}

$(document).ready(function() {

	

	

    duplicateModels = function(){
    	selAll('.model')
    		.forEach(_dom => {
    			var clone = _dom.cloneNode();
    			clone.classList.add('duplicate');
    			_dom.parentNode.appendChild(clone);
    		})
    };

    initStarPath = function(){
    	selAll('.star').forEach((_dom, _index) => {
    		_dom.setAttribute('d', 'M301.113,12.011l99.25,179.996l201.864,38.778L461.706,380.808 ' +
			'l25.508,203.958l-186.101-87.287L115.01,584.766l25.507-203.958L0,' +
			'230.785l201.86-38.778L301.113,12.011');
			_dom.id = "star-" + _index;
			addStyle(_dom, {
				'transform': 'translateX(-50%) rotate('+(_index/12*360)+'deg) translateX(600px) scale(0.3) '
			});
		});
    }

    init = function (){
    	duplicateModels();
    	initStarPath();

    	sel('#body').classList.remove('init-animate-state');

        console.log("Set attribute");
        sel('#body').setAttribute("onscroll", "refresh_background()");
    }   
    init();
});