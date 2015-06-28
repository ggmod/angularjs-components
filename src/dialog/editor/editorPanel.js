angular.module('commons')
	.directive('editDialogEditPanel', function($rootScope, $compile, $controller, $templateRequest) {
		return {
			restrict: 'E',
			replace: true,
			template: '<div class="edit-panel-container"></div>',

			link: function(scope, element, attrs) {

				var innerScope = scope.options.scope || $rootScope.$new();
				innerScope.editedItem = scope.editedItem;

				var template = $templateRequest(scope.options.template).then(function(template) {
					var compiledElement = $compile(template)(innerScope);
					var innerController = $controller(scope.options.controller, 
						{$scope: innerScope, editDialog: scope.options});
					element[0].appendChild(compiledElement[0]);
				});
			}
		};
	});