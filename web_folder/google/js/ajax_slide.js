$(document).ready(function(){
/**VARIABLE/SETTINGS*/
var indexSlide = 0;

	$("h1").after(
			'<input type="text" class="slideHead"/><br /><textarea rows="4" cols="50" id="slideContent_'+indexSlide+'"></textarea> <br /> <button type="button" class="addSlide">Add Slide</button> <br />'
		);

	$(".addSlide").click(function(){
		$(".slideHead, #slideContent_"+indexSlide).attr('readonly','readonly').css('backgroundColor','gray');
		$("#slideContent_"+indexSlide).after(indexSlide++,'<br /><input type="text" class="slideHead"/><br /><textarea rows="4" cols="50" id="slideContent_'+indexSlide+'"></textarea> <br />');
	});
	
	$("textarea").dblclick(function(){
		$(this).removeAttr('readonly','readonly').css('backgroundColor','white');
		
	});
});//documentready-end