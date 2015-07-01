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

				scope.defaultOptions = {
					beforeOperation: function() {},
					idProperty: 'id',
					display: {
						size: 'medium',
						title: 'Edit dialog',
						cancel: 'Cancel',
						copy: 'Copy',
						create: 'Save',
						update: 'Save',
						remove: 'Remove',
						showRemove: true,
						showCopy: true,
					}
				};
				
				function setDefaultOptions() {
					Object.keys(scope.defaultOptions).forEach(function(key) {
						if (scope.options[key] === undefined) {
							scope.options[key] = scope.defaultOptions[key];
						}
					});
					Object.keys(scope.defaultOptions.display).forEach(function(key) {
						if (scope.options.display[key] === undefined) {
							scope.options.display[key] = scope.defaultOptions.display[key];
						}
					});
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
						scope.options.removeHandler(function() {
							scope.visible = false;
						});
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
					scope.options.copyHandler(function() {
						scope.visible = false;
					});
				};

				scope.create = function() {
					if (!scope.editorForm.$valid) {
						scope.showValidationErrors();
						return false;
					}
					if (scope.options.beforeOperation('CREATE')) {
						return false;
					}
					scope.options.createHandler(function() {
						scope.visible = false;
					});
				};

				scope.update = function() {
					if (!scope.editorForm.$valid) {
						scope.showValidationErrors();
						return false;
					}
					if (scope.options.beforeOperation('UPDATE')) {
						return false;
					}
					scope.options.updateHandler(function() {
						scope.visible = false;
					});
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