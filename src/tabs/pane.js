angular.module('commons')
	.directive('tabPane', function() {
		return {
			scope: {},
			require: '^tabContainer',
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',

			link: function(scope, element, attrs, tabContainerController) {
				tabContainerController.addTabPane(scope);
			}
		};
	});