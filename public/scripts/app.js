$(() => {
//Jquery to compile options into an object to export to database
// on submit, grab object, stringify it and set val of hidden field with it
//adding JQUERY to increase the amount of options a user can have per decision
var id = 1;

$( "#button" ).click(function() {

    var name = 'Option'+ id;
    $('.empty').append('<label for="'+id+'">'+name+':</label><input type="text" class="form-control" name="op'+id+'"><button class="remove_field">Remove</button></div>')
    id++;
});




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

//adding Js to implement a doughnut graph needs to able to take data from database

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  }
});


});