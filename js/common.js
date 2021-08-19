var _page = {prev:'', next:'', index:'main.html'};
var _timeDS = {TO:null, isContinue:true, checkMS:30*1000, lastActionTime:0, maxWaitMS:120*1000}; //maxWaitMS 시간수정
function setAlive(){
  _timeDS.lastActionTime = Date.now();
//  console.log('alive time : ' + _timeDS.lastActionTime);
}

function autoGoMain()
{
  var p = /\/main.html$/g;
  if(p.test(location.pathname)) return;
  if(_timeDS.TO) clearTimeout(_timeDS.TO);
  if(!_timeDS.isContinue) return;
  if(Date.now() - _timeDS.lastActionTime > _timeDS.maxWaitMS){
    location.replace(_page.index);
  }else{
    _timeDS.TO = setTimeout(function(){ autoGoMain(); }, _timeDS.checkMS);
  }
}


// JavaScript Document<script>
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};


function getQueryStringValue (key) {
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// borrowed from https://gist.github.com/niyazpk/f8ac616f181f6042d1e0
function updateUrlParameter (uri, key, value) {
	// remove the hash part before operating on the uri
	var
		i = uri.indexOf('#'),
		hash = i === -1 ? '' : uri.substr(i)
		;

	uri = i === -1 ? uri : uri.substr(0, i);

	var
		re = new RegExp("([?&])" + key + "=.*?(&|$)", "i"),
		separator = uri.indexOf('?') !== -1 ? "&" : "?"
		;

	if (!value) {
		// remove key-value pair if value is empty
		uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');

		if (uri.slice(-1) === '?') {
			uri = uri.slice(0, -1);
		}
		// replace first occurrence of & by ? if no ? is present

		if (uri.indexOf('?') === -1) {
			uri = uri.replace(/&/, '?');
		}

	} else if (uri.match(re)) {
		uri = uri.replace(re, '$1' + key + "=" + value + '$2');
	} else {
		uri = uri + separator + key + "=" + value;
	}
	return uri + hash;
}

window.addEventListener("load", function(){
  setAlive();
  autoGoMain();

  window.addEventListener("scroll", function(){
    setAlive();
  });

  var objs = document.querySelectorAll(".scroll");
  for(var i=0; i<objs.length; i++){
    objs[i].addEventListener("scroll", function(){
      setAlive();
    });
  }
});

var lang = 'en', stretching = 'auto';
document.addEventListener('DOMContentLoaded', function () {
	try { mejs.i18n.language(lang); }catch(e){}
	var mediaElements = document.querySelectorAll('video, audio'), i, total = mediaElements.length;
	for (i = 0; i < total; i++) {
		new MediaElementPlayer(mediaElements[i], {
			stretching: stretching,
			pluginPath: '../build/',
			usePluginFullScreen : false,
			features : ['progress', 'duration', 'tracks'],
			success: function (media) {
/*				
				var renderer = document.getElementById(media.id + '-rendername');

				media.addEventListener('loadedmetadata', function () {
					var src = media.originalNode.getAttribute('src').replace('&amp;', '&');
					if (src !== null && src !== undefined) {
						renderer.querySelector('.src').innerHTML = '<a href="' + src + '" target="_blank">' + src + '</a>';
						renderer.querySelector('.renderer').innerHTML = media.rendererName;
						renderer.querySelector('.error').innerHTML = '';
					}
				});

				media.addEventListener('error', function (e) {
					renderer.querySelector('.error').innerHTML = '<strong>Error</strong>: ' + e.message;
				});
*/
			}
		});
	}
});

