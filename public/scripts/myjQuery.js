$(document).ready(function() {
	setTimeout(function(){

		$('#addFilm').click(function(){
			$('#addContact').stop().fadeToggle();
		});
		
		$('#cancel').click(function(){
			$('#addContact').fadeToggle();
			
		});
		$('#add').click(function(){
			$('#addContact').fadeToggle();		
		});
		$('#upd').click(function(){
			$('#addContact').fadeToggle();		
		});
		
		
		$('.editbat').click(function(){
			$('#addContact').show();
		});
						
	
	},200);
	
});