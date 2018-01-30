angular.module('AutomationApp').config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
            'default': '500'
        })
        .accentPalette('blue', {
            'default': '900'
        })
});