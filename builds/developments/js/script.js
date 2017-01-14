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
	  	offset: 20	
		}).setTween(tween).addTo(controller);
	}

	function htmlVideo(){
		videojs('video-player', {
			controlBar: {
				FullscreenToggle: false
			},
			"width": "auto",
			"height": 'auto'
		}, function(){
			console.log('We Are Ready To Go');
			console.log(this);
		});
	}

	function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.video-section').css('height',unitHeight);
	}

	function initBannerVideoSize(element){
    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
	}

	function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

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

        $('.video-section .video-container video').addClass('fadeIn animated');

    });
	}

	function initiateVideo(){
		scaleVideoContainer();

		initBannerVideoSize('.video-container .poster img');
		initBannerVideoSize('.video-container .filter');
		initBannerVideoSize('.video-container video');

		$(window).on('resize', function() {
		    scaleVideoContainer();
		    scaleBannerVideoSize('.video-container .poster img');
		    scaleBannerVideoSize('.video-container .filter');
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

		$('#video-player').get(0).play();

		$pause.on('click', function(){
			$('#video-player').get(0).pause();
			$poster.show();
			$(this).hide();
			$play.show(200);
		});
	});

	function init(){
		dropdownAction();
		collapseController();
		scrollMagicController();
		// htmlVideo();
		initiateVideo();
	}

	// initiate the functions
	init();

},{}]},{},[1])