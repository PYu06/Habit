$(document).ready(function() {
	$(".delete").click(deleteHabit);

	$("#create-habit").submit(createHabit);

	$("#habit-container").on("click", "#done", completeHabit);

	// $("#create-habit").submit(createHabitPic);


	// TODO: Ajaxify edit
	// ----------------------------------
	// $("#edit").click(editHabit);
	
	// ----------------------------------
	// Changing standard underscore.js template delimiters
	// Not really needed since _.js has its own delimiters
	// But i'll leave it for now.
	_.templateSettings = {
	interpolate: /\<\@\=(.+?)\@\>/gim,
	evaluate: /\<\@(.+?)\@\>/gim,
	escape: /\<\@\-(.+?)\@\>/gim
	};
});

function deleteHabit(e){
	e.preventDefault();
	debugger;
	url = $(e.target).attr('href');
	$target = $(e.target);


	$.ajax({
		url: url,
		type: 'delete'
	}).done(function(response){
		$target.closest('.habit-each').remove();
		deleteHabitPic();
	})
}


function createHabit(e){
	e.preventDefault();
	$target = $(e.target);

	$.ajax({
		url: $target.attr('action'),
		type: 'post',
		data: $target.serialize()
	}).done(function(response){
		var habitTemplate = document.getElementById("habit-template");
		var content = habitTemplate.innerHTML;
		var habit = document.createElement('div');
		habit.className = "habit-each"
		habit.id = response.id
	
		createHabitPic();

    var templateFunction = _.template(content);

		$('#habit-container').prepend(templateFunction( { habit_name: response.habit_name,
										  						  consecutive_counter: response.consecutive_counter,
									  							  total_counter: response.total_counter,
																	  id: response.id	
																	} )
		)

		// Doesn't Work
		// ----------------------------------
		// var picTemplate = document.getElementById("pic-template")
		// var picContent = picTemplate.innerHTML;

		// var templatePic = _.template(picContent);
		// $('#picture-container')
	});
}

function createHabitPic(e){

		var img = $("<img />").attr('src', selectCreatePic()).load(function(){
		$("#picture-container").html(img);
	});


}

function selectCreatePic() {
  var values = ["fixtures/imgs/ryan_challenge.jpg","fixtures/imgs/emma_challenge.jpg"],
    valueToUse = values[Math.floor(Math.random() * values.length)];
  return valueToUse  
}

function completeHabitPic(e){
		var img = $("<img />").attr('src', selectCompletePic()).load(function(){
		$("#picture-container").html(img);
	});
}

function selectCompletePic() {
  var values = ["fixtures/imgs/ryan_success.jpg","fixtures/imgs/emma_success.jpg"],
    valueToUse = values[Math.floor(Math.random() * values.length)];
  return valueToUse  
}

function deleteHabitPic(e){

		var img = $("<img />").attr('src', selectDeletePic()).load(function(){
		$("#picture-container").html(img);
	});
}

function selectDeletePic() {
  var values = ["fixtures/imgs/ryan_disappoint.jpg","fixtures/imgs/emma_disappoint.jpg"],
    valueToUse = values[Math.floor(Math.random() * values.length)];
  return valueToUse  
}


// When I create a new habit, 
// w/o refreshing I can't click done. Why?
function completeHabit(e){
	e.preventDefault();
	completeHabitPic();
	$target = $(e.target);
	$consecutive_counter = $target.closest(".habit-each").find("li span.consecutive-counter");
	$total_counter = $target.closest(".habit-each").find("li span.total-counter");

	$.ajax({
		url: $(e.target).attr('href'),
		type: "post"
	}).done(function(response){
		$consecutive_counter.html(response.consecutive_counter);
		$total_counter.html(response.total_counter);
	});
}





// TODO: Ajaxify edit
// ----------------------------------
// var editHabit = function(e){
// 	e.preventDefault();
// 	$target = $(e.target);
// 	// debugger;
// 	$.ajax({
// 		type: "post",
// 		url: $target.attr('href')
// 	});
// }


// POTENTIAL: Picture pop up windows
// ----------------------------------
// var myWindow;

// function openWin() {
//     myWindow = window.open("", "myWindow", "width=200, height=100");
//     myWindow.document.write("<p>This is 'myWindow'</p>");
//     setTimeout(closeWin, 10000);
// }

// function closeWin() {
//     myWindow.close();
// }


// Append Picture
// ----------------------------------
// var img = $("<img />").attr('src', "fixtures/imgs/emma_challenge.jpg").load(function(){
// 	$("#picture").innerHTML(img);
// });
