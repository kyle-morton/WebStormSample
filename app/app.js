'use strict';
console.log('My Angular App With My New Gulp Changes...');
angular.module('myApp', [  // Declare app level module which depends on views, and components
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.mainCtrl',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
