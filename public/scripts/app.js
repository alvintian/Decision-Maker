$('document').ready(function() {

//Jquery to compile options into an object to export to database




























let object = {};
  $('[name=Option1], [name=Option2]').on('keyup', function(e) {
      object[$(e.target)[0].name] = $(e.target).val();
        e.preventDefault();
      $(".new").on("submit").JSON.stringify(object);
    });




// on submit, grab object, stringify it and set val of hidden field with it



//adding JQUERY to increase the amount of options a user can have per decision
var max_fields = 7;
    var wrapper = $(".empty");
    var add_button = $(".btn-md");

    var x = 2;
    $(add_button).click(function(e){
        e.preventDefault();
        if(x < max_fields){
            x++;
            $(wrapper).append('<div><label for="Option">Option:</label><input type="text" class="form-control" name="Option2"><button class="remove_field">Remove</button></div>');
        }
    });

    $(wrapper).on("click",".remove_field", function(e){
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })



});