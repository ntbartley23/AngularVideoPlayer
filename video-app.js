var videoApp = angular.module('videoApp',[]);

// create a controller.All appliction code will lie inside the controller VideoController is the name we want to give our controller
//you want to use the scope module to bind different properties, variable, functions to our controller scope
//pass scope through function .
//for larger projects, use multiple controllers.
videoApp.controller('VideoController', ['$scope','$window', function($scope, $window) {
	$scope.videoDisplay = document.getElementById("VideoElement");
	$scope.videoSource = $window.videoSource;
	$scope.titleDisplay = $window.titleDisplay;
	$scope.videoDescription = $window.videoDescription;
	// create some JavaScript play functions for our app
    $scope.videoPlaying = false;
    //create custom time read up 
    $scope.currentTime;
    $scope.totalTime;

      // create initialization function

   $scope.initPlayer = function() {
   	$scope.currentTime = 0;
   	$scope.totalTime = 0;
   	$scope.videoDisplay.addEventListener("timeupdate", $scope.updateTime, true);
   	$scope.videoDisplay.addEventListener("loadedmetadata", $scope.updateData, true);

   }

   $scope.updateData = function(e) {
   	$scope.totalTime = e.target.duration;

   }

   $scope.updateTime = function(e) {
   	$scope.currentTime = e.target.currentTime;
   }



    $scope.togglePlay = function() {
    	if($scope.videoDisplay.paused) {
    		$scope.videoDisplay.play();
    		$scope.videoPlaying = true;
    		$('#playBtn').children("span").toggleClass("glyphicon-play", false);
    		$('#playBtn').children("span").toggleClass("glyphicon-pause", true);
    	}else{
    		$scope.videoDisplay.pause(); 
    		$scope.videoPlaying = false;
    		$('#playBtn').children("span").toggleClass("glyphicon-play", true);
    		$('#playBtn').children("span").toggleClass("glyphicon-pause", false);
    	}
    }

    $scope.toggleMute = function() {
    	if($scope.videoDisplay.volume == 0.0){
    		$scope.videoDisplay.volume = 1.0;
    		$('#muteBtn').children("span").toggleClass("glyphicon-volume-up", true);
    		$('#muteBtn').children("span").toggleClass("glyphicon-volume-off", false);
    	}else {
    		$scope.videoDisplay.volume = 0.0;
    		$('#muteBtn').children("span").toggleClass("glyphicon-volume-up", false);
    		$('#muteBtn').children("span").toggleClass("glyphicon-volume-off", true);
    	}
    }

   $scope.initPlayer();

}]);

// now when controller initializes, it will set the variables to objects that are in the DOM so the we can manipulate them
