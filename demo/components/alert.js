angular.module('commonsDemo')
	.controller('AlertCtrl', function($scope) {

		$scope.dialog = {
			visible: false,
			message: 'Message comes here'
		};

	});