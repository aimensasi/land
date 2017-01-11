$(document).ready(function(){

	var $dropdownMenu = $('.dropdown-menu[aria-labelledby="profile"]');

	$('#profile').on('click', function(){
		
		if ($dropdownMenu.css('opacity') == '0') {
			$('.dropdown-menu').css('opacity', '1');	
		}else{
			$('.dropdown-menu').css('opacity', '0');	
		}
	});

	$(document).on('click', function(){
		if ($dropdownMenu.css('opacity') == '1') {
			$('.dropdown-menu').css('opacity', '0');	
		}
	});
});