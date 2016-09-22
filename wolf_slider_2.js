wolf_options = {
	//Slide Direction
	vertical_scroll: false,
	//Slide Transition Time
	transition_time: 900,

	//Mouse Scrolling
	mouse_scrolling: true,

	//Touch Scrolling
	touch_scrolling: false,
	//Touch options
	threshold: 150, //required min distance traveled to be considered swipe
	allowedTime: 500 // maximum time allowed to travel that distance
}

wolfslider = function(el, nexE, prevE, unique_id) {
	//Declaration of width and height with container width and height
	var slide_container = document.getElementById(el).children[0],
			slide = document.getElementById(el).children[0].children,
			num_slides_array = (slide.length - 1),
			lastScrolled = 0
  // Private slider methods

	var startX, startY, dist, elapsedTime, startTime;

	for (var i = 1; i < slide.length; i++) {
		for (var j = 0; j < slide[i].children.length; j++) {
			slide[i].children[j].style.opacity = '0';
		}
	}

	unique_id = {

		//-----------------------------------------------
		movefirst_last: function() {
			//move the last item before first item, just in case user click prev button
			slide_container.insertBefore(slide_container.children[num_slides_array], slide_container.children[0]);
		},
		//-----------------------------------------------
		movelast_first: function() {
			//move the last item before first item, just in case user click prev button
			slide_container.insertBefore(slide_container.children[0], slide_container.children[num_slides_array].nextSibling);
		},
		//-----------------------------------------------
		reset_dimen: function() {
			slide_w = document.getElementById(el).offsetWidth;
			slide_h = document.getElementById(el).offsetHeight;
		},

		check_sliding_dir: function() {
				unique_id.reset_dimen();
				if(wolf_options.vertical_scroll == false){
					ini_slide_position = "translate3d("+slide_w+"px, "+0+"px, 0)";
					end_slide_position = "translate3d(-"+slide_w/2+"px, "+0+"px, 0)";

				} else if(wolf_options.vertical_scroll == true){
					ini_slide_position = "translate3d("+0+"px, "+slide_h+"px, 0)";
					end_slide_position = "translate3d("+0+"px, -"+slide_h+"px, 0)";
				}
			//console.log(wolf_options.vertical_scroll);
		},

		setupFrame: function() {
			unique_id.reset_dimen();
			//Adjusting slide width and height equal frame's
			slide_container.style.width = slide_w+"px";
			slide_container.style.height = slide_h+"px";
			for(var i=0; i<slide.length; i++) {
				slide[i].style.transitionDuration = "0s";
				slide[i].style.width  = slide_w+"px";
				slide[i].style.height = slide_h+"px";
			}
		},

		arrangeSlides: function() {
			for(var i=0; i<slide.length; i++){
				//slide[i].style.opacity = "1";
				slide[i].style.zIndex = "-1";
				slide[i].style.transform = "translate3d(0 , 0, 0)";
			}

    },

		init: function() {

			unique_id.check_sliding_dir();

			//slide[0].style.opacity = "1";
			//slide[1].style.opacity = "1";
			slide[1].style.zIndex = "50";
			slide[2].style.visibility = "visible";
			slide[2].style.zIndex = "100";
			//slide[2].classList.add('active');

			slide[0].style.transform = end_slide_position;
			slide[2].style.transform = ini_slide_position;
		},

		next_slide: function() {
			unique_id.check_sliding_dir();

			slide[2].style.zIndex = "100";
			//slide[2].style.opacity = "1";
			slide[2].style.transitionDuration = wolf_options.transition_time+"ms";
			slide[2].style.transform = "translate3d(0, 0, 0)";
			setTimeout(function(){
				slide[1].classList.add('active');
				for (var i = 0; i < slide[1].children.length; i++) {
					slide[1].children[i].style.opacity = '1';
				}
			}, wolf_options.transition_time);
			//slide[2].classList.add('active');

			slide[1].style.zIndex = "50";
			//slide[1].style.opacity = "1";
			slide[1].style.transitionDuration = wolf_options.transition_time+"ms";
			slide[1].style.transform = end_slide_position;

			setTimeout(function(){
				slide[0].classList.remove('active');
				for (var i = 0; i < slide[0].children.length; i++) {
					slide[0].children[i].style.opacity = '0';
				}
			}, wolf_options.transition_time);

			slide[3].style.zIndex = "0";
			//slide[3].style.opacity = "1";
			slide[3].style.transitionDuration = "0s";
			slide[3].style.transform = ini_slide_position;

			unique_id.movelast_first();

			slide[num_slides_array].style.zIndex = "0";
			//slide[num_slides_array].style.opacity = "0";
			slide[num_slides_array].style.transitionDuration = "0s";
			slide[num_slides_array].style.transform = "translate3d(0, 0, 0)";
		},

		prev_slide: function() {
			unique_id.check_sliding_dir();

			slide[1].style.zIndex = "100";
			//slide[1].style.opacity = "1";
			slide[1].style.transitionDuration = wolf_options.transition_time+"ms";
			slide[1].style.transform = ini_slide_position;

			setTimeout(function(){
				slide[2].classList.remove('active');
				for (var i = 0; i < slide[2].children.length; i++) {
					slide[2].children[i].style.opacity = '0';
				}
			}, wolf_options.transition_time);

			slide[num_slides_array].style.zIndex = "0";
			//slide[num_slides_array].style.opacity = "1";
			slide[num_slides_array].style.transitionDuration = "0s";
			slide[num_slides_array].style.transform = end_slide_position;

			slide[0].style.zIndex = "50";
			//slide[0].style.opacity = "1";
			slide[0].style.transitionDuration = wolf_options.transition_time+"ms";
			slide[0].style.transform = "translate3d(0, 0, 0)";
			setTimeout(function(){
				slide[1].classList.add('active');
				for (var i = 0; i < slide[1].children.length; i++) {
					slide[1].children[i].style.opacity = '1';
				}
			}, wolf_options.transition_time);
			//setTimeout(function(){slide[1].classList.add('active');}, wolf_options.transition_time);

			unique_id.movefirst_last();

			slide[3].style.zIndex = "0";
			//slide[3].style.opacity = "0";
			slide[3].style.transitionDuration = "0s";
			slide[3].style.transform = "translate3d(0, 0, 0)";

		},

		next_pause: function() {
				var timeNow = (new Date()).getTime();
				if (timeNow > (lastScrolled + wolf_options.transition_time)) { unique_id.next_slide(); } else { return; }
				lastScrolled = timeNow;
		},

		prev_pause: function() {
				var timeNow = (new Date()).getTime();
				if (timeNow > (lastScrolled + wolf_options.transition_time)) { unique_id.prev_slide(); } else { return; }
				lastScrolled = timeNow;
		}

	};

    defaults = {
		slide_next: function() {
			document.getElementById(nexE).addEventListener("click", function (e){
				e.preventDefault();
				unique_id.next_pause();
			}, false);
        },

		slide_prev: function() {
			document.getElementById(prevE).addEventListener("click", function (e){
				e.preventDefault();
				unique_id.prev_pause();
			}, false);
		},

		r_set: function() {
			window.addEventListener("resize", function (){
				unique_id.setupFrame();
				unique_id.arrangeSlides();
				unique_id.init();
			}, false);
		},

		touch_func: function() {
			slide_container.addEventListener('touchstart', function(e){
			    e.preventDefault();
			    var touchobj = e.changedTouches[0];
			    dist = 0;
			    startX = touchobj.pageX;
			    startY = touchobj.pageY;
			    startTime = new Date().getTime(); // record time when finger first makes contact with surface
			  }, false);
	    slide_container.addEventListener('touchmove', function(e){
	        e.preventDefault(); // prevent scrolling when inside DIV
	    }, false);
	    slide_container.addEventListener('touchend', function(e){
	        e.preventDefault();
	        var touchobj = e.changedTouches[0];
	        dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
	        elapsedTime = new Date().getTime() - startTime; // get time elapsed
	        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
	        if (elapsedTime <= wolf_options.allowedTime && dist >= wolf_options.threshold && (touchobj.pageY - startY) <= 100) {
	          unique_id.prev_pause();
	        }
	        if (elapsedTime <= wolf_options.allowedTime && dist <= (-wolf_options.threshold) && (touchobj.pageY - startY) <= 100) {
	          unique_id.next_pause();
	        }
	    }, false);
		},

		mouse_wheel_func: function() {
			slide_container.addEventListener('mousewheel', function(e){
			    var wDelta = e.wheelDelta;
					if(wDelta > 0){
							unique_id.next_pause();
					} else {
							unique_id.prev_pause();
					}
			}, false);
		}


  };

	unique_id.setupFrame();
	unique_id.arrangeSlides();
	unique_id.movefirst_last();
	unique_id.init();
	defaults.slide_next();
	defaults.slide_prev();
	defaults.r_set();
	if(wolf_options.mouse_scrolling == true){
		defaults.mouse_wheel_func();
	}
	if(wolf_options.touch_scrolling == true){
		defaults.touch_func();
	}
};
