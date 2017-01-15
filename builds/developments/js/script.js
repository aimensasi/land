(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

	function dropdownAction(){
		var $dropdownMenu = $('.dropdown-menu[aria-labelledby="profile"]');

		$('#profile').on('click', function(){
			if ($dropdownMenu.hasClass('visibles')) {
				$dropdownMenu.removeClass('visibles');
			}else{
					$dropdownMenu.addClass('visibles');	
			}
		});

		$(document).on('click', function(){
			if ($dropdownMenu.css('visibility') == 'visible') {
				$dropdownMenu.removeClass('visibles');
			}
		});

	}

	function collapseController(){
		$('#navbarNav').on('show.bs.collapse', function () {
			$('body').css('overflow-y', 'hidden');
		  $('.navbar-toggler-icon').addClass('open-toggler');
		});
		$('#navbarNav').on('hide.bs.collapse', function () {
			$('body').css('overflow-y', 'auto');
		  $('.navbar-toggler-icon').removeClass('open-toggler');
		});
	}

	function scrollMagicController(){
		// Create ScrollMagic Controller
		var controller = new ScrollMagic.Controller();
		var $mockLg = $('#mock');
		var $mockSm = $('#mock-small');
		var tween = "";

		// Create Animation for 0.5s
		if ($mockLg.css('display') == 'none') {
			tween = TweenMax.to($mockSm, .8, {
				top: "20px"
			});
		}else{
			tween = TweenMax.to($mockLg, .8, {
				top: "20px"
			});
		}

		// // Create the Scene and trigger when visible with ScrollMagic
		var scene = new ScrollMagic.Scene({
	  	triggerElement: '#intro-section',
	  	offset: 20,
	  	reverse:false
		}).setTween(tween).addTo(controller);
	}

	function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';

    if (isPhone()) {
    	$('.video-section').css('height', '200px');	
    }else{
    	$('.video-section').css('height', unitHeight);	
    }
	}


	function initBannerVideoSize(element){
    $(element).each(function(){
      $(this).data('height', $(this).height());
      $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
	}

	function scaleBannerVideoSize(element){
		var windowWidth = $(window).width();
		var windowHeight = $('.video-section').height() + 5;
		var videoWidth;
		var videoHeight;

    console.log(windowHeight);

    $(element).each(function(){ 		
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);
        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;

            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        // $('.video-section .video-container video').addClass('fadeIn animated');

    });
	}


	function initiateVideo(){
		scaleVideoContainer();

		// initBannerVideoSize('.video-container .poster img');
		// initBannerVideoSize('.video-container .filter');
		initBannerVideoSize('.video-container video');

		$(window).on('resize', function() {
		    scaleVideoContainer();
		    // scaleBannerVideoSize('.video-container .poster img');
		    // scaleBannerVideoSize('.video-container .filter');
		    scaleBannerVideoSize('.video-container video');
		});
	}


	$('#play').on('click tap', function(){
		var $videoContainer = $(this).parent();
		var $poster = $videoContainer.children('.poster');
		var $play = $(this);
		var $pause = $('#pause');
		$poster.hide();
		$play.hide();
		$pause.show(200);
		console.log('PLay');

		$('#video-player').get(0).play();

		$pause.on('click', function(){
			$('#video-player').get(0).pause();
			$poster.show();
			$(this).hide();
			$play.show(200);
		});
	});

	function videoController(){
		if (isPhone()) {
			$('.vjs-controlls').hide();
		}
	}

	function pricingAnimation(){
		if (!isPhone()) {
			// console.log($container + ' ' + $leftElement + ' ' + );
			var controller = new ScrollMagic.Controller();
			var timeLine = new TimelineLite();

			var tween1 = TweenMax.to('#pricing-right', .8, {
				right: 0
			});
			var tween2 = TweenMax.to('#pricing-left', .8, {
				left: 0
			});
			
			timeLine.add(tween1).add(tween2, 0);

			var scene = new ScrollMagic.Scene({
		  	triggerElement: '.pricing',
		  	offset: 20,
		  	reverse:false
			}).setTween(timeLine).addTo(controller);
		}
	}

	function carouselIndicator(){
		$('li[data-target="#people-slides"]').on('click', function(){
			$('li.active[data-target="#people-slides"]').removeClass('active');
			$(this).addClass('active');
		});
	}

	function textAnimation(){
		if (!isPhone()) {
			// console.log($container + ' ' + $leftElement + ' ' + );
			var controller = new ScrollMagic.Controller();
			var timeLine = new TimelineLite();

			var tween1 = TweenMax.to('.text-col.right', .8, {
				right: 0
			});
			var tween2 = TweenMax.to('.text-col.left', .8, {
				left: 0
			});
			
			timeLine.add(tween1).add(tween2, 0);

			var scene = new ScrollMagic.Scene({
		  	triggerElement: '.text',
		  	offset: 20,
		  	reverse:false
			}).setTween(timeLine).addTo(controller);
		}
	}

	function animateScrollTop(){
		var controller = new ScrollMagic.Controller();
		// build tween
		var tween = TweenMax.from("#top", 0.5, {autoAlpha: 0, scale: 0.7});

		// build scene
		var scene = new ScrollMagic.Scene({triggerElement: "#back-top", duration: 200, triggerHook: "onLeave"})
						.setTween(tween)
						// .addIndicators() // add indicators (requires plugin)
						.addTo(controller);

		// change behaviour of controller to animate scroll instead of jump
		controller.scrollTo(function (newpos) {
			TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
		});

		$('#back-top').on('click', function(e){
			e.preventDefault();
			controller.scrollTo('#top');
		});
		//  bind scroll to anchor links
		// $(document).on("click", "a[href^='#']", function (e) {
		// 	var id = $(this).attr("href");
		// 	if ($(id).length > 0) {
		// 		e.preventDefault();

		// 		// trigger scroll
		// 		controller.scrollTo(id);

		// 			// if supported by the browser we can even update the URL.
		// 		if (window.history && window.history.pushState) {
		// 			history.pushState("", document.title, id);
		// 		}
		// 	}
		// });
	}

	function isPhone(){
		var IOS = /iPad|iPhone|iPod/;
		var ANDROID = /android/i;
		if (IOS.test(navigator.platform) || ANDROID.test(navigator.platform)) {
			return true;
		}else{
			return false;
		}
	}

	function init(){
		dropdownAction();
		collapseController();
		scrollMagicController();
		videoController();
		initiateVideo();
		pricingAnimation();
		carouselIndicator();
		textAnimation();
		// animateScrollTop();
	}

	// initiate the functions
	init();

},{}]},{},[1])