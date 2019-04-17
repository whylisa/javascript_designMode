//AjaxHandler interface

var AjaxHandle = new Interface("AjaxHandler", ['request', 'createXHrObject'])

var SimpleHander = function () {}

SimpleHander.prototype = {
	request: function (method,url, callback,postVars) {
		var xhr = this.createXhrObject();
		xhr.onreadyStatechange = function () {
			if(xhr.readyState !== 4) return ;
			(xhr.status === 200) ?
			callback.success(xhr.reponseText,xhr.responseXML):
			callback.failure(xhr.status)
		};
		xhr.open(method,url,true);
		if(method !== "POST") postVars = null;
		xhr.send(postVars)
		
	},
	createXhrObject: function () {
		var methods = [
		function(){return new XMLHttpRequest();},
		function(){return new ActiveXObject('MSxml2.XMLHTTP')}
		,function(){return new ActiveXObject('microsoft.XMLHTTP')}
		];
		for ( var i = 0,len = methods.length;i < len; i++) {
			try {
				methods[i]()
			}
			catch(e) {
				continue;
			}
			this.createXhrObject = methods[i];
			return methods[i]
		}
		throw new Error('simpleHander: counld not create an XHR obejct')
	}
}
