//==================//
// Global Variables //
//==================//

// Grid Pixel Matrix
var grid = [];

// State Variables
var drag = 0;
var ctrl = false;
var colorInput = $('#colorPicker1').val();


//==================//
// Helper Functions //
//==================//

// Set pixel size based on input values
function setPixelSize() {
  let pixel_size = $('#input_pixel_size').val();
  $(document).find('tr').css('height', pixel_size);
  $(document).find('td').css('width', pixel_size);
}


// Create checkered grid based on input values
function makeGrid(inY, inX) {
  // Create row elements
  let id = 0;
  let rowNum = 0;
  let cellLight;
  
  for (y = 0; y < inY; y++) {
    let tableRow = '<tr id=row'+rowNum+'></tr>';
    $('#pixel_canvas').append(tableRow);
    cellLight = (y % 2) ? false : true;
    
    // Create column elements
    for (x = 0; x < inX; x++) {
      let cellColor = 
          (cellLight) ? 'dark' :  'light';
      let tableCell = '<td id=cell' + id + 
          ' class=' + cellColor + '></td>';
      
      $('#pixel_canvas').find('#row'+rowNum).append(tableCell);
      
      cellLight = !cellLight;
      id++;
    }
    rowNum++;
  }
}


// Change pixel properties due to events
function modifyPixel(pixelObject) {
  if (ctrl) {
    pixelObject.css('background-color', '');
  } else {
    pixelObject.css('background-color',   
      colorInput);
  }
}



//=================//
// Event Listeners //
//=================//

// Handle Event Listeners for Making Grid
$('#sizePicker').find(':submit').click( function() {
    // Clear current grid data
    $('#pixel_canvas').empty();
  
    // Save grid input values and make grid
    let grid_height = $('#input_height').val();
    let grid_width = $('#input_width').val();
    makeGrid(grid_height, grid_width);
  
    // Set initial cell size based on pixel size value
    setPixelSize();
  
    return false;
  });


// Handle Event Listeners for Mouse Events
$('#pixel_canvas').on({
    mousedown: function() {
      modifyPixel($(this));
      drag = 1;
    },
    mousemove:  function() {
      if (drag) {
        modifyPixel($(this));
      }
    },
    mouseup: function() {
      drag = 0;
    }
}, 'td');
                      
$('#pixelSizePicker').find(':submit').on(
    'click', 
    function() {
      setPixelSize();
      return false;     
    }
);


// Handle Keypress Listeners
$(document).on({
  keydown: function(event) {
    switch(event.key) {
      case 'Alt':
        ctrl = true;
        break;
    }
  },
  keyup: function(event) {
    switch(event.key) {
      case 'Alt':
        ctrl = false;
        break;
    }
  }
});
