//alert("Resetting..Calves");
    
function displayExerciseInfo(){

// Initialize global variables
var totalCount = "";
var limit = "";
var status = "&status=2";
var queryURL = "";

var basicQueryURL = "https://cors-anywhere.herokuapp.com/https://wger.de/api/v2";

var endpointEquipment = "equipment";
var endpointExercise = "exercise";
var endpointExerciseInfo = "exerciseinfo";
var endpointExerciseCategory = "exercisecategory";
var endpointExerciseImage = "exerciseimage";
var endpointLanguage = "language";
var endpointMuscle = "muscle";
var equipmentText = "myEquipment"; 
var myLocalEquipment = {};


console.log(basicQueryURL + endpointExerciseCategory);

$.ajax({
  url: "https://cors-anywhere.herokuapp.com/" + basicQueryURL + "/" + endpointEquipment,
  method: "GET"
    }).then(function(response) {
    myLocalEquipment = response.results
    console.log(myLocalEquipment);
    });

function displayObject() {
// console.log(myLocalEquipment);
}
setTimeout(displayObject, 6000);
// console.log(myLocalEquipment);

function displaySort() {
myLocalEquipment.sort((a, b) => (a.id > b.id)? 1 : -1);
// console.log(myLocalEquipment);
// console.log(myLocalEquipment[0].name);
}

setTimeout(displaySort, 6000);
// console.log(myLocalEquipment);

//This is a double AJAX call. Each time you submit a request, it comes back with only 20 results.
//The exercise JSON results returns a lot, so the second query generates all the results back in one JSON file.
$("#calves").on("click", function(){

$.ajax({
    url: basicQueryURL + "/" + endpointExercise,
    method: "GET"
      }).then(function(response) {
      if (response.count > 20) {
      totalCount = response.count;
      console.log(totalCount);
      limit = "?limit=" + totalCount;

      console.log(basicQueryURL + "/" + endpointExercise + "/" + limit + status);

      $.ajax({
        url: basicQueryURL + "/" + endpointExercise + "/" + limit + "&language=2" + status,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.results;

            for (var i = 0; i < results.length; i++) {

            // Temporary variable to hold the equipment data point as an integer
            // Only downside is that if there are multiple pieces of equipment used in an exercise, it only returns the first item
            var tempNum = parseInt(results[i].equipment)

            // Tests to see if tempNum is Not a Number - helps avoid errors
            if (isNaN(tempNum)) {
                console.log("original: " + results[i].equipment + " - Not a number");
                } else {
                console.log("original: " + results[i].equipment + " - Number: " + tempNum + " - Type: " + typeof tempNum);
                // new temporary variable to find the proper index in myLocalEquipment object that corresponds to the equipment used in this exercise
                var tempEquipment = myLocalEquipment[tempNum - 1].name;
              }
              // if (results[i].equipment) {
              // var temporaryEquipment = parseInt(results[i].equipment) - 1;
              // var myEquipment = myLocalEquipment[temporaryEquipment].name;
              // } else { var myEquipment = 3;}

              if (results[i].category == 14) {
                
              var workoutDiv = $("<div>");
              var p = $("<p>").text("Name: " + results[i].name);
              var ptwo = $("<p>").text("Equipment: " + tempEquipment);
              var pthree = $("<p>").text("Description: " + results[i].description);
              workoutDiv.append(p);
              workoutDiv.append(ptwo);
              workoutDiv.append(pthree);
              $("#results").prepend(workoutDiv);
              }
            }
        });
    }
});
}); // closing brackets for on click
}

$(document).on("click", "#calves", displayExerciseInfo);