/* app.js */
/*globals: angular, Firebase */

var app = angular.module('angularFireDemo', ['firebase', 'ngMaterial'])
    .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
        var oRef = new Firebase('https://angularfire-meetup.firebaseio.com/');
        
        return $firebaseAuth(oRef);
    }])
    .factory('Messenger', ['$firebase', function($firebase) {
        var oRef = new Firebase('https://angularfire-meetup.firebaseio.com/messages/').orderByChild('timestamp').limitToLast(50);
        
        return $firebase(oRef).$asArray();
    }])
    .filter('reverse', function() {
        return function(paItems) {
            return paItems.slice().reverse();
        };
    })
    .controller('MessagesCtrl', ['$scope', 'Auth', '$mdDialog', 'Messenger', function ($scope, Auth, $mdDialog, Messenger) {
        $scope.userInfo = {
            authenticated: false
        };
        
        $scope.setAuth = function (pbValue) {
            $scope.userInfo.authenticated = pbValue;
        };
        
        Auth.$onAuth(function (poAuthData) {
            if (poAuthData) {
                $scope.setAuth(true);
                console.log('Authenticated successfully with payload:', poAuthData);
            } else {
                $scope.setAuth(false);
                console.log('User is logged off');
            }
            
            $scope.user = poAuthData;
            
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.logIn = function (poEvent) {
            Auth.$authWithOAuthPopup('github', function(poError, poAuthData) {
                if (poError) {
                    $scope.setAuth(false);
                    console.log('Login Failed!', poError);
                } else {
                    $scope.setAuth(true);
                    console.log('Authenticated successfully with payload (login):', poAuthData);
                }
                
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, {
                remember: 'sessionOnly'
            });
        };
        
        $scope.logOut = function (poEvent) {
            Auth.$unauth();
            $scope.setAuth(false);
            
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            
            console.log('User has logged off');
        };
        
        $scope.post = function (poEvent) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog.tmpl.html',
                targetEvent: poEvent,
            })
            .then(function(pcMessage) {
                var dTimestamp = new Date();
                
                console.log('You said the information was "' + pcMessage + '".');
                Messenger.$add({
                    text: pcMessage,
                    who: $scope.user.github.displayName,
                    face: $scope.user.github.cachedUserProfile.avatar_url,
                    url: $scope.user.github.cachedUserProfile.html_url,
                    timestamp: dTimestamp.getTime()
                })
            }, function() {
                console.log('You cancelled the dialog.');
            });
        };
        
        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.send = function(pcMessage) {
                $mdDialog.hide(pcMessage);
            };
        }
        
        $scope.messages = Messenger;
    }])
;