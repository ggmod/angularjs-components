angular.module('commons')
	.directive('alertDialog', function() {
		return {
			scope: {
				visible: '=',
				title: '@',
				message: '@',
			},
			restrict: 'E',
			replace: true,
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'dialog/alert/alert.html',

			link: function(scope, element, attrs) { 

				scope.title = scope.title || 'Alert';

				scope.close = function() {
					scope.visible = false;
				};
			}
		};
	});