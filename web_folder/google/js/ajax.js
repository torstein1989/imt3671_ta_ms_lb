$(document).ready(function(){
	/**VARIABLE/SETTINGS*/	
	var forStatMood = null;
	var forStatDifficulty =null;
	
	var qSet = true;		//Is the question set variable
	
	var selectedId = null;	//The selected id for question
	var plotData = null;	//Contains data to be plotted in the flot chart
	var placeholder = null;	//Where do you want the chart to be plotted
	
	var qID = null;
	var qID2 = true;
	
	var qA = 0;				//Question alternative A
	var qB = 0;				//Question alternative B
	var qC = 0;				//Question alternative C
	var qD = 0;				//Question alternative D
	var voteCounts= 0;		//Number of votes that is counted for this poll
	
	var autoUpdate = 0;		//Setinterval value for autoupdate of question and votes
	var initMood = 0;		//Initialize variable for staring the mood meter in background
	
	var newMessage = true;
	var messageId = -1;
	
	var options = { 		//Draw options for flot graph
			series:{
				stack: 0,
				lines: {show: false, steps: false },
				bars: {show: true, barWidth: 0.5, align: 'center',},
				},
				
				xaxis: {ticks: [[1,'A'], [2,'B'], [3,'C'], [4,'D']]},
				yaxis: { min: 0, max: 30 },
			};
	
	/**END-VARIABLE/SETTINGS*/
	
	/**
	 * Starts the getMood method, so the background-color
	 * changes accordingly to the users mood
	 */
	initMood = setInterval(function(){
		getMood();
		getMessages();
	},2000);
	
	
	getMood();				//Gets the color for the mood on the page
	drawFlot();				//Draws an empty chart
	drawGauge();			//Draws the gauge
	getQuestion();			//First populates the questions, then gets the questions alternatives
	getMessages();			//Populate the messagebox
	
	$("#getResult").click(function(){
			reset();
			getQuestion();
			getVotes();
			
			$.plot($(placeholder), plotData, options);
	});//click-end
	
	$("#question").change(function(){
		reset();
		getQuestion();
		getVotes();
	});
	
	$("#autoResult").change(function(){
		if($("#autoResult:checked").val() == "yes"){
			autoUpdate = setInterval(function(){
				reset();
				getQuestion();
				getVotes();
			},4000);
		}
		else{
			clearInterval(autoUpdate);
		}
	});//change-end
	
	var voteClicked = true;
	$("#voteToggle").click(function(){
		if(voteClicked){
			$("#voteToggle").css("backgroundColor","green");
			selectedId = parseInt($("#question").val());
			qID = selectedId;
				$.ajax({
					url: "http://www.stud.hig.no/~090917/teacherfeed/php/updateNowVoting.php",
					type: "POST",
					data: 	"&qID="+qID,
					success:function(data){
					}
				});//ajax-end
			voteClicked=false;
		}
		else{
			$("#voteToggle").css("backgroundColor","red");
			selectedId = parseInt($("#question").val());
			qID = selectedId;
				$.ajax({
					url: "http://www.stud.hig.no/~090917/teacherfeed/php/updateNowVoting.php",
					type: "POST",
					data: 	"&qID="+qID+
							"&qID2="+qID2,
					success:function(data){
					}
				});//ajax-end
			voteClicked=true;
		}
	});//click-end
	
	$("#saveState").click(function(){
		saveState();
	});
	
	$("#pollBtn").click(function(){
		$("#pollQuestion").dialog({
			buttons: 
				[
				 {
					 text: "Reset", click: function() { $("#questionForm input[type=text]").val(""); }
				 },
				 {
					 text: "Save", click: function() { postQuesetionData(); }
				 }
				 ]
		});
	});

	
	/**
	 * Function for posting data
	 * @param qA voteQuestion A
	 * @param qB voteQuestion B
	 * @param qC voteQuestion C
	 * @param qD voteQuestion D
	 */
	function postQuesetionData(){
		var question = $("input[name=formQuestion]").val();
		var qA = $("input[name=formA]").val();
		var qB = $("input[name=formB]").val();
		var qC = $("input[name=formC]").val();
		var qD = $("input[name=formD]").val();
		
		if(question == ""){
			alert("Please add question text!");
		}
		else{
			$.ajax({
				url: "../php/qvote.php",
				type: "POST",
				data: 	"&question="+question+
						"&qA="+qA+
						"&qB="+qB+
						"&qC="+qC+
						"&qD="+qD
				,
				success:function(data){
					//alert(question+qA+qB+qC+qD);
					qSet = true;
					getQuestion();
				}
			});//ajax-end
			$("#questionForm input[type=text]").val("");
		}
		
	}//postQuesetionData-end
	
	/**
	 * Draws the flot chart when the page loads
	 */
	function drawFlot() {
	    placeholder = $("#chart");
	    plotData = [ {data: [ [1,0],[2,0],[3,0],[4,0] ]}];
	    
	    $.plot($(placeholder), plotData, options);
	    
	};//drawFlot-end
	
	function reset(){
		qA = 0;
		qB = 0;
		qC = 0;
		qD = 0;
		voteCounts= 0;
	}//reset-end
	
	function getQuestion(){
		selectedId = parseInt($("#question").val());
		$.ajax({
			url: '../php/getQuestions.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(qSet){
					$("#question").empty();
					var i = -1;
					while(i < data.length){
						if(i == -1){
							var opt = '';
							opt += '<option value="-1">Choose question here ...  </option>';
							$("#question").append(opt);
						}
						else{
							var opt = '';
							opt += '<option value="' + data[i].qID + '">' + data[i].question + '</option>';
							$("#question").append(opt);
						}
						
						i++;
					}
					qSet = false;
				}
				
				/*
				else if((inputId > data.length-1) || (inputId < 0)){
					$("#labelId").html('<span style="color: red;">ID - This id is not in our database!</span>');
				}
				*/
				
				else{
					if(parseInt($("#question").val()) == -1){
						//do nothing
					}
					else{
						var selId = selectedId-1;
						var a = data[selId].qA;
						var b = data[selId].qB;
						var c = data[selId].qC;
						var d = data[selId].qD;
						
						options = {
								series:{
									stack: 0,
									lines: {show: false, steps: false },
									bars: {show: true, barWidth: 0.5, align: 'center',},
									},
									
									xaxis: {ticks: [[1,a], [2,b], [3,c], [4,d]]},
									yaxis: { min: 0, max: 30 },	
						}
						/*
						$("#labelId").show().html("ID");
						$("#questionDiv").html(data[inputId].question);	//Question
							$("#voteA").html(data[inputId].qA); 		//Vote-option 1
							$("#voteB").html(data[inputId].qB);			//Vote-option 2
							$("#voteC").html(data[inputId].qC);			//Vote-option 3
							$("#voteD").html(data[inputId].qD);			//Vote-option 4
							*/
					}
				}
			}
		});//ajax-end
	}//getQuestion-end
	
	function getVotes(){
		$.ajax({
			url: '../php/getVotes.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var i= 0;
				while (i < data.length){
					if(data[i].vID == selectedId){
						switch (parseInt(data[i].vote)) {
						case 1: qA += 1; break;
						case 2: qB += 1; break;
						case 3: qC += 1; break;
						case 4: qD += 1;break;
						}
						voteCounts++;
					}
					i++;
				}
				$("#voteCount").html("Sum votes: "+ voteCounts);
				$("#voteCount").val(voteCounts);
				placeholder = $("#chart");
				plotData = [{ data:[ [1,qA],[2,qB],[3,qC],[4,qD] ] },];
				$.plot($(placeholder), plotData, options);
				//alert("VoteCount : "+voteCounts+" A, B, C, D = "+ qA +" "+ qB +" "+ qC +" "+ qD);
			}//success-end
		});//ajax-end
	}//getVotes-end
		
	function getMood(){
		var difficulty= null; 	//Difficulty variable 
		var mood= null;			//Mood variable
		$.ajax({
			url: '../php/getMood.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var i= 0;
				while (i < data.length){
					
					intMood = parseInt(data[i].mMood);
					mood= mood + intMood;
					forStatMood = mood;
					//alert("Mood: "+ mood);
					
					intDifficulty= parseInt(data[i].mDiff);
					difficulty = difficulty + intDifficulty;
					forStatDifficulty = difficulty;
					//alert("Difficulty: "+ difficulty);
					i++;
				}
				
				mood = mood/10;
				difficulty = difficulty/10;
				setColor(mood);
				setGaugeVal(parseInt(difficulty));
				//alert("Mood :"+mood);
				//alert("Difficulty :"+difficulty);
				
				/**
				 * Sets the color for the background giving the mood for the slide
				 */
				function setColor(p){
					var red = p<50 ? 255 : Math.round(256 - (p-50)*5.12);
				    var green = p>50 ? 255 : Math.round((p)*5.12);
				    //alert("rgb"+red+","+green +" 0"); //for debugging color-rgb-code 
				    
				    var rgbcolor = "rgb(" + red + "," + green + ",0)";
				    //$(".current").css("background-color",rgbcolor);
				    $("body").css("background",rgbcolor);
				    
				    
				    return "rgb(" + red + "," + green + ",0)";
				}//setColor-end
				
				function setGaugeVal(diffValue){
					$("#difficultyGauge").gauge('setValue',diffValue);
				}
				
			}//success-end
		});//ajax-end
	}//getMood-end
	
	function drawGauge(){
		$("#difficultyGauge").gauge({
            min: 0,
            max: 100,
            label: 'DIFFICULTY',
            bands: [
	                    {color: "#FF0000", from: 75, to: 100},
	                    {color: "#FFFF00", from: 25, to: 75},
	                    {color: "#00FF00", from: 0, to: 25}
                    ]
          });
	}//drawGauge-end
	
	function getMessages(){
		function capitaliseFirstLetter(string)
		{
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}
		$.ajax({
			url: '../php/getMessages.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(messageId == -1){
					var i= 0;
					while (i < data.length){
						var date= data[i].date;
						var message = data[i].message;
						message = message.replace(/(<([^>]+)>)/ig,"");
						message = capitaliseFirstLetter(message);
						var messageFill = '';
						messageFill += '<p class="messageText"><span class="messageDate">&raquo;'+ date +'&laquo;</span><br /> &rsaquo; '+message+' &#133;</p>';
						/*messageFill = capitaliseFirstLetter(messageFill);*/
						$("#messages").append(messageFill);
						i++;
					}
					
					if(data[4].meID=="undefined"){
						//dont start this yet
					}
					else{
						messageId = data[4].meID;
					}
					
				}
				else if(data[4].meID > messageId && messageId != -1){
					$("#messages").empty();
					var i= 0;
					while (i < data.length){
						var date= data[i].date;
						var message = data[i].message;
						message = message.replace(/(<([^>]+)>)/ig,"");
						message = capitaliseFirstLetter(message);
						var messageFill = '';
						messageFill += '<p class="messageText"><span class="messageDate">&raquo;'+ date +'&laquo;</span><br /> &rsaquo; '+message+' &#133;</p>';
						$("#messages").append(messageFill);
						i++;
					}
					$(".messageText").hide().fadeIn(1000);
					
					if(data[4].meID=="undefined"){
						//dont start this yet
					}
					else{
						messageId = data[4].meID;
					}
				}
				
			}//success-end
		});//ajax-end
	}
	
	function saveState(){
		
		var statSlide = null;
		var statUrl = null;
		var statVote = null;
		var statVoteCount = null;
		var statMoodColor = null;
		var statMood = null;
		var statDifficulty = null;
		
		if(window.location.hash) {
			var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
			// hash found
		} 
		else {
			// No hash found}
		}
		
		if($("#voteCount").val() == ""){
			statVoteCount = -1;
		}
		else{
			statVoteCount = parseInt($("#voteCount").val());
		}
		
		if(parseInt($("#question").val()) == -1){
			statVote = -1;
		}
		else{
			statVote = parseInt($("#question").val());
		}
		
		statSlide = hash;
		statUrl = window.location;
		statMood = forStatMood/10;
		statDifficulty = forStatDifficulty/10;
		statMoodColor = $("body").css('backgroundColor');
		
		/*
		alert("Slide= "+statSlide+"<br />" + 
				"Vote= "+statVote+"<br />"+
				"VoteCount= "+statVoteCount+"<br />"+
				"Mood= "+statMood+"<br />"+
				"Difficulty= "+statDifficulty+"<br />"+
				"MoodColor= "+statMoodColor+statMoodColor.length+"<br />");
		*/
		
		
		$.ajax({
			url: "http://www.stud.hig.no/~090917/teacherfeed/php/statistics.php",
			type: "POST",
			data: 	"&statSlide="+statSlide+
					"&statUrl="+statUrl+
					"&statVote="+statVote+
					"&statVoteCount="+statVoteCount+
					"&statMoodColor="+statMoodColor+
					"&statMood="+statMood+
					"&statDifficulty="+statDifficulty,
			success:function(data){
			}
		});//ajax-end
		
		alert("***State is Saved***");
	}//savestate-end
	/*
	function getSlideContent(){
		var i = 0;
		alert("Wait");
		$.ajax({
			url: '../php/getSlideContent.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				while(i<data.length){
					$("#artc_"+i).html(data[i].slideText);
					i++;
				}
			}//success-end
		});//ajax-end
	}//getSlideContent-end
	
	function createArticles(){
		var i = 0;
		$.ajax({
			url: '../php/getSlideContent.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				while(i<data.length){
					$("#slideContents").after('<article id="artc_'+i+'"></article>');
					i++;
				}
			}//success-end
		});//ajax-end
	}
	*/
});//documentready-end