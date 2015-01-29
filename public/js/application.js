$(document).ready(function() {
	$(".delete").click(deleteHabit);

	$("#create-habit").submit(createHabit);
	
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

	// 	<h2>Habit Name</h2>
	// 	<ul>
	// 		<li>consecutive counter :</li>
	// 		<li>total counter : </li>
	// 	</ul>
	// <a href="/habits/id/done">done!</a>
	// <a href="/habits/id/edit">edit</a>
	// <a href="/habits/id/delete" class="delete">delete</a>



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
		// $('#habit-container').prepend('<h2>' + response.habit_name + '</h2><ul><li>consecutive counter : '+ response.consecutive_counter + '</li><li>total counter : ' + response.total_counter + '</li></ul><a href="/habits/' + response.id + '/done">done!</a> <a href="/habits/' + response.id + '/edit">edit</a> <a href="/habits/' + response.id + '/delete" class="delete">delete</a>');


    var templateFunction = _.template(content);

		$('#habit-container').prepend(templateFunction( {habit_name: response.habit_name,
										  							consecutive_counter: response.consecutive_counter,
									  								total_counter: response.total_counter,
																		id: response.id	
																	} )
		);
		// debugger;
		// console.log(templateFunction( {habit_name: response.habit_name,
		// 								  							consecutive_counter: response.consecutive_counter,
		// 							  								total_counter: response.total_counter,
		// 																id: response.id	
		// 															} ) 
  //   );



    // var orangeTreeTemplate = document.getElementById("orange-tree-template")
    // var content = orangeTreeTemplate.innerHTML
    // var orangeTree = document.createElement('div');
    // orangeTree.className = "tree-container"
    // orangeTree.id = generateTreeId();
    // orangeTree.innerHTML = content;
    // var grove = document.querySelector(".grove");
    // grove.appendChild(orangeTree);
	});
}