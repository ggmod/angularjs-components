angular.module('commons')
	.directive('remoteDataTableRowExpansionTemplate', function($compile) {
		return {
			restrict: 'A',

			compile: function(tElement) {
				return {
					pre: function(scope, iElement, attrs) {
						var expansionElement = $compile(scope.options.rowExpansionTemplate)(scope);
						iElement.append(expansionElement);
					},
					post: function(scope, iElement, attrs) {

					}
				};
			}
		};
	});