



$(document).ready(function() {

	addStyle = (_dom, _styleObj) => {
		if(_dom.style == null) _dom.style = {};
		Object.assign(_dom.style, _styleObj);
	};

	classSelector = (_class) => Array.from(document.getElementsByClassName(_class));
	idSelector = (_id) => document.getElementById(_id);

    duplicateModels = function(){
    	classSelector('model')
    		.forEach(_dom => {
    			var clone = _dom.cloneNode();
    			clone.classList.add('duplicate');
    			_dom.parentNode.appendChild(clone);
    		})
    };

    initStarPath = function(){
    	classSelector('star').forEach((_dom, _index) => {
    		_dom.setAttribute('d', 'M301.113,12.011l99.25,179.996l201.864,38.778L461.706,380.808 ' +
			'l25.508,203.958l-186.101-87.287L115.01,584.766l25.507-203.958L0,' +
			'230.785l201.86-38.778L301.113,12.011');
			_dom.id = "star-" + _index;
			addStyle(_dom, {
				'transform': 'translateX(-50%) rotate('+(_index/12*360)+'deg) translateX(3300px)'
			});
		});
    }

    init = function (){
    	duplicateModels();
    	initStarPath();

    	idSelector('body').classList.remove('init-animate-state');
    }
    init();
});