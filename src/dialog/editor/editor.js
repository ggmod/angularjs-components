angular.module('commons')
	.directive('editDialog', function(dialog) {
		return {
			scope: {
				visible: '=',
				options: '='
			},
			restrict: 'E',
			replace: true,
			templateUrl: ANGULAR_COMMONS_TEMPLATES_PATH + 'dialog/editor/editor.html',

			controller: function($scope) {
				this.addForm = function(form) {
					$scope.editorForm = form;
				};
			},

			link: function(scope, element, attrs) {

				scope.editedItem = angular.copy(scope.options.editedItem);
				scope.options.beforeOperation = scope.options.beforeOperation || function() {};

				scope.cancel = function() {
					scope.options.cancelHandler(scope.editedItem);
					scope.visible = false;
				};

				scope.remove = function() {
					dialog.confirm('', function() {
						if (scope.options.beforeOperation('DELETE')) {
							return false;
						}
						scope.options.removeHandler(scope.editedItem);
						scope.visible = false;
					});
				};

				scope.copy = function() {
					if (!scope.editorForm.$valid) {
						scope.showValidationErrors();
						return false;
					}
					if (scope.options.beforeOperation('COPY')) {
						return false;
					}
					scope.options.copyHandler(scope.editedItem);
					scope.visible = false;
				};

				scope.save = function() {
					if (!scope.editorForm.$valid) {
						scope.showValidationErrors();
						return false;
					}
					if (scope.options.beforeOperation('SAVE')) {
						return false;
					}
					scope.options.saveHandler(scope.editedItem);
					scope.visible = false;
				};

				scope.showValidationErrors = function() {
					Object.keys(scope.editorForm).forEach(function(key) {
						if (key.indexOf('$') !== 0) {
							scope.editorForm[key].$setDirty();
						}
					});
				};
			}
		};
	});