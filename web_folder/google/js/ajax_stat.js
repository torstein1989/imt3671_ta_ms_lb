$(document).ready(function(){
	/**VARIABLE/SETTINGS*/
		
	/**END-VARIABLE/SETTINGS*/
	//drawGauge(80);
	getStatistics();
	initTableSorter = setTimeout(function(){
		$("#statTable").tablesorter();
	},1000);
	
	var i= 0;
	var index=null;
	var voteValue = null;
	function getStatistics(){
		$.ajax({
			url: '../php/getStatistics.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				while (i < data.length){
					var statFill = '';
					statFill += '<tr><td>'+data[i].statID+'</td><td>'+data[i].date+'</td><td>'+data[i].statSlide+' - <a href="'+data[i].statUrl+'">'+data[i].statUrl+'</a></td><td id="statVotePoll_'+i+'">&laquo;'+data[i].statVote+'&raquo;</td><td id="statVoteCount_'+i+'">'+data[i].statVoteCount+'</td><td>'+data[i].statMood+'</td><td id="moodColor_'+i+'"><td>'+data[i].statDifficulty+'</td></td><td class="statGauge"><canvas id="difficultyGauge_'+i+'" width="100px" height ="100px"></canvas></td></tr>';
					$("#statTableData").append(statFill);
					
					//Sets color of the moodcolor
					var rgbColor = data[i].statMoodColor;
					$("#moodColor_"+i).css("background",rgbColor);
								
					//Draws the according gauge
					gaugeNr = "#difficultyGauge_"+i;
					
					var gVal = parseInt(data[i].statDifficulty);
					$(gaugeNr).gauge({
						value: gVal,
			            min: 0,
			            max: 100,
			            label: 'DIFFICULTY',
			            bands: [
				                    {color: "#FF0000", from: 75, to: 100},
				                    {color: "#FFFF00", from: 25, to: 75},
				                    {color: "#00FF00", from: 0, to: 25}
			                    ]
			          });
					index = i;
					voteValue = parseInt(data[i].statVote);
					//voteValue -= 1;
					if(voteValue<0){
						$("#statVotePoll_"+index).html("No poll was voted for").css("color","red");
						$("#statVoteCount_"+index).html("No poll was voted for").css("color","red");
					}
					else if(voteValue==0){
						$("#statVoteCount_"+index).html("Zero counts for this poll").css("color","red");
					}
					else{
						getStatQuestion(index,voteValue);
					}
					i++;
				}
				
			}//success-end
		});//ajax-end		
	}//getVotes-end
	
	function getStatQuestion(indeX, voteValuE){
		$.ajax({
			url: '../php/getQuestions.php',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				voteValuE -= 1;
				var q= data[voteValuE].question;
				var a= data[voteValuE].qA;
				var b= data[voteValuE].qB;
				var c= data[voteValuE].qC;
				var d= data[voteValuE].qD;
				$("#statVotePoll_"+indeX).append(" - " + q + "<br />A: " + a+ "<br />B: " + b+ "<br />C: " + c+ "<br />D: " + d);
			}//success-end
		});//ajax-end	
	}
	
});//documentready-end