$(document).ready(function(){
	var inputId = -1;
	
	$("#inputId").change(function(){
		getQuestion();
	}).delay(1000);
	
	
	function getQuestion(){
		inputId = $("#inputId").val();
		$.ajax({
			url: '../php/getQuestions.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if((inputId > data.length-1) || (inputId < 0)){
					$("#labelId").html('<span style="color: red;">ID - This id is not in our database!</span>');
				}
				else{
					$("#labelId").show().html("ID");
					$("#questionDiv").html(data[inputId].question);	//Question
						$("#voteA").html(data[inputId].qA); 		//Vote-option 1
						$("#voteB").html(data[inputId].qB);			//Vote-option 2
						$("#voteC").html(data[inputId].qC);			//Vote-option 3
						$("#voteD").html(data[inputId].qD);			//Vote-option 4
				}
			}
		});//ajax-end
	}
	
});//documentready-end