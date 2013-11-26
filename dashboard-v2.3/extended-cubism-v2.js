/*
 * ##################################################################
 * #  Method generates a fixed rule that displays the latest value  #
 * #  of the matric on the mouse-over event on the horizon graph    #
 * #  i/p params :-                                                 #
 * #  a) _CONTEXT_ :       cubism context.                          #
 * #  b) _METRIC_  :       Array of the arrays of the matrics       #
 * #                       defined for cubism.                      #
 * #  c) _HTMLTAG_ :       HTML tag/container in whic the value is  #
 * #                       assigned.                                #
 * #  :- Paritosh Anand 16/07/2013                                  #
 * ##################################################################
 * 
*/

var CUSTOM_FIXED_RULE = function(_CONTEXT_,_METRIC_,_HTMLTAG_) {

        _CONTEXT_.on("focus", function(i) {
                d3.selectAll(".value").style("right", i == null ? null : _CONTEXT_.size() - 1 - i + "px");
		
		var _LATEST_VALUE_ = [];
                if(i != null && i < _CONTEXT_.size() - 50) { //--handling the internal call to this method--
                        //--fetching the value of all the matrices--
                        for(var i = 0; i < _METRIC_.length; i++) {
                                for(j = 0; j < _METRIC_[i].length; j++) {
					var retVal = CHECK_FAULT(_CONTEXT_,_METRIC_[i][j],_HTMLTAG_[i],j);
					var _LAST_VALID_ = _CONTEXT_.size() - 1 ;
                                        while (_LAST_VALID_ < _CONTEXT_.size()) {
						if(retVal && _METRIC_[i][j].valueAt(_LAST_VALID_) != undefined && !isNaN(_METRIC_[i][j].valueAt(_LAST_VALID_))) {
							_LATEST_VALUE_[j] = _METRIC_[i][j].valueAt(_LAST_VALID_).toFixed(1);
							//console.log(_LATEST_VALUE_[j] + ' -- ' + j + ' -- ' + i + ' -- ' + _LAST_VALID_);
							document.getElementsByName(_HTMLTAG_[i])[j].innerHTML = _LATEST_VALUE_[j];
							document.getElementsByName(_HTMLTAG_[i])[j].style.display = "";
							break;
						}
						else {
							_LAST_VALID_++;
						}
					}
                                }
                        }
                }
        });
	//--function to remove the customized-fixed value of the matric on mouseout/blur--
	_CONTEXT_.on("blur", function() {
		for(var i = 0; i < _HTMLTAG_.length; i++) {
			for (var j = 0; j < document.getElementsByName(_HTMLTAG_[i]).length; j++) {
				document.getElementsByName(_HTMLTAG_[i])[j].style.display = "none";
			}
		}
	});
};
var CHECK_FAULT = function (_CONTEXT_,_METRIC_,_HTMLTAG_,_INDEX_) {
	var retVal = true;
	var _COUNTER_ = 0;
	for (var i = 0; i < _CONTEXT_.size(); i++) {
		if(_METRIC_.valueAt(i) == 0 || isNaN(_METRIC_.valueAt(i))) {
			_COUNTER_ += 1;
		}
		else {
			//--No Fault detected - exiting the loop
			break;
		}
		if(_COUNTER_ > _CONTEXT_.size() - 2){
			retVal = false;
			try{
				var resp = "Something is Wrong";
				var target = _METRIC_.expression;
				var lastLeftParant = target.lastIndexOf("(");
				var firstRightParant = target.indexOf(")");
				var absoluteTarget = target.substring(lastLeftParant + 1, firstRightParant);
				if(absoluteTarget.indexOf(",")) {
					absoluteTargetArr = absoluteTarget.split(",");
					absoluteTarget = absoluteTargetArr[0];
				}
				//console.log(_METRIC_.host);
				var _host = _METRIC_.host;
				_METRIC_.find(absoluteTarget,_host,_HTMLTAG_,_INDEX_, function(error, results ,_HTMLTAG_,_INDEX_) {
					if(results == "" && document.getElementsByName(_HTMLTAG_)[_INDEX_] != undefined) {
						//--target doesnot exist--
						document.getElementsByName(_HTMLTAG_)[_INDEX_].innerHTML = "Cannot Find the Target !!<br>";
						document.getElementsByName(_HTMLTAG_)[_INDEX_].style.display = "";
					}
					else if(document.getElementsByName(_HTMLTAG_)[_INDEX_] != undefined) {
						document.getElementsByName(_HTMLTAG_)[_INDEX_].innerHTML = "We are getting zero/null values, re-check from Graphite Web App !!<br>";
						document.getElementsByName(_HTMLTAG_)[_INDEX_].style.display = "";
					}
				});
			}
			catch(e) {
				console.log(e);
			}
			break;
		}
	}	
	return retVal;
};
