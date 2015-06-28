angular.module('commonsDemo')
	.controller('BasicDialogCtrl', function($scope) {

		$scope.dialogProperties = {
			visible: false
		};

		$scope.cancel = function() {
			$scope.dialogProperties.visible = false;
		};

		$scope.save = function() {
			$scope.dialogProperties.visible = false;
		};
	});