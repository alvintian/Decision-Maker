$('document').ready(function() {


let object = {};
  $('[name=Option1], [name=Option2]').on('keyup', function(e) {
      object[$(e.target)[0].name] = $(e.target).val();

    });




// on submit, grab object, stringify it and set val of hidden field with it

var max_fields = 7;
    var wrapper = $(".new");
    var add_button = $(".btn-lg");

    var x = 2;
    $(add_button).click(function(e){
        e.preventDefault();
        if(x < max_fields){
            x++;
            $(wrapper).append('<div><label for="Option">Option:</label><input type="text" class="form-control" name="Option2"></div>');
        }
    });

    // $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    //     e.preventDefault(); $(this).parent('div').remove(); x--;
    // })




});




