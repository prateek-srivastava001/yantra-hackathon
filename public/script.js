$(document).ready(function() {
    var movements = [];
  
    $(document).mousemove(function(event) {
      movements.push({ x: event.pageX, y: event.pageY });
    });
  
    $(document).click(function() {
      // Send the captured mouse movements to the server
      $.post('/authenticate', { movements: JSON.stringify(movements) }, function(response) {
        console.log(response);
      });
  
      // Reset the movements array
      movements = [];
    });
  });
  