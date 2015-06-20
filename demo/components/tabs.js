angular.module('commonsDemo')
	.controller('TabsCtrl', function($scope) {

		$scope.tabs1 = {
			otherTabName: 'Other',
			selectedTab: 'TAB2'
		};
	});