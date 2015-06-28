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

				function setDefaultOptions() {
					scope.options.beforeOperation = scope.options.beforeOperation || function() {};
					scope.options.isNewItem = scope.options.isNewItem || function(item) {
						return item.id === undefined;
					};

					scope.options.display = scope.options.display || {};
					scope.options.display.cancel = scope.options.display.cancel || 'Cancel';
					scope.options.display.size = scope.options.display.size || 'medium';
					scope.options.display.title = scope.options.display.title || 'Edit Dialog';
					scope.options.display.remove = scope.options.display.remove || 'Remove';
					scope.options.display.copy = scope.options.display.copy || 'Copy';
					scope.options.display.save = scope.options.display.save || 'Save';
					scope.options.display.showRemove = scope.options.display.showRemove === undefined ? 
						true : scope.options.display.showRemove;
					scope.options.display.showCopy = scope.options.display.showCopy === undefined ? 
						true : scope.options.display.showCopy;
				}

				setDefaultOptions();


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