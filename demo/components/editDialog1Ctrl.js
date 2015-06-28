angular.module('commonsDemo')
	.controller('DemoEditDialog1Ctrl', function($scope, editDialog) {

		editDialog.saveHandler = function(result) {
			console.log('Item saved:', result);
		};

		editDialog.cancelHandler = function(result) {
			console.log('Item cancelled:', result);
		};

		editDialog.removeHandler = function(result) {
			console.log('Item removed:', result);
		};
	});