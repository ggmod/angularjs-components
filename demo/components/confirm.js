angular.module('commonsDemo')
	.controller('ConfirmCtrl', function($scope) {

		$scope.dialog = {
			visible: false,
			confirmed: function() {
				console.log('Confirmed');
			}
		};

		$scope.itemToRemove = {
			name: 'Example Item'
		};
	});