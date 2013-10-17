/*
 * ##################################################################
 * #  Method generates a fixed rule that displays the latest value  #
 * #  of the matric on the mouse-over event on the horizon graph    #
 * #  i/p params :-                                                 #
 * #  a) _CONTEXT_ :       cubism context.                          #
 * #  b) _MATRIC_  :       Array of the arrays of the matrics       #
 * #                       defined for cubism.                      #
 * #  c) _HTMLTAG_ :       HTML tag/container in whic the value is  #
 * #                       assigned.                                #
 * #  :- Paritosh Anand 16/07/2013                                  #
 * ##################################################################
 * 
*/

var CUSTOM_FIXED_RULE = function(_CONTEXT_,_MATRIC_,_HTMLTAG_) {

        _CONTEXT_.on("focus", function(i) {
                d3.selectAll(".value").style("right", i == null ? null : _CONTEXT_.size() - 1 - i + "px");
		
		var _LATEST_VALUE_ = [];
                if(i != null && i < _CONTEXT_.size() - 50) { //--handling the internal call to this method--
                        //--fetching the value of all the matrices--
                        for(var i = 0; i < _MATRIC_.length; i++) {
                                for(j = 0; j < _MATRIC_[i].length; j++) {
					var _LAST_VALID_ = _CONTEXT_.size() - 1 ;
                                        while (_LAST_VALID_ < _CONTEXT_.size()) {
						if(_MATRIC_[i][j].valueAt(_LAST_VALID_) != undefined && !isNaN(_MATRIC_[i][j].valueAt(_LAST_VALID_))) {
							//_LATEST_VALUE_[j] = _MATRIC_[i][j].valueAt(_CONTEXT_.size() - _LAST_VALID_).toFixed(1);
							_LATEST_VALUE_[j] = _MATRIC_[i][j].valueAt(_LAST_VALID_).toFixed(1);
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
