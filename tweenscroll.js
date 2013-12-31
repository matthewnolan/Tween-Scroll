/*
tweenscroll.js
The MIT License (MIT)
Copyright (c) 2013 Matthew Nolan
www.redbutton.io
*/

var tweenScroll = function(){

	//checks support
	if ( !'querySelector' in document && !'addEventListener' in window && !Array.prototype.forEach ) { return false;} 

	var thisScroll = function (anchor, duration, easing) {

		// Tween types. Use in data-easing attribute 
		var tweenTypes = function (type, time) {
			if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
			if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
			if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
			if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
			if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
			if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
			if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
			if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
			if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
			if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
			if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
			return time; 
		};

		var startLoc = window.pageYOffset;
		var endLocation = function (anchor) {
			var distance = 0;
			if (anchor.offsetParent) {
				do {
					distance += anchor.offsetTop;
					anchor = anchor.offsetParent;
				} while (anchor);
			}
			return distance;
		};
		var distance = endLocation(anchor) - startLoc;
		var increments = distance / (duration / 16);
		var timeLapsed = 0;
		var percentage, pos, stopAni;

		var animateScroll = function () {
			timeLapsed += 20;
			percentage = ( timeLapsed / duration );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			pos = startLoc + ( distance * tweenTypes(easing, percentage) );
			window.scrollTo(0, pos);
			stopAni();
		};

		// Stop the animation
		if ( increments >= 0 ) { 
			stopAni = function () {
				var travelled = window.pageYOffset;
				if ( (travelled >= (endLocation(anchor) - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
					clearInterval(runAnimation);
				}
			};
		} else { 
			stopAni = function () {
				var travelled = window.pageYOffset;
				if ( travelled <= endLocation(anchor) || travelled <= 0 ) {
					clearInterval(runAnimation);
				}
			};
		}

		// loop
		var runAnimation = setInterval(animateScroll, 20);

	};


	var tweenToggle = document.querySelectorAll('.tween');
	[].forEach.call(tweenToggle, function (toggle) {

		toggle.addEventListener('click', function(e) {

			e.preventDefault();

			var dataID = toggle.getAttribute('href');
			var dataTarget = document.querySelector(dataID);
			var dataSpeed = toggle.getAttribute('data-speed');
			var dataEasing = toggle.getAttribute('data-easing'); 


			if (dataTarget) {
				// Scroll to the a
				thisScroll(dataTarget, dataSpeed || 500, dataEasing || 'easeInOutCubic');
			}

		}, false);

	});

};
tweenScroll();