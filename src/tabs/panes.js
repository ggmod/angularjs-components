angular.module('commons')
	.directive('tabPanes', function() {
		return {
			scope: {},
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="tab-content" ng-transclude></div>',

			link: function() { }
		};
	});