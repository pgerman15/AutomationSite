angular.module('AutomationApp').service('apiSearch', ['$http', function($http){
    this.search = function(text, results){
        if(!results){ //test
            results = 1;
        }
        return $http({
            method: 'GET',
            url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=' + results + '&api_key=6250fa3e2733290cf7297c858a02cfcf&format=json&text=' + text,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((resp) =>{
            console.log('Response: ', resp);
            console.log('Data: ', resp.data.substring(14, resp.data.indexOf('})') + 1));
            return JSON.parse(resp.data.substring(14, resp.data.indexOf('})') + 1));
        }, (err) => {
            console.log('Error: ', err);
        }).then((data) => {
            console.log('Photo: ', data.photos.photo);
            let photoArray = data.photos.photo;
            let URLArray = [];
            let tempURL;
            let farmId;
            let serverId;
            let id;
            let secret;

            for(var i = 0; i < photoArray.length; i++){
                console.log(photoArray[i]);
                farmId = photoArray[i].farm;
                serverId = photoArray[i].server;
                id = photoArray[i].id;
                secret = photoArray[i].secret;
                tempURL = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
                console.log(tempURL);
                URLArray.push(tempURL);
            }
            return URLArray;
        }, (err) => {
            console.log('There was an error: ', err);
        });
    }
}])
angular.module('AutomationApp').controller('iPhoneCtrl', [function() {
    var vm = this;
    vm.newWebpage = 'http://localhost/#/test';
    vm.webpage = 'http://localhost';
    vm.search = function(url){
        console.log('Called search...');
        vm.webpage = vm.newWebpage;
    }
}]);

angular.module('AutomationApp').controller('MainCtrl', ['$mdDialog', function($mdDialog) {
    var vm = this;
     
    vm.eventName = 'Pauls event';
    vm.showHidden = false;
    vm.events = [
        {
            name: "Paul's event",
            img: 'http://eventsbyambrosia.com/wp-content/uploads/2016/06/events.jpg',
            description: 'A super rad party that only the coolest can ever hope to attend. ' + 
            'Be there.',
            status: ''
        },
        {
            name: 'Boring party',
            img: 'https://thumb9.shutterstock.com/display_pic_with_logo/277009/175204676/stock-photo-two-friends-bored-over-bottles-of-beer-and-nachos-175204676.jpg',
            description: 'A boring party. Nobody will even be there. Seriously, dont attend this lame get-together',
            status: ''
        }
    ]
 
    vm.accept = function(i){
        if(vm.events[i].status != 'accepted'){
            vm.events[i].status = 'accepted';
        }else{
            vm.events[i].status = '';
        }
    }

    vm.deny = function(i){
        if(vm.events[i].status != 'denied'){
            vm.events[i].status = 'denied';
        }else{
            vm.events[i].status = '';
        }
    }

    vm.showDialog = function(ev) {
        $mdDialog.show({
            controller: 'AddEventCtrl',
            templateUrl: './app/pages/main/addEvent/addEvent.tmpl.html',
            targetEvent: ev,
            clickOutsideToClose:true,
        })
        .then(function(resp) {
            vm.events.push(resp);
        }, function() {
            console.log('You cancelled the dialog.');
        });
    };
}]);

angular.module('AutomationApp')
    .controller('AddEventCtrl', ['$scope', '$mdDialog', 'apiSearch', function($scope, $mdDialog, apiSearch) {
        $scope.close = function(){
            $mdDialog.cancel();
        }
        $scope.imageURLs;

        $scope.finish = () => {
            if($scope.img.length > 1){
                let eventObj = {
                    img: $scope.img,
                    name: $scope.name,
                    description: $scope.description
                }
                $mdDialog.hide(eventObj);
            }else{
                //Cant Save
            }
        }

        $scope.img = '';
        $scope.name = '';
        $scope.description = '';

        $scope.search = function(searchText){
            apiSearch.search(searchText, 4).then((photoArray) => {
                $scope.imageURLs = photoArray;
            });
        }

        $scope.pickImage = function(i){
            $scope.img = $scope.imageURLs[i];
        }
    }]);
