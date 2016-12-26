flexslider = function(slider_node) {

	slider = document.querySelectorAll(slider_node);

	movefirst_last = function(elem) {
		elem.insertBefore(elem.children[num_slides_array], elem.children[0]);
	}

	movelast_first = function(elem) {
		elem.insertBefore(elem.children[0], elem.children[num_slides_array].nextSibling);
	}

	init = function(elem){
		for (var i = 0; i < elem.children[0].children.length; i++) {
			slide[i].style.zIndex = "0";
		}
	}

	render = function(slide) {
		if(flex_slider_options.vertical_scroll==false) {
			var prev_dis = "translate3d(-60%, 0, 0)";
			var next_dis = "translate3d(100%, 0, 0)";
		} else {
			var prev_dis = "translate3d(0, -50%, 0)";
			var next_dis = "translate3d(0, 100%, 0)";
		}

		slide[0].style.zIndex = "0";
		slide[0].style.transform = prev_dis;

		slide[2].style.zIndex = "100";
		slide[2].style.transform = next_dis;


		slide[1].style.zIndex = "50";
		slide[1].style.transitionDuration = transition_time+"ms";
		slide[1].style.transform = "translate3d(0, 0, 0)";


		setTimeout(function() {
			slide[1].classList.add('active');
			slide[1].style.animationDuration = transition_time+"ms";
			for (var i = 0; i < slide.length; i++) {
				for (var j = 0; j < slide[i].children.length; j++) {
					slide[i].children[j].style.display = "none";
					if(i==1) {
						slide[1].children[j].style.display = "block";
					}
				}
			}
		}, transition_time);
	}

	cleanup_slide = function(elem) {
		elem.style.transitionDuration = "";
		elem.style.transform = "";
		elem.style.zIndex = "";
		elem.style.animationDuration = "";
	}

	touch_func = function(elem) {

		elem.addEventListener('touchstart', function(e) {
			e.preventDefault();
			var touchobj = e.changedTouches[0];
	    var dist = 0;
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
		}, false);
		elem.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touchobj = e.changedTouches[0];
			if(flex_slider_options.vertical_scroll==false) {
				var dist = touchobj.pageX - startX;
				var page_dis = touchobj.pageY - startY;
			} else {
				var dist = touchobj.pageY - startY;
				var page_dis = touchobj.pageX - startX;
			}
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= flex_slider_options.allowedTime && dist >= flex_slider_options.threshold && (page_dis) <= 100) {
				slider = elem.parentNode.children[0];
				prev();
			}
			if (elapsedTime <= flex_slider_options.allowedTime && dist <= (-flex_slider_options.threshold) && (page_dis) <= 100) {
				slider = elem.parentNode.children[0];
				next();
			}
		}, false);
	}


	function next(slider_ele) {
		var timeNow = (new Date()).getTime();
		if (timeNow > (lastScrolled + (2*transition_time+100))) {

		movelast_first(slider);

		render(slider.children);

		cleanup_slide(slider.children[num_slides_array]);

		} else {
			return;
		}
		lastScrolled = timeNow;

	}


	function prev() {
		var timeNow = (new Date()).getTime();
		if (timeNow > (lastScrolled + (2*transition_time+100))) {


		movefirst_last(slider);

		render(slider.children);

		cleanup_slide(slider.children[3]);

		} else {
			return;
		}
		lastScrolled = timeNow;
	}


	for (var i = 0; i < slider.length; i++) {

		slide = slider[i].children[0].children;

		transition_time = (flex_slider_options.transition_time/2);
		num_slides_array = (slide.length - 1);
		var lastScrolled = 0;

		if(flex_slider_options.touch_scrolling!=false) {
			touch_func(slider[i].children[0]);
		}

		movefirst_last(slider[i].children[0]);
		init(slider[i]);
		render(slider[i].children[0].children);

		slider[i].querySelector(slider_node+' .next_b').addEventListener('click', function() {
			slider = this.parentNode.children[0];
			next();
		});
		slider[i].querySelector(slider_node+' .prev_b').addEventListener('click', function() {
			slider = this.parentNode.children[0];
			prev();
		});
	}

}

flex_slider_options = {
  vertical_scroll: true,
  transition_time: 1000,
  touch_scrolling: true,
  threshold: 150,
  allowedTime: 500
}
flexslider('.wolfslider');
