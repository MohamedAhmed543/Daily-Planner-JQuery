$(document).ready(function () {
    // Display current date
    $("#currentDay").text(dayjs().format("dddd D MMMM YYYY"));
  
    // Function to color code time slots
    function updateHourlySlots() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("data-hour"));
  
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Create time blocks dynamically
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);

      var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);

      var timeCol = $("<div>").addClass("col-md-1 hour").text(hour+ ":00");
  
      var textAreaCol = $("<textarea>").addClass("col-md-9 description");
  
      // Retrieve tasks from local storage
      var savedTask = localStorage.getItem("task_" + hour);
      if (savedTask) {
        textAreaCol.val(savedTask);
      }
  
      var saveBtnCol = $("<button>")
        .addClass("col-md-2 saveBtn")
        .html('<i class="fas fa-save"></i>');
  
      // Save task to local storage when the save button is clicked
      saveBtnCol.click(function () {
        var taskHour = $(this).parent().attr("data-hour");
        var taskText = $(this).siblings(".description").val();
        localStorage.setItem("task_" + taskHour, taskText);
        alert ('Your task has been saved')
      });
  
      timeBlock.append(timeCol, textAreaCol, saveBtnCol);
      $(".container").append(timeBlock);
    }
  
    // Update the color coding initially
    updateHourlySlots();
  
    // Set up an interval to update color coding every minute
    setInterval(updateHourlySlots, 60000);
  });
  