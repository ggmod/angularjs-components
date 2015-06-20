angular.module('commons')
	.directive('dialogFooter', function() {
		return {
			scope: { },
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="modal-footer" ng-transclude>',

			link: function(scope) { }
		};
	});