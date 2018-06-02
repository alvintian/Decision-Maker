<<<<<<< HEAD
$(() => {
  //Jquery to compile options into an object to export to database
  // on submit, grab object, stringify it and set val of hidden field with it
  //adding JQUERY to increase the amount of options a user can have per decision
  var id = 3;
  var max_fields = 6
  var x = 2;
  $("#button").click(function() {

    var name = 'Option';
    if (x < max_fields) {
      x++;
      $('.empty').append('<label for="' + id + '">' + name + ':</label><input type="text" class="form-control" name="op' + id + '"><button class="remove_field">Remove</button></div>')
      id++;
    }
  });
  $('.empty').on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })


  //  $(".tester").on("click", function() {
  //  let submission = $("form[class='info_input']").serialize();
  //  $("#results").text(submission);
  //    console.log(submission, "test");
  //      $.ajax({
  //    url: '/api/users',
  //    method: 'POST',
  //    data: {
  //      submission
  //    }
  //    //    body: JSON.stringify($(this).serialize())
  //  });
  //    // jQuery.each(submission, function(i, field) {
  //    //  $("#results").append(field.value + " ");
  //    // });
  // });
 // $('.empty').on("click",".remove_field", function(e){
 //        e.preventDefault(); $(this).parent('div').remove(); x--;
 //    })


  // $("#emailButton").on("click", function(e) {
  //   sendEmail();
  // });

  // $("#emailButton").on("click", function() {
  //   alert("clicked the button!");
  //   // event.preventDefault();
  //   // sendEmail();
  // });

// $( window ).load(function() {
// $("#button").click(function(){
//         $("#new_choice").fadeIn(4000);
// });
// });

  // $submission.on('click', function() {
  //  tweet.count = parseInt(tweet.count) + 1;
  //  $.ajax({
  //    url: '/tweets/likes',
  //    method: 'POST',
  //    data: {
  //      id: tweet._id,
  //      count: tweet.count
  //    },
  //  });
  // });

  //adding Js to implement a doughnut graph needs to able to take data from database
  //  $(".tester").on("click", function() {
  //  let submission = $("form[class='info_input']").serialize();
  //  $("#results").text(submission);
  //    console.log(submission, "test");
  //      $.ajax({
  //    url: '/api/users',
  //    method: 'POST',
  //    data: {
  //      submission
  //    }
  //    //    body: JSON.stringify($(this).serialize())
  //  });
  //    // jQuery.each(submission, function(i, field) {
  //    //  $("#results").append(field.value + " ");
  //    // });
  // });

  // $submission.on('click', function() {
  //  tweet.count = parseInt(tweet.count) + 1;
  //  $.ajax({
  //    url: '/tweets/likes',
  //    method: 'POST',
  //    data: {
  //      id: tweet._id,
  //      count: tweet.count
  //    },
  //  });
  // });

  //adding Js to implement a doughnut graph needs to able to take data from database


});