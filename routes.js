console.log('hitting route config');
angular.module('AutomationApp').config(($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: './app/pages/main/main.html',
        controller: 'MainCtrl'
    })
    .when('/iPhone', {
        templateUrl: './app/pages/iPhoneTest/iPhone.html',
        controller: 'iPhoneCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})