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
				fullScreenToggle: false
			}
		}, function(){
			console.log('We Are Ready To Go');
		});
	}


	function init(){
		dropdownAction();
		collapseController();
		scrollMagicController();
		// htmlVideo();
	}

	// initiate the functions
	init();

