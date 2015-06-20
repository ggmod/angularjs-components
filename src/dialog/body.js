angular.module('commons')
	.directive('dialogBody', function() {
		return {
			scope: { },
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="modal-body" ng-transclude>',

			link: function(scope) { }
		};
	});