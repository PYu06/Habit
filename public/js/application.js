$(document).ready(function() {
	$(".delete").click(deleteHabit);

	$("#create-habit").submit(createHabit);
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
		$('#habit-container').append("<h2>"+response+"</h2>")
	});
}