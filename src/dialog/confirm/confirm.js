angular.module('commons')
	.directive('confirmDialog', function() {
		return {
			scope: {
				visible: '=',
				title: '@',
				message: '@',
				item: '@',
				callback: '='
			},
			restrict: 'E',
			replace: true,
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'dialog/confirm/confirm.html',

			link: function(scope, element, attrs) {

				scope.title = scope.title || 'Confirmation';
				scope.message = scope.message || 'Are you sure, you want to remove the following item?';

				scope.cancel = function() {
					scope.visible = false;
				};

				scope.confirm = function() {
					scope.visible = false;
					scope.callback();
				};
			}
		};
	});