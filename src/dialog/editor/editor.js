angular.module('commons')
	.directive('editDialog', function($rootScope, $compile, $controller, $templateCache) {
		return {
			scope: {
				visible: '=',
				options: '='
			},
			restrict: 'E',
			replace: true,
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'dialog/editor/editor.html',

			link: function(scope, element, attrs) {

				scope.editedItem = angular.copy(scope.options.editedItem);

				scope.cancel = function() {
					if (scope.options.cancelHandler) {
						scope.options.cancelHandler(scope.editedItem);
					}
					scope.visible = false;
				};

				scope.remove = function() {
					if (scope.options.removeHandler) {
						scope.options.removeHandler(scope.editedItem);
					}
					scope.visible = false;
				};

				scope.copy = function() {
					if (scope.options.copyHandler) {
						scope.options.copyHandler(scope.editedItem);
					}
					scope.visible = false;
				};

				scope.save = function() {
					scope.options.saveHandler(scope.editedItem);
					scope.visible = false;
				};
			}
		};
	});
