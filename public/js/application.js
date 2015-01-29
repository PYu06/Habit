$(document).ready(function() {
	$(".delete").click(deleteHabit);

	$("#create-habit").submit(createHabit);

	// TODO: Ajaxify edit
	// $("#edit").click(editHabit);
	

	// Changing standard underscore.js template delimiters
	// Not really needed since _.js has its own delimiters
	// But i'll leave it for now.
	_.templateSettings = {
	interpolate: /\<\@\=(.+?)\@\>/gim,
	evaluate: /\<\@(.+?)\@\>/gim,
	escape: /\<\@\-(.+?)\@\>/gim
	};
});

var deleteHabit = function(e){
	e.preventDefault();
	url = $(e.target).attr('href');
	$target = $(e.target);

	$.ajax({
		url: url,
		type: 'delete'
	}).done(function(response){
		$target.closest('.habit-each').remove();
	})
}


var createHabit = function(e){
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
	
    var templateFunction = _.template(content);

		$('#habit-container').prepend(templateFunction( { habit_name: response.habit_name,
										  						  consecutive_counter: response.consecutive_counter,
									  							  total_counter: response.total_counter,
																	  id: response.id	
																	} )
		);
	});
}

// var editHabit = function(e){
// 	e.preventDefault();
// 	$target = $(e.target);
// 	// debugger;
// 	$.ajax({
// 		type: "post",
// 		url: $target.attr('href')
// 	});
// }