$(document).ready(function(){

	var $dropdownMenu = $('.dropdown-menu[aria-labelledby="profile"]');

	$('#profile').on('click', function(){
		
		if ($dropdownMenu.css('visibility') == 'hidden') {
			$dropdownMenu.addClass('visibles');
		}else{
			$dropdownMenu.removeClass('visibles');
		}


	});

	$(document).on('click', function(){
		if ($dropdownMenu.css('visibility') == 'visible') {
			$dropdownMenu.removeClass('visibles');
		}
	});

});