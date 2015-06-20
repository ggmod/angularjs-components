angular.module('commons')
	.directive('tabHeader', function() {
		return {
			scope: {
				tabId: '@',
				selected: '=?'
			},
			require: '^tabContainer',
			restrict: 'E',
			replace: true,
			transclude: true,
			template: 
				'<li class="tab-header" ng-class="{\'active\': selected}">' +
				'	<a href="#" ng-click="tabHeaderSelected()">' +
				'		<span ng-transclude></span>' +
				'	</a>' +
				'</li>',

			link: function(scope, element, attrs, tabContainerController) {

				tabContainerController.addTabHeader(scope);

				scope.tabHeaderSelected = function() {
					tabContainerController.tabHeaderSelected(scope);
				};
			}
		};
	});