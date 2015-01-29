$(document).ready(function() {
	$(".delete").click(function(e){
		e.preventDefault();
		url = $(e.target).attr('href');
		$target = $(e.target);

		$.ajax({
			url: url,
			type: 'delete'
		}).done(function(response){
			$target.closest('.habit-each').remove();

		})
	})
});

