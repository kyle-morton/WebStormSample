angular.module('myApp.mainCtrl', ['ngRoute'])
.controller('mainController', function() {
    var vm = this;
    vm.message = "Main Controller";
    console.log("Main Controller Init....");
});