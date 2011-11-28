$(document).ready(function(){
	/**VARIABLE/SETTINGS*/
	var inputId = -1;
	var difficulty= null;
	var mood= null;
	
	var qSet = true;
	
	var selectedId = null;
	var plotData = null;
	var placeholder = null;
	var qA = 0;
	var qB = 0;
	var qC = 0;
	var qD = 0;
	var voteCounts= 0;
	
	var options = {
			series:{
				stack: 0,
				lines: {show: false, steps: false },
				bars: {show: true, barWidth: 0.5, align: 'center',},
				},
				
				xaxis: {ticks: [[1,'A'], [2,'B'], [3,'C'], [4,'D']]},
				yaxis: { min: 0, max: 30 },
			};
	
	/**END-VARIABLE/SETTINGS*/
	
	var init = setInterval(getMood,5000);
	drawFlot();
	getQuestion();
	
	$("#getResult").click(function(){
			getQuestion();
			getVotes();
			
			$.plot($(placeholder), plotData, options);
	});//click-end
	
	$("#question").change(function(){
		
	}).delay(500);
	
	var voteClicked = true;
	$("#voteToggle").click(function(){
		if(voteClicked){
			$("#voteToggle").html("STOP VOTING");
			voteClicked=false;
		}
		else{
			$("#voteToggle").html("START VOTING");
			voteClicked=true;
		}
	});//click-end

	
	/**
	 * Draws the flot chart when the page loads
	 */
	function drawFlot() {
	    placeholder = $("#chart");
	    plotData = [ {data: [ [1,0],[2,0],[3,0],[4,0] ]}];
	    
	    $.plot($(placeholder), plotData, options);
	    
	};//drawFlot-end
	
	
	function getQuestion(){
		qA = 0;
		qB = 0;
		qC = 0;
		qD = 0;
		voteCounts= 0;
		
		selectedId = parseInt($("#question").val())-1;
		$.ajax({
			url: '../php/getQuestions.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(qSet){
					var i = 0;
					while(i < data.length){
						var opt = '';
						opt += '<option value="' + data[i].qID + '">' + data[i].question + '</option>';
						$("#question").append(opt);
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
					var a = data[selectedId].qA;
					var b = data[selectedId].qB;
					var c = data[selectedId].qC;
					var d = data[selectedId].qD;
					
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
				placeholder = $("#chart");
				plotData = [{ data:[ [1,qA],[2,qB],[3,qC],[4,qD] ] },];
				$.plot($(placeholder), plotData, options);
				//alert("VoteCount : "+voteCounts+" A, B, C, D = "+ qA +" "+ qB +" "+ qC +" "+ qD);
			}//success-end
		});//ajax-end
	}//getVotes-end
		
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
				setColor(mood);
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
				}
				
			}//success-end
		});//ajax-end
	}//getMood-end
	
});//documentready-end