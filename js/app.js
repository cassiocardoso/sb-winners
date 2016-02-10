/* ============================== *\
 * app.js
\* ============================== */

'use strict';

var app = angular.module('sbwApp', []);

app.service('sbwService', function($http, $q) {
  // Promise to be used later on
  var dfd = $q.defer();

  $http.get('data/sb-winners.json')
    .then(function(data) {
      dfd.resolve(data);
    });

  // Function to return list of Super Bowls
  this.getSuperBowls = function() {
    return dfd.promise;
  };
})
.controller('SbwCtrl', function($scope, sbwService) {
  var promise = sbwService.getSuperBowls();

  promise.then(function(data) {
    $scope.superbowl = data.data;
    $scope.year = $scope.superbowl[0].year;
  });

  $scope.changeWinner = function() {
    var yearInput = document.getElementsByName('year')[0];
    var currentValue = yearInput.value;

    if (currentValue.length < 4) {
      // prevent change if length of value is smaller than 4
      return;
    } else {
      // change current year value
      $scope.year = currentValue;
      yearInput.focus();
    }
  };
});
