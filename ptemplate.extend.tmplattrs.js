'use strict';
typeof window.pTemplate != "undefined" && (function(win, $) {
	$.__mod__.tmplAttributes && $.extend($.__mod__.tmplAttributes, {
		router: function(obj, type, a, data, _parent) {
			if ($.__mod__.routes && $.__mod__.routes[a.value]) {
				var result = $.__mod__.routes[a.value];
				if (Object.is(typeof result, "function")) {
					result = result();
				}
				var params = $.__mod__.jsonToUrlString(result.params || {}, "&"),
					val = result.path + (params == "" ? "" : !/\?/.test(result.path) ? "?" : "&") + params;
				obj._attr(type, val);
				obj._removeAttr(a.name)
			}
		},
		express: function(obj, type, a, data, _parent) {
			switch (type) {
				case "for":
					var cmd = a.value.split(' '),
						then = function(result) {
							var html = obj._removeAttr("p-express:" + type).outerHTML,
								//parent = obj.parentNode,
								f = pTemplate.createDom("docmentfragment", {}),
								t = 'var html =[], len = ' + cmd[2] + '.length;for (var ' + cmd[0] + '=0;' + cmd[0] + '<len;' + cmd[0] + '++){html.push(pTemplate.createDom("div", {"p-index": ' + cmd[0] + '+1,html:pTemplate.tmpl(\'' + html.replace(/\r|\n/gim, "") + '\', ' + cmd[2] + '[' + cmd[0] + '])}))}return html;',
								r = new Function('data', t)(result.data || {});
							r.forEach(function(e) {
								f.appendChild(pTemplate.__mod__.mixElement(e.children[0])._attr("p-index", e._attr("p-index")));
							});
							pTemplate.tmpl(f, result);
							if (_parent) {
								_parent.innerHTML = "";
								_parent.appendChild(f);
							}
						};
					if (data[cmd[2]]) {
						if (typeof(data[cmd[2]]) == "function") {
							var b = new Promise((resolve, reject) => {
								data[cmd[2]](resolve, reject);
							});
							b.then(function(result) {
								then(result);
							}, function(error) {
								console.log(error || "error");
								then({});
							});
						} else {
							then(data);
						}
					}
					break;
				case "if":
					//console.log(obj)
					var index = parseInt(obj._attr("p-index")) || 0,
						cmd = a.value.split(' '),
						bool = true;
					if (/index/.test(a.value)) {
						bool = new Function("index", "return " + a.value)(index);
					} else {
						bool = new Function("data", "return " + a.value)(data);
					}
					if (!bool) {
						_parent && _parent._remove(obj);
					}
					break;
			}
		},
		custom: function(obj, type, a, data, _parent) {
			obj._attr(type, a.value);
			obj._removeAttr(a.name);
		},
		handle: function(obj, type, a, data, _parent) {
			switch (type) {
				case "watch":
					data.handle && (obj._on("DOMSubtreeModified", function(e) {
						if (e.target.nodeType === 1) {
							e.target._trigger && e.target._trigger("watch");
						}
					})._on(type, data.handle[a.value]), obj._removeAttr(a.name));
					break;
				default:
					data.handle && (obj._on(type, data.handle[a.value]), obj._removeAttr(a.name));
					break;
			}
		}
	})
})(this, pTemplate)