$(document).ready(function(){


$("#enter-search").on("click", function(event){
    event.preventDefault();
    var inputExercise = $("#search-input").val().trim();
    searchWorkoutVideos(inputExercise);

    function searchWorkoutVideos(search) {
      console.log(search);
  
      var APIkey = "AIzaSyBKk1L2lzwZX9gBGpXZGicKwR52ZJ5giqc";
      var queryURL = "https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=10&q=" + search + "&key=" + APIkey;
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);

            var youtubeDiv = $("<div></div>");
            var youtubeVideo = $("<video></video>");
            var youtubeSource = $("<source></source>");
            var videoURL = "https://www.youtube.com/watch?v="
            $(youtubeVideo).each(function() {
              //console.log(response);
              youtubeSource = $("<source></source>").attr("src", videoURL + response.kind.items);
              youtubeVideo.append(youtubeSource);
              youtubeDiv.append(youtubeVideo);
            })
        
            $("#videos-appear-here").prepend(youtubeDiv);

        })
  }

});


})




// https://cors-anywhere.herokuapp.com/





