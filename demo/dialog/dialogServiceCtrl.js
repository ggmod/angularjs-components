angular.module('commonsDemo')
	.controller('DialogServiceCtrl', function($scope, dialog) {

		$scope.openAlert = function() {
			dialog.alert({
				title: 'Alert from Service',
				message: 'Alert message from service'
			});
		};

		$scope.openConfirm = function() {
			dialog.confirm({
				item: 'Example item'
			}, function() {
				console.log('confirmed');
			});
		};

		$scope.openCustomConfirm = function() {
			dialog.confirm({
				title: 'Custom confirm dialog',
				message: 'Custom confirm message',
				item: 'Example item 2'
			}, function() {
				console.log('confirmed 2');
			});
		};

		$scope.openAlert2 = function() {
			dialog.alert('Alert message from service 2');
		};

		$scope.openConfirm2 = function() {
			dialog.confirm('Confirm item 2', function() {
				console.log('confirmed');
			});
		};
	});