var allLayer = ["sm_1","sm_2","sm_3","sm_4","sm_5","sm_6","sm_7","sm_8","sm_9","sm_10","sm_11"];
function showlayer(layer,obj){
        var myLayer = document.getElementById(layer);
        if(myLayer.style.display=="none" || myLayer.style.display==""){
                myLayer.style.display="block";
        } else {
                myLayer.style.display="none";
        }
        for ( var i in allLayer) {
                if (layer != allLayer[i]) {
                        document.getElementById(allLayer[i]).style.display = "none";
                }
        }
}

function generateHTML(fileName,flag){
        for ( var i in allLayer) {
                document.getElementById(allLayer[i]).style.display = "none";
        }
	if(flag == 1) {
        	document.getElementById("dash-frame").src = fileName;
        	document.getElementById("onDisplay").innerHTML = "GENERATOR";
	}
	else {
	        document.getElementById("dash-frame").src = fileName + ".html";
        	document.getElementById("onDisplay").innerHTML = fileName.toUpperCase();
	}
}
function resizeIframe(obj) {
	var browser = /Chrome/g;
	var chkBrowser = browser.test(navigator.userAgent);
	if (chkBrowser) {
		obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
		obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
	}
	else {
		obj.style.height = '1700px';
		obj.style.width = '1600px';
	}
}
function setFirstPage(_HTML_TO_GEN_) {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
			//console.log(pair[0] + "--S-" + pair[1]);
			query_string[pair[0]] = pair[1];
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	//console.log("--- finally --" + query_string['getPage']);
	if(query_string['getPage'] != undefined) {
		_HTML_TO_GEN_ = query_string['getPage'];
	}
	generateHTML(_HTML_TO_GEN_);
}
function openDefinedPage(_PAGE_) {
	for ( var i in allLayer) {
                document.getElementById(allLayer[i]).style.display = "none";
        }
	try {
		window.open("http://graphite2.pv.sv.nextag.com/cubism/dashboard/main-dashboard.html?getPage=" + _PAGE_);
	}
	catch(e) {}
}
