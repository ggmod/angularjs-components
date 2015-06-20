angular.module('commonsDemo')
	.controller('Dialog1Ctrl', function($scope) {

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