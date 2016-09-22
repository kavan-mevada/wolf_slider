# wolf_slider

Ultra light Responsive Slider

- Infinite Scroll Support
- CSS animations on inside slide elements
- Direction of sliding can be change as you want (left, right, center fade, any corner of container, up, down)..
- All browsers supported
- Responsive with your window.
- Auto resize by resizing window.
- sliding time can be cahnge by developer
- transition time also can be change
- You can use % values as width and for height because it has relative position with other elements
- for full screen-mode width:100vw and height: 100hv
- You can also add caption and images or anything inside slides.


- You can apply same js code for multiple sliders... ( NO LIMITS )
- Code size is very very small
- No need of jquery or any external js plugins.
- It also support touch devices.


Drawbacks or bug hasn't found yet


#Demo
Link https://kavanmevada.github.io/wolf_slider/

My e-mail: kavanmevada@live.com


#HTML Code
```
	<div id="slider">
		<div class="warpper">
			<div class="slide" style="background-image:url('img/1.jpg');background-color:red;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 1</p>
			</div>
			<div class="slide" style="background-image:url('img/2.jpg');background-color:orange;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 2</p>
			</div>
			<div class="slide" style="background-image:url('img/3.jpg');background-color:blue;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 3</p>
			</div>
			<div class="slide" style="background-image:url('img/4.jpg');background-color:yellow;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 4</p>
			</div>
			<div class="slide" style="background-image:url('img/5.jpg');background-color:green;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 5</p>
			</div>
			<div class="slide" style="background-image:url('img/6.jpg');background-color:lightblue;">
				<img src="img/1.jpg" />
				<p class="caption">Caption 6</p>
			</div>
		</div>
		<a class="next_b" id="n_b"></a>
		<a class="prev_b" id="p_b"></a>
	</div>
```

# CSS Style
```
#slider {
	position: relative;
	margin-top: 30px;
	width: 100%;
	height: 600px;
	display: block;
	margin: 0 auto;
}

.warpper {
	display: block;
	position: absolute;
	overflow: hidden;
}

.slide {
	position: absolute;
	display: block;
	overflow: hidden;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	opacity: 1;
	transition: transform linear;
}
```
User Defined Element style
```
.slide > img {
	display: block;
	width: 50px;
	height: auto;
	background-size: cover;
}

.caption {
	position: absolute;
	color: white;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: block;
	height: 4rem;
	margin: auto;
	font-size: 4rem;
	font-weight: 300;
	text-align: center;
}
```
```
.next_b {
	position: absolute;
	display: block;
	right: 0px;
	bottom: 0;
	width:50px;
	height:50px;
	z-index: 100;
	background-color: deeppink;
}

.prev_b {
	position: absolute;
	display: block;
	left: 0px;
	bottom: 0;
	width:50px;
	height:50px;
	z-index: 100;
	background-color: deeppink;
}
```
Defining Animation on the elements

```
.slide.active > .caption {
	animation: kavan1 1s;
}

.slide.active > img {
	animation: kavan 1s;
}

@keyframes kavan {
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes kavan1 {
	0% {
		transform: translateY(200px);
		transform: rotate(180deg);
	}
	100% {
		transform: translateY(0px);
		transform: rotate(0deg);
	}
}
```

# JavaScript
```
<script type="text/javascript" src="wolf_slider_2.js" ></script>
<script>
flex_options = {
 vertical_scroll:false,
 transition_time:500,
 mouse_scrolling:false,
 touch_scrolling:true,
 threshold:150,
 allowedTime:500
}
flexslider("slider", "n_b", "p_b", "kavan");
</script>
```

© 2016 Kavan Mevada.
