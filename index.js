angular.module('AutomationApp', ['ngMaterial', 'ngRoute']);

console.log('sanity output');
angular.module('AutomationApp').config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});