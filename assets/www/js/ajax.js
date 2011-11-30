$(document).ready(function(){
	/*************************QVOTE*************************/
	var question = null;
	var qA,qB,qC,qD = null;
	/**
	 * Click function for getting the QuestionValues
	 */
	$("#qvoteSubBtn").click(function(){
		question = $("input[name=formQuestion]").val();
		qA = $("input[name=formA]").val();
		qB = $("input[name=formB]").val();
		qC = $("input[name=formC]").val();
		qD = $("input[name=formD]").val();
		
		if(question == ""){
			alert("Please add question text!");
		}
		else{
			postQuesetionData();
			$("#questionForm input[type=text]").val("");
		}
		
	});//click-end
	
	/**
	 * Function for posting data
	 * @param qA voteQuestion A
	 * @param qB voteQuestion B
	 * @param qC voteQuestion C
	 * @param qD voteQuestion D
	 */
	function postQuesetionData(){
		$.ajax({
			url: "http://www.stud.hig.no/~090917/teacherfeed/php/qvote.php",
			type: "POST",
			data: 	"&question="+question+
					"&qA="+qA+
					"&qB="+qB+
					"&qC="+qC+
					"&qD="+qD
			,
			success:function(data){
				alert(question+qA+qB+qC+qD);
			}
		});//ajax-end
	}//postQuesetionData-end
	
	/*************************MOOD*************************/
	var mDiff = -1;
	var mMood = -1;
	/**
	 * Click function for getting and setting the mood/difficulty values
	 */
	$("#moodSubBtn").click(function(){
		mDiff = $("#moodVal").val();
		mMood = $("#moodVal_1").val();
		alert("OK! --> Difficulty= "+mDiff+" Mood= "+mMood);
		postMoodDiffData();
		$("#moodVal").slider("refresh");
		
	});//click-end
	
	function postMoodDiffData(){
		$.ajax({
			url: "http://www.stud.hig.no/~090917/teacherfeed/php/mood.php",
			type: "POST",
			data: 	"&mDiff="+mDiff+
					"&mMood="+mMood,
			success:function(data){
			}
		});//ajax-end
	}//postMoodDiffData-End
	
	/*************************VOTE*************************/
	var vote = -1;
	var vID = -1;
	
	/**
	 * Starts the getMood method, so the background-color
	 * changes accordingly to the users mood
	 */
	initQuestion = setInterval(function(){
		getQuestion();
	},4000);
	
	
	getVoteId();		//get the current QuestionID
	/**
	 * Get function for getting the right VoteID
	 */
	function getVoteId(){
		$.ajax({
			url: 'http://www.stud.hig.no/~090917/teacherfeed/php/getQuestionId.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(data==null){
					vID = -1;
				}
				else{
					var idData = parseInt(data[0]);
					vID = idData;
				}
			}
		});//ajax-end
	}//getVoteId-end
	
	function getQuestion(){
		$.ajax({
			url: 'http://www.stud.hig.no/~090917/teacherfeed/php/getQuestionId.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(data==null){
					$("#labelQuestion").html("**No voting right now**");
					$("#labelVote1").html("A");
					$("#labelVote2").html("B");
					$("#labelVote3").html("C");
					$("#labelVote4").html("D");
				}
				else{
					var q = data[3];
					var a = data[4];
					var b = data[5];
					var c = data[6];
					var d = data[7];
					
					$("#labelQuestion").html("- "+q);
					$("#labelVote1").html(a);
					$("#labelVote2").html(b);
					$("#labelVote3").html(c);
					$("#labelVote4").html(d);
				}
			}
		});//ajax-end
	}//getQuestion-end
	
	/**
	 * Click function for getting the checked value
	 */
	$("#voteSubBtn").click(function(){
		getVoteId();//get the current QuestionID
		vote = $("input[name=vote]:checked").val();
		if(vote == undefined){
			alert("Please choose a selection!");
		}
		else if(vID == -1){
			alert("No voting started");
			$("input[type='radio']").attr("checked",false).checkboxradio("refresh");//Resets the radiobutton
		}
		else{
			getVoteId();//get the current QuestionID
			postVoteData();
			alert("Answer OK and ID: "+vID)
			$("input[type='radio']").attr("checked",false).checkboxradio("refresh");//Resets the radiobutton
		}
		
	});//click-end
	
	function postVoteData(){
		$.ajax({
			url: "http://www.stud.hig.no/~090917/teacherfeed/php/vote.php",
			type: "POST",
			data: 	"&vID="+vID+
					"&vote="+vote,
			success:function(data){
			}
		});//ajax-end
	}//postVoteData-End
	
	/*************************MESSAGE*************************/
	var message = null;
	
	$("#messageSubBtn").click(function(){
		var ctrlForm = $("#messageForm input[type=text]").val();
		
		if(ctrlForm == ""){
			alert("You need to type in a message");
		}
		
		else{
			postMessageData();
			$("#messageForm input[type=text]").val("");			
		}
	});
	
	function postMessageData(){
		message = $("input[name=message]").val();
		$.ajax({
			url: "http://www.stud.hig.no/~090917/teacherfeed/php/message.php",
			type: "POST",
			data: 	"&message="+message,
			success:function(data){
			}
		});//ajax-end
	}//postMessageData-end
	
});