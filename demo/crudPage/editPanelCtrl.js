angular.module('commonsDemo')
	.controller('CrudPageEditPanelCtrl', function($scope, editDialog, Users, $controller) {

		$controller('AbstractRemoteEditDialogCtrl', {$scope: $scope, editDialog: editDialog, Resource: Users});

		editDialog.cancelHandler = function() { 
			console.log('Override cancel handler');
		};
	});