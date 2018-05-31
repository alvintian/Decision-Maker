$(() => {
	$.ajax({
		method: "GET",
		url: "/api/users"
	}).done((users) => {
		for (user of users) {
			$("<div>").text(user.name).appendTo($("body"));
		}
	});


	//Array()
	$(".tester").on("click", function() {
	let submission = $("form[class='info_input']").serialize();
	$("#results").text(submission);
		console.log(submission, "test");
			$.ajax({
		url: '/api/users',
		method: 'POST',
		data: {
			submission
		}
		//		body: JSON.stringify($(this).serialize())
	});
		// jQuery.each(submission, function(i, field) {
		// 	$("#results").append(field.value + " ");
		// });


	});

	// $submission.on('click', function() {
	// 	tweet.count = parseInt(tweet.count) + 1;
	// 	$.ajax({
	// 		url: '/tweets/likes',
	// 		method: 'POST',
	// 		data: {
	// 			id: tweet._id,
	// 			count: tweet.count
	// 		},
	// 	});
	// });


});