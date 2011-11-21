$(document).ready(function(){
	var inputId = -1;
	var difficulty= null;
	var mood= null;
	
	$("#inputId").change(function(){
		getQuestion();
	}).delay(1000);
	
	var init = setInterval(getMood,5000);
		
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
	}//getQuestion-end
	
	function getMood(){
		$.ajax({
			url: '../php/getMood.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var i= 0;
				while (i < data.length){
					
					intMood = parseInt(data[i].mMood);
					mood= mood + intMood;
					
					intDifficulty= parseInt(data[i].mDiff);
					difficulty = difficulty + intDifficulty;
					i++;
				}
				
				mood = mood/10;
				difficulty = difficulty/10;
				
				//alert("Mood :"+mood);
				//alert("Difficulty :"+difficulty);
				
				if(mood > 0 && mood < 25){
					$(".current").css("background-color","black");
					mood = null;
				}
				else if(mood > 25 && mood <50){
					$(".current").css("background-color","blue");
					mood = null;
				}
				else if(mood > 50 && mood <75){
					$(".current").css("background-color","purple");
					mood = null;
				}
				else{
					$(".current").css("background-color","green");
					mood = null;
				}
			}//success-end
		});//ajax-end
	}//getMood-end
	
});//documentready-end