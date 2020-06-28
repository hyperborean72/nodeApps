$(document).ready(function(){

  // sends add request on form submit
  // and reloads page with the list updated
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      // the request will be processed
      // in controller not here
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });
  
  // sends delete request on item in the list clicked
  // and reloads the page with the list updated
  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      
      // the request will be processed
      // in controller not here
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
