angular.module('commons')
	.directive('editDialogEditPanel', function($rootScope, $compile, $controller, $templateRequest) {
		return {
			restrict: 'E',
			replace: true,
			require: '^editDialog',
			template: '<div class="edit-panel-container"></div>',

			link: function(scope, element, attrs, editDialogController) {

				var innerScope = scope.options.scope || $rootScope.$new();
				innerScope.editedItem = scope.editedItem;

				var template = $templateRequest(scope.options.template).then(function(template) {
					var templateWithForm = '<form name="editorForm">' + template + '</form>';
					var compiledElement = $compile(templateWithForm)(innerScope);
					var innerController = $controller(scope.options.controller, 
						{$scope: innerScope, editDialog: scope.options});
					element[0].appendChild(compiledElement[0]);
				
					editDialogController.addForm(innerScope.editorForm);
				});
			}
		};
	});