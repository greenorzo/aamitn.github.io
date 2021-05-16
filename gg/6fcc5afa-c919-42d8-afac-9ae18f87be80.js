
(function () {
	var browserSwitchExpertModeActive = JSON.parse('true');
	var browserSwitchTabletsRedirect = JSON.parse('false');
	var browserSwitchPopUpVisible = JSON.parse('false');
	var browserSwitchChatEnabled = JSON.parse('true');
	var appUrl = 'https://my.appyourself.net/ay/web/6fcc5afa-c919-42d8-afac-9ae18f87be80?simulator=true&lang=en';
    var chatWidgetUrl = "https://apptivate.it/assets/app/chat/widget.js" + "?v=cw1.1.10";

	var uagent = navigator.userAgent.toLowerCase();
	var userAnswer = localStorage.getItem('user_answer') || '';

	var hasPushPremium = JSON.parse('false');
	var manifest = 'data:application/manifest+json;base64,eyJuYW1lIjoiR3JlZXQgTWVldGluZ3MiLCJkaXNwbGF5Ijoic3RhbmRhbG9uZSIsImRpciI6Imx0ciIsImxhbmciOiJlbiIsIm9yaWVudGF0aW9uIjoicG9ydHJhaXQiLCJpY29ucyI6W3sic3JjIjoiaHR0cHM6Ly9hcHB0aXZhdGUuaXQvaW1hZ2VzL2FwcEljb24vNmZjYzVhZmEtYzkxOS00MmQ4LWFmYWMtOWFlMThmODdiZTgwLnBuZyIsInNpemVzIjoiNTd4NTciLCJ0eXBlIjoiaW1hZ2UvcG5nIn0seyJzcmMiOiJodHRwczovL2FwcHRpdmF0ZS5pdC9pbWFnZXMvYXBwSWNvbjcyLzZmY2M1YWZhLWM5MTktNDJkOC1hZmFjLTlhZTE4Zjg3YmU4MC5wbmciLCJzaXplcyI6IjcyeDcyIiwidHlwZSI6ImltYWdlL3BuZyJ9LHsic3JjIjoiaHR0cHM6Ly9hcHB0aXZhdGUuaXQvaW1hZ2VzL2FwcEljb24xMTQvNmZjYzVhZmEtYzkxOS00MmQ4LWFmYWMtOWFlMThmODdiZTgwLnBuZyIsInNpemVzIjoiMTE0eDExNCIsInR5cGUiOiJpbWFnZS9wbmcifSx7InNyYyI6Imh0dHBzOi8vYXBwdGl2YXRlLml0L2ltYWdlcy9hcHBJY29uMTQ0LzZmY2M1YWZhLWM5MTktNDJkOC1hZmFjLTlhZTE4Zjg3YmU4MC5wbmciLCJzaXplcyI6IjE0NHgxNDQiLCJ0eXBlIjoiaW1hZ2UvcG5nIn0seyJzcmMiOiJodHRwczovL2FwcHRpdmF0ZS5pdC9pbWFnZXMvYXBwSWNvbk9yaWdpbmFsLzZmY2M1YWZhLWM5MTktNDJkOC1hZmFjLTlhZTE4Zjg3YmU4MC5wbmciLCJzaXplcyI6IjEwMjR4MTAyNCIsInR5cGUiOiJpbWFnZS9wbmcifV0sInNob3J0X25hbWUiOiJHcmVldCBNZWV0aW4iLCJiYWNrZ3JvdW5kX2NvbG9yIjoiI2ZmZmZmZiIsInRoZW1lX2NvbG9yIjoiI0ZDQ0EyQiIsInN0YXJ0X3VybCI6Ii8iLCJwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnMiOmZhbHNlLCJzZXJ2aWNld29ya2VyIjp7InNyYyI6Ii9wdXNod29vc2gtc2VydmljZS13b3JrZXIuanMiLCJzY29wZSI6Ii8iLCJ1cGRhdGVfdmlhX2NhY2hlIjoibm9uZSJ9fQ==';

	if (hasPushPremium && manifest) {
		addManifest(manifest);
	}

	if (browserSwitchExpertModeActive) {
		if (shouldRedirect()) {
			showPopupOrRedirect();
		}
	}

	if (browserSwitchChatEnabled) {
		initChatWidget();
	}

	function addManifest(src) {
		var head = document.getElementsByTagName('head')[0];
		var link = document.getElementsByTagName('link')[0];
		var newLink = document.createElement('link');
		newLink.href = src;
		newLink.rel = 'manifest';
		head.insertBefore(newLink,link);
	}

	function shouldRedirect() {
		if (testDevice('iphone') || testDevice('ipod')) {
			return true;
		}

		if (testDevice('ipad') && browserSwitchTabletsRedirect) {
			return true;
		}

		if (testDevice('android') && (testDevice('webkit') || testDevice('gecko'))) {
			if (testDevice('mobile')) {
				return true;
			} else if (browserSwitchTabletsRedirect) {
				return true;
			}
		}

		return !!testDevice('windows phone');
	}

	function testDevice(string) {
		return uagent.search(string) > -1;
	}

	function showPopupOrRedirect() {
		if (browserSwitchPopUpVisible) {
			if (userAnswer === 'no') {
				return;
			}

			if (userAnswer === 'yes') {
				window.location = appUrl;

				return;
			}

			var redirect = confirm(getAlertTranslation());

			if (redirect) {
				localStorage.setItem('user_answer', 'yes');
				window.location = appUrl;

				return;
			}

			localStorage.setItem('user_answer', 'no');
		}

		if (!browserSwitchPopUpVisible) {
			window.location = appUrl;
		}
	}

	function getAlertTranslation() {
		if (getLang() === 'de') {
			return 'Wollen Sie zu unserer mobilen App wechseln?'
		}

		return 'Do you want to switch to our mobile app?';
	}

	function getLang() {
		var lang = 'en';

		if (navigator) {
			if (navigator.language) {
				lang = navigator.language;
			} else if (navigator.browserLanguage) {
				lang = navigator.browserLanguage;
			} else if (navigator.systemLanguage) {
				lang = navigator.systemLanguage;
			} else if (navigator.userLanguage) {
				lang = navigator.userLanguage;
			}
		}

		return lang.substr(0, 2);
	}

	function initChatWidget() {
        loadChatScript(function () {
            ChatWidget.init({
                appOwnerAvatarUrl: 'https://my.appyourself.net/ay/web/6fcc5afa-c919-42d8-afac-9ae18f87be80?simulator=true&lang=en/images/appIcon144/6fcc5afa-c919-42d8-afac-9ae18f87be80.png',
                appOwnerName: 'Greet Meetings',
                facebookApiVersion: 'v3.2',
                facebookAppId: '',
                hasPushPremium: JSON.parse('false'),
                layout: 'CIRCLE',
                position: 'BOTTOM_RIGHT',
                primaryColor: '#FCCA2B',
                profile: {"enabled":true,"icon":"person","formFields":{"a6bdcedf-a9e0-3f93-72b8-ec589d4638c6":{"sequence":3.0,"overview":false,"visible":true,"editable":true,"label":"Geburtstag","type":"date","required":false},"field_email":{"sequence":0.0,"overview":true,"immutable":true,"visible":true,"editable":true,"label":"Email","type":"email","required":true},"field_phone":{"sequence":2.0,"overview":false,"visible":true,"editable":true,"label":"Phone","type":"phone","required":false},"field_name":{"sequence":1.0,"overview":true,"visible":true,"editable":true,"label":"Name","type":"text","required":true}},"registration":{"email":true}},
                pushwooshAppId: '',
                randomId: '6fcc5afa-c919-42d8-afac-9ae18f87be80',
                theme: 'BRIGHT'
            });
        });

	}

	function loadChatScript(onSuccess) {
		var script = document.createElement('script');
		var scripts = document.getElementsByTagName('script')[0];

		script.src = chatWidgetUrl;
		script.async = true;
		script.setAttribute('charset', 'UTF-8');
		scripts.parentNode.insertBefore(script, scripts);

		script.onload = function () {
			const existsInterval = setInterval(function () {
				if (!!ChatWidget) {
					clearInterval(existsInterval);
					onSuccess();
				}
			}, 100);
		};
	}
	
var browserSwitchPromotionBannerEnabled = JSON.parse('true');
var bannerDevice = 'all';
var bannerTimeoutMs = 0;
var bannerDeeplink = 'https://gogreet.tech';
var bannerCooldownMs = 0;
var bannerCooldownSessions = 0;

var shouldRenderBanner = browserSwitchPromotionBannerEnabled && bannerDeviceCheck() && bannerCooldownCheck();
incrementSessionsCount();

if (shouldRenderBanner) {
	initPromotionBanner();
}

function bannerCooldownCheck() {
    var bannerDisplayedDate = localStorage.getItem('bannerDisplayedDate');
    if (bannerCooldownMs && bannerDisplayedDate) {
        var currentDate = Date.now();
        var differenceInMs = Math.abs(currentDate - bannerDisplayedDate);
        return differenceInMs > bannerCooldownMs;
    }
    var browserSessionsCount = +localStorage.getItem('browserSessionsCount');
    if (bannerCooldownSessions && browserSessionsCount) {
        return browserSessionsCount % (bannerCooldownSessions + 1) === 0;
    }
    return true;
}

function bannerDeviceCheck() {
    return bannerDevice === 'all' || bannerDevice === getUserDevice();
}

function incrementSessionsCount() {
    var sessionsCount = +localStorage.getItem('browserSessionsCount');
    var newSessionsCount = sessionsCount ? sessionsCount + 1 : 1;
    localStorage.setItem('browserSessionsCount', newSessionsCount.toString());
}

function getUserDevice() {
    if (/mobi|android/i.test(uagent)) {
        return 'mobile'
    }
    return 'desktop'
}

function initPromotionBanner() {
    var bannerConfig = {
        
                        "promotion_banner_button_text": "Open App",
                    
                        "promotion_banner_button_color": "#00c974",
                        
                        "promotion_banner_primary_color": "#157efb",
                        
                        "promotion_banner_text": "Discover new features",
                    
        promotion_banner_class: 'ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80'
    };
    var bannerStyle = document.createElement('style');
    bannerStyle.type = 'text/css';
    bannerStyle.innerHTML = '.ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80 {position: fixed;text-align: center; z-index: 16777271; width: 100%; padding: 5px 25px 5px 5px; transition: all .5s ease-in-out; visibility: hidden; top: -999px; left: 0; box-sizing: border-box; font-family: "Open Sans"; font-size: 13px; line-height: 1.42857143; } .ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80.ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80-visible {visibility: visible; top: 0 !important; } .ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80 > span {margin-right: 25px;} .ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80 > a { display: inline-block; border-radius: 3px; padding: 6px 12px; text-decoration: none; } .ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80 > button { background: 0 0; border: 0; cursor: pointer; font-size: 22px; height: 22px; line-height: 1; margin: 5px; opacity: .5; padding: 0; right: 0; position: absolute; top: 0; transition: all .2s; width: 22px; } .ay-promo-banner-6fcc5afa-c919-42d8-afac-9ae18f87be80 > button:hover { opacity:1; transform:rotate(90deg) }';
    var bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add(bannerConfig.promotion_banner_class);
    bannerWrapper.style.backgroundColor = bannerConfig.promotion_banner_primary_color;

    bannerWrapper.appendChild(bannerStyle);

    var bannerTextElement = document.createElement('span');
    bannerTextElement.style.color = bannerConfig.hasOwnProperty('promotion_banner_text_dark_font') ? '#000' : '#fff';
    var text = document.createTextNode(bannerConfig.promotion_banner_text);
    bannerTextElement.appendChild(text);
    bannerWrapper.appendChild(bannerTextElement);

    var bannerButtonElement = document.createElement('a');
    bannerButtonElement.target = '_blank';
    bannerButtonElement.setAttribute('href', bannerDeeplink || appUrl);
    bannerButtonElement.style.backgroundColor = bannerConfig.promotion_banner_button_color;
    bannerButtonElement.style.color = bannerConfig.hasOwnProperty('promotion_banner_button_dark_font') ? '#000' : '#fff';
    var bannerButtonText = document.createTextNode(bannerConfig.promotion_banner_button_text);
    bannerButtonElement.appendChild(bannerButtonText);
    bannerWrapper.appendChild(bannerButtonElement);

    var bannerCloseButton = document.createElement('button');
    bannerCloseButton.style.color = bannerConfig.hasOwnProperty('promotion_banner_text_dark_font') ? '#000' : '#fff';
    bannerCloseButton.onclick = function() {
        bannerWrapper.classList.remove(bannerConfig.promotion_banner_class+'-visible');
        document.body.classList.remove(bannerConfig.promotion_banner_class+'-pushed');
    }
    bannerCloseButton.innerHTML = '&times;';
    bannerWrapper.appendChild(bannerCloseButton);

    window.addEventListener('load', function() {
        document.body.insertAdjacentElement('afterbegin', bannerWrapper);
        localStorage.setItem('bannerDisplayedDate', JSON.stringify(Date.now()));
        var elems = document.getElementsByClassName(bannerConfig.promotion_banner_class);
        var bannerHeight = elems[0].offsetHeight;

        elems[0].style.top = '-' + bannerHeight + 'px';

        var bodyStyle = document.head.appendChild(document.createElement('style'));
        bodyStyle.innerHTML = 'body.'+bannerConfig.promotion_banner_class+'-push:before{height:0px!important;content: \' \';display:block;transition: height .5s ease-in-out;}body.'+bannerConfig.promotion_banner_class+'-pushed:before{height:'+bannerHeight+'px!important;}';

        bannerWrapper.classList.add(bannerConfig.promotion_banner_class+'-visible');
        document.body.classList.add(bannerConfig.promotion_banner_class+'-push', bannerConfig.promotion_banner_class+'-pushed')
        bannerFadeOut(bannerWrapper, bannerTimeoutMs);
    });
}

function bannerFadeOut(element, timeout) {
    if (timeout !== 0) {
        setTimeout(function() {
            element.parentNode.removeChild(element)
        }, timeout)
    }
}
})();
