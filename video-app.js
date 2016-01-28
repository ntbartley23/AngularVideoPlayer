var videoApp = angular.module('videoApp',[]);

// create a controller.All appliction code will lie inside the controller VideoController is the name we want to give our controller
//you want to use the scope module to bind different properties, variable, functions to our controller scope
//pass scope through function .
//for larger projects, use multiple controllers.
videoApp.controller('VideoController', ['$scope','$window','$interval',function($scope, $window, $interval) {
	$scope.videoDisplay = document.getElementById("VideoElement");
	$scope.videoSource = $window.videoSource;
	$scope.titleDisplay = $window.titleDisplay;
	$scope.videoDescription = $window.videoDescription;
	// create some JavaScript play functions for our app
    $scope.videoPlaying = false;
    //create custom time read up 
    $scope.currentTime;
    $scope.totalTime;


    //invoke layout refresh using interval mechanism
    $interval(function() {
    	$scope.updateLayout();

    }, 100);

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
   	if($scope.currentTime == $scope.totalTime) {
   		$scope.videoDisplay.pause();
   		$scope.videoPlaying = false;
   		$scope.currentTime = 0;
   		$('#playBtn').children("span").toggleClass("glyphicon-play", true);
   		$('#playBtn').children("span").toggleClass("glyphicon-pause", false);
   	}

   	
   }

  //force angular to re-render elements in the DOM

   $scope.updateLayout = function() {
   	//check to see if phase comes back true or false to check if it is safe to force re-rendering of elements
   	  if(!$scope.$$phase) {
   	  	scope.$apply();
   	  }
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



//create a filter
 videoApp.filter('time', function() {
 	return function(seconds) {
 		var hh = Math.floor(seconds / 3600), mm = Math.floor(seconds / 60) % 60, ss = Math.floor(seconds) % 60;
 		return hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
 	};
 });

// now when controller initializes, it will set the variables to objects that are in the DOM so the we can manipulate them
